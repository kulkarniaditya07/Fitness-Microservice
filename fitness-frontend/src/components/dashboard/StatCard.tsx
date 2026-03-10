"use client";

import { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend: number;
}

export const StatCard = ({ icon, label, value, trend }: StatCardProps) => {
  const trendUp = trend >= 0;

  return (
    <div className="card border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <span className="text-xl" aria-hidden>
            {icon}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-dark">{value}</h3>
        <p className={cn("text-sm", trendUp ? "text-success" : "text-danger")}>
          {trendUp ? "▲" : "▼"} {Math.abs(trend)}%
        </p>
      </div>
    </div>
  );
};
