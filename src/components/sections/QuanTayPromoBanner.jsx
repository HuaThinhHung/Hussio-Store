import { useState } from "react";
import { Link } from "react-router-dom";

const BANNER_IMAGE = "/images/mega-menu/banner-quan.png";

export function QuanTayPromoBanner() {
  const [sideTabOpen, setSideTabOpen] = useState(true);

  return (
    <section className="relative w-full overflow-hidden bg-neutral-900">
      <div className="relative aspect-4/3 min-h-[300px] w-full sm:aspect-video sm:min-h-[340px] lg:aspect-[2.35/1] lg:min-h-[380px] xl:min-h-[440px]">
        <img
          src={BANNER_IMAGE}
          alt="Quần tây Hussio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/25 to-black/10" />

        {sideTabOpen && (
          <div className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center border-y border-r border-white/20 bg-white shadow-lg sm:flex">
            <button
              type="button"
              onClick={() => setSideTabOpen(false)}
              className="flex h-8 w-8 items-center justify-center text-sm font-light text-neutral-900 transition hover:bg-neutral-100"
              aria-label="Đóng thẻ ưu đãi"
            >
              ×
            </button>
            <Link
              to="/products?category=quan-tay"
              className="flex max-h-[140px] items-center justify-center px-2 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-900 [writing-mode:vertical-rl] hover:bg-neutral-50 sm:max-h-[180px] sm:py-4 sm:text-[10px]"
            >
              Ưu đãi quần tây
            </Link>
          </div>
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:px-12 lg:pb-14 lg:pl-16 xl:pb-16">
            <div className="mx-auto max-w-[1600px]">
              <div className="max-w-lg">
                <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Quần tây Hussio
                </h2>
                <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white/95 sm:text-base">
                  Form slim và regular, vải co nhẹ và giữ phom cả ngày — phối
                  cùng áo polo hay sơ mi đều chỉn chu.
                </p>
                <Link
                  to="/products?category=quan-tay"
                  className="mt-8 inline-block bg-white px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-100 active:scale-[0.98] sm:px-12 sm:py-4 sm:text-xs rounded-none"
                >
                  Mua quần tây
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
