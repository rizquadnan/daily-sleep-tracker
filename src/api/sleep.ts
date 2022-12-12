import { AxiosResponse } from "axios";
import { Sleep } from "models";
import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "./fetcher";
import { FetchState, getFetchState } from "./utils";

type UseSleepsArgs = {
  shouldFetch: boolean;
  userId?: number;
};

type UseSleepReturnVal = {
  data: Sleep[] | null;
  state: FetchState;
  error: any | null;
  mutate: KeyedMutator<AxiosResponse<Sleep[], any>>;
};

export function useSleeps({
  shouldFetch,
  userId,
}: UseSleepsArgs): UseSleepReturnVal {
  const res = useSWR<AxiosResponse<Sleep[]>>(
    shouldFetch ? `/sleeps` : null,
    (url) => fetcher.get(url, { params: { user: userId } })
  );

  const { mutate } = res;

  return {
    data: res.data?.data ?? null,
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
