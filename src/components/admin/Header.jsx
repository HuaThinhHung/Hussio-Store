import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const PAGE_META = {
  "/admin/dashboard": { title: "Dashboard", subtitle: "Tổng quan cửa hàng", crumbs: [{ label: "Home", href: "/admin/dashboard" }] },
  "/admin/products": { title: "Quản lý sản phẩm", subtitle: "Danh sách & thao tác", crumbs: [{ label: "Admin", href: "/admin/dashboard" }, { label: "Sản phẩm" }] },
  "/admin/products/add": { title: "Thêm sản phẩm", subtitle: "Tạo sản phẩm mới", crumbs: [{ label: "Admin", href: "/admin/dashboard" }, { label: "Sản phẩm", href: "/admin/products" }, { label: "Thêm mới" }] },
  "/admin/orders": { title: "Quản lý đơn hàng", subtitle: "Xử lý & theo dõi", crumbs: [{ label: "Admin", href: "/admin/dashboard" }, { label: "Đơn hàng" }] },
  "/admin/users": { title: "Quản lý tài khoản", subtitle: "Người dùng & phân quyền", crumbs: [{ label: "Admin", href: "/admin/dashboard" }, { label: "Tài khoản" }] },
  "/admin/reports": { title: "Báo cáo", subtitle: "Thống kê & phân tích", crumbs: [{ label: "Admin", href: "/admin/dashboard" }, { label: "Báo cáo" }] },
  "/admin/settings": { title: "Cài đặt", subtitle: "Cấu hình cửa hàng", crumbs: [{ label: "Admin", href: "/admin/dashboard" }, { label: "Cài đặt" }] },
};

function getPageMeta(path) {
  for (const [key, val] of Object.entries(PAGE_META)) {
    if (path.startsWith(key)) return val;
  }
  return { title: "Admin", subtitle: "Quản trị", crumbs: [{ label: "Admin" }] };
}

function BellIcon({ hasUnread }) {
  return (
    <div className="relative">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {hasUnread && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm">
          {hasUnread > 9 ? "9+" : hasUnread}
        </span>
      )}
    </div>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function NotificationDropdown({ notifOpen, setNotifOpen, notifications, unreadCount, markAsRead, markAllAsRead }) {
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setNotifOpen]);

  if (!notifOpen) return null;

  return (
    <div
      ref={notifRef}
      className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Thông báo</h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            Không có thông báo nào
          </div>
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`w-full flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0 ${
                !n.read ? "bg-blue-50/50" : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === "order"
                    ? "bg-blue-100 text-blue-600"
                    : n.type === "product"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {n.type === "order" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                ) : n.type === "product" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function UserMenuDropdown({ userMenuOpen, setUserMenuOpen }) {
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setUserMenuOpen]);

  if (!userMenuOpen) return null;

  return (
    <div
      ref={userMenuRef}
      className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-52 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-900">Admin</p>
        <p className="text-xs text-gray-400">admin@hussio.vn</p>
      </div>
      <div className="py-1">
        <Link
          to="/admin/settings"
          onClick={() => setUserMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Cài đặt
        </Link>
        <Link
          to="/"
          onClick={() => setUserMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Xem cửa hàng
        </Link>
      </div>
      <div className="py-1 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { notifications, unreadCount, markAsRead, markAllAsRead, setSidebarMobileOpen } = useAdmin();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const meta = getPageMeta(location.pathname);

  // Close dropdowns on route change
  useEffect(() => {
    setNotifOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* ── Left: Hamburger + Title ── */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Mobile hamburger — opens sidebar drawer */}
          <button
            onClick={() => setSidebarMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors flex-shrink-0"
            aria-label="Mở menu"
          >
            <HamburgerIcon />
          </button>

          {/* Breadcrumb + Title */}
          <div className="min-w-0">
            {/* Breadcrumb — hidden on xs, visible from sm */}
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 mb-0.5">
              {meta.crumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {crumb.href ? (
                    <Link to={crumb.href} className="hover:text-gray-700 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={i === meta.crumbs.length - 1 ? "text-gray-700 font-medium" : ""}>
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
            {/* Page title */}
            <h2 className="text-base sm:text-lg font-serif font-semibold text-black truncate max-w-[140px] sm:max-w-none">
              {meta.title}
            </h2>
          </div>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Date — hidden on xs */}
          <div className="hidden md:flex flex-col items-end mr-1">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              {new Date().toLocaleDateString("vi-VN", { weekday: "long" })}
            </span>
            <span className="text-xs font-semibold text-gray-600">
              {new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setUserMenuOpen(false);
              }}
              className="relative p-2 sm:p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
              aria-label="Thông báo"
            >
              <BellIcon hasUnread={unreadCount} />
            </button>
            <NotificationDropdown
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
              notifications={notifications}
              unreadCount={unreadCount}
              markAsRead={markAsRead}
              markAllAsRead={markAllAsRead}
            />
          </div>

          {/* User Avatar Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="flex items-center gap-1.5 sm:pl-1.5 pr-1.5 py-1 rounded-xl hover:bg-gray-100 transition-all"
              aria-label="Tài khoản"
            >
              <div className="hidden sm:block text-right flex-shrink-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">Admin</p>
                <p className="text-[10px] text-gray-400 leading-tight hidden lg:block">Quản trị viên</p>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white flex-shrink-0">
                A
              </div>
              <ChevronIcon open={userMenuOpen} />
            </button>
            <UserMenuDropdown
              userMenuOpen={userMenuOpen}
              setUserMenuOpen={setUserMenuOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
