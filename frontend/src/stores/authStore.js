import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://expense-tracker-with-ai-insights-qne0.onrender.com";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  login: async (userCred) => {
    try {
      set((state) => ({ ...state, loading: true }));
      let res = await axios.post(`${BASE_URL}/auth/login`, userCred);

      if (res.status === 200) {
        // ✅ save token to localStorage
        localStorage.setItem("token", res.data.token);
        set({
          currentUser: res.data?.payload,
          loading: false,
          isAuthenticated: true,
          error: null,
        });
      }
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  logout: async () => {
    try {
      //  clear localStorage on logout
      localStorage.removeItem("token");
      set({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },
}));
