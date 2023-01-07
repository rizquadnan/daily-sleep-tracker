import { useToast } from "@chakra-ui/react";
import { editSleep } from "api";
import { useAuth } from "providers";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { useApiError } from "utils";
import { FormValues } from "../../../components";

type UseSubmitArgs = {
  closeModalCallback: () => void;
  refetchSleeps: () => void;
};

type EditFormValues = FormValues & { sleepId: number };

type UseSubmitReturnVal = {
  isSubmitting: boolean;
  handleSubmit: (formValues: EditFormValues) => void;
};

export function useSubmit(args: UseSubmitArgs): UseSubmitReturnVal {
  const authContext = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const handleError = useApiError();

  const handleSubmit = async (formValues: EditFormValues) => {
    const { date, sleepStart, sleepEnd } = formValues;

    if (authContext.isAuthenticated && authContext.user?.id) {
      setIsSubmitting(true);
      try {
        await editSleep({
          sleepStart,
          date,
          sleepEnd,
          sleepId: formValues.sleepId,
        });

        args.refetchSleeps();

        toast({
          title: "Successfull",
          description: "Sleep is edited",
          isClosable: true,
        });

        args.closeModalCallback();
      } catch (error) {
        handleError(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
}
