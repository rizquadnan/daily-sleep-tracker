import { useToast } from "@chakra-ui/react";
import { LoginFormValue } from "components";
import { useAuth } from "providers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";

import { User } from "models";
import { fetcher } from "api/fetcher";
import { isAxiosError } from "api/utils";

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

type ErrorResponse = {
  message: string;
  statusCode: number;
};

type UseLoginReturnValue = {
  isSubmitting: boolean;
  handleLogin: (formValues: LoginFormValue) => void;
};

export function useLogin(): UseLoginReturnValue {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const authContext = useAuth();

  const handleLogin = async (formValues: LoginFormValue) => {
    setIsSubmitting(true);

    const body: LoginBody = {
      email: formValues.email,
      password: formValues.password,
    };

    try {
      const {
        data: { user, token },
      } = await fetcher.post<LoginResponse>("/auth/login", body);

      authContext.login(user, token);

      toast({
        title: "Successfull",
        description: "Welcome to daily sleep tracker!",
        isClosable: true,
      });

      navigate(ROUTES.home);
    } catch (error) {
      toast({
        title:
          isAxiosError<ErrorResponse>(error) && error.response
            ? error.response.data.message
            : "Something went wrong",
        status: "error",
        description: "Please try again",
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleLogin,
  };
}
