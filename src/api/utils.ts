import axios, { AxiosError } from "axios";

type GetFetchStateArgs = {
  idle: boolean;
  error: boolean;
  success: boolean;
};

export type FetchState = "idle" | "error" | "loading" | "success";

export function getFetchState({
  idle,
  error,
  success,
}: GetFetchStateArgs): FetchState {
  if (idle) {
    return "idle";
  } else if (error) {
    return "error";
  } else if (success) {
    return "success";
  } else {
    return "loading";
  }
}

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}
