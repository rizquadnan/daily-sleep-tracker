import { AxiosResponse } from "axios";
import { Sleep } from "models";
import useSWR from "swr";
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
};

export function useSleeps({
  shouldFetch,
  userId,
}: UseSleepsArgs): UseSleepReturnVal {
  const res = useSWR<AxiosResponse<Sleep[]>>(
    shouldFetch ? `/sleeps` : null,
    (url) => fetcher.get(url, { params: { user: userId } })
  );

  return {
    data: res.data?.data ?? null,
    state: getFetchState({
      idle: !shouldFetch,
      error: res.error,
      success: res.data !== undefined,
    }),
    error: res.error ?? null,
  };
}
