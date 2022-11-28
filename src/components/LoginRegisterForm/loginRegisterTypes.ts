export enum LoginRegisterFormVariant {
  Login = "login",
  Register = "register",
}

export type LoginFormValue = {
  name?: string;
  email: string;
  password: string;
};

export type RegisterFormValue = {
  name: string;
  email: string;
  password: string;
};

type LoginRegisterFormBase = {
  isLoading?: boolean;
};

export type LoginRegisterFormProps = (
  | {
      variant: LoginRegisterFormVariant.Login;
      onSubmit: (formValues: LoginFormValue) => void;
    }
  | {
      variant: LoginRegisterFormVariant.Register;
      onSubmit: (formValues: RegisterFormValue) => void;
    }
) &
  LoginRegisterFormBase;

export type LoginRegisterFormValue = LoginFormValue | RegisterFormValue;

export type LoginRegisterValidationArgs =
  | {
      variant: LoginRegisterFormVariant.Login;
      formValues: Partial<LoginFormValue>;
    }
  | {
      variant: LoginRegisterFormVariant.Register;
      formValues: Partial<RegisterFormValue>;
    };
