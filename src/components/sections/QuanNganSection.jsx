import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";
import { productMatchesShopCategorySlug } from "../../constants/shopCategories";

const QUAN_NGAN_SLUG = "quan-ngan";
const MAX_HOME = 4;

export function QuanNganSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      const shorts = data.filter((p) =>
        productMatchesShopCategorySlug(p.category, QUAN_NGAN_SLUG),
      );
      setProducts(shorts.length > 0 ? shorts.slice(0, MAX_HOME) : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  const getProductImage = (product) =>
    product.image || product.images?.[0] || "https://via.placeholder.com/400x600";

  if (loading) {
    return (
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-14 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
              Quần ngắn
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light text-neutral-900 md:text-5xl lg:text-6xl">
              Phong cách mùa hè
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-3/4 rounded-2xl bg-neutral-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
            Quần ngắn
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light text-neutral-900 md:text-5xl lg:text-6xl">
            Phong cách mùa hè
          </h2>
          <p className="mt-5 max-w-lg text-sm text-neutral-500">
            Thoáng mát, năng động và phong cách — lựa chọn hoàn hảo cho ngày hè oi ả.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group/product">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-500 group-hover/product:shadow-2xl">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/product:scale-110"
                />
                {product.tag && (
                  <div className="absolute left-4 top-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest backdrop-blur-sm ${
                        product.tag === "Sale" || product.tag === "Giảm giá"
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-neutral-900"
                      }`}
                    >
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h3 className="text-sm font-medium text-neutral-900 transition group-hover/product:text-red-700">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-sm font-bold text-neutral-900">
                    {formatPrice(product.discountPrice || product.price)}
                  </p>
                  {product.discountPrice && product.price > product.discountPrice && (
                    <p className="text-xs text-neutral-400 line-through">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/products?category=quan-ngan"
            className="rounded-full border border-neutral-300 px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-95"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
