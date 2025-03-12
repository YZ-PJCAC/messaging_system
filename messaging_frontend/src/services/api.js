import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/login`, userData);
};

export const sendMessage = async (token, messageData) => {
  return await axios.post(`${API_BASE_URL}/messages/send`, messageData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchMessages = async (token) => {
  return await axios.get(`${API_BASE_URL}/messages/receive`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
