import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-neutral-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mx-auto max-w-xl text-center">
          {!submitted ? (
            <>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                Ưu đãi độc quyền
              </span>
              <h2 className="mt-5 font-serif text-3xl font-light text-white md:text-4xl lg:text-5xl">
                Đăng ký nhận tin trước
              </h2>
              <p className="mt-5 font-sans text-sm leading-relaxed text-neutral-400">
                Đăng ký email để nhận ưu đãi BST mới, lịch ra mắt sản phẩm và
                mã giảm giá đặc biệt dành riêng cho thành viên HUSSIO.
              </p>
              <form
                className="mt-10 flex flex-col gap-3 sm:flex-row"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email-cua-ban@vd.com"
                  required
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 font-sans text-sm text-white placeholder:text-neutral-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-white px-8 py-3.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-all hover:bg-neutral-200 active:scale-95"
                >
                  Đăng ký
                </button>
              </form>
              <p className="mt-4 font-sans text-xs text-neutral-500">
                Bằng việc đăng ký, bạn đồng ý nhận email từ HUSSIO.{" "}
                <a href="#" className="underline underline-offset-2 hover:text-white">
                  Chính sách riêng tư
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5">
                  <svg className="h-8 w-8 fill-white" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
              <h2 className="mt-6 font-serif text-3xl font-light text-white md:text-4xl">
                Cảm ơn bạn đã đăng ký!
              </h2>
              <p className="mt-4 font-sans text-sm text-neutral-400">
                Ưu đãi độc quyền sẽ được gửi thẳng đến email của bạn.
              </p>
            </>
          )}
        </div>

        {/* Trust badges */}
        {!submitted && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-12">
            {[
              {
                icon: (
                  <svg className="h-6 w-6 fill-neutral-400" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                ),
                label: "Bảo mật",
                sub: "Dữ liệu an toàn",
              },
              {
                icon: (
                  <svg className="h-6 w-6 fill-neutral-400" viewBox="0 0 24 24">
                    <path d="M20 8h-3V6c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10h20V10c0-1.1-.9-2-2-2zM9 6h6v2H9V6zm8 12H7v-8h10v8z" />
                  </svg>
                ),
                label: "Miễn phí vận chuyển",
                sub: "Đơn từ 2 triệu",
              },
              {
                icon: (
                  <svg className="h-6 w-6 fill-neutral-400" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ),
                label: "Đổi trả dễ dàng",
                sub: "Trong 30 ngày",
              },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                {badge.icon}
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white">
                  {badge.label}
                </span>
                <span className="font-sans text-[10px] text-neutral-500">{badge.sub}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
