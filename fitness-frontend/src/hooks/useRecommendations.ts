"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recommendationService } from "@/services/api/recommendationService";

export const useRecommendations = (userId: number) => {
  return useQuery({
    queryKey: ["recommendations", userId],
    queryFn: () => recommendationService.getUserRecommendations(userId),
    staleTime: 10 * 60 * 1000,
    enabled: userId > 0,
  });
};

export const useGenerateRecommendations = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => recommendationService.generateRecommendations(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations", userId] });
    },
  });
};
