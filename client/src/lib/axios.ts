import axios from "axios";
import { store } from "@/redux/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_EXPRESS_API_URL!,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().user.userInfo?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
