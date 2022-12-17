import { AxiosResponse } from "axios";
import { GetSleepsResponse, Sleep } from "models";
import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "./fetcher";
import { FetchState, getFetchState } from "./utils";

type UseSleepsArgs = {
  shouldFetch: boolean;
  userId?: number;
  page?: number;
  pageSize?: number;
};

type UseSleepReturnVal = {
  data: Sleep[] | null;
  totalPage: number | null;
  state: FetchState;
  error: any | null;
  mutate: KeyedMutator<AxiosResponse<GetSleepsResponse, any>>;
};

export function useSleeps({
  shouldFetch,
  userId,
  page,
  pageSize,
}: UseSleepsArgs): UseSleepReturnVal {
  const res = useSWR<AxiosResponse<GetSleepsResponse>>(
    shouldFetch
      ? `/sleeps?user=${userId}&page=${page}&page_size=${pageSize}`
      : null,
    (url) => fetcher.get(url)
  );

  const { mutate } = res;

  return {
    data: res.data?.data.rows ?? null,
    totalPage: res.data?.data.totalPage ?? null,
    state: getFetchState({
      idle: !shouldFetch,
      error: res.error,
      success: res.data !== undefined,
    }),
    error: res.error ?? null,
    mutate,
  };
}

type CreateSleepRequest = {
  date: string;
  sleepStart: string;
  sleepEnd: string;
  userId: number;
};

export function createSleep(body: CreateSleepRequest) {
  return fetcher.post("/sleeps", body);
}
