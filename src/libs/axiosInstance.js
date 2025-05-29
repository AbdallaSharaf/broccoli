import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fruits-heaven-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);
