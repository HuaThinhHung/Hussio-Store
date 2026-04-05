import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";
import ProductTable from "../../components/admin/ProductTable";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import EmptyState from "../../components/admin/EmptyState";
import { useToast, ToastContainer } from "../../components/admin/Toast";

const ITEMS_PER_PAGE = 10;

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast, showToast, hideToast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch {
      showToast("Không thể tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedCategory]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(1); }, [totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const stats = useMemo(() => ({
    total: products.length,
    featured: products.filter((p) => p.isFeatured).length,
    categories: categories.length,
  }), [products, categories]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Đang tải sản phẩm..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <ToastContainer toast={toast} onClose={hideToast} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-black">Quản lý sản phẩm</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{filteredProducts.length} sản phẩm</p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Thêm sản phẩm
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Tổng SP", value: stats.total, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Nổi bật", value: stats.featured, icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
          { label: "Danh mục", value: stats.categories, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${s.iconBg} flex items-center justify-center ${s.iconColor} flex-shrink-0`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{s.label}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="sm:w-52 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white text-sm"
          >
            <option value="">Tất cả</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {/* Clear filters */}
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Xóa lọc
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <EmptyState
          title="Chưa có sản phẩm nào"
          description="Bắt đầu bằng cách thêm sản phẩm đầu tiên."
          actionText="Thêm sản phẩm"
          onAction={() => navigate("/admin/products/add")}
        />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={<svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          title="Không tìm thấy sản phẩm"
          description="Hãy điều chỉnh từ khóa tìm kiếm hoặc bộ lọc."
          actionText="Xóa bộ lọc"
          onAction={() => { setSearchTerm(""); setSelectedCategory(""); }}
        />
      ) : (
        <ProductTable products={paginatedProducts} onProductsChange={fetchProducts} showToast={showToast} />
      )}

      {/* Pagination */}
      {filteredProducts.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} / {filteredProducts.length}
          </p>
          <div className="flex items-center gap-1 flex-wrap justify-end">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {pageNumbers[0] > 1 && <>
              <button onClick={() => setCurrentPage(1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === 1 ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>1</button>
              {pageNumbers[0] > 2 && <span className="px-1 text-gray-400">…</span>}
            </>}
            {pageNumbers.map((num) => (
              <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === num ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>{num}</button>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && <>
              <span className="px-1 text-gray-400">…</span>
              <button onClick={() => setCurrentPage(totalPages)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${currentPage === totalPages ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>{totalPages}</button>
            </>}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
