import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";
import { orderService } from "../../services/orderService";
import LoadingSpinner from "../../components/admin/LoadingSpinner";

const STATUS_COLORS = {
  paid: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", label: "Đã thanh toán" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500", label: "Chờ xác nhận" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500", label: "Đã xác nhận" },
  processing: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500", label: "Đang xử lý" },
  shipped: { bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500", label: "Đang giao" },
  delivered: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", label: "Đã giao" },
  cancelled: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", label: "Đã hủy" },
};

function formatVND(n) {
  return new Intl.NumberFormat("vi-VN").format(n || 0) + " đ";
}

function formatRevenue(n) {
  if (!n) return "0";
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function rankBadgeClass(index) {
  if (index === 0) return "bg-amber-100 text-amber-700";
  if (index === 1) return "bg-gray-100 text-gray-500";
  if (index === 2) return "bg-orange-50 text-orange-600";
  return "bg-gray-50 text-gray-400";
}

function MiniBarChart({ data = [], color = "bg-blue-500" }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[9px] text-gray-400 hidden sm:block">{d.label}</span>
          <div
            className={"w-full rounded-t-sm transition-all duration-500 " + color}
            style={{ height: max > 0 ? Math.max(4, (d.value / max) * 48) + "px" : "4px" }}
          />
        </div>
      ))}
    </div>
  );
}

function StatRing({ value, total, color = "stroke-blue-500", size = 56, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? Math.min(100, (value / total) * 100) : 0;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="text-gray-100" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ - (pct / 100) * circ}
        strokeLinecap="round"
        className={color + " transition-all duration-700"}
      />
    </svg>
  );
}

