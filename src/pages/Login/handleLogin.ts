import { User } from "models";
import { fetcher } from "shared/fetcher";

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

export const handleLogin = async (body: LoginBody) => {
  return await fetcher.post<LoginResponse>("/auth/login", body);
};
