/** MockAPI 根路径：{base}/{endpoint}，资源名与控制台一致（首字母大写） */
export const MOCK_API_BASE = "https://69d15bcd90cd06523d5e103e.mockapi.io/api";

export const MOCK_ENDPOINTS = {
  Product: "/Product",
  Cart: "/Cart",
  /**
   * 结账 POST：customerName, phone, address, totalPrice(Number), status, createdAt；
   * items 建议类型 String，内容为购物车行 JSON 数组（代码会 stringify；读单时会 parse）
   */
  Order: "/Order",
};
