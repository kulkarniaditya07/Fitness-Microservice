"use client";

import { useMemo, useState } from "react";
import type { Activity } from "@/types/models";
import { formatCalories, formatDate, formatDuration } from "@/utils/formatters";

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<"date" | "calories">("date");

  const filteredActivities = useMemo(() => {
    const base = activities.filter((activity) =>
      activity.type.toLowerCase().includes(query.toLowerCase()),
    );

    return base.sort((a, b) => {
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    });
  }, [activities, query, sortBy]);

  if (filteredActivities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
        <h3 className="text-lg font-semibold text-dark">No activities found</h3>
        <p className="mt-1 text-sm text-slate-500">Try adjusting search or filters.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          className="input input-bordered w-full sm:max-w-xs"
          placeholder="Search by activity type"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "date" | "calories")}
          >
            <option value="date">Sort: Date</option>
            <option value="calories">Sort: Calories</option>
          </select>

          <div className="join">
            <button
              type="button"
              className={`join-item btn btn-sm ${view === "table" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setView("table")}
            >
              Table
            </button>
            <button
              type="button"
              className={`join-item btn btn-sm ${view === "cards" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setView("cards")}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.type}</td>
                  <td>{formatDuration(activity.duration)}</td>
                  <td>{formatCalories(activity.caloriesBurned)}</td>
                  <td>{formatDate(activity.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredActivities.map((activity) => (
            <article key={activity.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-dark">{activity.type}</h3>
              <p className="mt-1 text-sm text-slate-600">{formatDate(activity.startTime)}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span>{formatDuration(activity.duration)}</span>
                <span>{formatCalories(activity.caloriesBurned)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
