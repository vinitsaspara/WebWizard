import axios from "axios";
import { store } from "@/store";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: "/",
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Try to get token from Redux store first
    const state = store.getState();
    let token = state.user.token;

    // If not in store, try localStorage
    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
