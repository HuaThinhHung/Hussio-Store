export function MysteryDiscountTab({ onClick, isTabVisible, setIsTabVisible }) {
  if (!isTabVisible) return null;

  return (
    <>
      {/* Desktop: tab dọc cạnh trái */}
      <div className="fixed left-0 top-1/2 z-90 hidden -translate-y-1/2 md:block animate-fade-in-left">
        <div className="flex flex-col items-center gap-4 rounded-r-2xl border border-l-0 border-neutral-200 bg-white/80 py-6 pl-3 pr-2 shadow-xl backdrop-blur-md transition-all hover:pl-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsTabVisible(false);
            }}
            className="group flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
            aria-label="Ẩn tab"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <button type="button" onClick={onClick} className="group flex flex-col items-center">
            <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <span className="max-h-[140px] whitespace-nowrap font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-900 [writing-mode:vertical-rl] [text-orientation:mixed]">
              Ưu đãi bất ngờ
            </span>
          </button>
        </div>
      </div>

      {/* Mobile: chip góc trái dưới — không che nút chat bên phải */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] z-40 flex items-center gap-1 md:hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsTabVisible(false);
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-500 shadow-lg backdrop-blur-sm active:scale-95"
          aria-label="Ẩn ưu đãi"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onClick}
          className="flex min-h-10 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-900 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg active:scale-[0.98]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          Ưu đãi
        </button>
      </div>
    </>
  );
}
