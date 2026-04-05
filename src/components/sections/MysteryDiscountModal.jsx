import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { ScratchCard } from "../ui/ScratchCard";
import bgImage from "../../assets/images/mystery_offer_bg.png";

function useScratchCardSize() {
  const [size, setSize] = useState({ width: 300, height: 160 });

  const update = useCallback(() => {
    const pad = 56;
    const maxW = Math.min(300, Math.max(220, window.innerWidth - pad));
    const height = Math.round(maxW * (160 / 300));
    setSize({ width: maxW, height });
  }, []);

  useLayoutEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return size;
}

export function MysteryDiscountModal({ isOpen, onClose }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const scratchSize = useScratchCardSize();

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-[max(0.75rem,env(safe-area-inset-top,0px))] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))]"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal Content */}
      <div
        className="relative max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl animate-fade-in-up sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mystery-offer-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-[max(1rem,env(safe-area-inset-left,0px))] top-[max(1rem,env(safe-area-inset-top,0px))] z-20 flex h-11 w-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40 hover:scale-110 active:scale-95"
          aria-label="Đóng"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Image Side */}
          <div className="relative aspect-5/3 w-full shrink-0 md:aspect-auto md:h-auto md:min-h-[280px] md:w-1/2">
            <img
              src={bgImage}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent md:bg-linear-to-r md:from-transparent md:to-white/10" />
          </div>

          {/* Right: Content Side */}
          <div className="flex w-full flex-col items-center justify-center bg-white px-5 py-8 text-center sm:px-8 md:w-1/2 md:p-12">
            <div className="mb-4 sm:mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                Hussio
              </span>
              <h2
                id="mystery-offer-title"
                className="mt-2 font-serif text-3xl font-light text-neutral-900 sm:text-4xl md:text-5xl"
              >
                Giảm Giá Sốc Mua Ngay
              </h2>
              <p className="mt-3 text-sm text-neutral-500 sm:mt-4 sm:text-base">
                Bạn đã sẵn sàng để khám phá ưu đãi bất ngờ?
              </p>
            </div>

            <div className="my-6 w-full max-w-full sm:my-8">
              <ScratchCard
                width={scratchSize.width}
                height={scratchSize.height}
                brushSize={scratchSize.width < 260 ? 20 : 25}
                onComplete={() => setIsRevealed(true)}
                overlayText="SCRATCH HERE"
                overlayColor="#E5E7EB"
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm text-neutral-400">Your Code</span>
                  <span className="mt-1 font-serif text-3xl font-bold tracking-widest text-neutral-900 group">
                    HUSSIO25
                  </span>
                  <span className="mt-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase text-emerald-600">
                    25% OFF APPLIED
                  </span>
                </div>
              </ScratchCard>
            </div>

            <div
              className={`transition-all duration-700 ${isRevealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <button
                type="button"
                onClick={onClose}
                className="min-h-12 w-full touch-manipulation rounded-full bg-neutral-900 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 hover:shadow-lg active:scale-95 sm:py-4"
              >
                Claim Offer
              </button>
            </div>

            {!isRevealed && (
              <div className="mt-4 animate-pulse text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                Waiting for reveal...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
