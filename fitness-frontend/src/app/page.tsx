import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral via-white to-sky-50">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          FITNESS MICROSERVICE
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-dark md:text-5xl">
          Train smarter with real-time tracking and AI-driven recommendations.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-600 md:text-lg">
          Unified dashboard for workouts, trends, and personalized coaching insights.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/login" className="btn btn-primary">
            Sign In
          </Link>
          <Link href="/auth/register" className="btn btn-outline btn-primary">
            Create Account
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-dark">Activity Tracking</h2>
            <p className="mt-2 text-sm text-slate-600">
              Log workouts with duration, calories, and custom metrics in seconds.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-dark">Health Analytics</h2>
            <p className="mt-2 text-sm text-slate-600">
              Visualize weekly and monthly trends with responsive charting.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-dark">AI Recommendations</h2>
            <p className="mt-2 text-sm text-slate-600">
              Receive performance insights, suggestions, and safety guidance.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
