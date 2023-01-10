import { Sleep } from "./sleep";

export type GuestModeState = {
  isFirstTimeOpeningGuestMode: boolean;
  isGuestMode: boolean;
  sleeps: Sleep[];
};
