import { useState } from "react";
import { ScratchCard } from "../ui/ScratchCard";
import bgImage from "../../assets/images/mystery_offer_bg.png";

export function MysteryDiscountModal({ isOpen, onClose }) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40 hover:scale-110 active:scale-95"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Image Side */}
          <div className="relative h-64 w-full md:h-auto md:w-1/2">
            <img 
              src={bgImage} 
              alt="Mystery Offer" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent md:bg-linear-to-r md:from-transparent md:to-white/10" />
          </div>

          {/* Right: Content Side */}
          <div className="flex w-full flex-col items-center justify-center bg-white p-8 text-center md:w-1/2 md:p-12">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                Hussio Exclusive
              </span>
              <h2 className="mt-2 font-serif text-4xl font-light text-neutral-900 md:text-5xl">
                Try Your Luck
              </h2>
              <p className="mt-4 text-neutral-500">
                Scratch the card below to reveal your secret mystery discount.
              </p>
            </div>

            <div className="my-8">
              <ScratchCard 
                width={300} 
                height={160} 
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

            <div className={`transition-all duration-700 ${isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <button
                onClick={onClose}
                className="w-full rounded-full bg-neutral-900 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 hover:shadow-lg active:scale-95"
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
