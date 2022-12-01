import { Sleep } from "./sleep";

export type User = {
  email: string;
  id: number;
  name: string;
  sleeps: Array<Sleep>;
};
