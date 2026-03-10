"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { HealthChart } from "@/components/dashboard/HealthChart";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useActivities } from "@/hooks/useActivities";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? 1;
  const activitiesQuery = useActivities(userId, 1, 10);

  const activities = useMemo(() => activitiesQuery.data?.data ?? [], [activitiesQuery.data]);

  if (status === "loading" || activitiesQuery.isLoading) {
    return <LoadingSpinner label="Loading dashboard..." />;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="text-sm text-slate-600">Your performance and recent activity overview.</p>
      </header>

      <StatsOverview />
      <HealthChart />

      {activitiesQuery.isError ? (
        <div className="alert alert-error">Unable to load recent activities.</div>
      ) : (
        <RecentActivities activities={activities} />
      )}
    </section>
  );
}
