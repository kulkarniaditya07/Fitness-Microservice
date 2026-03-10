import { ActivityType } from "@/types/models";

export const APP_NAME = "Fitness Microservice";

export const ACTIVITY_TYPE_OPTIONS = [
  ActivityType.RUNNING,
  ActivityType.CYCLING,
  ActivityType.SWIMMING,
  ActivityType.YOGA,
  ActivityType.WALKING,
  ActivityType.WEIGHT_TRAINING,
  ActivityType.HIIT,
  ActivityType.CARDIO,
  ActivityType.STRETCHING,
  ActivityType.OTHER,
] as const;

export const PAGE_SIZE = 20;
