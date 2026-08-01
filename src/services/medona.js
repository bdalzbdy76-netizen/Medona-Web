import axios from "axios";

const api = axios.create({
  baseURL: "https://medona.sohaibshaar.cloud",
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Request URL:", config.baseURL + config.url);

  return config;
});

export default api;