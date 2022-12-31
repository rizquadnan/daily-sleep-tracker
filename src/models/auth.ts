import { User } from "./user";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};
