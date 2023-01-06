import axios from "axios";
import { getToken } from "utils/session";

const PROD_URL = process.env.REACT_APP_API_PROD_URL;
const DEV_URL = process.env.REACT_APP_API_DEV_URL;
const BASE_URL = process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;

const fetcher = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 10000,
});

fetcher.interceptors.request.use(function (config) {
  const token = getToken();

  if (config.headers && token) {
    config.headers.Authorization = token;
  }

  return config;
});

export { fetcher };
