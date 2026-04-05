import { useState } from "react";

const company = [
  "Blog",
  "Về Hussio",
  "Đánh giá",
  "Tuyển dụng",
  "Đối tác đại sứ",
  "Doanh nghiệp & quà tặng",
  "Hệ thống cửa hàng",
];

const service = [
  "Theo dõi đơn hàng",
  "Câu hỏi thường gặp",
  "Điều khoản dịch vụ",
  "Chính sách giao hàng",
  "Đổi trả & hoàn tiền",
  "Chính sách bảo mật",
  "Liên hệ",
];

const shop = [
  "Mua tất cả",
  "Áo thun & polo",
  "Áo sơ mi",
  "Áo khoác",
  "Quần tây & jean",
  "Phụ kiện",
  "Combo Tết",
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10">
              <div>
                <h3 className="border-b border-neutral-200 pb-3 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-900">
                  Công ty
                </h3>
                <ul className="mt-6 space-y-3">
                  {company.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="-mx-1 inline-flex min-h-10 items-center rounded-md px-1 py-1 font-sans text-sm text-neutral-600 transition hover:text-neutral-900"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="border-b border-neutral-200 pb-3 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-900">
                  Chăm sóc khách hàng
                </h3>
                <ul className="mt-6 space-y-3">
                  {service.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="-mx-1 inline-flex min-h-10 items-center rounded-md px-1 py-1 font-sans text-sm text-neutral-600 transition hover:text-neutral-900"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="border-b border-neutral-200 pb-3 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-900">
                  Hussio
                </h3>
                <ul className="mt-6 space-y-3">
                  {shop.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="-mx-1 inline-flex min-h-10 items-center rounded-md px-1 py-1 font-sans text-sm text-neutral-600 transition hover:text-neutral-900"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm lg:col-span-4 lg:p-10">
            <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-900">
              Giữ liên lạc
            </h3>
            <p className="mt-5 font-sans text-lg font-semibold leading-snug text-neutral-900">
              Đăng ký để nhận ưu đãi mới nhất và lịch ra mắt BST.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              Bằng việc nhập email, bạn đồng ý nhận email từ Hussio. Xem{" "}
              <a href="#" className="underline underline-offset-2">
                chính sách riêng tư
              </a>
              .
            </p>
            <form
              className="mt-8 border-b border-neutral-300 pb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email-cua-ban@vd.com"
                  className="min-w-0 flex-1 border-0 bg-transparent font-sans text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-0"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md p-2 text-neutral-900 transition hover:bg-neutral-100"
                  aria-label="Gửi đăng ký"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-neutral-200/80 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-neutral-800 transition hover:border-neutral-400"
            >
              Tiếng Việt
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L2 4h8L6 8z" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-neutral-800 transition hover:border-neutral-400"
            >
              Việt Nam (VN ₫)
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L2 4h8L6 8z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-neutral-400">
            © Hussio {new Date().getFullYear()}. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
