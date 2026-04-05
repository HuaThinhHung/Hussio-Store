import { Link, useLocation } from "react-router-dom";
import { AdminLogo } from "./AdminLogo";
import { useAdmin } from "../../context/AdminContext";

const NAV = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Sản phẩm",
    href: "/admin/products",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    name: "Đơn hàng",
    href: "/admin/orders",
    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  },
  {
    name: "Tài khoản",
    href: "/admin/users",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 6v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    name: "Báo cáo",
    href: "/admin/reports",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "Cài đặt",
    href: "/admin/settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  );
}

function CollapseIcon({ collapsed }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const { collapsed, toggleCollapsed, sidebarMobileOpen, setSidebarMobileOpen } = useAdmin();

  const handleNavClick = () => {
    // Close mobile drawer after navigating
    if (window.innerWidth < 1024) {
      setSidebarMobileOpen(false);
    }
  };

  return (
    <>
      {/* ── Mobile overlay (only when drawer is open) ── */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setSidebarMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar / Drawer ── */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen bg-white border-r border-gray-100
          flex flex-col transition-all duration-300 ease-in-out
          ${sidebarMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-[68px]" : "w-64"}
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-3 lg:px-4 py-4 border-b border-gray-100 min-h-[68px]">
          <Link
            to="/"
            className="block overflow-hidden"
            onClick={handleNavClick}
          >
            {collapsed ? (
              <div className="w-10">
                <AdminLogo className="[&>div]:justify-center" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 flex-shrink-0">
                  <AdminLogo />
                </div>
                <div>
                  <h1 className="font-serif text-lg font-bold text-black tracking-wider leading-none whitespace-nowrap">
                    HUSSIO
                  </h1>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                    Admin Panel
                  </p>
                </div>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setSidebarMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Đóng menu"
          >
            <CloseIcon />
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex w-7 h-7 items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all flex-shrink-0"
            title={collapsed ? "Mở rộng" : "Thu gọn"}
          >
            <CollapseIcon collapsed={collapsed} />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 px-2 lg:px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                title={collapsed ? item.name : undefined}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 relative
                  ${isActive
                    ? "bg-black text-white shadow-lg shadow-black/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  ${collapsed ? "justify-center" : ""}
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
                )}
                <svg
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-700"}}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {!collapsed && (
                  <span className={`text-sm font-medium flex-1 ${isActive ? "text-white" : ""}}`}>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="px-2 lg:px-3 py-4 border-t border-gray-100 space-y-1">
          <Link
            to="/"
            title={collapsed ? "Xem cửa hàng" : undefined}
            onClick={handleNavClick}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-gray-600 hover:bg-gray-50 hover:text-gray-900
              transition-all duration-200
              ${collapsed ? "justify-center" : ""}
            }`}
          >
            <ExternalIcon />
            {!collapsed && <span className="text-sm font-medium">Xem cửa hàng</span>}
          </Link>

          <button
            title={collapsed ? "Đăng xuất" : undefined}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-gray-600 hover:bg-red-50 hover:text-red-600
              transition-all duration-200
              ${collapsed ? "justify-center" : ""}
            }`}
          >
            <LogoutIcon />
            {!collapsed && <span className="text-sm font-medium">Đăng xuất</span>}
          </button>
        </div>

        {/* Version badge */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-300 uppercase tracking-wider">
                Hussio Admin v1.0
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
