import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if you change server port
});

// Interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
