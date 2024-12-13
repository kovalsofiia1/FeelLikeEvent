// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import eventsReducer from './events/reducer';
import adminReducer from './admin/reducer';
// Create Redux store
import { combineReducers } from "redux";

// src/redux/store.ts

const rootReducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
  admin: adminReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;


// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
