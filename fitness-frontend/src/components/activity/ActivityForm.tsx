"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityType } from "@/types/models";
import { ActivityTypeSelector } from "@/components/activity/ActivityTypeSelector";

const schema = z.object({
  type: z.nativeEnum(ActivityType),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  caloriesBurned: z.coerce.number().min(1, "Calories must be at least 1"),
  startTime: z.string().min(1, "Date/time is required"),
  additionalMetrics: z.string().optional(),
});

export type ActivityFormValues = z.infer<typeof schema>;
type ActivityFormInput = z.input<typeof schema>;

interface ActivityFormProps {
  initialValues?: Partial<ActivityFormValues>;
  onSubmit: (values: ActivityFormValues) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
}

export const ActivityForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save activity",
}: ActivityFormProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormInput, unknown, ActivityFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: initialValues?.type ?? ActivityType.RUNNING,
      duration: initialValues?.duration ?? 30,
      caloriesBurned: initialValues?.caloriesBurned ?? 250,
      startTime: initialValues?.startTime ?? "",
      additionalMetrics: initialValues?.additionalMetrics ?? "",
    },
  });

  useEffect(() => {
    if (!initialValues?.type) return;
    setValue("type", initialValues.type);
  }, [initialValues?.type, setValue]);

  useEffect(() => {
    if (initialValues?.startTime) return;
    setValue("startTime", new Date().toISOString().slice(0, 16));
  }, [initialValues?.startTime, setValue]);

  const selectedType = useWatch({ control, name: "type" }) ?? ActivityType.RUNNING;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="mb-2 block text-sm font-medium text-dark">Activity type</label>
        <ActivityTypeSelector value={selectedType} onChange={(value) => setValue("type", value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="duration" className="label-text text-sm font-medium text-dark">
            Duration (minutes)
          </label>
          <input id="duration" type="number" className="input input-bordered mt-1 w-full" {...register("duration")} />
          {errors.duration ? <p className="mt-1 text-xs text-danger">{errors.duration.message}</p> : null}
        </div>

        <div>
          <label htmlFor="caloriesBurned" className="label-text text-sm font-medium text-dark">
            Calories burned
          </label>
          <input
            id="caloriesBurned"
            type="number"
            className="input input-bordered mt-1 w-full"
            {...register("caloriesBurned")}
          />
          {errors.caloriesBurned ? (
            <p className="mt-1 text-xs text-danger">{errors.caloriesBurned.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="startTime" className="label-text text-sm font-medium text-dark">
          Date and time
        </label>
        <input id="startTime" type="datetime-local" className="input input-bordered mt-1 w-full" {...register("startTime")} />
        {errors.startTime ? <p className="mt-1 text-xs text-danger">{errors.startTime.message}</p> : null}
      </div>

      <details className="rounded-lg border border-slate-200 p-3">
        <summary className="cursor-pointer text-sm font-medium text-dark">Additional metrics (optional)</summary>
        <textarea
          className="textarea textarea-bordered mt-3 w-full"
          rows={3}
          placeholder="JSON or notes"
          {...register("additionalMetrics")}
        />
      </details>

      <div className="flex justify-end gap-2">
        {onCancel ? (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};
