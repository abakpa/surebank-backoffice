// src/utils/axiosInstance.js
import axios from 'axios';
const SESSION_EXPIRED_MESSAGE = 'Your login session has expired. Please login again to continue.';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // set your baseURL here
  headers: { 'Content-Type': 'application/json' },
});

const clearStaffSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('staffId');
  localStorage.removeItem('staffPhone');
  localStorage.removeItem('staffRole');
  localStorage.removeItem('staffBranch');
};

const getLoginUrl = () => {
  const currentPath = `${window.location.pathname}${window.location.search}`;
  const redirectPath = currentPath.replace(/^\//, '');
  const params = new URLSearchParams({ sessionExpired: '1' });

  if (redirectPath && !redirectPath.startsWith('login')) {
    params.set('redirect', redirectPath);
  }

  return `/login?${params.toString()}`;
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem('sessionExpiredMessage', SESSION_EXPIRED_MESSAGE);
      clearStaffSession();
      window.location.href = getLoginUrl();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
