import { failure, startLoading, success } from "./UrlSlice.ts";
import { AppDispatch } from "../app/store.ts";
import axiosApi from "../axiosApi.ts";

export const shortenUrl = (url: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosApi.post("/links", { url });
    dispatch(success(response.data.shortUrl));
  } catch (error) {
    dispatch(failure("Failed to shorten the URL."));
  }
};
