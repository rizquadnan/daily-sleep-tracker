import { isAxiosError } from "axios";
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
  error: string | null;
  mutate: KeyedMutator<GetSleepsResponse>;
};

export function useSleeps({
  shouldFetch,
  userId,
  page,
  pageSize,
}: UseSleepsArgs): UseSleepReturnVal {
  const res = useSWR<GetSleepsResponse>(
    shouldFetch
      ? `/sleeps?user=${userId}&page=${page}&page_size=${pageSize}`
      : null,
    (url) => fetcher.get(url).then((res) => res.data)
  );

  const { mutate } = res;

  return {
    data: res.data?.rows ?? null,
    totalPage: res.data?.totalPage ?? null,
    state: getFetchState({
      idle: !shouldFetch,
      error: res.error,
      success: res.data !== undefined,
    }),
    error: res.error && isAxiosError(res.error) ? res.error.message : null,
    mutate,
  };
}

type CreateSleepRequest = {
  date: string;
  sleepStart: string;
  sleepEnd: string;
  userId: number;
};

type EditSleepRequest = {
  sleepId: number;
  date: string;
  sleepStart: string;
  sleepEnd: string;
};

type DeleteSleepRequest = {
  sleepId: number;
};

export function createSleep(body: CreateSleepRequest) {
  return fetcher.post("/sleeps", body);
}

export function editSleep({ sleepId, ...rest }: EditSleepRequest) {
  return fetcher.patch(`/sleeps/${sleepId}`, rest);
}

export function deleteSleep({ sleepId }: DeleteSleepRequest) {
  return fetcher.delete(`/sleeps/${sleepId}`);
}
