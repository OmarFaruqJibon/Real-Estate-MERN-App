import axios from "axios";

const apiCall = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || "http://localhost:8800/api",
  withCredentials: true,
});

export default apiCall;
