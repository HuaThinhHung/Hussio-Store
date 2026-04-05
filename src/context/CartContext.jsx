import { createContext, useContext, useCallback, useEffect, useState } from "react";
import { cartService } from "../services/cartService";

const CartContext = createContext();

function pickImage(product, color = "") {
  // Ưu tiên ảnh theo màu đã chọn
  if (color && product?.colorImages?.[color]) {
    return product.colorImages[color];
  }
  if (typeof product?.image === "string" && product.image) return product.image;
  if (Array.isArray(product?.images) && product.images[0]) return product.images[0];
  return "";
}

function findLine(items, productId, size, color) {
  return items.find(
    (i) =>
      String(i.productId) === String(productId) &&
      (i.size || "") === (size || "") &&
      (i.color || "") === (color || ""),
  );
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await cartService.getCart();
      const list = data?.items || [];
      // sort newest first
      const sorted = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setItems(sorted);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addToCart = async (product, quantity = 1, size = "", color = "") => {
    const pid = String(product.id);
    const unit =
      product.discountPrice != null && product.discountPrice !== 0
        ? Number(product.discountPrice)
        : Number(product.price) || 0;

    const cartData = await cartService.getCart().catch(() => ({ items: [] }));
    const list = cartData?.items || [];
    const existing = findLine(list, pid, size, color);

    if (existing?.id) {
      await cartService.updateCart(existing.id, {
        ...existing,
        quantity: Number(existing.quantity || 0) + Number(quantity),
      });
    } else {
      await cartService.createCart({
        productId: pid,
        name: product.name || "",
        image: pickImage(product, color),
        price: unit,
        quantity: Number(quantity) || 1,
        color: color || "",
        size: size || "",
        createdAt: new Date().toISOString(),
      });
    }
    await refresh();
  };

  const removeFromCart = async (item) => {
    if (!item?.id) return;
    await cartService.deleteCart(item.id);
    await refresh();
  };

  const updateQuantity = async (item, quantity) => {
    if (!item?.id) return;
    await cartService.updateCart(item.id, { ...item, quantity: Math.max(1, Number(quantity)) });
    await refresh();
  };

  const clearCart = async () => {
    const cartData = await cartService.getCart().catch(() => ({ items: [] }));
    const list = cartData?.items || [];
    await Promise.all(list.map((row) => cartService.deleteCart(row.id)));
    setItems([]);
  };

  const cartCount = items.reduce((t, i) => t + Number(i.quantity || 0), 0);
  const cartTotal = items.reduce((t, i) => t + Number(i.price || 0) * Number(i.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart: items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart: refresh,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
