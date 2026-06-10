"use client";

import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/activities", label: "Activities" },
  { href: "/dashboard/recommendations", label: "Recommendations" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
];

export const MobileMenu = () => {
  return (
    <div className="dropdown lg:hidden">
      <label tabIndex={0} className="btn btn-ghost" aria-label="Open dashboard menu">
        ☰
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
