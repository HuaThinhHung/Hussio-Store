export function ProductBenefits() {
  const benefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
      ),
      title: "Thoáng khí",
      description: "Cấu trúc vải Pique giúp lưu thông không khí, giữ cho bạn luôn mát mẻ suốt cả ngày dài.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      ),
      title: "Co giãn tốt",
      description: "Sợi Spandex cao cấp mang lại độ đàn hồi 4 chiều tuyệt vời, mang lại sự linh hoạt tối đa.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-900"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      ),
      title: "Không nhăn",
      description: "Công nghệ xử lý bề mặt vải độc quyền giúp hạn chế nhăn tối đa, tiết kiệm thời gian chuẩn bị.",
    },
  ];

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-widest text-neutral-900">
                {benefit.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
