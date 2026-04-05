import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AdminProvider, useAdmin } from "../../context/AdminContext";

function AdminLayoutInner() {
  const { collapsed, sidebarMobileOpen } = useAdmin();

  // Desktop: offset by sidebar width; Mobile: full width (header handles spacing)
  const contentPadding = sidebarMobileOpen
    ? "pl-0 lg:pl-0"
    : collapsed
    ? "pl-[68px]"
    : "pl-0 lg:pl-64";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div
        className={`
          min-h-screen transition-all duration-300
          ${sidebarMobileOpen ? "lg:pl-0" : contentPadding}
        `}
      >
        <Header />
        <main className="px-4 sm:px-6 py-4 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminLayout() {
  return (
    <AdminProvider>
      <AdminLayoutInner />
    </AdminProvider>
  );
}

export default AdminLayout;
