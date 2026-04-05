import { useState, useEffect, useMemo } from "react";
import { orderService } from "../../services/orderService";
import { useToast, ToastContainer } from "../../components/admin/Toast";
import LoadingSpinner from "../../components/admin/LoadingSpinner";

const STATUS_COLORS = {
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
  paid: { label: "Đã thanh toán", color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  processing: { label: "Đang xử lý", color: "bg-purple-100 text-purple-800", dot: "bg-purple-500" },
  shipped: { label: "Đang giao", color: "bg-indigo-100 text-indigo-800", dot: "bg-indigo-500" },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-800", dot: "bg-green-500" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800", dot: "bg-red-500" },
};

const ITEMS_PER_PAGE = 10;

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price || 0) + " đ";
}
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ── Mobile order card ────────────────────────────────────────────────────────
function MobileOrderCard({ order, onViewDetail, onUpdateStatus, onDelete }) {
  const s = STATUS_COLORS[order.status] || { color: "bg-gray-100 text-gray-800", dot: "bg-gray-400", label: order.status };
  return (
    <div className="px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
            {(order.customerName || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{order.customerName || "—"}</p>
            <p className="text-[10px] text-gray-400">{order.phone || "—"}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.color} flex-shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs text-gray-400">{order.items?.length || 0} sản phẩm</span>
        <span className="text-sm font-semibold text-gray-900">{formatPrice(order.totalPrice)}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-gray-400">{formatDate(order.createdAt)}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => onViewDetail(order)} className="px-2.5 py-1.5 text-[10px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            Chi tiết
          </button>
          <button onClick={() => onUpdateStatus(order)} className="px-2.5 py-1.5 text-[10px] font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Status Modal ─────────────────────────────────────────────────────────────
function StatusModal({ order, onClose, onUpdate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full sm:w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Mobile drag handle */}
        <div className="hidden sm:block absolute top-4 right-4">
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {/* Mobile header */}
        <div className="sticky top-0 bg-white px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 border-b border-gray-100">
          <div className="sm:hidden w-8 h-1 rounded-full bg-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-gray-900">Cập nhật trạng thái</h3>
          <p className="text-xs text-gray-400 mt-0.5">#{order.id?.slice(-6).toUpperCase()} · {order.customerName}</p>
        </div>
        <div className="px-4 sm:px-6 py-5 space-y-2">
          {Object.entries(STATUS_COLORS).map(([key, v]) => (
            <button
              key={key}
              onClick={() => onUpdate(order.id, key)}
              className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all ${
                order.status === key ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
              }}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${v.dot} ${order.status === key ? "opacity-100" : "opacity-60"}}`} />
              <span className={`text-sm font-medium ${order.status === key ? "text-white" : "text-gray-700"}}`}>{v.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Drag handle for mobile */}
        <div className="w-8 h-1 rounded-full bg-gray-300 mx-auto mt-3 mb-0 sm:hidden" />
        <div className="sticky top-0 bg-white px-5 pt-4 pb-3 sm:px-8 sm:pt-6 sm:pb-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900">
            Chi tiết đơn #{order.id?.slice(-6).toUpperCase()}
          </h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-5 py-5 sm:px-8 sm:py-6 space-y-5">
          {/* Customer info */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Thông tin khách hàng</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400">Tên:</span><p className="font-medium mt-0.5">{order.customerName || "—"}</p></div>
              <div><span className="text-gray-400">SĐT:</span><p className="font-medium mt-0.5">{order.phone || "—"}</p></div>
              <div className="sm:col-span-2"><span className="text-gray-400">Địa chỉ:</span><p className="font-medium mt-0.5">{order.address || "—"}</p></div>
            </div>
          </div>
          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Sản phẩm đã đặt</h4>
            <div className="space-y-3">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <img src={item.image || "https://via.placeholder.com/60"} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0" onError={(e) => { e.target.src = "https://via.placeholder.com/60"; }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name || "—"}</p>
                    <p className="text-xs text-gray-400">{item.color && `Màu: ${item.color}}`} {item.size && ` · Size: ${item.size}}`} · x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{formatPrice(((item.discountPrice || item.price) || 0) * (item.quantity || 1))}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold text-base text-gray-600">Tổng cộng</span>
            <span className="font-bold text-xl text-gray-900">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      setOrders(data);
    } catch {
      showToast("Không thể tải danh sách đơn hàng", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      showToast("Cập nhật trạng thái thành công", "success");
      setIsStatusModalOpen(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch {
      showToast("Không thể cập nhật trạng thái", "error");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      try {
        await orderService.deleteOrder(orderId);
        showToast("Xóa đơn hàng thành công", "success");
        fetchOrders();
      } catch {
        showToast("Không thể xóa đơn hàng", "error");
      }
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone?.includes(searchTerm) ||
        order.id?.includes(searchTerm);
      const matchesStatus = !statusFilter || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));

  useEffect(() => { setCurrentPage(1); }, [searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const stats = useMemo(() => {
    const total = orders.length;
    const paid = orders.filter((o) => o.status === "paid").length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const revenue = orders.filter((o) => ["paid", "confirmed", "processing", "shipped", "delivered"].includes(o.status)).reduce((s, o) => s + (o.totalPrice || 0), 0);
    return { total, paid, pending, delivered, revenue };
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Đang tải đơn hàng..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <ToastContainer toast={toast} onClose={hideToast} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-black">Quản lý đơn hàng</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{filteredOrders.length} đơn hàng</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Tổng đơn", value: stats.total, icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Đã thanh toán", value: stats.paid, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
          { label: "Chờ xử lý", value: stats.pending, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
          { label: "Doanh thu", value: new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1, notation: "compact" }).format(stats.revenue) + "đ", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${s.iconBg} flex items-center justify-center ${s.iconColor} flex-shrink-0}`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{s.label}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="sm:w-52 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white text-sm"
          >
            <option value="">Tất cả</option>
            {Object.entries(STATUS_COLORS).map(([key, v]) => (
              <option key={key} value={key}>{v.label}</option>
            ))}
          </select>
          {(searchTerm || statusFilter) && (
            <button onClick={() => { setSearchTerm(""); setStatusFilter(""); }} className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap">
              Xóa lọc
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["ID", "Khách hàng", "Sản phẩm", "Tổng tiền", "Trạng thái", "Ngày đặt", "Thao tác"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-14 sm:py-16 text-center text-gray-400">Không có đơn hàng nào</td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const s = STATUS_COLORS[order.status] || { color: "bg-gray-100 text-gray-800", dot: "bg-gray-400", label: order.status };
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 lg:px-5 py-4"><span className="font-mono text-xs text-gray-500">#{order.id?.slice(-6).toUpperCase()}</span></td>
                      <td className="px-4 lg:px-5 py-4">
                        <p className="text-sm font-medium text-gray-900">{order.customerName || "—"}</p>
                        <p className="text-xs text-gray-400">{order.phone || "—"}</p>
                      </td>
                      <td className="px-4 lg:px-5 py-4"><span className="text-sm text-gray-600">{order.items?.length || 0} sản phẩm</span></td>
                      <td className="px-4 lg:px-5 py-4"><span className="text-sm font-semibold text-gray-900">{formatPrice(order.totalPrice)}</span></td>
                      <td className="px-4 lg:px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${s.color}}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}}`} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 lg:px-5 py-4"><span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(order.createdAt)}</span></td>
                      <td className="px-4 lg:px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => { setSelectedOrder(order); setIsDetailModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chi tiết">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={() => { setSelectedOrder(order); setIsStatusModalOpen(true); }} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Cập nhật">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                          </button>
                          <button onClick={() => handleDeleteOrder(order.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {paginatedOrders.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-gray-400">Không có đơn hàng nào</div>
        ) : (
          paginatedOrders.map((order) => (
            <MobileOrderCard
              key={order.id}
              order={order}
              onViewDetail={(o) => { setSelectedOrder(o); setIsDetailModalOpen(true); }}
              onUpdateStatus={(o) => { setSelectedOrder(o); setIsStatusModalOpen(true); }}
              onDelete={handleDeleteOrder}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} / {filteredOrders.length}
          </p>
          <div className="flex items-center gap-1 flex-wrap justify-end">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {pageNumbers[0] > 1 && <>
              <button onClick={() => setCurrentPage(1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === 1 ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}}`}>1</button>
              {pageNumbers[0] > 2 && <span className="px-1 text-gray-400">…</span>}
            </>}
            {pageNumbers.map((num) => (
              <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === num ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}}`}>{num}</button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && <>
              <span className="px-1 text-gray-400">…</span>
              <button onClick={() => setCurrentPage(totalPages)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === totalPages ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}}`}>{totalPages}</button>
            </>}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {isStatusModalOpen && selectedOrder && (
        <StatusModal
          order={selectedOrder}
          onClose={() => { setIsStatusModalOpen(false); setSelectedOrder(null); }}
          onUpdate={handleUpdateStatus}
        />
      )}
      {isDetailModalOpen && selectedOrder && (
        <DetailModal
          order={selectedOrder}
          onClose={() => { setIsDetailModalOpen(false); setSelectedOrder(null); }}
        />
      )}
    </div>
  );
}
