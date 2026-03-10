export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Activity {
  id: string;
  userId: number;
  type: ActivityType;
  duration: number;
  caloriesBurned: number;
  startTime: string;
  additionalMetrics?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}

export enum ActivityType {
  RUNNING = "RUNNING",
  WALKING = "WALKING",
  CYCLING = "CYCLING",
  SWIMMING = "SWIMMING",
  WEIGHT_TRAINING = "WEIGHT_TRAINING",
  YOGA = "YOGA",
  HIIT = "HIIT",
  CARDIO = "CARDIO",
  STRETCHING = "STRETCHING",
  OTHER = "OTHER",
}

export interface Recommendation {
  id: string;
  activityId: string;
  userId: number;
  activityType: ActivityType;
  recommendations: string;
  improvements: string[];
  suggestions: string[];
  safety: string[];
  createdAt: string;
}
