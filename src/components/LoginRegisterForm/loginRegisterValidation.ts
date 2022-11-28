import {
  LoginRegisterValidationArgs,
  LoginRegisterFormVariant,
} from "./loginRegisterTypes";

export const validateForm = ({
  variant,
  formValues,
}: LoginRegisterValidationArgs) => {
  if (
    variant === LoginRegisterFormVariant.Login &&
    formValues.email &&
    formValues.password
  ) {
    return true;
  } else if (
    variant === LoginRegisterFormVariant.Register &&
    formValues.name &&
    formValues.email &&
    formValues.password
  ) {
    return true;
  } else {
    return false;
  }
};
