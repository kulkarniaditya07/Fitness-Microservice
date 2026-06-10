"use client";

import { ActivityType } from "@/types/models";
import { ACTIVITY_TYPE_OPTIONS } from "@/utils/constants";
import { cn } from "@/utils/helpers";

interface ActivityTypeSelectorProps {
  value: ActivityType;
  onChange: (value: ActivityType) => void;
}

const iconMap: Record<ActivityType, string> = {
  [ActivityType.RUNNING]: "🏃",
  [ActivityType.WALKING]: "🚶",
  [ActivityType.CYCLING]: "🚴",
  [ActivityType.SWIMMING]: "🏊",
  [ActivityType.WEIGHT_TRAINING]: "🏋️",
  [ActivityType.YOGA]: "🧘",
  [ActivityType.HIIT]: "⚡",
  [ActivityType.CARDIO]: "❤️",
  [ActivityType.STRETCHING]: "🤸",
  [ActivityType.OTHER]: "🏅",
};

export const ActivityTypeSelector = ({ value, onChange }: ActivityTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {ACTIVITY_TYPE_OPTIONS.map((type) => (
        <button
          key={type}
          type="button"
          className={cn(
            "rounded-lg border p-3 text-left transition",
            value === type
              ? "border-primary bg-primary/10 text-primary"
              : "border-slate-200 hover:border-primary/50",
          )}
          onClick={() => onChange(type)}
          aria-label={`Select ${type.toLowerCase()} activity`}
        >
          <span className="text-lg" aria-hidden>
            {iconMap[type]}
          </span>
          <p className="mt-1 text-xs font-medium">{type}</p>
        </button>
      ))}
    </div>
  );
};
