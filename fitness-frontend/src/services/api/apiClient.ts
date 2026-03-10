import axios, { AxiosError } from "axios";
import { ApiError, ApiErrorCode } from "@/types/api";

const isServer = typeof window === "undefined";

export const apiClient = axios.create({
  baseURL: isServer ? process.env.API_BASE_URL : "",
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (!isServer && typeof document !== "undefined") {
    const token = document.cookie.match(/next-auth.session-token=([^;]+)/)?.[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    if (!isServer && error.response?.status === 401) {
      window.location.href = "/auth/login?reason=session_expired";
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      success: false,
      error: {
        code: ApiErrorCode.INTERNAL_ERROR,
        message: "Unexpected network error",
      },
      timestamp: new Date().toISOString(),
    } as ApiError);
  },
);
