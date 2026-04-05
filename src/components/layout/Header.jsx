import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useCart } from "../../context/CartContext";

const nav = [
  {
    label: "BST BST TẾT",
    description: "Áo Polo & Sơ Mi",
    href: "/product/polo-tet-red",
    hasMegaMenu: true,
  },
  {
    label: "Bán chạy",
    description: "Được nam giới tin chọn",
    href: "#bestsellers",
  },
  { label: "Combo Tết", description: "Quà tặng phái mạnh", href: "#combo" },
  {
    label: "Phụ kiện",
    description: "Ví, Thắt lưng, Giày",
    href: "/products?category=phu-kien",
  },
  {
    label: "Giảm giá Tết",
    description: "Ưu đãi giới hạn",
    href: "#sale",
    accent: true,
  },
];

function IconUser(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 12a4 4 0 100-8 4 4 0 000 8z"
      />
      <path strokeWidth="1.5" strokeLinecap="round" d="M4 20a8 8 0 0116 0" />
    </svg>
  );
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
      <path strokeWidth="1.5" strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function IconBag(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinejoin="round"
        d="M6 8h15l-1 12H7L6 8zm3-3a3 3 0 016 0"
      />
    </svg>
  );
}

function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M4 7h16M4 12h16M4 17h16"
      />
    </svg>
  );
}

function IconChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  );
}

