import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Ensure it includes "/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Required for Laravel Sanctum
});

export default api;
