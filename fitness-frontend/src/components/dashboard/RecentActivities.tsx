"use client";

import { useMemo, useState } from "react";
import type { Activity } from "@/types/models";
import { formatCalories, formatDate, formatDuration } from "@/utils/formatters";

interface RecentActivitiesProps {
  activities: Activity[];
  pageSize?: number;
}

export const RecentActivities = ({ activities, pageSize = 5 }: RecentActivitiesProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(activities.length / pageSize));

  const rows = useMemo(
    () => activities.slice((page - 1) * pageSize, page * pageSize),
    [activities, page, pageSize],
  );

  return (
    <div className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body p-4">
        <h3 className="text-lg font-semibold text-dark">Recent Activities</h3>
        <div className="overflow-x-auto">
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.type}</td>
                  <td>{formatDuration(activity.duration)}</td>
                  <td>{formatCalories(activity.caloriesBurned)}</td>
                  <td>{formatDate(activity.startTime, "PPP")}</td>
                  <td className="space-x-2">
                    <button type="button" className="btn btn-xs btn-outline">
                      Edit
                    </button>
                    <button type="button" className="btn btn-xs btn-error btn-outline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="join ml-auto mt-3">
          <button
            type="button"
            className="join-item btn btn-sm"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Prev
          </button>
          <button type="button" className="join-item btn btn-sm btn-disabled">
            {page}/{totalPages}
          </button>
          <button
            type="button"
            className="join-item btn btn-sm"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
