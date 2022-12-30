import { useToast } from "@chakra-ui/react";
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
type HandleDeleteArgs = {
  deleteSleepId: number;
  closeModalCallback: () => void;
};
type UseMockSleepReturnVal = {
  data: Sleep[];
  totalPage: number | null;
  handleDelete: (args: HandleDeleteArgs) => void;
};
export function useMockSleeps({
  page,
  pageSize,
}: UseMockSleepsArgs): UseMockSleepReturnVal {
  const [sleeps, setSleeps] = useLocalStorage<Sleep[]>(
    "mock-sleeps",
    MOCK_SLEEPS
  );
  const toast = useToast();

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
    handleDelete: ({ deleteSleepId, closeModalCallback }) => {
      setSleeps((prev) => {
        return prev.filter((sleep) => sleep.id !== deleteSleepId);
      });

      toast({
        title: "Successfull",
        description: "Sleep is deleted",
        isClosable: true,
      });
      closeModalCallback();
    },
  };
}
