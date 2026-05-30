import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.153.244.141:8087',
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('Axios baseURL:', api.defaults.baseURL);

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
