export function ProductStats() {
  const stats = [
    {
      value: "95%",
      label: "Khách hàng hài lòng",
      detail: "Phản hồi tích cực về chất lượng vải và form dáng sau 1 năm sử dụng.",
    },
    {
      value: "89%",
      label: "Mặc thoải mái cả ngày",
      detail: "Người dùng cảm thấy thông thoáng dù ở ngoài trời trong thời gian dài.",
    },
    {
      value: "10k+",
      label: "Sản phẩm mỗi năm",
      detail: "Số lượng áo polo được phái mạnh tin chọn cho các dịp quan trọng.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
          Minh chứng chất lượng
        </span>
        <h2 className="mt-4 font-serif text-3xl font-light text-neutral-900 md:text-5xl">
          Được tin dùng bởi hơn 10.000 khách hàng
        </h2>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center rounded-3xl bg-neutral-50 p-12 transition-all hover:bg-neutral-900 hover:shadow-xl"
            >
              <span className="mb-4 font-serif text-6xl font-bold tracking-tighter text-neutral-900 transition-colors group-hover:text-white md:text-7xl">
                {stat.value}
              </span>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-neutral-900 transition-colors group-hover:text-white">
                {stat.label}
              </h3>
              <p className="max-w-[200px] text-xs leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-300">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
