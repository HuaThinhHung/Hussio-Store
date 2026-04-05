/**
 * productNormalizer.js
 * Chuyển đổi giữa schema MockAPI và schema UI nội bộ.
 *
 * MockAPI schema:
 *   id, name, image, price, discountPrice, category,
 *   color, size, description, isFeatured, createdAt
 *
 * UI schema (normalizeProduct):
 *   Mở rộng để hiển thị: images[], colors[], sizes[], discount
 */

function parseList(val) {
  if (Array.isArray(val)) return val.filter(Boolean).map(String);
  if (typeof val === "string" && val.includes(","))
    return val.split(",").map((s) => s.trim()).filter(Boolean);
  if (val != null && val !== "") return [String(val)];
  return [];
}

/**
 * Chuyển raw từ MockAPI → UI schema
 * Luôn gọi hàm này khi nhận dữ liệu từ API
 */
export function normalizeProduct(raw) {
  if (!raw) return null;
  const price = Number(raw.price) || 0;
  const dp = raw.discountPrice != null && raw.discountPrice !== "" && raw.discountPrice !== 0
    ? Number(raw.discountPrice)
    : null;
  const hasSale = dp != null && price > 0 && dp < price;

  const images = raw.mainImage
    ? [raw.mainImage, ...(raw.images || [])]
    : raw.image
      ? [raw.image, ...(raw.images || [])]
      : raw.images || [];

  const colors = parseList(raw.colors ?? raw.color);
  const sizes = parseList(raw.sizes ?? raw.size);

  let colorImages = raw.colorImages || {};
  if (typeof colorImages === "string") {
    try {
      colorImages = JSON.parse(colorImages);
    } catch {
      colorImages = {};
    }
  }
  if (!colorImages || typeof colorImages !== "object") colorImages = {};

  return {
    ...raw,
    images,
    image: raw.mainImage || raw.image || "",
    price,
    discountPrice: hasSale ? dp : null,
    discount: hasSale ? dp : price,
    colors,
    sizes,
    category: raw.category || "",
    isFeatured: !!raw.isFeatured,
    colorImages,
  };
}

/**
 * Chuyển normalizeProduct() → form initial data cho ProductForm
 */
export function normalizedProductToFormInitial(n) {
  if (!n) return null;
  return {
    name: n.name || "",
    image: n.image || "",
    price: n.price ?? "",
    discountPrice: n.discountPrice != null ? n.discountPrice : "",
    category: n.category || "",
    color: Array.isArray(n.colors) ? n.colors.join(", ") : n.color || "",
    size: Array.isArray(n.sizes) ? n.sizes.join(", ") : n.size || "",
    description: n.description || "",
    isFeatured: !!n.isFeatured,
    colorImages: n.colorImages || {},
  };
}

/**
 * Chuyển form data → payload gửi lên MockAPI
 * Đúng schema: name, image, price, discountPrice, category, color, size, description, isFeatured, colorImages
 */
export function toProductApiPayload(formData) {
  const price = Number(formData.price) || 0;
  const discountPrice =
    formData.discountPrice === "" || formData.discountPrice == null
      ? 0
      : Number(formData.discountPrice);

  return {
    name: (formData.name || "").trim(),
    image: (formData.image || "").trim(),
    price,
    discountPrice,
    category: (formData.category || "").trim(),
    color: (formData.color || "").trim(),
    size: (formData.size || "").trim(),
    description: (formData.description || "").trim(),
    isFeatured: !!formData.isFeatured,
    colorImages: formData.colorImages || {},
  };
}
