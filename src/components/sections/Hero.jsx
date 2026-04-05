import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const slides = [
  {
    id: 1,
    image: "/images/hero/tet-1.jpg",
    headline: "Khởi đầu năm mới rực rỡ",
    subline: "BST Tết 2026 — Giảm đến 40% cho hơn 200 sản phẩm.",
    cta: "Mua ngay BST Tết",
    href: "/products",
  },
  {
    id: 2,
    image: "/images/hero/tet-2.png",
    headline: "Sắc đỏ — Biểu tượng may mắn",
    subline: "Áo Polo đỏ lễ hội, chất liệu cao cấp vượt thời gian.",
    cta: "Xem BST Tết",
    href: "/products",
  },
  {
    id: 3,
    image: "/images/hero/sale.jpg",
    headline: "Giảm giá mùa — Lên đến 50%",
    subline: "Ưu đãi hấp dẫn cho các sản phẩm bestseller của HUSSIO.",
    cta: "Xem ngay ưu đãi",
    href: "/products",
  },
  {
    id: 4,
    image: "/images/hero/noel.jpg",
    headline: "Giáng Sinh ấm áp — Quà tặng ý nghĩa",
    subline: "BST Noel đặc biệt, thiết kế sang trọng dành tặng người thương.",
    cta: "Khám phá BST Noel",
    href: "/products",
  },
  {
    id: 5,
    image: "/images/hero/1.jpg",
    headline: "Minimal Luxe — Phong cách tối giản",
    subline: "Đường nét tinh tế, form dáng chuẩn mực cho quý ông hiện đại.",
    cta: "Khám phá Minimal",
    href: "/products",
  },
  {
    id: 6,
    image: "/images/hero/2.jpg",
    headline: "Premium Cotton — Chất liệu dẫn đầu",
    subline: "Thoáng mát, bền bỉ và êm ái. Trải nghiệm sự khác biệt.",
    cta: "Xem BST Cotton",
    href: "/products",
  },
  {
    id: 7,
    image: "/images/hero/tet-2027.png",
    headline: "BST Tết 2027 — Hạnh phúc trọn vẹn",
    subline: "Phiên bản giới hạn, thiết kế độc đáo chào đón năm mới.",
    cta: "Mua ngay",
    href: "/products",
  },
];

export function Hero() {
  const [activeId, setActiveId] = useState(1);
  const slide = slides.find((s) => s.id === activeId) || slides[0];
  const total = slides.length;
  const activeIndex = slides.findIndex((s) => s.id === activeId);

  const goPrev = useCallback(() => {
    const idx = slides.findIndex((s) => s.id === activeId);
    const prevIdx = (idx - 1 + total) % total;
    setActiveId(slides[prevIdx].id);
  }, [activeId, total]);

  const goNext = useCallback(() => {
    const idx = slides.findIndex((s) => s.id === activeId);
    const nextIdx = (idx + 1) % total;
    setActiveId(slides[nextIdx].id);
  }, [activeId, total]);

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ height: "clamp(420px, 88vh, 900px)" }}
    >
      {/* Ảnh nền */}
      <div className="absolute inset-0">
        {slides.map((s) =>
          s.id === activeId ? (
            <img
              key={s.id}
              src={s.image}
              alt={s.headline}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            />
          ) : null,
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/10" />
      </div>

      {/* Nút lướt hai bên — mờ, hover rõ hơn */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Slide trước"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/50 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/40 hover:text-white/90 active:scale-95 sm:left-5 sm:h-11 sm:w-11 opacity-50 hover:opacity-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Slide sau"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/50 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-black/40 hover:text-white/90 active:scale-95 sm:right-5 sm:h-11 sm:w-11 opacity-50 hover:opacity-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Chấm pagination — pill tối, giữa dưới */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-4 py-2.5 backdrop-blur-md sm:bottom-8 sm:gap-2.5 sm:px-5 sm:py-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={
              "rounded-full transition-all duration-300 " +
              (activeIndex === i
                ? "h-1.5 w-6 bg-white shadow-sm"
                : "h-1.5 w-1.5 bg-white/35 hover:bg-white/55")
            }
            aria-label={"Slide " + (i + 1)}
          />
        ))}
      </div>

      {/* Nội dung chữ — dưới trái */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 pb-20 sm:p-8 sm:pb-24 md:p-12 md:pb-28 lg:p-16 lg:pb-32 pointer-events-none">
        <div className="pointer-events-auto max-w-2xl">
          <h1 className="font-sans text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {slide.headline}
          </h1>
          <p className="mt-3 max-w-lg font-sans text-sm text-white/90 sm:text-base md:text-lg">
            {slide.subline}
          </p>
          <div className="mt-6">
            {slide.href ? (
              <Button
                as={Link}
                to={slide.href}
                variant="primary"
                className="px-6 py-3 text-[11px] sm:px-8 sm:py-3.5 sm:text-xs shadow-xl"
              >
                {slide.cta}
              </Button>
            ) : (
              <Button
                variant="primary"
                className="px-6 py-3 text-[11px] sm:px-8 sm:py-3.5 sm:text-xs shadow-xl"
              >
                {slide.cta}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
