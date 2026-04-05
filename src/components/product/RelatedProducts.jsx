import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";

export function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-3/4 bg-neutral-100 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl font-light text-neutral-900 md:text-5xl">
              Có thể bạn sẽ thích
            </h2>
            <p className="mt-4 text-sm text-neutral-500">
              Khám phá thêm các sản phẩm hoàn hảo để phối cùng bộ trang phục của bạn.
            </p>
          </div>
          <Link to="/products" className="hidden text-sm font-bold uppercase tracking-widest text-neutral-900 underline underline-offset-8 md:block">
            Xem tất cả sản phẩm
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group relative">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-neutral-100 transition-all group-hover:shadow-2xl">
                <img
                  src={product.images?.[0] || product.image || product.variants?.[0]?.images?.[0] || 'https://via.placeholder.com/400x600'}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/10 p-4 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                  <button className="w-full rounded-full bg-white py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-900 shadow-xl transition-all hover:bg-neutral-900 hover:text-white active:scale-95">
                    Xem ngay
                  </button>
                </div>
                {product.isFeatured && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-neutral-900 backdrop-blur-sm">
                      Nổi bật
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-col items-center text-center">
                <h3 className="text-sm font-medium text-neutral-900 group-hover:text-red-700">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-bold text-neutral-500">
                  {formatPrice(product.discountPrice || product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <Link to="/products" className="mt-12 w-full rounded-2xl bg-neutral-50 py-6 text-center text-sm font-bold uppercase tracking-widest text-neutral-900 md:hidden">
          Xem tất cả sản phẩm
        </Link>
      </div>
    </section>
  );
}
