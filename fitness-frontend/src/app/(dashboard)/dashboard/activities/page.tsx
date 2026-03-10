"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { ActivityList } from "@/components/activity/ActivityList";
import { ActivityStats } from "@/components/activity/ActivityStats";
import { ActivityTracker } from "@/components/activity/ActivityTracker";
import type { ActivityFormValues } from "@/components/activity/ActivityForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useActivities, useTrackActivity } from "@/hooks/useActivities";

const parseAdditionalMetrics = (rawMetrics?: string) => {
  if (!rawMetrics?.trim()) return undefined;
  try {
    const parsed = JSON.parse(rawMetrics) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string | number | boolean>;
    }
    return { notes: rawMetrics };
  } catch {
    return { notes: rawMetrics };
  }
};

export default function ActivitiesPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? 1;
  const activitiesQuery = useActivities(userId);
  const trackActivity = useTrackActivity(userId);

  const activities = useMemo(() => activitiesQuery.data?.data ?? [], [activitiesQuery.data]);

  const handleTrack = async (values: ActivityFormValues) => {
    await trackActivity.mutateAsync({
      userId,
      type: values.type,
      duration: values.duration,
      caloriesBurned: values.caloriesBurned,
      startTime: new Date(values.startTime).toISOString(),
      additionalMetrics: parseAdditionalMetrics(values.additionalMetrics),
    });
  };

  if (status === "loading" || activitiesQuery.isLoading) {
    return <LoadingSpinner label="Loading activities..." />;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-dark">Activities</h1>
        <p className="text-sm text-slate-600">Log and manage your workouts.</p>
      </header>

      <ActivityTracker onTracked={handleTrack} />
      <ActivityStats />

      {activitiesQuery.isError ? (
        <div className="alert alert-error">
          Unable to load activities. Please refresh and try again.
        </div>
      ) : (
        <ActivityList activities={activities} />
      )}
    </section>
  );
}
