import { useToast } from "@chakra-ui/react";
import { createSleep } from "api";
import { useAuth } from "providers";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { FormValues } from "./components/HomeForm";

type UseSubmitArgs = {
  closeModalCallback: () => void;
};

type UseSubmitReturnVal = {
  isSubmitting: boolean;
  handleSubmit: (formValues: FormValues) => void;
};

export function useSubmit(args: UseSubmitArgs): UseSubmitReturnVal {
  const authContext = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const { mutate } = useSWRConfig();

  const handleSubmit = async (formValues: FormValues) => {
    const { date, sleepStart, sleepEnd } = formValues;

    if (authContext.isAuthenticated && authContext.user?.id) {
      setIsSubmitting(true);
      try {
        await createSleep({
          sleepStart,
          date,
          sleepEnd,
          userId: authContext.user.id,
        });

        mutate("/sleeps");

        toast({
          title: "Successfull",
          description: "New sleep data is added",
          isClosable: true,
        });

        args.closeModalCallback();
      } catch (error) {
        toast({
          title: "Not successfull",
          description: "Something went wrong. Please retry to add sleep",
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
