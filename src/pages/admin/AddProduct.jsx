import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import ProductForm from '../../components/admin/ProductForm';
import { useToast, ToastContainer } from '../../components/admin/Toast';

function AddProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await productService.createProduct(formData);
      showToast('Product created successfully!', 'success');
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      showToast('Failed to create product. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-serif font-semibold text-black">Add New Product</h1>
          <p className="text-gray-500 mt-1">Create a new product listing</p>
        </div>
      </div>

      {/* Form */}
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

export default AddProduct;
