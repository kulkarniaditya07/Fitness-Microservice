"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const LogoutButton = () => {
  const { data: session } = useSession();
  const initials = session?.user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    document.cookie = "fitness_auth=; Max-Age=0; path=/; SameSite=Lax";
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="dropdown dropdown-end">
      <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="flex w-10 items-center justify-center rounded-full bg-primary text-white">
          {initials || "U"}
        </div>
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-3 w-60 rounded-box bg-base-100 p-2 shadow"
      >
        <li className="menu-title">
          <span>{session?.user?.email ?? "Signed in"}</span>
        </li>
        <li>
          <Link href="/dashboard/profile">Profile</Link>
        </li>
        <li>
          <Link href="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
