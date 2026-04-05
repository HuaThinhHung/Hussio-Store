import { Link } from "react-router-dom";
import { SHOP_CATEGORY_LIST } from "../../constants/shopCategories";

const IMAGES = {
  "ao-thun":
    "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3x0rxhdfo39d4.webp",
  "ao-polo":
    "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0wqzrcq3k1b52@resize_w450_nl.webp",
  "quan-ngan":
    "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m6njd9aa7s0x85.webp",
  "quan-tay":
    "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3bmptzgvk581a.webp",
  "phu-kien":
    "https://down-vn.img.susercontent.com/file/vn-11134207-81ztc-mmk7cqirgnwo04.webp",
};

const categories = SHOP_CATEGORY_LIST.map((c) => ({
  ...c,
  image: IMAGES[c.slug],
}));

export function CategoryShowcase() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
            Bộ sưu tập
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light text-neutral-900 md:text-5xl lg:text-6xl">
            Khám phá danh mục
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${encodeURIComponent(cat.slug)}`}
              className="group relative flex aspect-3/4 flex-col overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-3/4 lg:aspect-3/5"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-5">
                <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-white sm:text-base">
                  {cat.label}
                </h3>
                <span className="mt-1.5 text-[10px] font-medium text-white/70 sm:text-xs">
                  Xem sản phẩm
                </span>
                <div className="mt-3 h-[2px] w-5 bg-white transition-all duration-300 group-hover:w-10" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
