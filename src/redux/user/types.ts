// src/redux/user/types.ts

// Define the User type

type UserStatus = 'USER' | 'ADMIN' | 'VERIFIED_USER';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarURL?: string | null;
  status: UserStatus;
  interests: []
}

// Define the initial state structure for the user slice
export interface UserState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}
