import { useToast } from "@chakra-ui/react";
import { deleteSleep } from "api";
import { useAuth } from "providers";
import { useState } from "react";

type UseDeleteArgs = {
  closeModalCallback: () => void;
  refetchSleeps: () => void;
};

type UseDeleteReturnVal = {
  isDeleting: boolean;
  handleDelete: (sleepId: number) => void;
};

export function useDelete(args: UseDeleteArgs): UseDeleteReturnVal {
  const authContext = useAuth();

  const [isDeleting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleDelete = async (sleepId: number) => {
    if (authContext.isAuthenticated && authContext.user?.id) {
      setIsSubmitting(true);
      try {
        await deleteSleep({
          sleepId,
        });

        args.refetchSleeps();

        toast({
          title: "Successfull",
          description: "Sleep is deleted",
          isClosable: true,
        });

        args.closeModalCallback();
      } catch (error) {
        toast({
          title: "Not successfull",
          description: "Something went wrong. Please retry to delete sleep",
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
