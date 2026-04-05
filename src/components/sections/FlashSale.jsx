import { Link } from "react-router-dom";
import CountdownTimer from "../ui/CountdownTimer";

const flashSaleProducts = [
  {
    id: "fs-001",
    name: "Áo Polo Premium Cotton",
    originalPrice: 890000,
    salePrice: 499000,
    discount: 44,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mgswkkymh1jg58@resize_w450_nl.webp",
    sold: 127,
  },
  {
    id: "fs-002",
    name: "Áo Sơ Mi Slim Fit",
    originalPrice: 1200000,
    salePrice: 699000,
    discount: 42,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mdytyrxtenlwa8@resize_w450_nl.webp",
    sold: 89,
  },
  {
    id: "fs-003",
    name: "Quần Khaki Nam Classic",
    originalPrice: 1100000,
    salePrice: 599000,
    discount: 46,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3bmptymy6kcd4.webp",
    sold: 64,
  },
  {
    id: "fs-004",
    name: "Áo Thun Basic Tee",
    originalPrice: 450000,
    salePrice: 299000,
    discount: 33,
    image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3bmdx7ud6eg4c.webp",
    sold: 201,
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

export function FlashSale() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  targetDate.setHours(23, 59, 59, 0);

  return (
    <section className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 py-16">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              Flash Sale
            </div>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Giảm đến <span className="text-red-500">50%</span>
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Ưu đãi có hạn - Nhanh tay kẻo hết!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-neutral-400">Kết thúc sau:</span>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {flashSaleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative overflow-hidden rounded-xl bg-white transition-transform hover:-translate-y-1"
            >
              {/* Discount Badge */}
              <div className="absolute left-3 top-3 z-10 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
                -{product.discount}%
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-medium text-neutral-900">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-neutral-500 mb-1">
                    <span>Đã bán {product.sold}</span>
                    <span>Còn lại {500 - product.sold}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                      style={{ width: `${(product.sold / 500) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/products?sale=true"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-neutral-900"
          >
            Xem tất cả ưu đãi
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
