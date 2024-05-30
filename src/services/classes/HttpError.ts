import { AxiosInstance } from 'axios';

import TokenService from '@/services/Token';
import store from '@/store';

import ClassHelper from '../ClassHelper';
import Message from '../Message';
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
      if (error.response.data === 'неверный логин или пароль') {
        Message.Error('Неверный логин или пароль');
        return;
      }
      Message.Error('Ошибка на сервере, попробуйте позже');
    }
    if (error.response.status >= 400 && error.response.status < 500) {
      const err = new HttpError(error.response.data).getErr();
      if (err) {
        Message.Error(err);
      }
    }
    return Promise.reject(error);
  }
}
