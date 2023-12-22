import { AxiosInstance } from 'axios';
import { ElNotification } from 'element-plus';

import TokenService from '@/services/Token';
import store from '@/store';

import ClassHelper from '../ClassHelper';
export default class HttpError {
  private code = 400;
  private err = '';

  constructor(i?: HttpError) {
    ClassHelper.BuildClass(this, i);
  }

  getErr(): string {
    return this.capitalizedErr();
  }

  private capitalizedErr(): string {
    return this.err.charAt(0).toUpperCase() + this.err.slice(1);
  }

  static async Handle(error: any, axiosInstance: AxiosInstance) {
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
    if (error.response.status >= 500) {
      ElNotification({ message: 'Ошибка на сервере, попробуйте позже', duration: 10000, type: 'error' });
    }
    if (error.response.status >= 400 && error.response.status < 500) {
      const err = new HttpError(error.response.data);
      ElNotification({ message: err.getErr(), duration: 10000, type: 'error' });
    }
    return Promise.reject(error);
  }
}
