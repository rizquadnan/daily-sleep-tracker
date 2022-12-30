import { Sleep } from "models";
import { useLocalStorage } from "utils";
import { MOCK_SLEEPS } from "./mockData";

type CalculateTotalPageArgs = {
  totalRows: number;
  pageSize: number;
};
function calculateTotalPage({
  totalRows,
  pageSize,
}: CalculateTotalPageArgs): number {
  return Math.ceil(totalRows / pageSize);
}

type CalculateOffsetArgs = {
  page: number;
  pageSize: number;
};
function calculateOffset({ page, pageSize }: CalculateOffsetArgs): number {
  return (page - 1) * pageSize;
}

type CalculateLimitArgs = {
  page: number;
  pageSize: number;
};
function calculateLimit({ page, pageSize }: CalculateLimitArgs): number {
  return page * pageSize;
}

type UseMockSleepsArgs = {
  page?: number;
  pageSize?: number;
};
type UseMockSleepReturnVal = {
  data: Sleep[];
  totalPage: number | null;
};
export function useMockSleeps({
  page,
  pageSize,
}: UseMockSleepsArgs): UseMockSleepReturnVal {
  const [sleeps, setSleeps] = useLocalStorage<Sleep[]>(
    "mock-sleeps",
    MOCK_SLEEPS
  );

  const hasPagination = page && pageSize;

  return {
    data: hasPagination
      ? sleeps.slice(
          calculateOffset({ page, pageSize }),
          calculateLimit({ page, pageSize })
        )
      : sleeps,
    totalPage: hasPagination
      ? calculateTotalPage({ totalRows: sleeps.length, pageSize })
      : null,
  };
}
