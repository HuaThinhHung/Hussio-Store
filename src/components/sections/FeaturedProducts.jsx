import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      const featured = data.filter((p) => p.isFeatured).slice(0, 8);
      const list = featured.length > 0 ? featured : data.slice(0, 8);
      setProducts(list);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(p);

  const getProductImage = (product) => {
    return (
      product.image ||
      product.images?.[0] ||
      "https://via.placeholder.com/400x600"
    );
  };

  if (loading) {
    return (
      <section id="bestsellers" className="bg-white py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              Sản phẩm nổi bật
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light text-neutral-900 md:text-5xl">
              Sự lựa chọn của phái mạnh
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-3/4 bg-neutral-100 rounded-2xl"></div>
                <div className="mt-4 h-4 bg-neutral-100 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section id="bestsellers" className="bg-white py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
            Sản phẩm nổi bật
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light text-neutral-900 md:text-5xl">
            Sự lựa chọn của phái mạnh
          </h2>
          <p className="mt-4 max-w-lg text-sm text-neutral-500">
            Những thiết kế tinh tế, chất liệu cao cấp mang lại sự tự tin và lịch
            lãm cho mọi quý ông trong dịp Tết này.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-neutral-100 transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/10 p-4 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                  <button className="w-full rounded-full bg-white py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-900 shadow-xl transition-all hover:bg-neutral-900 hover:text-white active:scale-95">
                    Xem nhanh
                  </button>
                </div>
                {product.tag && (
                  <div className="absolute left-4 top-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest backdrop-blur-sm ${
                        product.tag === "Sale"
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-neutral-900"
                      }`}
                    >
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-col items-center text-center">
                <h3 className="text-sm font-medium text-neutral-900 transition hover:text-red-700">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-sm font-bold text-neutral-900">
                    {formatPrice(product.discountPrice || product.price)}
                  </p>
                  {product.discountPrice &&
                    product.price > product.discountPrice && (
                      <p className="text-xs text-neutral-400 line-through">
                        {formatPrice(product.price)}
                      </p>
                    )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            to="/products"
            className="rounded-full border border-neutral-200 px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-95"
          >
            Khám phá trọn bộ sưu tập
          </Link>
        </div>
      </div>
    </section>
  );
}
