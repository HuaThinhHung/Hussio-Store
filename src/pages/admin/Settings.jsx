import { useState } from "react";
import { useToast, ToastContainer } from "../../components/admin/Toast";

const TABS = [
  { id: "general", label: "Cài đặt chung", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  { id: "notifications", label: "Thông báo", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { id: "shipping", label: "Vận chuyển", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
  { id: "security", label: "Bảo mật", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

function TabIcon({ d }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function GeneralSettings() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "HUSSIO",
    storeEmail: "contact@hussio.vn",
    storePhone: "1900 1234",
    storeAddress: "123 Đường ABC, Quận 1, TP.HCM",
    currency: "VND",
    language: "vi",
  });
  const { showToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Cài đặt chung đã được lưu", "success");
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[
          { label: "Tên cửa hàng", key: "storeName", type: "text" },
          { label: "Email", key: "storeEmail", type: "email" },
          { label: "Số điện thoại", key: "storePhone", type: "tel" },
          { label: "Đơn vị tiền tệ", key: "currency", type: "select", options: [{ value: "VND", label: "VND - Vietnamese Dong" }, { value: "USD", label: "USD - US Dollar" }] },
        ].map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
            {f.type === "select" ? (
              <select
                value={storeSettings[f.key]}
                onChange={(e) => setStoreSettings({ ...storeSettings, [f.key]: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white text-sm"
              >
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input
                type={f.type}
                value={storeSettings[f.key]}
                onChange={(e) => setStoreSettings({ ...storeSettings, [f.key]: e.target.value })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
              />
            )}
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ cửa hàng</label>
          <textarea
            value={storeSettings.storeAddress}
            onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
            rows={2}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    marketingEmails: false,
    smsNotifications: true,
  });
  const { showToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Cài đặt thông báo đã được lưu", "success");
  };

  const items = [
    { key: "emailNotifications", label: "Email thông báo", desc: "Nhận thông báo qua email" },
    { key: "orderNotifications", label: "Thông báo đơn hàng", desc: "Thông báo khi có đơn hàng mới" },
    { key: "marketingEmails", label: "Email marketing", desc: "Nhận email về khuyến mãi" },
    { key: "smsNotifications", label: "SMS thông báo", desc: "Nhận tin nhắn SMS" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-4 sm:space-y-5">
      <div className="space-y-3">
        {items.map((item) => (
          <label key={item.key} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}

function ShippingSettings() {
  const [s, setS] = useState({
    freeShippingThreshold: 2000000,
    standardShippingFee: 30000,
    expressShippingFee: 50000,
    estimatedDeliveryDays: "3-5",
  });
  const { showToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Cài đặt vận chuyển đã được lưu", "success");
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[
          { label: "Miễn phí vận chuyển (đơn từ)", key: "freeShippingThreshold", type: "number" },
          { label: "Phí vận chuyển tiêu chuẩn", key: "standardShippingFee", type: "number" },
          { label: "Phí vận chuyển nhanh", key: "expressShippingFee", type: "number" },
          { label: "Thời gian giao hàng (ngày)", key: "estimatedDeliveryDays", type: "text", placeholder: "VD: 3-5" },
        ].map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
            <input
              type={f.type}
              value={s[f.key]}
              onChange={(e) => setS({ ...s, [f.key]: f.type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
              placeholder={f.placeholder}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}

function SecuritySettings() {
  const { showToast } = useToast();
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Password change */}
      <div className="p-4 sm:p-5 bg-gray-50 rounded-xl">
        <h4 className="font-medium text-gray-900 mb-4 text-sm sm:text-base">Đổi mật khẩu</h4>
        <div className="space-y-3 sm:space-y-4">
          {["Mật khẩu hiện tại", "Mật khẩu mới", "Xác nhận mật khẩu mới"].map((label, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input
                type="password"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          ))}
          <button
            onClick={() => showToast("Mật khẩu đã được cập nhật", "success")}
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </div>

      {/* 2FA */}
      <div className="p-4 sm:p-5 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">Xác thực 2 yếu tố (2FA)</h4>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Bảo vệ tài khoản với xác thực 2 bước</p>
          </div>
          <button
            onClick={() => showToast("2FA đã được bật", "success")}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Bật
          </button>
        </div>
      </div>

      {/* Login history */}
      <div className="p-4 sm:p-5 bg-gray-50 rounded-xl">
        <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Lịch sử đăng nhập</h4>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">Các lần đăng nhập gần đây</p>
        <div className="space-y-2 text-xs sm:text-sm text-gray-600">
          {[
            { device: "Chrome trên Windows", time: "Hôm nay, 10:30" },
            { device: "Safari trên iPhone", time: "Hôm qua, 15:45" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>{item.device}</span>
              <span className="text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-4 sm:space-y-6">
      <ToastContainer />

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-black">Cài đặt</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Quản lý cài đặt cửa hàng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* ── Mobile: horizontal scrollable tabs ── */}
        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                  ${activeTab === tab.id
                    ? "bg-black text-white"
                    : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50"
                  }
                }`}
              >
                <TabIcon d={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop: vertical sidebar tabs ── */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sticky top-24">
            <nav className="space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${activeTab === tab.id
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  }`}
                >
                  <TabIcon d={tab.icon} />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-5 sm:mb-6">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h3>

            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "shipping" && <ShippingSettings />}
            {activeTab === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}
