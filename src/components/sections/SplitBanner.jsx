import { Link } from "react-router-dom";

export function SplitBanner() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Banner trái - BST Tết */}
          <div className="group relative flex aspect-4/5 min-h-[380px] flex-col overflow-hidden rounded-2xl bg-neutral-900 sm:min-h-[420px] lg:min-h-0 lg:aspect-4/5">
            <img
              src="/images/mega-menu/tet.png"
              alt="BST Tết 2026"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative z-10 flex h-full flex-col items-center justify-end p-8 text-center sm:p-12 lg:items-start lg:justify-end lg:text-left lg:pl-14">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                Bộ sưu tập mới
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                BST Tết 2026
              </h3>
              <p className="mt-3 max-w-xs text-sm text-white/75 lg:max-w-sm">
                Sắc đỏ may mắn — thiết kế đặc biệt dành cho năm mới rực rỡ.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/products"
                  className="rounded-full bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-all hover:bg-neutral-100 active:scale-95"
                >
                  Mua ngay
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:gap-4"
                >
                  <span>Khám phá</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Banner phải - Combo Tết */}
          <div className="group relative flex aspect-4/5 min-h-[380px] flex-col overflow-hidden rounded-2xl bg-neutral-900 sm:min-h-[420px] lg:min-h-0 lg:aspect-4/5">
            <img
              src="/images/mega-menu/tet-1.png"
              alt="Combo Tết"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="relative z-10 flex h-full flex-col items-center justify-end p-8 text-center sm:p-12 lg:items-start lg:justify-end lg:text-left lg:pl-14">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                Ưu đãi đặc biệt
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                Combo Tết 2026
              </h3>
              <p className="mt-3 max-w-xs text-sm text-white/75 lg:max-w-sm">
                Tiết kiệm đến 40% khi mua bộ complete — polo, quần và phụ kiện.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/products"
                  className="rounded-full bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-all hover:bg-neutral-100 active:scale-95"
                >
                  Xem ngay
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:gap-4"
                >
                  <span>Khám phá</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
