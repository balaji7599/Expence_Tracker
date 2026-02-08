import axios from "axios";

export const Baseapi = axios.create({
  baseURL: "https://expence-tracker-kcf2.onrender.com/api/user/"
});

Baseapi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

