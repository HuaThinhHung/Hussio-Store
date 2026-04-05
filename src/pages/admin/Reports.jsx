import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";
import { orderService } from "../../services/orderService";
import LoadingSpinner from "../../components/admin/LoadingSpinner";

const STATUS_COLORS = {
  paid: { label: "Đã thanh toán", dot: "bg-emerald-500" },
  pending: { label: "Chờ xác nhận", dot: "bg-yellow-500" },
  confirmed: { label: "Đã xác nhận", dot: "bg-blue-500" },
  processing: { label: "Đang xử lý", dot: "bg-purple-500" },
  shipped: { label: "Đang giao", dot: "bg-indigo-500" },
  delivered: { label: "Đã giao", dot: "bg-green-500" },
  cancelled: { label: "Đã hủy", dot: "bg-red-500" },
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
            style={{ height: max > 0 ? Math.max(4, Math.round((d.value / max) * 48)) + "px" : "4px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Reports() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    Promise.all([productService.getProducts(), orderService.getOrders()])
      .then(([p, o]) => { setProducts(p); setOrders(o); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + (o.totalPrice || 0), 0);
    const paidRevenue = orders
      .filter((o) => ["paid", "confirmed", "processing", "shipped", "delivered"].includes(o.status))
      .reduce((s, o) => s + (o.totalPrice || 0), 0);
    return {
      totalRevenue,
      paidRevenue,
      totalOrders: orders.length,
      completedOrders: orders.filter((o) => o.status === "delivered").length,
      paidOrders: orders.filter((o) => o.status === "paid").length,
      pendingOrders: orders.filter((o) => o.status === "pending").length,
      cancelledOrders: orders.filter((o) => o.status === "cancelled").length,
      totalProducts: products.length,
      featuredProducts: products.filter((p) => p.isFeatured).length,
      totalSold: products.reduce((s, p) => s + (p.sold || 0), 0),
    };
  }, [products, orders]);

  const topProducts = useMemo(
    () => [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5),
    [products]
  );

  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [orders]
  );

  const ordersByStatus = useMemo(() => {
    const counts = {};
    orders.forEach((order) => {
      const s = order.status || "unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, c]) => c > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([status, count]) => ({
        status,
        ...(STATUS_COLORS[status] || { label: status, dot: "bg-gray-500" }),
        count,
        pct: orders.length > 0 ? ((count / orders.length) * 100).toFixed(1) : "0",
      }));
  }, [orders]);

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
        <LoadingSpinner size="lg" text="Đang tải báo cáo..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-black">Báo cáo & Thống kê</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Dữ liệu {dateRange} ngày gần nhất</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white text-xs sm:text-sm font-medium shadow-sm w-fit"
        >
          <option value="7">7 ngày qua</option>
          <option value="30">30 ngày qua</option>
          <option value="90">90 ngày qua</option>
          <option value="365">1 năm qua</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { title: "Doanh thu", value: formatRevenue(stats.totalRevenue), sub: formatRevenue(stats.paidRevenue) + " đã thu", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
          { title: "Tổng đơn hàng", value: stats.totalOrders, sub: stats.completedOrders + " hoàn thành · " + stats.paidOrders + " đã thanh toán", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
          { title: "Tổng sản phẩm", value: stats.totalProducts, sub: stats.featuredProducts + " nổi bật · " + stats.totalSold + " đã bán", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
          { title: "Tỷ lệ hoàn thành", value: (stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0) + "%", sub: stats.cancelledOrders + " đã hủy", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", iconBg: "bg-green-50", iconColor: "text-green-600" },
        ].map((s, i) => (
          <div key={i} className={"bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">{s.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 hidden sm:block">{s.sub}</p>
              </div>
              <div className={"w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 " + s.iconBg + " " + s.iconColor}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Revenue 7-day chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Doanh thu 7 ngày</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">Đơn đã thanh toán trở đi</p>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
              {formatVND(revenueChart.reduce((s, d) => s + d.value, 0))}
            </span>
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

        {/* Order Status Distribution */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Trạng thái đơn hàng</h3>
          <p className="text-[10px] sm:text-xs text-gray-400 mb-4 sm:mb-5">{orders.length} đơn hàng</p>
          <div className="space-y-2 sm:space-y-3">
            {ordersByStatus.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-400 text-center py-6 sm:py-8">Chưa có đơn hàng nào</p>
            ) : (
              ordersByStatus.map((s) => (
                <div key={s.status}>
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
        </div>
      </div>

      {/* Top Selling + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Sản phẩm bán chạy</h3>
            <Link to="/admin/products" className="text-[10px] sm:text-xs text-gray-400 hover:text-black transition-colors">Tất cả →</Link>
          </div>
          <div className="space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-400 text-center py-6 sm:py-8">Chưa có sản phẩm</p>
            ) : (
              topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className={"w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 " + rankBadgeClass(i)}>
                    {i + 1}
                  </span>
                  <img
                    src={p.images?.[0] || p.image || "https://via.placeholder.com/50"}
                    alt={p.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=No"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">{p.sold || 0} đã bán · {formatVND(p.discountPrice || p.price)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Đơn hàng gần đây</h3>
            <Link to="/admin/orders" className="text-[10px] sm:text-xs text-gray-400 hover:text-black transition-colors">Tất cả →</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-xs sm:text-sm text-gray-400 text-center py-6 sm:py-8">Chưa có đơn hàng nào</p>
            ) : (
              recentOrders.map((order) => {
                const s = STATUS_COLORS[order.status] || { label: order.status, dot: "bg-gray-500" };
                return (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-500 shrink-0">
                        {(order.customerName || "U").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{order.customerName || "—"}</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-400">#{order.id?.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{formatVND(order.totalPrice)}</p>
                      <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-gray-100 text-gray-700">
                        <span className={"w-1.5 h-1.5 rounded-full " + s.dot} />
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
