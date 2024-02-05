import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  // You can add other configuration options here
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
