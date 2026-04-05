import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Miễn phí vận chuyển",
    description: "Cho đơn hàng từ 2.000.000₫",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Đổi trả 30 ngày",
    description: "Không phí phát sinh",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Thanh toán an toàn",
    description: "100% bảo mật thông tin",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Hỗ trợ 24/7",
    description: "Luôn sẵn sàng giúp đỡ",
  },
];

export function ServiceBanner() {
  return (
    <section className="border-y border-neutral-100 bg-white py-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-5 sm:grid-cols-4 sm:px-8 lg:px-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-neutral-100 p-4 text-neutral-700">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-neutral-900">{feature.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
