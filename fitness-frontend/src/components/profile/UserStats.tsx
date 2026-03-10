export const UserStats = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase text-slate-500">Total Activities</p>
        <h3 className="mt-1 text-2xl font-bold text-dark">126</h3>
      </article>
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase text-slate-500">Longest Streak</p>
        <h3 className="mt-1 text-2xl font-bold text-dark">18 days</h3>
      </article>
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase text-slate-500">Average Calories</p>
        <h3 className="mt-1 text-2xl font-bold text-dark">412 kcal</h3>
      </article>
    </section>
  );
};
