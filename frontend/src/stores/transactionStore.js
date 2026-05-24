import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://expense-tracker-with-ai-insights-qne0.onrender.com";
const API = `${BASE_URL}/transaction`;

// ✅ helper to get auth header
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// ADD
export const addTransaction = async (transactionObj) => {
  try {
    const res = await axios.post(`${API}/input`, transactionObj, authHeader());
    return res.data;
  } catch (err) {
    console.log("Add Transaction Error", err.response?.data || err.message);
  }
};

// GET
export const fetchTransactions = async () => {
  try {
    const res = await axios.get(`${API}/all-transactions`, authHeader());
    return res.data.payload || [];
  } catch (err) {
    console.log("Fetch Transaction Error", err);
    return [];
  }
};

// DELETE
export const deleteTransaction = async (id) => {
  try {
    const res = await axios.delete(`${API}/delete/${id}`, authHeader());
    return res.data;
  } catch (err) {
    console.log("Delete Transaction Error", err);
  }
};
