import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || " https://expense-tracker-with-ai-insights-qne0.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
