import { useToast } from "@chakra-ui/react";
import { editSleep } from "api";
import { useAuth } from "providers";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { FormValues } from "../../../components";

type UseSubmitArgs = {
  closeModalCallback: () => void;
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

  const { mutate } = useSWRConfig();

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

        mutate("/sleeps");

        toast({
          title: "Successfull",
          description: "Sleep is edited",
          isClosable: true,
        });

        args.closeModalCallback();
      } catch (error) {
        toast({
          title: "Not successfull",
          description: "Something went wrong. Please retry to edit sleep",
          isClosable: true,
        });
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
