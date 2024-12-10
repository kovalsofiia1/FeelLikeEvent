// import { API_URL } from '@env';
import axios from 'axios';


// const API_URL = "https://secret-cliffs-98368-7f71d52a342a.herokuapp.com"


//API_URL = "http://localhost:3000"


export const BaseURL = process.env.EXPO_PUBLIC_API_URL;

export const axiosInst = axios.create({
  baseURL: BaseURL,
});

export const setAuthHeader = (token: string | null) => {
  axiosInst.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInst.defaults.headers.common.Authorization = '';
};