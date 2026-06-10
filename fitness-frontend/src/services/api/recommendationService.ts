import { apiConfig } from "@/config/api.config";
import { apiClient } from "@/services/api/apiClient";
import type { ApiResponse } from "@/types/api";
import { ActivityType, type Recommendation } from "@/types/models";

const base = apiConfig.recommendationBasePath;

interface RecommendationApiModel {
  id?: string;
  activityId?: string;
  userId?: number;
  type?: ActivityType;
  activityType?: ActivityType;
  recommendations?: string;
  improvements?: string[];
  suggestions?: string[];
  safety?: string[];
  createdAt?: string;
}

const normalizeRecommendation = (payload: RecommendationApiModel): Recommendation => ({
  id: payload.id ?? "",
  activityId: payload.activityId ?? "",
  userId: payload.userId ?? 0,
  activityType: payload.activityType ?? payload.type ?? ActivityType.OTHER,
  recommendations: payload.recommendations ?? "",
  improvements: payload.improvements ?? [],
  suggestions: payload.suggestions ?? [],
  safety: payload.safety ?? [],
  createdAt: payload.createdAt ?? new Date().toISOString(),
});

export const recommendationService = {
  getUserRecommendations: async (userId: number) => {
    const { data } = await apiClient.get<ApiResponse<RecommendationApiModel[]>>(
      `${base}/user/${userId}`,
    );
    return {
      ...data,
      data: (data.data ?? []).map(normalizeRecommendation),
    };
  },

  getActivityRecommendation: async (activityId: string) => {
    const { data } = await apiClient.get<ApiResponse<RecommendationApiModel>>(
      `${base}/activity/${activityId}`,
    );
    return {
      ...data,
      data: normalizeRecommendation(data.data ?? {}),
    };
  },

  generateRecommendations: async (userId: number) => {
    const { data } = await apiClient.post<ApiResponse<RecommendationApiModel[]>>(
      `${base}/generate/${userId}`,
    );
    return {
      ...data,
      data: (data.data ?? []).map(normalizeRecommendation),
    };
  },
};
