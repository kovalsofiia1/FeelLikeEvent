// src/redux/user/selectors.ts
import { RootState } from '../store'; // Make sure RootState is defined in your store file

// Selector to get the user data
export const selectUser = (state: RootState) => state.user.user;

// Selector to get the loading state
export const selectLoading = (state: RootState) => state.user.loading;

// Selector to get the error state
export const selectError = (state: RootState) => state.user.error;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
