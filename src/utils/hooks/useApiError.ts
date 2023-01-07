import { useToast } from "@chakra-ui/react";
import { isAxiosError } from "api/utils";
import { useEffect, useState } from "react";

type ErrorResponse = {
  message: string;
  statusCode: number;
};

export function useApiError() {
  const toast = useToast();
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (error) {
      toast({
        title:
          isAxiosError<ErrorResponse>(error) && error.response
            ? error.response.data.message
            : "Something went wrong",
        status: "error",
        description: "Please try again",
        isClosable: true,
      });
    }
  }, [error, toast]);

  return setError;
}
