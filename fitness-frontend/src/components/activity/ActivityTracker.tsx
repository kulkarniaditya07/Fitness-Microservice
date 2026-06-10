"use client";

import { useState } from "react";
import { ActivityForm, ActivityFormValues } from "@/components/activity/ActivityForm";
import { useNotificationStore } from "@/store/notificationStore";

interface ActivityTrackerProps {
  onTracked?: (values: ActivityFormValues) => Promise<void> | void;
}

export const ActivityTracker = ({ onTracked }: ActivityTrackerProps) => {
  const addNotification = useNotificationStore((state) => state.add);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: ActivityFormValues) => {
    setErrorMessage(null);

    try {
      await onTracked?.(values);
      addNotification({
        type: "success",
        message: "Activity logged successfully",
      });
    } catch {
      setErrorMessage("Failed to save activity. Please try again.");
      addNotification({
        type: "error",
        message: "Unable to log activity",
      });
    }
  };

  return (
    <section className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body p-4">
        <h2 className="text-xl font-semibold text-dark">Activity Tracker</h2>
        <p className="text-sm text-slate-500">Log workouts and training sessions.</p>
        {errorMessage ? <div className="alert alert-error mt-3 text-sm">{errorMessage}</div> : null}
        <div className="mt-3">
          <ActivityForm onSubmit={handleSubmit} submitLabel="Log activity" />
        </div>
      </div>
    </section>
  );
};
