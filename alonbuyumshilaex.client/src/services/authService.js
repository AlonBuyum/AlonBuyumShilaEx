import axios from "axios";

const API_URL = "http://localhost:5173/auth";

export const register = async (data) => {
  return await axios.post(`${API_URL}/register`, data);
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
