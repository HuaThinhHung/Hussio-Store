import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productService } from "../services/productService";
import {
  productMatchesShopCategorySlug,
  labelForShopCategorySlug,
  isValidShopCategorySlug,
} from "../constants/shopCategories";

function Products() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        productMatchesShopCategorySlug(p.category, categorySlug),
      ),
    [products, categorySlug],
  );

  const activeFilterLabel =
    isValidShopCategorySlug(categorySlug) && categorySlug
      ? labelForShopCategorySlug(categorySlug)
      : null;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getProductImage = (product) => {
    return (
      product.image ||
      product.images?.[0] ||
      "https://via.placeholder.com/400x600"
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="font-serif text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl">
            {activeFilterLabel || "Tất cả sản phẩm"}
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base">
            {filteredProducts.length} sản phẩm
            {activeFilterLabel && (
              <>
                {" "}
                ·{" "}
                <Link
                  to="/products"
                  className="text-gray-900 underline underline-offset-4 hover:text-gray-600"
                >
                  Xóa bộ lọc
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">không có sản phẩm nào</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              Chưa có sản phẩm trong danh mục này.
            </p>
            <Link
              to="/products"
              className="inline-block px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group block"
              >
                <div className="relative mb-2 aspect-3/4 overflow-hidden rounded-lg bg-gray-100 sm:mb-4 sm:rounded-xl">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isFeatured && (
                    <span className="absolute left-2 top-2 bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
                      Nổi bật
                    </span>
                  )}
                  {product.discountPrice != null &&
                    product.price > 0 &&
                    product.discountPrice < product.price && (
                      <span className="absolute right-2 top-2 bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
                        -
                        {Math.round(
                          (1 - product.discountPrice / product.price) * 100,
                        )}
                        %
                      </span>
                    )}
                </div>
                <div className="space-y-1">
                  <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-gray-600 sm:text-base">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider sm:text-xs">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        product.discountPrice
                          ? "text-red-600 font-semibold"
                          : "text-gray-900 font-semibold"
                      }
                    >
                      {formatPrice(product.discountPrice || product.price)}
                    </span>
                    {product.discountPrice != null &&
                      product.price > product.discountPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {formatPrice(product.price)}
                        </span>
                      )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1 pt-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-500">
                        {product.rating}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
