import { fetcher } from "shared/fetcher";

type RegisterBody = {
  email: string;
  password: string;
  name: string;
};

export const handleRegister = async (body: RegisterBody) => {
  return await fetcher.post("/auth/register", body);
};
