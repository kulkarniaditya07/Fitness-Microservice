"use client";

import { PieChart } from "@/components/charts/PieChart";

export const ActivityStats = () => {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Total Workouts</p>
          <p className="mt-1 text-2xl font-bold text-dark">42</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">This Week</p>
          <p className="mt-1 text-2xl font-bold text-dark">7</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Best Day</p>
          <p className="mt-1 text-2xl font-bold text-dark">Thursday</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-dark">Activity Breakdown</h3>
        <div className="mt-3">
          <PieChart
            data={{
              labels: ["Running", "Cycling", "Gym", "Yoga"],
              datasets: [
                {
                  data: [35, 25, 25, 15],
                  backgroundColor: ["#0066CC", "#00A896", "#FF9500", "#2DBA4E"],
                },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
