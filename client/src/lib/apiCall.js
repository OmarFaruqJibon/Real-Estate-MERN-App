import axios from "axios";

const apiCall = axios.create({
  // baseURL: "http://localhost:8800/api",
  // baseURL: process.env.BACKEND_API_URL || "http://localhost:8800/api",
  baseURL: "https://darhub-server.onrender.com/api",
  withCredentials: true,
});

export default apiCall;
