import { ActivityTracker } from '@/components/activity/ActivityTracker';
import { StatCard } from '@/components/dashboard/StatCard';
import { WeeklyBars } from '@/components/dashboard/WeeklyBars';
import { Navbar } from '@/components/layout/Navbar';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { RecommendationPanel } from '@/components/recommendation/RecommendationPanel';
import { SettingsPanel } from '@/components/settings/SettingsPanel';

const weeklyData = [
  { day: 'Mon', calories: 350 },
  { day: 'Tue', calories: 420 },
  { day: 'Wed', calories: 280 },
  { day: 'Thu', calories: 510 },
  { day: 'Fri', calories: 470 },
  { day: 'Sat', calories: 620 },
  { day: 'Sun', calories: 390 },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-7">
            <h1 className="text-4xl font-black">Dashboard</h1>
            <p className="text-neutral/70 mt-1">Your live activity hub with progress and recommendations.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Activities" value="42" trend="+12% this week" />
            <StatCard label="Calories Burned" value="8,940" trend="+6% this week" />
            <StatCard label="Current Streak" value="9 days" trend="+2 day gain" />
            <StatCard label="Recovery Score" value="72%" trend="-3% vs last week" positive={false} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <WeeklyBars data={weeklyData} />
            </div>
            <ProfileCard />
          </div>

          <div className="mb-6">
            <ActivityTracker />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 pb-8">
            <RecommendationPanel />
            <SettingsPanel />
          </div>
        </div>
      </section>
    </main>
  );
}
