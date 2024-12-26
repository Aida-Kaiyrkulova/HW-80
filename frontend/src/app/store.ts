import { configureStore } from "@reduxjs/toolkit";
import { UrlReducers } from "../features/UrlSlice.ts";

export const store = configureStore({
  reducer: {
    Url: UrlReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
