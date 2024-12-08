// // src/redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './user/reducer';
// // Create Redux store
// import { combineReducers } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { isWeb } from '../utils/storage';
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//   user: userReducer,
//   // events: eventReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage: isWeb ? storage : AsyncStorage,
//   whitelist: ["user"], // Persist auth state only
// };


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Needed for persisting with AsyncStorage
//     }),
// });

// export const persistor = persistStore(store);
// export default store;

// // Export types for state and dispatch
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
// Create Redux store
import { combineReducers } from "redux";

// src/redux/store.ts

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;


// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
