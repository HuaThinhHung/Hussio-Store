const ITEMS = [
  {
    title: "Giao hàng nhanh",
    sub: "Toàn quốc 2–5 ngày",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-neutral-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Đổi trả trong 30 ngày",
    sub: "Theo chính sách Hussio",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-neutral-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: "Thanh toán an toàn",
    sub: "COD & chuyển khoản",
    icon: (
      <svg className="h-5 w-5 shrink-0 text-neutral-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export function HomeTrustBar() {
  return (
    <div className="border-b border-neutral-100 bg-neutral-50/90 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-3 sm:gap-6 sm:px-6 sm:py-5 lg:px-12">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-xl border border-transparent px-1 sm:border-neutral-100/80 sm:bg-white/60 sm:px-4 sm:py-3 sm:shadow-sm"
          >
            {item.icon}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 sm:text-sm">{item.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-neutral-500 sm:text-xs">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
