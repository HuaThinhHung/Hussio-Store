import { useState, useEffect, useCallback } from "react";
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

  const closeCheckout = useCallback(() => setIsCheckoutModalOpen(false), []);

  useEffect(() => {
    if (!isCheckoutModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeCheckout();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isCheckoutModalOpen, closeCheckout]);

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
    <div className="min-h-screen py-6 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl font-semibold text-gray-900 sm:text-4xl">Giỏ hàng</h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">{items.length} sản phẩm</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:gap-6 sm:p-6"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.productId}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-32"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex gap-2">
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/product/${item.productId}`}
                          className="line-clamp-2 font-medium text-gray-900 transition-colors hover:text-gray-600"
                        >
                          {item.name}
                        </Link>
                        {item.color && <p className="mt-1 text-sm text-gray-500">Màu: {item.color}</p>}
                        {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-500"
                        aria-label="Xóa khỏi giỏ"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeFromCart(item);
                            } else {
                              updateQuantity(item, item.quantity - 1);
                            }
                          }}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100"
                          aria-label="Giảm số lượng"
                        >
                          <span className="text-lg leading-none">−</span>
                        </button>
                        <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100"
                          aria-label="Tăng số lượng"
                        >
                          <span className="text-lg leading-none">+</span>
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold text-gray-900 sm:text-right">
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
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
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
                type="button"
                onClick={() => setIsCheckoutModalOpen(true)}
                className="min-h-12 w-full rounded-xl bg-black py-3.5 font-medium text-white transition-colors hover:bg-gray-800 sm:py-4"
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
        <div
          className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-[max(1rem,env(safe-area-inset-top,0px))] sm:pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:pl-[max(1rem,env(safe-area-inset-left,0px))] sm:pr-[max(1rem,env(safe-area-inset-right,0px))]"
          role="presentation"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeCheckout}
            aria-hidden
          />
          <div
            className="relative max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
          >
            <button
              type="button"
              onClick={closeCheckout}
              className="absolute right-[max(0.75rem,env(safe-area-inset-right,0px))] top-[max(0.75rem,env(safe-area-inset-top,0px))] flex h-11 w-11 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Đóng"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 id="checkout-modal-title" className="font-serif pr-12 text-xl font-semibold text-gray-900 sm:text-2xl">
              Thông tin giao hàng
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="checkout-name" className="mb-2 block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-black"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label htmlFor="checkout-phone" className="mb-2 block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-black"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label htmlFor="checkout-address" className="mb-2 block text-sm font-medium text-gray-700">
                  Địa chỉ giao hàng
                </label>
                <textarea
                  id="checkout-address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  rows={3}
                  autoComplete="street-address"
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-black"
                  placeholder="Nhập địa chỉ giao hàng"
                />
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between font-semibold">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50 sm:py-4"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
