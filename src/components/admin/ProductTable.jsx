import { Link, useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";

function formatPrice(price) {
  if (!price) return "—";
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

// ── Mobile product card ─────────────────────────────────────────────────────
function MobileProductCard({ product, onEdit, onDelete }) {
  const hasDiscount =
    product.discountPrice != null &&
    product.discountPrice > 0 &&
    product.price > product.discountPrice;

  return (
    <div className="flex gap-3 px-4 sm:px-6 py-4 hover:bg-gray-50/60 transition-colors border-b border-gray-50 last:border-0">
      {/* Image */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.image || "https://via.placeholder.com/100?text=No+Image"}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=No+Image"; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{product.category || "—"}</p>
          </div>
          {/* Featured badge */}
          {product.isFeatured && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-gray-900">{formatPrice(product.discountPrice || product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-red-500 line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Color + Size chips */}
        {product.color && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.color.split(",").map((c) => c.trim()).filter(Boolean).slice(0, 3).map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[9px] text-gray-600">
                <span className={`inline-block h-2 w-2 rounded-full ${
                  c === "Đen" ? "bg-neutral-800" : c === "Trắng" ? "bg-gray-100 border border-gray-200" : c === "Đỏ" ? "bg-red-600" : c === "Xanh" ? "bg-blue-600" : "bg-gray-300"
                }}`} />
                {c}
              </span>
            ))}
            {product.color.split(",").filter(Boolean).length > 3 && (
              <span className="text-[9px] text-gray-400">+{product.color.split(",").filter(Boolean).length - 3}</span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-1 mt-2">
          <button
            onClick={() => onEdit(product.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Sửa
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductTable({ products, onProductsChange, showToast }) {
  const navigate = useNavigate();

  const handleEdit = (id) => navigate(`/admin/products/edit/${id}`);

  const handleDelete = async (product) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${product.name}" không?`)) {
      try {
        await productService.deleteProduct(product.id);
        showToast("Xóa sản phẩm thành công", "success");
        onProductsChange();
      } catch {
        showToast("Không thể xóa sản phẩm", "error");
      }
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
        <p className="text-sm text-gray-500 mb-6">Bắt đầu bằng cách thêm sản phẩm đầu tiên của bạn</p>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Desktop table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Màu sắc</th>
              <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Kích thước</th>
              <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Giá gốc</th>
              <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Giá KM</th>
              <th className="px-4 lg:px-6 py-3.5 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Nổi bật</th>
              <th className="px-4 lg:px-6 py-3.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const hasDiscount =
                product.discountPrice != null &&
                product.discountPrice > 0 &&
                product.price > product.discountPrice;
              return (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  {/* Product */}
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image || "https://via.placeholder.com/100?text=No+Image"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=No+Image"; }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 max-w-[200px] lg:max-w-xs">
                        {product.name}
                      </p>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 lg:px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
                      {product.category || "—"}
                    </span>
                  </td>
                  {/* Colors (xl only) */}
                  <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                    {product.color ? (
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {product.color.split(",").map((c) => c.trim()).filter(Boolean).map((c) => (
                          <span key={c} className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-600">
                            <span className={`inline-block h-2.5 w-2.5 rounded-full ${
                              c === "Đen" ? "bg-neutral-800" : c === "Trắng" ? "bg-gray-100 border border-gray-200" : c === "Đỏ" ? "bg-red-600" : c === "Xanh" ? "bg-blue-600" : "bg-gray-300"
                            }}`} />
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  {/* Sizes (xl only) */}
                  <td className="px-4 lg:px-6 py-4 hidden xl:table-cell">
                    {product.size ? (
                      <div className="flex flex-wrap gap-1">
                        {product.size.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                          <span key={s} className="inline-flex items-center rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-bold text-gray-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  {/* Price */}
                  <td className="px-4 lg:px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</p>
                  </td>
                  {/* Discount */}
                  <td className="px-4 lg:px-6 py-4">
                    {hasDiscount ? (
                      <p className="text-sm font-semibold text-red-600">{formatPrice(product.discountPrice)}</p>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  {/* Featured */}
                  <td className="px-4 lg:px-6 py-4 text-center">
                    {product.isFeatured ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-300">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => handleEdit(product.id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(product)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list ── */}
      <div className="md:hidden divide-y divide-gray-50">
        {products.map((product) => (
          <MobileProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductTable;
