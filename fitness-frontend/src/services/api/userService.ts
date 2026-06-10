import { apiConfig } from "@/config/api.config";
import { apiClient } from "@/services/api/apiClient";
import type { ApiResponse } from "@/types/api";
import type {
  ChangePasswordRequest,
  User,
  UserRegisterRequest,
  UserUpdateRequest,
} from "@/types/models";

const base = apiConfig.userBasePath;

export const userService = {
  getUser: async (id: number) => {
    const { data } = await apiClient.get<ApiResponse<User>>(`${base}/${id}`);
    return data;
  },

  createUser: async (payload: UserRegisterRequest) => {
    const { data } = await apiClient.post<ApiResponse<string>>(`${base}/register`, payload);
    return data;
  },

  updateUser: async (id: number, payload: UserUpdateRequest) => {
    const { data } = await apiClient.put<ApiResponse<string>>(`${base}/${id}`, payload);
    return data;
  },

  deleteUser: async (id: number) => {
    const { data } = await apiClient.delete<ApiResponse<string>>(`${base}/${id}`);
    return data;
  },

  changePassword: async (id: number, payload: ChangePasswordRequest) => {
    const { data } = await apiClient.post<ApiResponse<string>>(
      `${base}/${id}/change-password`,
      payload,
    );
    return data;
  },
};
