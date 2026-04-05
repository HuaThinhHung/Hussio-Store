import { MOCK_API_BASE, MOCK_ENDPOINTS } from "../config/mockApi";

const orderUrl = `${MOCK_API_BASE}${MOCK_ENDPOINTS.Order}`;

function parseOrderItems(items) {
  if (Array.isArray(items)) return items;
  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function normalizeOrder(raw) {
  if (!raw || typeof raw !== "object") return raw;
  return { ...raw, items: parseOrderItems(raw.items) };
}

export const orderService = {
  async getOrders() {
    const response = await fetch(orderUrl);
    if (!response.ok) throw new Error("Failed to fetch orders");
    const data = await response.json();
    const list = Array.isArray(data) ? data : [];
    return list.map(normalizeOrder);
  },

  async getOrderById(id) {
    const response = await fetch(`${orderUrl}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch order");
    const data = await response.json();
    return normalizeOrder(data);
  },

  /**
   * MockAPI Order 建议字段：customerName, phone, address, items, totalPrice
   * items 若为 String 类型，可先 JSON.stringify(lineItems) 再 POST
   */
  async createOrder(data) {
    const payload = { ...data };
    if (Array.isArray(payload.items)) {
      payload.items = JSON.stringify(payload.items);
    }
    const orderData = {
      ...payload,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const response = await fetch(orderUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to create order");
    const created = await response.json();
    return normalizeOrder(created);
  },

  async updateOrderStatus(id, status) {
    const response = await fetch(`${orderUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update order");
    return response.json();
  },

  async deleteOrder(id) {
    const response = await fetch(`${orderUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete order");
    return response.json();
  },
};
