import { useDisclosure, useToast } from "@chakra-ui/react";
import { createSleep } from "api";
import { useAuth, useGuestMode } from "providers";
import { useEffect, useState } from "react";
import { useApiError } from "utils";
import { FormValues } from "./components/HomeForm";

type UseSubmitArgs = {
  closeModalCallback: () => void;
  refetchSleeps: () => void;
};

type UseSubmitReturnVal = {
  isSubmitting: boolean;
  handleSubmit: (formValues: FormValues) => void;
};

export function useSubmit(args: UseSubmitArgs): UseSubmitReturnVal {
  const authContext = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const handleError = useApiError();

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

        args.refetchSleeps();

        toast({
          title: "Successfull",
          description: "New sleep data is added",
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

type UseGuestModeModalReturnValue = {
  isGuestMode: boolean;
  isGuestModeModalOpen: boolean;
  onCloseGuestModal: () => void;
};

export function useGuestModeModal(): UseGuestModeModalReturnValue {
  const {
    isGuestMode,
    isFirstTimeOpeningGuestMode,
    setIsFirstTimeOpeningGuestMode,
  } = useGuestMode();
  const {
    isOpen: isGuestModeModalOpen,
    onOpen: onOpenGuestModeModal,
    onClose: onCloseGuestModal,
  } = useDisclosure();

  useEffect(() => {
    if (isGuestMode && isFirstTimeOpeningGuestMode) {
      onOpenGuestModeModal();
      setIsFirstTimeOpeningGuestMode(false);
    }
  }, [
    onOpenGuestModeModal,
    isGuestMode,
    isFirstTimeOpeningGuestMode,
    setIsFirstTimeOpeningGuestMode,
  ]);

  return {
    isGuestMode,
    isGuestModeModalOpen,
    onCloseGuestModal,
  };
}
