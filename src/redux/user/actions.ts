// src/redux/user/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst, setAuthHeader, clearAuthHeader } from '../../api/axiosSetUp';
import { deleteItem, getItem, setItem } from '@/src/utils/storage';
import { UpdateUser, User } from './types';

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY || "mykey";

interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const loadTokenFromStorage = createAsyncThunk(
  "auth/loadToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getItem(TOKEN_KEY);
      if (!token) {
        throw new Error("No token found");
      }

      setAuthHeader(token);

      // Fetch user data with the token
      const userDataResponse = await axiosInst.get(`/user/me`);

      return {
        token,
        user: userDataResponse.data, // Assuming user data is returned in the response
      };
    } catch (error: any) {
      // Handle errors (e.g., invalid token or fetch error)
      return rejectWithValue(error.response?.data?.message || "Failed to load user data");
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const resp = await axiosInst.post('/auth/register', credentials);
      setAuthHeader(resp.data.token);
      await setItem(TOKEN_KEY, resp.data.token);
      return resp.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const resp = await axiosInst.post('/auth/login', credentials);
      setAuthHeader(resp.data.token);
      await setItem(TOKEN_KEY, resp.data.token);
      return resp.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const logOut = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInst.post('/auth/logout');
    clearAuthHeader();
    await deleteItem(TOKEN_KEY);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});


export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string) => {
    try {
      const response = await axiosInst.post(`/user/${userId}`, {});
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  }
);

export const fetchMyData = createAsyncThunk(
  'user/fetchMyData',
  async () => {
    try {
      const response = await axiosInst.get(`/user/me`, {});
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  }
);

export const updateMyData = createAsyncThunk(
  'user/updateMyData',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInst.put(`/user/me`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Сталася помилка під час редагування профіля');
    }
  }
);