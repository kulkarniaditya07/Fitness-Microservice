"use client";

import { StatCard } from "@/components/dashboard/StatCard";

const stats = [
  { icon: "🔥", label: "Calories Burned", value: "5,240", trend: 12.4 },
  { icon: "⏱️", label: "Active Minutes", value: "460", trend: 8.2 },
  { icon: "🏃", label: "Workouts", value: "18", trend: -3.1 },
  { icon: "🎯", label: "Goal Completion", value: "92%", trend: 4.7 },
];

interface StatsOverviewProps {
  loading?: boolean;
}

export const StatsOverview = ({ loading }: StatsOverviewProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-32 animate-pulse rounded-xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};
