"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activityService, ActivityMutationRequest } from "@/services/api/activityService";

export const useActivities = (userId: number, page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["activities", userId, page, limit],
    queryFn: () => activityService.getUserActivities(userId, page, limit),
    staleTime: 5 * 60 * 1000,
    enabled: userId > 0,
  });
};

export const useTrackActivity = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ActivityMutationRequest) => activityService.trackActivity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", userId] });
    },
  });
};
