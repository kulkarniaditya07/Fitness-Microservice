import { apiConfig } from "@/config/api.config";
import { apiClient } from "@/services/api/apiClient";
import type { ApiResponse } from "@/types/api";
import type { Activity } from "@/types/models";

const base = apiConfig.activityBasePath;

export interface ActivityMutationRequest {
  userId: number;
  type: Activity["type"];
  duration: number;
  caloriesBurned: number;
  startTime: string;
  additionalMetrics?: Record<string, string | number | boolean>;
}

export const activityService = {
  trackActivity: async (payload: ActivityMutationRequest) => {
    const { data } = await apiClient.post<ApiResponse<Activity>>(base, payload);
    return data;
  },

  getActivity: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Activity>>(`${base}/${id}`);
    return data;
  },

  getUserActivities: async (userId: number, page = 1, limit = 20) => {
    const { data } = await apiClient.get<ApiResponse<Activity[]>>(
      `${base}/user/${userId}?page=${page}&limit=${limit}`,
    );
    return data;
  },

  updateActivity: async (id: string, payload: Partial<ActivityMutationRequest>) => {
    const { data } = await apiClient.put<ApiResponse<Activity>>(`${base}/${id}`, payload);
    return data;
  },

  deleteActivity: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<string>>(`${base}/${id}`);
    return data;
  },
};
