import { RegisterFormValue } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { fetcher } from "api";
import { useApiError } from "utils";

type UseRegisterReturnValue = {
  isSubmitting: boolean;
  handleRegister: (formValues: RegisterFormValue) => void;
};

type RegisterBody = {
  email: string;
  password: string;
  name: string;
};

export function useRegister(): UseRegisterReturnValue {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleError = useApiError();

  const handleRegister = async (formValues: RegisterFormValue) => {
    setIsSubmitting(true);

    const body: RegisterBody = formValues;
    try {
      await fetcher.post("/auth/register", body);

      setIsSubmitting(false);

      toast({
        title: "Account created!",
        description: "To use the app. Please login with your credentials",
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleRegister,
  };
}
