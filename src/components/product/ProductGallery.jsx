import { useState, useEffect } from "react";

function useFinePointerHover() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const fn = () => setOk(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return ok;
}

export function ProductGallery({ images = [], activeSrc }) {
  const [thumbPick, setThumbPick] = useState(null);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomOk = useFinePointerHover();

  useEffect(() => {
    setThumbPick(null);
  }, [activeSrc]);

  const displaySrc =
    thumbPick || activeSrc || images[0] || "";

  const thumbList = images.length > 1 ? images : [];
  const hasMultiple = thumbList.length > 0;

  if (!displaySrc) {
    return <div className="aspect-4/5 w-full animate-pulse rounded-2xl bg-neutral-100" />;
  }

  const handleMouseMove = (e) => {
    if (!zoomOk) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const getImgSrc = (img) => (typeof img === "string" ? img : img.src);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100 ${
          zoomOk ? "cursor-zoom-in" : "cursor-default"
        }`}
        onMouseEnter={() => zoomOk && setIsZoomed(true)}
        onMouseLeave={() => zoomOk && setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={displaySrc}
          alt="Sản phẩm"
          className={`h-full w-full object-cover transition-transform duration-300 ${
            zoomOk && isZoomed ? "scale-150" : "scale-100"
          }`}
          style={
            zoomOk && isZoomed
              ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
              : undefined
          }
          draggable={false}
        />
        {zoomOk && !isZoomed && (
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div
          className="scrollbar-hide flex gap-3 overflow-x-auto pb-1"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {thumbList.map((image, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setThumbPick(getImgSrc(image))}
              className={`relative h-18 w-18 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20 ${
                getImgSrc(displaySrc) === getImgSrc(image)
                  ? "border-neutral-900"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Xem ảnh ${idx + 1}`}
            >
              <img
                src={getImgSrc(image)}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
