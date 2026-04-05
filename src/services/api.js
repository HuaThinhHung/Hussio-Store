import axios from "axios";
import { MOCK_API_BASE } from "../config/mockApi";

const api = axios.create({
  baseURL: MOCK_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
