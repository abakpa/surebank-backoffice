import axios from 'axios';

let isRedirectingToLogin = false;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      localStorage.getItem('authToken') &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      localStorage.removeItem('authToken');
      window.location.assign('/login?sessionExpired=1');
    }

    return Promise.reject(error);
  }
);
