import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UrlShortenerState {
  shortenedUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UrlShortenerState = {
  shortenedUrl: null,
  loading: false,
  error: null,
};

const urlShortenerSlice = createSlice({
  name: "urlShortener",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<string>) {
      state.loading = false;
      state.shortenedUrl = action.payload;
    },
    failure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, success, failure } = urlShortenerSlice.actions;
export const UrlReducers = urlShortenerSlice.reducer;
