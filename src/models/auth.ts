import { User } from "./user";

export type AuthState = {
  isAuthenticated: boolean;
  isGuestMode: boolean;
  user: User | null;
  token: string | null;
};
