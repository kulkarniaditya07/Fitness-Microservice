"use client";

import { useUiStore } from "@/store/uiStore";

export const TopBar = () => {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <button type="button" className="btn btn-sm" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      <span className="text-sm text-slate-600">Track. Improve. Repeat.</span>
    </div>
  );
};
