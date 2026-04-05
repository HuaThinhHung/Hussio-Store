import api from "./api";
import { MOCK_ENDPOINTS } from "../config/mockApi";
import {
  normalizeProduct,
  toProductApiPayload,
} from "../utils/productNormalizer";

const path = MOCK_ENDPOINTS.Product;

export const productService = {
  async getProducts() {
    const response = await api.get(path);
    const list = Array.isArray(response.data) ? response.data : [];
    return list.map((p) => normalizeProduct(p));
  },

  async getProductById(id) {
    const response = await api.get(`${path}/${id}`);
    return normalizeProduct(response.data);
  },

  async createProduct(formData) {
    const body = toProductApiPayload(formData);
    const response = await api.post(path, body);
    return normalizeProduct(response.data);
  },

  async updateProduct(id, formData) {
    const body = toProductApiPayload(formData);
    const response = await api.put(`${path}/${id}`, body);
    return normalizeProduct(response.data);
  },

  async deleteProduct(id) {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  },
};
