import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInst, setAuthHeader, clearAuthHeader } from '../../api/axiosSetUp';

// interface RegisterCredentials {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string
// }

// interface LoginCredentials {
//   email: string;
//   password: string;
// }


// export const register = createAsyncThunk(
//   'auth/register',
//   async (credentials: RegisterCredentials, thunkAPI) => {
//     try {
//       const resp = await axiosInst.post('/register', credentials);
//       setAuthHeader(resp.data.token);
//       return resp.data;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//       return thunkAPI.rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// export const logIn = createAsyncThunk(
//   'auth/login',
//   async (credentials: LoginCredentials, thunkAPI) => {
//     try {
//       const resp = await axiosInst.post('/login', credentials);
//       setAuthHeader(resp.data.token);
//       return resp.data;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//       return thunkAPI.rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// export const logOut = createAsyncThunk('/logout', async (_, thunkAPI) => {
//   try {
//     await axiosInst.post('/logout');
//     clearAuthHeader();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//     return thunkAPI.rejectWithValue('An unknown error occurred');
//   }
// });