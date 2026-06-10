import { format } from "date-fns";

export const formatDate = (date: string | Date, dateFormat = "PPP") => {
  try {
    return format(new Date(date), dateFormat);
  } catch {
    return "Invalid date";
  }
};

export const formatDuration = (minutes: number) => `${minutes} min`;

export const formatCalories = (calories: number) => `${calories} kcal`;

export const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
