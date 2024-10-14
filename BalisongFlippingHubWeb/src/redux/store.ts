import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import collectionReducer from "./collection/collectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
