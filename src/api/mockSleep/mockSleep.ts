import { useToast } from "@chakra-ui/react";
import { Sleep } from "models";
import { FormValues } from "pages/Home/components";
import { useGuestMode } from "providers";

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
type EditFormValues = FormValues & { sleepId: number };
type HandleEditArgs = {
  formValues: EditFormValues;
  formatDate: (date: string) => string;
  formatDuration: (duration: string) => number;
  closeModalCallback: () => void;
};
type HandleCreateArgs = {
  formValues: FormValues;
  formatDate: (date: string) => string;
  formatDuration: (duration: string) => number;
  closeModalCallback: () => void;
};
type UseMockSleepReturnVal = {
  data: Sleep[];
  totalPage: number | null;
  handleDelete: (args: HandleDeleteArgs) => void;
  handleEdit: (args: HandleEditArgs) => void;
  handleCreate: (args: HandleCreateArgs) => void;
};
export function useMockSleeps({
  page,
  pageSize,
}: UseMockSleepsArgs): UseMockSleepReturnVal {
  const { sleeps, setSleeps } = useGuestMode();

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
      setSleeps(sleeps.filter((sleep) => sleep.id !== deleteSleepId));

      toast({
        title: "Successfull",
        description: "Sleep is deleted",
        isClosable: true,
      });
      closeModalCallback();
    },
    handleEdit: ({
      formValues,
      formatDate,
      formatDuration,
      closeModalCallback,
    }) => {
      setSleeps(
        sleeps.map((sleep) => {
          if (sleep.id !== formValues.sleepId) {
            return sleep;
          } else {
            return {
              ...sleep,
              ...formValues,
              sleepDuration: formatDuration(formValues.totalSleep),
              date: formatDate(formValues.date),
            };
          }
        })
      );

      toast({
        title: "Successfull",
        description: "Sleep is edited",
        isClosable: true,
      });
      closeModalCallback();
    },
    handleCreate: ({
      formValues,
      formatDate,
      formatDuration,
      closeModalCallback,
    }) => {
      setSleeps([
        ...sleeps,
        {
          id: Date.now(),
          date: formatDate(formValues.date),
          sleepEnd: formValues.sleepEnd,
          sleepStart: formValues.sleepStart,
          sleepDuration: formatDuration(formValues.totalSleep),
        },
      ]);

      toast({
        title: "Successfull",
        description: "Sleep is created",
        isClosable: true,
      });
      closeModalCallback();
    },
  };
}
