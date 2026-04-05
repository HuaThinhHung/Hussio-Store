import api from "./api";
import { MOCK_ENDPOINTS } from "../config/mockApi";

const path = MOCK_ENDPOINTS.Cart;

/** MockAPI GET /Cart 常为数组；若自定义为 { items } 也支持 */
export function normalizeCartResponse(data) {
  if (Array.isArray(data)) return { items: data };
  if (data && Array.isArray(data.items)) return data;
  return { items: [] };
}

/** Schema: id, productId, name, image, price, quantity, color, size, createdAt */
export const cartService = {
  /** 统一返回 { items: [...] } */
  async getCart() {
    const response = await api.get(path);
    return normalizeCartResponse(response.data);
  },

  /** PUT /Cart/{id} */
  async updateCart(id, data) {
    const response = await api.put(`${path}/${id}`, data);
    return response.data;
  },

  /** POST /Cart */
  async createCart(data) {
    const response = await api.post(path, data);
    return response.data;
  },

  /** DELETE /Cart/{id} */
  async deleteCart(id) {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  },
};
