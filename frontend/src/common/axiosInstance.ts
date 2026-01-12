import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

import { getToken, isTokenExpired, logout } from "./Auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      if (isTokenExpired(token)) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/refresh-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          );

          const newAccessToken = res.data.accesstoken;
          localStorage.setItem("token", newAccessToken);

          config.headers.Authorization = `Bearer ${newAccessToken}`;

        } catch (err) {
          logout();
          window.location.href = "/login";
          return Promise.reject(err);
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default api;
