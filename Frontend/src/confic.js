import axios from "axios";

export const Baseapi = axios.create({
  baseURL: "http://localhost:3000/api/user/"
});

Baseapi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

