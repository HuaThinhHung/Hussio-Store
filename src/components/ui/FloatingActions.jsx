import { useState, useEffect } from "react";

const SOCIALS = [
  {
    name: "Zalo",
    href: "https://zalo.me/g/your_zalo_id",
    label: "Zalo",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/hussio.store",
    label: "Facebook",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@hussio.store",
    label: "TikTok",
    color: "bg-black hover:bg-neutral-800",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z" />
      </svg>
    ),
  },
];

const CSKH_CONTACTS = [
  {
    label: "Chat Zalo",
    href: "https://zalo.me/g/your_zalo_id",
    bg: "bg-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
  },
  {
    label: "Chat Facebook",
    href: "https://m.me/hussio.store",
    bg: "bg-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Gọi điện",
    href: "tel:0909123456",
    bg: "bg-green-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

// ===== SEPARATE COMPONENTS =====

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Lên đầu trang"
      style={{ opacity: visible ? 1 : 0 }}
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 shadow-lg transition-all duration-300 hover:border-neutral-500 hover:text-neutral-900 active:scale-90 disabled:pointer-events-none`}
      disabled={!visible}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

function ChatCSKH() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-end gap-2">
      {open && (
        <div className="max-h-[min(50dvh,320px)] w-[min(100vw-2rem,288px)] overflow-y-auto overscroll-contain rounded-2xl border border-neutral-200 bg-white shadow-2xl">
          <div className="bg-neutral-900 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-sm font-semibold text-white">Hỗ trợ khách hàng</p>
            <p className="mt-0.5 text-xs text-white/60">Chúng tôi luôn sẵn sàng giúp bạn</p>
          </div>
          <div className="flex flex-col p-2">
            {CSKH_CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("tel") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100 active:scale-95"
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${c.bg}`}>
                  {c.icon}
                </span>
                {c.label}
              </a>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng hỗ trợ" : "Mở hỗ trợ khách hàng"}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 active:scale-90 ${
          open ? "bg-neutral-800" : "bg-red-600 hover:bg-red-700 hover:scale-110"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ===== MAIN EXPORT =====

export function FloatingActions() {
  return (
    <>
      {/* Social sidebar */}
      <div className="fixed right-[max(0.25rem,env(safe-area-inset-right,0px))] top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 px-2 py-4 sm:flex">
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`flex h-10 w-10 items-center justify-center rounded-l-lg text-white shadow-md transition-transform duration-200 hover:scale-110 ${s.color}`}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Back to top + Chat — stacked on right side */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-40 flex flex-col items-end gap-3">
        <BackToTop />
        <ChatCSKH />
      </div>
    </>
  );
}