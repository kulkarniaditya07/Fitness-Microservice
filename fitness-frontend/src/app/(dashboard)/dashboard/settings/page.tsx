"use client";

import { useState } from "react";
import { useUiStore } from "@/store/uiStore";

export default function SettingsPage() {
  const theme = useUiStore((state) => state.theme);
  const setTheme = useUiStore((state) => state.setTheme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-dark">Settings</h1>
        <p className="text-sm text-slate-600">Theme, notifications, and data preferences.</p>
      </header>

      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-dark">Theme Preference</h2>
        <div className="mt-3 join">
          <button
            type="button"
            className={`join-item btn ${theme === "light" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={`join-item btn ${theme === "dark" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-dark">Notifications</h2>
        <label className="label mt-2 cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={notificationsEnabled}
            onChange={(event) => setNotificationsEnabled(event.target.checked)}
          />
          <span className="label-text">Enable in-app notifications</span>
        </label>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-dark">Data Export</h2>
        <p className="mt-1 text-sm text-slate-600">Export your activity data in JSON format.</p>
        <button type="button" className="btn btn-outline mt-3">
          Export Data
        </button>
      </article>
    </section>
  );
}
