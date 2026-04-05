import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips Phối Đồ Cho Chàng Công Sở Thêm Phong Cách",
    excerpt: "Bạn đã bao giờ cảm thấy mỗi ngày đi làm đều mặc cùng một bộ quần áo? Hãy cùng HUSSIO khám phá những tips phối đồ giúp anh chàng công sở trở nên nổi bật hơn mà không cần quá nhiều effort.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    category: "Phong cách",
    date: "15/03/2026",
    author: "HUSSIO Stylist",
  },
  {
    id: 2,
    title: "Chọn Áo Polo Nam: Chất Liệu Nào Phù Hợp Nhất?",
    excerpt: "Cotton Pima, Cotton Singapore, hay Dry-Fit? Mỗi loại vải mang đến trải nghiệm khác nhau. Cùng tìm hiểu để chọn được chiếc áo Polo hoàn hảo cho mùa hè này.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=500&fit=crop",
    category: "Hướng dẫn",
    date: "10/03/2026",
    author: "HUSSIO Team",
  },
  {
    id: 3,
    title: "BST Tết 2026: Xu Hướng Thời Trang Nam Mùa Xuân",
    excerpt: "Tết năm nay hãy để HUSSIO đồng hành cùng bạn với bộ sưu tập mang đậm hơi thở mùa xuân - tươi mới, thanh lịch và đầy ý nghĩa.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=500&fit=crop",
    category: "Bộ sưu tập",
    date: "05/03/2026",
    author: "HUSSIO Design",
  },
  {
    id: 4,
    title: "Quần Tây Slim Fit vs Regular Fit: Chọn Sao Cho Đúng?",
    excerpt: "Đừng để chiếc quần không vừa vặn phá hủy toàn bộ outfit của bạn. HUSSIO sẽ giúp bạn chọn đúng kiểu dáng phù hợp với dáng người.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&h=500&fit=crop",
    category: "Hướng dẫn",
    date: "01/03/2026",
    author: "HUSSIO Stylist",
  },
  {
    id: 5,
    title: "Cách Phối Vest Nam: Từ Công Sở Đến Party",
    excerpt: "Một bộ vest có thể biến hóa từ phong cách công sở nghiêm túc đến party sành điệu. Hãy cùng HUSSIO học cách phối đồ đa zi năng.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=500&fit=crop",
    category: "Phong cách",
    date: "25/02/2026",
    author: "HUSSIO Team",
  },
  {
    id: 6,
    title: "Chăm Sóc Áo Thun Nam Đúng Cách Để Bền Đẹp",
    excerpt: "Những sai lầm phổ biến khi giặt và bảo quản áo thun khiến áo nhanh hỏng. HUSSIO mách bạn mẹo giữ cho áo thun luôn như mới.",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=500&fit=crop",
    category: "Mẹo hay",
    date: "20/02/2026",
    author: "HUSSIO Care",
  },
];

const categories = ["Tất cả", "Phong cách", "Hướng dẫn", "Bộ sưu tập", "Mẹo hay"];

export default function Blog() {
  return (
    <div className="bg-neutral-50">
      {/* Hero Banner */}
      <div className="bg-neutral-900 py-20">
        <div className="mx-auto max-w-[1600px] px-5 text-center sm:px-8 lg:px-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Blog Hussio</h1>
          <p className="mt-4 text-neutral-400">
            Cập nhật xu hướng thời trang, tips phối đồ và tin tức mới nhất từ HUSSIO
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        {/* Filter Categories */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                cat === "Tất cả"
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <Link
          to={`/blog/${blogPosts[0].id}`}
          className="group mb-12 block overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video overflow-hidden md:aspect-auto">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="inline-block w-fit rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold text-white">
                {blogPosts[0].category}
              </span>
              <h2 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
                {blogPosts[0].title}
              </h2>
              <p className="mt-4 line-clamp-3 text-neutral-600">
                {blogPosts[0].excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
                <span>{blogPosts[0].author}</span>
                <span>•</span>
                <span>{blogPosts[0].date}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
                Đọc tiếp
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-neutral-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white">
            1
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-600 hover:bg-neutral-100">
            2
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-600 hover:bg-neutral-100">
            3
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-600 hover:bg-neutral-100">
            ...
          </button>
        </div>
      </div>
    </div>
  );
}
