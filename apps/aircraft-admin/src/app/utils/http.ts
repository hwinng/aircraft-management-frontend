import axios, { AxiosError } from 'axios';
import CONFIG from '../config';
import store from '../store';
import { message, notification } from 'antd';
import { logout } from '../store/actions/auth';

interface RespData {
  success: boolean;
  errorCode: number;
  msg?: string;
  data?: any;
  [key: string]: any;
}

let exiting = false;
const CancelToken = axios.CancelToken;

function handleError(error: AxiosError) {
  if (axios.isCancel(error)) {
    console.log('axios cancel');
  } else {
    const response = error.response;
    notification.error({
      message: `Error Code: ${response?.status ?? response.status}`,
      description: response?.statusText ?? 'Unexpected error',
    });
  }
}

const httpInstance = axios.create({
  timeout: 50000,
  baseURL: CONFIG.http.baseURL,
});

httpInstance.defaults.headers.common.isLoading = true;
httpInstance.defaults.headers.common.successAlert = false;
httpInstance.defaults.headers.common.errorAlert = true;
Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

httpInstance.interceptors.response.use(
  function (res) {
    if (res.status !== 200 && res.status !== 201) {
      notification.error({
        message: `Code: ${res.data.errorCode ?? -1}`,
        description: res.data.msg ?? 'Unexpected error',
      });
    }

    if (res.statusText === 'OK' && res.data.createdAt) {
      message.success(res.data.msg ?? 'Success');
    }

    if (res.data.errorCode === 401 && !exiting) {
      exiting = true;
      setTimeout(logout, 2000);
    }
    return res;
  },
  function (error) {
    handleError(error);
    return Promise.reject(error);
  }
);

export default httpInstance;
