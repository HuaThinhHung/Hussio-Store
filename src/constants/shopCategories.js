/**
 * Slug trên URL: /products?category=ao-thun
 * Mỗi slug khớp các giá trị category có thể có trong DB (form admin / dữ liệu cũ).
 */
export const SHOP_CATEGORY_SLUGS = {
  "ao-thun": ["áo thun"],
  "ao-polo": ["áo polo", "polo"],
  "quan-ngan": ["quần ngắn"],
  "quan-tay": ["quần tây", "quần", "quần jeans"],
  "phu-kien": ["phụ kiện"],
};

export const SHOP_CATEGORY_LIST = [
  { slug: "ao-thun", label: "Áo thun" },
  { slug: "ao-polo", label: "Áo polo" },
  { slug: "quan-ngan", label: "Quần ngắn" },
  { slug: "quan-tay", label: "Quần tây" },
  { slug: "phu-kien", label: "Phụ kiện" },
];

function norm(s) {
  return (s || "").trim().toLowerCase();
}

export function isValidShopCategorySlug(slug) {
  return Boolean(slug && Object.prototype.hasOwnProperty.call(SHOP_CATEGORY_SLUGS, slug));
}

/** Trả về true nếu không lọc; false nếu slug không hợp lệ (coi như không lọc). */
export function productMatchesShopCategorySlug(productCategory, slug) {
  if (!slug || !isValidShopCategorySlug(slug)) return true;
  const n = norm(productCategory);
  return SHOP_CATEGORY_SLUGS[slug].some((key) => n === key);
}

export function labelForShopCategorySlug(slug) {
  const row = SHOP_CATEGORY_LIST.find((c) => c.slug === slug);
  return row ? row.label : null;
}
