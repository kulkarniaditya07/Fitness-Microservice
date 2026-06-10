"use client";

import { useMemo, useState } from "react";
import { LineChart } from "@/components/charts/LineChart";

const buildData = (days: 7 | 30) => {
  const labels = Array.from({ length: days }, (_, idx) => `Day ${idx + 1}`);
  const values = labels.map((_, idx) => 450 + Math.round(Math.sin(idx / 2) * 80) + idx * 5);
  return { labels, values };
};

export const HealthChart = () => {
  const [windowDays, setWindowDays] = useState<7 | 30>(7);

  const chartData = useMemo(() => {
    const { labels, values } = buildData(windowDays);

    return {
      labels,
      datasets: [
        {
          label: "Calories Burned",
          data: values,
          borderColor: "#0066CC",
          backgroundColor: "rgba(0, 102, 204, 0.15)",
          fill: true,
          tension: 0.3,
        },
      ],
    };
  }, [windowDays]);

  return (
    <div className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-dark">Health Trends</h3>
          <div className="join">
            <button
              type="button"
              className={`join-item btn btn-sm ${windowDays === 7 ? "btn-primary" : "btn-outline"}`}
              onClick={() => setWindowDays(7)}
            >
              7 Days
            </button>
            <button
              type="button"
              className={`join-item btn btn-sm ${windowDays === 30 ? "btn-primary" : "btn-outline"}`}
              onClick={() => setWindowDays(30)}
            >
              30 Days
            </button>
          </div>
        </div>
        <LineChart
          data={chartData}
          options={{
            responsive: true,
            plugins: { tooltip: { enabled: true } },
            scales: { y: { beginAtZero: false } },
          }}
        />
      </div>
    </div>
  );
};
