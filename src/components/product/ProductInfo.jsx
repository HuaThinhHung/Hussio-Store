import { useState, useEffect } from "react";

function colorSwatchClass(color) {
  if (color === "Đỏ") return "bg-red-600";
  if (color === "Đen") return "bg-neutral-900";
  if (color === "Trắng") return "bg-white";
  if (color === "Xám") return "bg-neutral-400";
  if (color === "Xanh") return "bg-blue-600";
  if (color === "Nâu") return "bg-amber-800";
  if (color === "Xanh Navy") return "bg-blue-900";
  return "bg-neutral-400";
}

export function ProductInfo({
  product,
  onAddToCart,
  onBuyNow,
  selectedColor: controlledColor,
  onColorChange,
}) {
  const sizes = product.sizes?.length ? product.sizes : ["Mặc định"];
  const colors = product.colors?.length ? product.colors : ["Mặc định"];

  const [internalColor, setInternalColor] = useState(colors[0]);
  const isColorControlled = typeof onColorChange === "function";
  const selectedColor = isColorControlled ? controlledColor : internalColor;

  const setSelectedColor = (c) => {
    if (isColorControlled) {
      onColorChange(c);
    } else {
      setInternalColor(c);
    }
  };

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSelectedSize(sizes[0]);
    setQuantity(1);
    setJustAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (isColorControlled) return;
    setInternalColor(colors[0]);
  }, [product?.id, colors, isColorControlled]);

  const formatPrice = (p) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  const handleAddToCart = async () => {
    if (!onAddToCart) return;
    setAdding(true);
    setJustAdded(false);
    try {
      await onAddToCart(quantity, selectedSize, selectedColor);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2800);
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!onBuyNow) return;
    setAdding(true);
    try {
      await onBuyNow(quantity, selectedSize, selectedColor);
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-700">
            {product.tag || "Best Seller"}
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-amber-400"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            ))}
            <span className="text-xs font-medium text-neutral-500">
              (1,240 đánh giá)
            </span>
          </div>
        </div>
        <h1 className="mt-4 font-serif text-3xl font-light text-neutral-900 md:text-4xl">
          {product.name}
        </h1>
      </div>

      {/* Pricing */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-bold text-neutral-900">
          {formatPrice(product.discount)}
        </span>
        {product.price > 0 && product.discount < product.price && (
          <>
            <span className="text-xl text-neutral-400 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-bold text-red-600">
              -
              {Math.round(
                ((product.price - product.discount) / product.price) * 100,
              )}
              %
            </span>
          </>
        )}
      </div>

      {/* Benefits Short */}
      <ul className="space-y-2 border-y border-neutral-100 py-6">
        <li className="flex items-center gap-3 text-sm text-neutral-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-emerald-500"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Thoáng mát, co giãn cho ngày Tết sôi động
        </li>
        <li className="flex items-center gap-3 text-sm text-neutral-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-emerald-500"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Form dáng Regular Fit nam tính, hiện đại
        </li>
        <li className="flex items-center gap-3 text-sm text-neutral-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-emerald-500"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Không nhăn, giữ dáng hoàn hảo suốt cả ngày
        </li>
      </ul>

      {/* Variants Selection */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-900">
            Màu sắc: {selectedColor}
          </span>
          <div className="mt-3 flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`h-10 w-10 rounded-full border-2 p-0.5 transition-all ${
                  selectedColor === color
                    ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                    : "border-transparent hover:border-neutral-300"
                }`}
                aria-pressed={selectedColor === color}
              >
                <div
                  className={`h-full w-full rounded-full border border-neutral-200 shadow-inner ${colorSwatchClass(color)}`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Kích thước: {selectedSize}
            </span>
            <button
              type="button"
              className="text-xs font-medium text-neutral-500 underline underline-offset-4"
            >
              Bảng size
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`flex h-12 w-16 items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                  selectedSize === size
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Actions */}
      <div className="mt-4 space-y-4">
        <div className="flex gap-4">
          <div className="flex items-center rounded-lg border border-neutral-200">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 text-neutral-500 hover:text-neutral-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span className="w-10 text-center font-bold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 text-neutral-500 hover:text-neutral-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className={`flex-1 rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-60 ${
              justAdded
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {adding
              ? "Đang thêm..."
              : justAdded
                ? "Đã thêm vào giỏ hàng"
                : "Thêm vào giỏ hàng"}
          </button>
        </div>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={adding || !onBuyNow}
          className="w-full rounded-lg bg-red-600 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-red-700 active:scale-95 disabled:opacity-60"
        >
          {adding ? "Đang xử lý..." : "Mua ngay"}
        </button>
      </div>

      {/* Trust Elements */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-neutral-500">
            Miễn phí giao hàng
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-neutral-500">
            Đổi trả 7 ngày
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-neutral-500">
            Thanh toán bảo mật
          </span>
        </div>
      </div>
    </div>
  );
}
