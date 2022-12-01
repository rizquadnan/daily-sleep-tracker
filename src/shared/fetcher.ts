import axios from "axios";
import { getToken } from "utils/session";

const fetcher = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 1000,
});

fetcher.interceptors.request.use(function (config) {
  const token = getToken();

  if (config.headers && token) {
    config.headers.Authorization = token;
  }

  return config;
});

export { fetcher };