function MobileOrderCard({ order }) {
  const s = STATUS_COLORS[order.status] || { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500", label: order.status };
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/60 transition-colors">
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
        {(order.customerName || "U").charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{order.customerName || "—"}</p>
          <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap " + s.bg + " " + s.text}>
            <span className={"w-1.5 h-1.5 rounded-full " + s.dot} />
            {s.label}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-gray-400">{order.phone || "—"} · {order.createdAt ? new Date(order.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) : "—"}</p>
          <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{formatVND(order.totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}

function MobileProductCard({ product, index }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors">
      <span className={"w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 " + rankBadgeClass(index)}>
        {index + 1}
      </span>
      <img
        src={product.image || product.images?.[0] || "https://via.placeholder.com/40"}
        alt={product.name}
        className="w-9 h-9 rounded-lg object-cover shrink-0 bg-gray-100"
        onError={(e) => { e.target.src = "https://via.placeholder.com/40?text=No"; }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
        <p className="text-[10px] text-gray-400">{product.sold || 0} đã bán · {formatVND(product.discountPrice || product.price)}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    Promise.all([productService.getProducts(), orderService.getOrders()])
      .then(([p, o]) => { setProducts(p); setOrders(o); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const stats = useMemo(() => {
    const paid = orders.filter((o) => o.status === "paid").length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const processing = orders.filter((o) => o.status === "processing").length;
    const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.totalPrice || 0), 0);
    const paidRevenue = orders.filter((o) => ["paid", "confirmed", "processing", "shipped", "delivered"].includes(o.status)).reduce((s, o) => s + (o.totalPrice || 0), 0);
    const uniqueCats = new Set(products.map((p) => p.category).filter(Boolean)).size;
    const totalSold = products.reduce((s, p) => s + (p.sold || 0), 0);
    return {
      totalProducts: products.length,
      categories: uniqueCats,
      totalSold,
      totalOrders: orders.length,
      paidOrders: paid,
      pendingOrders: pending,
      confirmedOrders: confirmed,
      processingOrders: processing,
      shippedOrders: shipped,
      deliveredOrders: delivered,
      cancelledOrders: cancelled,
      totalRevenue,
      paidRevenue,
      featuredProducts: products.filter((p) => p.isFeatured).length,
    };
  }, [products, orders]);

  const statusBreakdown = useMemo(() => {
    const counts = {};
    orders.forEach((o) => {
      const s = o.status || "unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, c]) => c > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([s, c]) => ({
        key: s,
        ...(STATUS_COLORS[s] || { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500", label: s }),
        count: c,
        pct: orders.length > 0 ? ((c / orders.length) * 100).toFixed(1) : "0",
      }));
  }, [orders]);

  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6),
    [orders]
  );

  const topProducts = useMemo(
    () => [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5),
    [products]
  );

  const revenueChart = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("vi-VN", { weekday: "short" });
      const val = orders
        .filter((o) => {
          const od = new Date(o.createdAt).toISOString().slice(0, 10);
          return od === key && ["paid", "confirmed", "processing", "shipped", "delivered"].includes(o.status);
        })
        .reduce((s, o) => s + (o.totalPrice || 0), 0);
      days.push({ label, value: val });
    }
    return days;
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Đang tải dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-black">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Cập nhật lần cuối: {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Làm mới</span>
          </button>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-black text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm sản phẩm</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Doanh thu</p>
              <p className="text-xl sm:text-2xl font-bold text-black mt-1 sm:mt-2">{formatRevenue(stats.totalRevenue)}</p>
              <p className="text-[10px] sm:text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>Tổng đơn đã xử lý</span>
              </p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <MiniBarChart data={revenueChart} color="bg-emerald-400" />
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Đơn hàng mới</p>
              <p className="text-xl sm:text-2xl font-bold text-black mt-1 sm:mt-2">{stats.pendingOrders}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">{stats.totalOrders} tổng đơn</p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100">
            {statusBreakdown.map((s) => (
              <div key={s.key} className={"h-full rounded-full " + s.dot} style={{ width: s.pct + "%" }} title={s.label + ": " + s.count} />
            ))}
            {statusBreakdown.length === 0 && <div className="w-full bg-gray-100" />}
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Sản phẩm</p>
              <p className="text-xl sm:text-2xl font-bold text-black mt-1 sm:mt-2">{stats.totalProducts}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 hidden sm:block">{stats.featuredProducts} nổi bật · {stats.categories} danh mục</p>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 sm:hidden">{stats.featuredProducts} nổi bật</p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <div className="relative">
              <StatRing value={stats.deliveredOrders} total={stats.totalOrders} color="stroke-violet-500" />
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-violet-700">
                {stats.totalOrders > 0 ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) : 0}%
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
              <p>Tỷ lệ giao hàng</p>
              <p className="font-semibold text-gray-600">{stats.deliveredOrders}/{stats.totalOrders} đơn</p>
            </div>
          </div>
        </div>

        {/* Processed */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Đơn đã xử lý</p>
              <p className="text-xl sm:text-2xl font-bold text-black mt-1 sm:mt-2">
                {stats.paidOrders + stats.confirmedOrders + stats.processingOrders + stats.shippedOrders + stats.deliveredOrders}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">{stats.cancelledOrders} đã hủy</p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 space-y-1.5">
            {["paid", "confirmed", "processing", "shipped", "delivered"].slice(0, 3).map((k) => {
              const s = STATUS_COLORS[k];
              const c = orders.filter((o) => o.status === k).length;
              return (
                <div key={k} className="flex items-center justify-between text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className={"w-1.5 h-1.5 rounded-full " + s.dot} />
                    <span className="text-gray-500 hidden sm:inline">{s.label}</span>
                    <span className="text-gray-500 sm:hidden">{k}</span>
                  </div>
                  <span className="font-semibold text-gray-700">{c}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Revenue 7-day chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Doanh thu 7 ngày gần nhất</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Đơn đã thanh toán trở đi</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              {formatVND(revenueChart.reduce((s, d) => s + d.value, 0))}
            </div>
          </div>
          <MiniBarChart data={revenueChart} color="bg-blue-500" />
          <div className="flex gap-1 mt-2">
            {revenueChart.map((d, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="text-[9px] sm:text-[10px] text-gray-400">{d.label}</p>
                <p className="text-[8px] sm:text-[9px] font-medium text-gray-500 hidden sm:block">{formatRevenue(d.value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Trạng thái đơn hàng</h3>
          <p className="text-[10px] sm:text-xs text-gray-400 mb-4 sm:mb-5">{orders.length} đơn hàng</p>
          <div className="space-y-2 sm:space-y-3">
            {statusBreakdown.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-400 text-center py-6 sm:py-8">Chưa có đơn hàng nào</p>
            ) : (
              statusBreakdown.slice(0, 6).map((s) => (
                <div key={s.key}>
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-1 sm:mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={"w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full " + s.dot} />
                      <span className="text-gray-600 font-medium">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{s.count}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 w-8 sm:w-10 text-right">{s.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={"h-full rounded-full " + s.dot + " transition-all duration-700"} style={{ width: s.pct + "%" }} />
                  </div>
                </div>
              ))
            )}
          </div>
          {stats.totalOrders > 0 && (
            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold text-gray-500">Tổng cộng</span>
              <span className="text-xs sm:text-sm font-bold text-gray-900">{stats.totalOrders} đơn</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Đơn hàng gần đây</h3>
            <Link to="/admin/orders" className="text-[10px] sm:text-xs font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-1">
              Xem tất cả
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Ngày đặt</th>
                  <th className="px-6 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 sm:py-12 text-center text-xs sm:text-sm text-gray-400">Chưa có đơn hàng nào</td>
                  </tr>
                ) : (
                  recentOrders.map((order) => {
                    const s = STATUS_COLORS[order.status] || { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500", label: order.status };
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                              {(order.customerName || "U").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{order.customerName || "—"}</p>
                              <p className="text-[10px] text-gray-400">{order.phone || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">{formatVND(order.totalPrice)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold " + s.bg + " " + s.text}>
                            <span className={"w-1.5 h-1.5 rounded-full " + s.dot} />
                            {s.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) : "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link to="/admin/orders" className="text-xs font-medium text-gray-400 hover:text-black transition-colors">
                            Chi tiết →
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden divide-y divide-gray-50">
            {recentOrders.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">Chưa có đơn hàng nào</div>
            ) : (
              recentOrders.map((order) => (
                <MobileOrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        </div>

        {/* Right column: Top Products + Quick Actions */}
        <div className="space-y-4 sm:space-y-6">

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Sản phẩm bán chạy</h3>
              <Link to="/admin/products" className="text-[10px] sm:text-xs text-gray-400 hover:text-black transition-colors">Tất cả →</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {topProducts.length === 0 ? (
                <p className="px-4 sm:px-5 py-6 sm:py-8 text-xs sm:text-sm text-gray-400 text-center">Chưa có sản phẩm</p>
              ) : (
                topProducts.map((p, i) => (
                  <MobileProductCard key={p.id} product={p} index={i} />
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Thao tác nhanh</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { href: "/admin/products/add", icon: "M12 4v16m8-8H4", label: "Thêm SP", desc: "Tạo mới", color: "bg-black text-white", hover: "hover:bg-gray-800" },
                { href: "/admin/products", icon: "M4 6h16M4 10h16M4 14h16M4 18h16", label: "Danh sách", desc: "Quản lý SP", color: "bg-gray-50 text-gray-700", hover: "hover:bg-gray-100" },
                { href: "/admin/orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", label: "Đơn hàng", desc: stats.pendingOrders + " chờ", color: "bg-amber-50 text-amber-700", hover: "hover:bg-amber-100" },
                { href: "/admin/reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Báo cáo", desc: "Thống kê", color: "bg-green-50 text-green-700", hover: "hover:bg-green-100" },
              ].map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className={"flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl text-center transition-all " + action.color + " " + action.hover}
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold">{action.label}</p>
                    <p className="text-[8px] sm:text-[9px] opacity-70 mt-0.5">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
