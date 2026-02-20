import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';

const highlights = [
  {
    title: 'Track Every Activity',
    text: 'Capture workouts with duration, calories, and trends in a clean dashboard.',
  },
  {
    title: 'Smart Recommendations',
    text: 'Receive AI-driven suggestions and safety tips tailored to your routine.',
  },
  {
    title: 'Progress That Motivates',
    text: 'Visual insights and streaks help you keep momentum every week.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-4 md:px-8 pt-14 pb-12">
        <div className="max-w-6xl mx-auto rounded-3xl border border-primary/20 overflow-hidden">
          <div className="pattern-grid bg-dots p-8 md:p-14 bg-[length:22px_22px]">
            <div className="fade-up">
              <span className="badge badge-secondary badge-lg">Fitness Microservice Frontend</span>
              <h1 className="text-4xl md:text-6xl font-black mt-5 leading-tight max-w-3xl text-neutral">
                Build Strong Habits With a Bold, Interactive Fitness Experience.
              </h1>
              <p className="text-lg mt-5 max-w-2xl text-neutral/75">
                FitTrack Pro combines activity tracking, analytics, and personalized guidance in one
                modern interface.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard" className="btn btn-primary btn-wide">
                  Open Dashboard
                </Link>
                <Link href="/auth/register" className="btn btn-outline btn-wide">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="card-rise card bg-base-100 border border-base-300 shadow-sm"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl">{item.title}</h2>
                <p className="text-neutral/75">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
