import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <TopBar />
      <div className="mx-auto flex max-w-7xl gap-0 lg:gap-6">
        <Sidebar />
        <main className="w-full p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