const megaMenuContent = {
  categories: [
    "Sản phẩm mới",
    "Áo Polo Hussio",
    "Áo Sơ Mi Tết",
    "Quần Khaki Slim",
    "Phụ kiện Da Thật",
    "Giày Sneaker Luxe",
    "Tất cả sản phẩm",
  ],
  highlights: [
    "Bộ sưu tập Tết 2026",
    "Chất liệu Cotton Luxury",
    "Thiết kế Regular Fit",
    "Ưu đãi mua 2 tặng 1",
  ],
  featured: [
    {
      title: "Áo Polo",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mgswkkymh1jg58@resize_w450_nl.webp",
    },
    {
      title: "Áo Sơ Mi",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mdytyrxtenlwa8@resize_w450_nl.webp",
    },
    {
      title: "Quần Ngắn",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3bmdx7ud6eg4c.webp",
    },
    {
      title: "Quần Tây",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3bmptymy6kcd4.webp",
    },
  ],
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-90 border-b border-neutral-100/80 bg-white/95 backdrop-blur-md">
      {/* Top Utility Bar */}
      <div className="hidden border-b border-neutral-100/50 bg-neutral-50/30 py-1.5 text-[10px] font-medium tracking-wider text-neutral-500 lg:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-end gap-x-6 px-12">
          <a href="#" className="hover:text-neutral-900 transition-colors">
            Support
          </a>
          <span className="h-2.5 w-px bg-neutral-200"></span>
          <a href="#" className="hover:text-neutral-900 transition-colors">
            Email Sign Up
          </a>
          <span className="h-2.5 w-px bg-neutral-200"></span>
          <button className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors">
            <span className="text-base leading-none">🇻🇳</span>
            <span>Vietnam (VND ₫)</span>
            <IconChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="border-b border-neutral-900 bg-neutral-900 px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white sm:text-[11px]">
        <span className="opacity-95">Mới về: BST áo đỏ Tết — </span>
        <a
          href="#bestsellers"
          className="underline decoration-white/40 underline-offset-4 transition hover:opacity-80"
        >
          Xem ngay
        </a>
        <span className="mx-3 hidden opacity-40 sm:inline">|</span>
        <span className="hidden opacity-90 sm:inline">
          Miễn phí giao hàng đơn từ 2.000.000₫
        </span>
      </div>

      {/* Main Header */}
      <div
        className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-12"
        onMouseLeave={() => setActiveMegaMenu(false)}
      >
        {/* Left: Navigation */}
        <div className="flex min-w-0 flex-1 items-center justify-start lg:w-[38%]">
          <button
            type="button"
            className="-ml-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-neutral-900 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          >
            <IconMenu className="h-6 w-6" />
          </button>
          <nav className="hidden items-center gap-x-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex flex-col transition-all duration-300"
                onMouseEnter={() =>
                  item.hasMegaMenu
                    ? setActiveMegaMenu(true)
                    : setActiveMegaMenu(false)
                }
              >
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.22em] ${item.accent ? "text-red-700" : "text-neutral-900"} transition-opacity group-hover:opacity-70`}
                >
                  {item.label}
                </span>
                <span className="mt-0.5 text-[9px] font-medium lowercase tracking-wider text-neutral-400 opacity-60">
                  {item.description}
                </span>
                <span
                  className={`mt-1.5 h-[1.5px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full ${item.hasMegaMenu && activeMegaMenu ? "w-full" : ""}`}
                ></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <Link
          to="/"
          className="shrink-0 font-serif text-2xl font-bold tracking-[0.4em] text-neutral-900 sm:text-[1.8rem]"
        >
          HUSSIO
        </Link>

        {/* Right: Icons */}
        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-3 lg:w-[38%]">
          <button
            type="button"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-50 lg:inline-flex"
            aria-label="Tài khoản"
          >
            <IconUser className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-50"
            aria-label="Tìm kiếm"
          >
            <IconSearch className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-50"
            aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}
          >
            <IconBag className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-neutral-900 px-1 text-[9px] font-bold text-white">
              {cartCount}
            </span>
          </Link>
        </div>

        {/* Mega Menu Overlay */}
        {activeMegaMenu && (
          <div
            className="absolute left-0 top-full w-full border-b border-neutral-100 bg-white/98 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300"
            onMouseEnter={() => setActiveMegaMenu(true)}
          >
            <div className="mx-auto flex max-w-[1600px] gap-16 px-12 py-16">
              <div className="w-1/5">
                <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                  By Category
                </h3>
                <ul className="flex flex-col gap-4">
                  {megaMenuContent.categories.map((cat) => (
                    <li key={cat}>
                      <a
                        href="#"
                        className="font-sans text-[13px] font-medium text-neutral-600 transition hover:text-neutral-900 hover:translate-x-1 inline-block duration-200 uppercase tracking-wider"
                      >
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/5">
                <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                  Highlights
                </h3>
                <ul className="flex flex-col gap-4">
                  {megaMenuContent.highlights.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-sans text-[13px] font-medium text-neutral-600 transition hover:text-neutral-900 hover:translate-x-1 inline-block duration-200 uppercase tracking-wider"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 gap-6">
                {megaMenuContent.featured.map((item) => (
                  <div
                    key={item.title}
                    className="group/item relative flex-1 cursor-pointer overflow-hidden rounded-sm"
                  >
                    <div className="aspect-4/5 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover/item:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-neutral-900/10 opacity-0 transition duration-300 group-hover/item:opacity-100" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-[14px] font-bold tracking-widest text-white uppercase drop-shadow-md">
                        {item.title}
                      </p>
                      <div className="mt-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover/item:w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[75] bg-neutral-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />,
          document.body,
        )}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
          className="relative z-[80] max-h-[min(75dvh,calc(100dvh-9rem))] overflow-y-auto overscroll-contain border-t border-neutral-100 bg-white px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] shadow-lg lg:hidden"
        >
          <nav className="flex flex-col gap-5">
            {nav.map((item) => (
              <div
                key={item.label}
                className="flex flex-col border-b border-neutral-100 pb-5 last:border-0"
              >
                <a
                  href={item.href}
                  className={`block min-h-11 py-2 font-sans text-base font-bold uppercase tracking-widest ${item.accent ? "text-red-700" : "text-neutral-900"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
                <span className="mt-0.5 text-xs text-neutral-400">
                  {item.description}
                </span>
              </div>
            ))}
            <div className="flex flex-col gap-4 pt-2">
              <Button variant="inverse" className="min-h-12 w-full">
                Đăng nhập
              </Button>
              <div className="flex items-center justify-between px-1 text-xs text-neutral-500">
                <a href="#" className="min-h-10 py-2">
                  Support
                </a>
                <span className="text-neutral-400">Vietnam (VND)</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
