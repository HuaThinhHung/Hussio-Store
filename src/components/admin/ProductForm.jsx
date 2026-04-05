import { useState, useEffect } from "react";

const EMPTY = {
  name: "",
  image: "",
  price: "",
  discountPrice: "",
  category: "",
  color: "",
  size: [],
  description: "",
  isFeatured: false,
  colorImages: {},
};

function parseCommaList(str) {
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

export default function ProductForm({ initialData, onSubmit, isSubmitting }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!initialData) return;
    setForm({
      name: initialData.name ?? "",
      image: initialData.image ?? "",
      price: initialData.price ?? "",
      discountPrice:
        initialData.discountPrice != null && initialData.discountPrice !== ""
          ? initialData.discountPrice
          : "",
      category: initialData.category ?? "",
      color: initialData.color ?? "",
      size: Array.isArray(initialData.size)
        ? initialData.size
        : initialData.size
          ? initialData.size.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      description: initialData.description ?? "",
      isFeatured: !!initialData.isFeatured,
      colorImages: initialData.colorImages ?? {},
    });
    if (initialData.image) setImagePreview(initialData.image);
  }, [initialData]);

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const setNum = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const setImage = (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, image: val }));
    setImagePreview(val);
  };

  const setColorImage = (color, url) => {
    setForm((prev) => ({
      ...prev,
      colorImages: { ...prev.colorImages, [color]: url },
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tên sản phẩm không được để trống";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Giá phải là số dương";
    if (
      form.discountPrice !== "" &&
      !isNaN(Number(form.discountPrice)) &&
      Number(form.discountPrice) >= Number(form.price)
    )
      e.discountPrice = "Giá khuyến mãi phải nhỏ hơn giá gốc";
    if (!form.image.trim()) e.image = "URL hình ảnh không được để trống";
    if (!form.category.trim()) e.category = "Danh mục không được để trống";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      image: form.image.trim(),
      price: Number(form.price),
      discountPrice: form.discountPrice !== "" ? Number(form.discountPrice) : 0,
      category: form.category.trim(),
      color: form.color.trim(),
      size: form.size.join(", "),
      description: form.description.trim(),
      isFeatured: !!form.isFeatured,
      colorImages: form.colorImages,
    };
    onSubmit(payload);
  };

  const previewColors = parseCommaList(form.color);
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const toggleSize = (sz) => {
    setForm((prev) => ({
      ...prev,
      size: prev.size.includes(sz)
        ? prev.size.filter((s) => s !== sz)
        : [...prev.size, sz],
    }));
  };

  const categories = [
    "Áo Polo", "Áo Thun", "Áo Sơ Mi",
    "Quần Tây", "Quần Ngắn", "Quần Jeans", "Phụ Kiện",
  ];

  const colorDot = (c) => {
    if (c === "Đen") return "bg-neutral-800";
    if (c === "Trắng") return "bg-gray-100 border border-gray-200";
    if (c === "Đỏ") return "bg-red-600";
    if (c === "Xanh") return "bg-blue-600";
    if (c === "Xám") return "bg-gray-400";
    if (c === "Nâu") return "bg-amber-700";
    if (c === "Xanh Navy") return "bg-blue-900";
    return "bg-gray-300";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* ── Basic Info ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Thông tin cơ bản
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="VD: Áo Polo Cleanfit Hussio"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
                errors.name ? "border-red-400" : "border-gray-200"
              } focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={set("category")}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
                errors.category ? "border-red-400" : "border-gray-200"
              } focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white text-sm}`}
            >
              <option value="">— Chọn danh mục —</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* isFeatured */}
          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer pt-2 sm:pt-0">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Sản phẩm nổi bật</span>
            </label>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Giá gốc (VND) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.price}
              onChange={setNum("price")}
              placeholder="420000"
              min="0"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
                errors.price ? "border-red-400" : "border-gray-200"
              } focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm}`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>

          {/* Discount Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Giá khuyến mãi (VND)
            </label>
            <input
              type="number"
              value={form.discountPrice}
              onChange={setNum("discountPrice")}
              placeholder="370000"
              min="0"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
                errors.discountPrice ? "border-red-400" : "border-gray-200"
              } focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm}`}
            />
            {errors.discountPrice && <p className="mt-1 text-sm text-red-500">{errors.discountPrice}</p>}
          </div>
        </div>
      </div>

      {/* ── Variants (color / size) ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
          Phân loại (Màu sắc & Kích thước)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Màu sắc
              <span className="text-xs font-normal text-gray-400 ml-1">(phân cách bằng dấu phẩy)</span>
            </label>
            <input
              type="text"
              value={form.color}
              onChange={set("color")}
              placeholder="Đen, Trắng, Xám"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
            />
            {previewColors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {previewColors.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                    <span className={`inline-block h-3 w-3 rounded-full ${colorDot(c)}}`} />
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Kích thước
            </label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => toggleSize(sz)}
                  className={`w-12 sm:w-14 h-10 rounded-lg border text-sm font-bold transition-all ${
                    form.size.includes(sz)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                  }}`}
                >
                  {sz}
                </button>
              ))}
            </div>
            {form.size.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">
                Đã chọn: {form.size.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Color Images ── */}
      {previewColors.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Ảnh theo màu sắc</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Nhập URL ảnh cho từng màu. Nếu không nhập, sẽ dùng ảnh chính.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {previewColors.map((color) => (
              <div key={color}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className={`inline-block h-4 w-4 rounded-full mr-2 align-middle ${colorDot(color)}}`} />
                  {color}
                </label>
                <input
                  type="url"
                  value={form.colorImages?.[color] || ""}
                  onChange={(e) => setColorImage(color, e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                />
                {form.colorImages?.[color] && (
                  <div className="mt-2 w-full aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={form.colorImages[color]}
                      alt={color}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.parentElement.style.display = "none"; }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Image ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Hình ảnh sản phẩm</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            URL hình ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={form.image}
            onChange={setImage}
            placeholder="https://i.imgur.com/polo1.jpg"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
              errors.image ? "border-red-400" : "border-gray-200"
            } focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm}`}
          />
          {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}

          {imagePreview && (
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-400 mb-2">Preview</p>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview("")}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Description ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Mô tả</h3>
        <textarea
          value={form.description}
          onChange={set("description")}
          rows={4}
          placeholder="Áo polo nam form chuẩn, chất vải co giãn tốt, thoáng mát, phù hợp mặc đi làm và dịp Tết."
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none text-sm"
        />
      </div>

      {/* ── Submit ── */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pb-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-7 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-white bg-black rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Đang lưu...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Lưu sản phẩm
            </>
          )}
        </button>
      </div>
    </form>
  );
}
