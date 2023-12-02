import axios from "axios";

const API_URL = "http://localhost:5500/";

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "token_access"
  )}`;
  return config;
});
