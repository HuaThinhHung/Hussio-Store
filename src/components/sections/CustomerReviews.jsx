import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    name: "Minh Đức",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    title: "Chất lượng vượt mong đợi",
    text: "Đã mua bộ polo Tết cho cả nhà, ai cũng khen đẹp. Chất vải mềm mại, form dáng chuẩn, giao hàng nhanh. Sẽ ủng hộ HUSSIO dài dài.",
    product: "Áo Polo Tết Hussio - Đỏ Lễ Hội",
    avatar: "MD",
    date: "2 tuần trước",
  },
  {
    id: 2,
    name: "Hoàng Nam",
    location: "Hà Nội",
    rating: 5,
    title: "Đáng đồng tiền bát gạo",
    text: "Lần đầu mua online trang phục nam mà rất hài lòng. Áo sơ mi hơi rộng nhưng mặc rất thoải mái, có thể mặc đi làm hoặc đi chơi đều được. Đóng gói cực kỳ chỉnh chu.",
    product: "Áo Sơ Mi HUSSIO Premium",
    avatar: "HN",
    date: "1 tháng trước",
  },
  {
    id: 3,
    name: "Quang Minh",
    location: "Đà Nẵng",
    rating: 5,
    title: "Sẽ mua lại lần nữa",
    text: "Combo Tết mua tặng cha và em trai. Mọi người đều rất thích, đặc biệt là dây thắt lưng da thật. HUSSIO không làm mình thất vọng. Cảm ơn team!",
    product: "Combo Tết HUSSIO 2026",
    avatar: "QM",
    date: "3 tuần trước",
  },
  {
    id: 4,
    name: "Anh Tuấn",
    location: "Cần Thơ",
    rating: 5,
    title: "Mua làng, tặng bạn bè",
    text: "Mua nhiều lần rồi, lần nào chất lượng cũng như quảng cáo. Sneaker white luxe đi làm hay đi chơi đều oke. Đã giới thiệu cho nhiều bạn đồng nghiệp.",
    product: "Giày Sneaker White Luxe",
    avatar: "AT",
    date: "1 tuần trước",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} sao`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i <= count ? "fill-yellow-400" : "fill-neutral-200"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function CustomerReviews() {
  return (
    <section id="customer-reviews" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
            Đánh giá khách hàng
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light text-neutral-900 sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Hơn 5.000+ khách hàng tin chọn
          </h2>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group flex flex-col rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6 transition-all hover:border-neutral-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <StarRating count={review.rating} />
                <span className="text-[10px] text-neutral-400">{review.date}</span>
              </div>
              <h4 className="mt-4 font-sans text-sm font-bold text-neutral-900">
                {review.title}
              </h4>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-neutral-600">
                "{review.text}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold uppercase text-white">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-neutral-900">{review.name}</p>
                  <p className="mt-0.5 font-sans text-[10px] text-neutral-400">{review.location}</p>
                </div>
              </div>
              <span className="mt-3 font-sans text-[10px] text-neutral-400">
                Đã mua: {review.product}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile / tablet: horizontal scroll */}
        <div
          className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 sm:mx-0 sm:px-0 lg:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[min(88vw,320px)] shrink-0 snap-start rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5 shadow-sm"
            >
              <StarRating count={review.rating} />
              <h4 className="mt-3 font-sans text-xs font-bold text-neutral-900">{review.title}</h4>
              <p className="mt-2 line-clamp-3 font-sans text-xs leading-relaxed text-neutral-600">
                "{review.text}"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold uppercase text-white">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-sans text-[10px] font-bold text-neutral-900">{review.name}</p>
                  <p className="mt-0.5 font-sans text-[9px] text-neutral-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            to="/products"
            className="rounded-full border border-neutral-200 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900 sm:px-10 sm:py-3.5"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
