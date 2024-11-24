import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5173/employees";

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const fetchEmployees = async () => {
  return await axios.get(API_URL, getHeaders());
};

export const createEmployee = async (data) => {
  return await axios.post(API_URL, data, getHeaders());
};

export const deleteEmployee = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getHeaders());
};
