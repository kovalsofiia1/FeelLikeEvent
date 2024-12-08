// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { setAuthHeader } from '../../api/axiosSetUp';
// import {
//   register,
//   logIn,
//   logOut,
//   // refreshUser, // Uncomment if you're using this
// } from './operations';

// // Define the type for the user object
// interface User {
//   firstName: string | null;
//   lastName: string | null;
//   email: string | null;
//   avatarURL: string | null;
// }

// // Define the initial state type
// interface AuthState {
//   user: User;
//   token: string | null;
//   isLoggedIn: boolean;
//   isRefreshing: boolean;
//   error: string | null;
// }

// // Define the initial state using the type
// const initialState: AuthState = {
//   user: { firstName: null, lastName: null, email: null, avatarURL: '' },
//   token: null,
//   isLoggedIn: false,
//   isRefreshing: true,
//   error: null,
// };

// // Create the slice with the correct types
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     resetRefreshState(state, action: PayloadAction<boolean>) {
//       state.isRefreshing = action.payload;
//     },
//     saveToken(state, action: PayloadAction<string>) {
//       state.token = action.payload;
//       setAuthHeader(state.token);
//     },
//   },
//   extraReducers: builder => {
//     builder
//     // Typing for register async actions
//     // .addCase(register.pending, state => {
//     //   state.error = null;
//     //   state.isLoggedIn = false;
//     // })
//     // .addCase(register.fulfilled, (state, action) => {
//     //   state.user = action.payload.user;
//     //   state.token = action.payload.token;
//     //   state.isLoggedIn = true;
//     //   state.error = null;
//     // })
//     // .addCase(register.rejected, (state, action) => {
//     //   state.error = action.payload as string;
//     // })

//     // // Typing for logIn async actions
//     // .addCase(logIn.pending, state => {
//     //   state.error = null;
//     //   state.isLoggedIn = false;
//     // })
//     // .addCase(logIn.fulfilled, (state, action) => {
//     //   state.user = action.payload.user;
//     //   state.token = action.payload.token;
//     //   state.isLoggedIn = true;
//     //   state.error = null;
//     // })
//     // .addCase(logIn.rejected, (state, action) => {
//     //   state.error = action.payload as string;
//     // })

//     // // Typing for logOut async actions
//     // .addCase(logOut.pending, state => {
//     //   state.error = null;
//     // })
//     // .addCase(logOut.fulfilled, state => {
//     //   state.user = { firstName: null, lastName: null, email: null, avatarURL: null };
//     //   state.token = null;
//     //   state.isLoggedIn = false;
//     //   state.error = null;
//     // })
//     // .addCase(logOut.rejected, (state, action) => {
//     //   state.error = action.payload as string;
//     // })

//     // // Typing for refreshUser async actions
//     // .addCase(refreshUser.pending, state => {
//     //   state.isRefreshing = true;
//     //   state.isLoggedIn = false;
//     //   state.error = null;
//     // })
//     // .addCase(refreshUser.fulfilled, (state, action) => {
//     //   state.user = action.payload;
//     //   state.isLoggedIn = true;
//     //   state.isRefreshing = false;
//     //   state.error = null;
//     // })
//     // .addCase(refreshUser.rejected, (state, action) => {
//     //   state.isRefreshing = false;
//     //   state.error = action.payload;
//     // });
//   },
// });

// export const { resetRefreshState, saveToken } = authSlice.actions;
// export default authSlice.reducer;
