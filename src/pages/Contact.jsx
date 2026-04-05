import { useState } from "react";

const storeLocations = [
  {
    name: "HUSSIO Quận 1",
    address: "72 Nguyễn Trãi, Quận 1, TP.HCM",
    phone: "028 3822 1234",
    hours: "09:00 - 21:00",
  },
  {
    name: "HUSSIO Quận 3",
    address: "185 Điện Biên Phủ, Quận 3, TP.HCM",
    phone: "028 3832 5678",
    hours: "09:00 - 21:00",
  },
  {
    name: "HUSSIO Hà Nội",
    address: "45 Tràng Thi, Quận Hoàn Kiếm, Hà Nội",
    phone: "024 3933 9999",
    hours: "09:00 - 21:00",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-neutral-50">
      {/* Hero Banner */}
      <div className="bg-neutral-900 py-20">
        <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8 lg:px-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Liên hệ</h1>
          <p className="mt-4 text-neutral-400">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900">Gửi tin nhắn</h2>
            <p className="mt-2 text-neutral-500">
              Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong vòng 24 giờ
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-neutral-900">Gửi thành công!</h3>
                <p className="mt-2 text-neutral-500">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      placeholder="0909 123 456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Chủ đề
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="order">Tư vấn đơn hàng</option>
                      <option value="product">Hỏi về sản phẩm</option>
                      <option value="return">Đổi/Trả hàng</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Nội dung
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    placeholder="Viết tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-neutral-900 py-4 font-semibold text-white transition hover:bg-neutral-800"
                >
                  Gửi tin nhắn
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900">Liên hệ nhanh</h2>
              <div className="mt-6 space-y-4">
                <a href="tel:18001234" className="flex items-center gap-4 rounded-lg p-4 transition hover:bg-neutral-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Hotline</p>
                    <p className="text-lg font-bold text-neutral-900">1800 1234</p>
                  </div>
                </a>
                <a href="mailto:contact@hussio.vn" className="flex items-center gap-4 rounded-lg p-4 transition hover:bg-neutral-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-bold text-neutral-900">contact@hussio.vn</p>
                  </div>
                </a>
                <a href="https://zalo.me/hussio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg p-4 transition hover:bg-neutral-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Zalo</p>
                    <p className="font-bold text-neutral-900">HUSSIO Official</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Store Locations */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900">Cửa hàng</h2>
              <div className="mt-6 space-y-4">
                {storeLocations.map((store) => (
                  <div key={store.name} className="rounded-lg border border-neutral-100 p-4">
                    <h3 className="font-bold text-neutral-900">{store.name}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{store.address}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {store.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {store.hours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-neutral-200">
          <div className="flex h-80 items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="mt-4 text-neutral-500">Bản đồ sẽ được hiển thị tại đây</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
