import { useEffect, useRef, useState } from "react";

export function ScratchCard({
  width = 300,
  height = 150,
  brushSize = 25,
  finishPercent = 50,
  onComplete,
  children,
  overlayColor = "#D1D5DB", // tailwind neutral-300
  overlayText = "SCRATCH HERE",
}) {
  const canvasRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preventScrollWhileScratching = (e) => {
      if (!isFinished) e.preventDefault();
    };
    canvas.addEventListener("touchmove", preventScrollWhileScratching, { passive: false });
    return () => canvas.removeEventListener("touchmove", preventScrollWhileScratching);
  }, [isFinished]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas with overlay
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, width, height);

    // Initial text
    ctx.fillStyle = "#9CA3AF"; // text-neutral-400
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(overlayText, width / 2, height / 2);

    // Brush settings
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = brushSize;
  }, [width, height, overlayColor, overlayText, brushSize]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isFinished) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    if (isFinished) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentCount++;
      }
    }

    const percent = (transparentCount / (width * height)) * 100;
    if (percent >= finishPercent) {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isScratching) return;
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-inner"
      style={{ width, height }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 px-4 text-center">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`absolute inset-0 z-10 cursor-pointer transition-opacity duration-500 ${
          isFinished ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
    </div>
  );
}
