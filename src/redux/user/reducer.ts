// src/redux/user/reducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchMyData, fetchUserData, loadTokenFromStorage, logIn, logOut, register } from './actions';
import { UserState } from './types';

const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Define the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTokenFromStorage.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // state.user = action.payload.user; // Save user data to the state
      })
      .addCase(loadTokenFromStorage.rejected, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(register.pending, state => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Typing for logIn async actions
      .addCase(logIn.pending, state => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Typing for logOut async actions
      .addCase(logOut.pending, state => {
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(fetchMyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyData.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch data';
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
