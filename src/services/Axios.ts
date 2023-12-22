import axios from 'axios';

import HttpError from './classes/HttpError';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => await HttpError.Handle(error, axiosInstance)
);

export default axiosInstance;
