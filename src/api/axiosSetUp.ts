import { API_URL } from '@env';
import axios from 'axios';

export const BaseURL = API_URL;

export const axiosInst = axios.create({
  baseURL: BaseURL,
});

export const setAuthHeader = (token: string | null) => {
  axiosInst.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInst.defaults.headers.common.Authorization = '';
};