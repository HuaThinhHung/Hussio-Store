import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const items = cart || [];

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + " đ";

  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (items.length === 0) {
      alert("Giỏ hàng trống.");
      return;
    }
    setIsSubmitting(true);
    try {
      const lineItems = items.map((i) => ({
        productId: i.productId,
        name: i.name,
        image: i.image || "",
        price: Number(i.price) || 0,
        quantity: Number(i.quantity) || 1,
        color: i.color || "",
        size: i.size || "",
      }));
      await orderService.createOrder({
        customerName: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        address: customerInfo.address.trim(),
        items: lineItems,
        totalPrice: total,
        status: "paid",
      });
      await clearCart();
      setOrderSuccess(true);
      setIsCheckoutModalOpen(false);
      setCustomerInfo({ name: "", phone: "", address: "" });
      setTimeout(() => setOrderSuccess(false), 4000);
    } catch {
      alert(
        "Không thể tạo đơn hàng. Hãy kiểm tra MockAPI đã có resource Order (customerName, phone, address, items, totalPrice) hoặc thử lại sau.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-2">Đặt hàng thành công!</h2>
          <p className="text-gray-500 mb-6">Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm nhất.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl font-semibold text-gray-900">Giỏ hàng</h1>
          <p className="mt-2 text-gray-500">{items.length} sản phẩm</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-medium text-gray-900 hover:text-gray-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.color && <p className="text-sm text-gray-500 mt-1">Màu: {item.color}</p>}
                        {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      </div>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Xóa"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeFromCart(item);
                            } else {
                              updateQuantity(item, item.quantity - 1);
                            }
                          }}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-lg">−</span>
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold text-gray-900">
                        {formatPrice(Number(item.price) * Number(item.quantity))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-32">
              <h3 className="font-semibold text-lg text-gray-900 mb-6">Tóm tắt đơn hàng</h3>

              <div className="space-y-4 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="font-semibold text-lg text-gray-900">Tổng cộng</span>
                <span className="font-semibold text-xl text-gray-900">{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                Thanh toán
              </button>

              <Link
                to="/"
                className="block w-full py-3 mt-4 text-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCheckoutModalOpen(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-6">Thông tin giao hàng</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ giao hàng</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                  placeholder="Nhập địa chỉ giao hàng"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between font-semibold">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full mt-6 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận đặt hàng"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
