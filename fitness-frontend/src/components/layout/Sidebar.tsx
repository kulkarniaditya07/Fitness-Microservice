"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/utils/helpers";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/activities", label: "Activities" },
  { href: "/dashboard/recommendations", label: "Recommendations" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  return (
    <aside
      className={cn(
        "hidden w-64 border-r border-slate-200 bg-white p-4 lg:block",
        !sidebarOpen && "lg:hidden",
      )}
    >
      <div className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition",
                active ? "bg-primary text-white" : "text-dark hover:bg-slate-100",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
