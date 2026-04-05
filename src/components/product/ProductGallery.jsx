import { useState, useEffect } from "react";

export function ProductGallery({ images = [], activeSrc }) {
  const [thumbPick, setThumbPick] = useState(null);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

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
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const getImgSrc = (img) => (typeof img === "string" ? img : img.src);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100 cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={displaySrc}
          alt="Product Main"
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
        />
        {!isZoomed && (
          <div className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-md">
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {thumbList.map((image, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setThumbPick(getImgSrc(image))}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                getImgSrc(displaySrc) === getImgSrc(image)
                  ? "border-neutral-900"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={getImgSrc(image)}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
