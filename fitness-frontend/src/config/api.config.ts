export const apiConfig = {
  userBasePath: process.env.NEXT_PUBLIC_USER_API ?? "/api/users",
  activityBasePath: process.env.NEXT_PUBLIC_ACTIVITY_API ?? "/api/activities",
  recommendationBasePath:
    process.env.NEXT_PUBLIC_RECOMMENDATION_API ?? "/api/recommendation",
  enableRecommendations:
    process.env.NEXT_PUBLIC_ENABLE_RECOMMENDATIONS === "true",
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
} as const;
