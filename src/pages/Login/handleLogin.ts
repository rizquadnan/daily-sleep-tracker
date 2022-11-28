import { fetcher } from "shared/fetcher";

type LoginBody = {
  email: string;
  password: string;
};

export const handleLogin = async (body: LoginBody) => {
  return await fetcher.post("/auth/login", body);
};
