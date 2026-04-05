import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { normalizedProductToFormInitial } from '../../utils/productNormalizer';
import ProductForm from '../../components/admin/ProductForm';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import { useToast, ToastContainer } from '../../components/admin/Toast';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(normalizedProductToFormInitial(data));
    } catch (error) {
      showToast('Failed to load product', 'error');
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await productService.updateProduct(id, formData);
      showToast('Product updated successfully!', 'success');
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      showToast('Failed to update product. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading product..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer toast={toast} onClose={hideToast} />

      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-serif font-semibold text-black">Edit Product</h1>
          <p className="text-gray-500 mt-1">Update product information</p>
        </div>
      </div>

      {/* Form */}
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default EditProduct;
