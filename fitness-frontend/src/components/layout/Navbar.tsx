import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MobileMenu } from "@/components/layout/MobileMenu";

export const Navbar = () => {
  return (
    <nav className="navbar border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="navbar-start gap-2">
        <MobileMenu />
        <Link href="/dashboard" className="text-lg font-bold text-primary">
          Fitness Microservice
        </Link>
      </div>
      <div className="navbar-end">
        <LogoutButton />
      </div>
    </nav>
  );
};
