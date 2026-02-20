'use client';

import { useMemo, useState } from 'react';

type ActivityType = 'RUNNING' | 'CYCLING' | 'YOGA' | 'WALKING' | 'GYM';

interface Activity {
  type: ActivityType;
  duration: number;
  calories: number;
}

const activityOptions: ActivityType[] = ['RUNNING', 'CYCLING', 'YOGA', 'WALKING', 'GYM'];

export function ActivityTracker() {
  const [form, setForm] = useState<Activity>({ type: 'RUNNING', duration: 30, calories: 220 });
  const [activities, setActivities] = useState<Activity[]>([
    { type: 'RUNNING', duration: 40, calories: 340 },
    { type: 'YOGA', duration: 45, calories: 160 },
  ]);

  const totalCalories = useMemo(
    () => activities.reduce((sum, item) => sum + item.calories, 0),
    [activities],
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActivities((prev) => [form, ...prev]);
    setForm({ ...form, duration: 30, calories: 200 });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <form onSubmit={onSubmit} className="card-body gap-3">
          <h3 className="card-title">Track Activity</h3>
          <label className="form-control">
            <span className="label-text">Activity Type</span>
            <select
              className="select select-bordered"
              value={form.type}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, type: event.target.value as ActivityType }))
              }
            >
              {activityOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text">Duration (minutes)</span>
            <input
              className="input input-bordered"
              type="number"
              min={1}
              value={form.duration}
              onChange={(event) => setForm((prev) => ({ ...prev, duration: Number(event.target.value) }))}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Calories Burned</span>
            <input
              className="input input-bordered"
              type="number"
              min={1}
              value={form.calories}
              onChange={(event) => setForm((prev) => ({ ...prev, calories: Number(event.target.value) }))}
            />
          </label>

          <button className="btn btn-primary mt-2" type="submit">
            Add Activity
          </button>
        </form>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="card-title">Recent Logs</h3>
            <span className="badge badge-secondary badge-lg">{totalCalories} kcal</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={`${activity.type}-${index}`}>
                    <td>{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
