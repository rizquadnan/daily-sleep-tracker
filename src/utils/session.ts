import { AuthState } from "models";

export const getToken = () => {
  try {
    const res =
      window.localStorage.getItem("auth") != null
        ? (JSON.parse(
            window.localStorage.getItem("auth") as string
          ) as AuthState)
        : null;

    return res !== null && res.token != null ? res.token : null;
  } catch (error) {
    return null;
  }
};

export const prependTokenWithBearer = (token: string) => `Bearer ${token}`;
