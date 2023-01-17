import axios from 'axios';

import TokenService from '@/services/Token';
import store from '@/store';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (!error.response) {
      return;
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch('auth/refreshToken');
      } catch (e) {
        await store.dispatch('auth/logout');
        return;
      }
      axiosInstance.defaults.headers.common['token'] = TokenService.getAccessToken();
      error.config.headers['token'] = TokenService.getAccessToken();
      error.config.baseURL = undefined;
      return axiosInstance.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
