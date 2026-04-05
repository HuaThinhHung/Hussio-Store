import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import MainLayout from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import Products from '../pages/Products';
import { ProductDetail } from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import ProductManagement from '../pages/admin/Products';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';
import Orders from '../pages/admin/Orders';
import Users from '../pages/admin/Users';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

function AppRoutes() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default AppRoutes;
