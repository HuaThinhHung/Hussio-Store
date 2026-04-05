import { createContext, useContext, useState, useCallback } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Đơn hàng mới",
      message: "Có đơn hàng mới từ Nguyễn Văn A",
      time: "2 phút trước",
      read: false,
    },
    {
      id: 2,
      type: "product",
      title: "Sản phẩm sắp hết",
      message: "Polo Hussio Premium chỉ còn 3 sản phẩm",
      time: "1 giờ trước",
      read: false,
    },
    {
      id: 3,
      type: "system",
      title: "Cập nhật hệ thống",
      message: "Hệ thống đã được cập nhật lên phiên bản 1.0.1",
      time: "1 ngày trước",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  return (
    <AdminContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        sidebarMobileOpen,
        setSidebarMobileOpen,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be inside AdminProvider");
  return ctx;
}
