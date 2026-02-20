interface WeeklyBarsProps {
  data: { day: string; calories: number }[];
}

export function WeeklyBars({ data }: WeeklyBarsProps) {
  const max = Math.max(...data.map((item) => item.calories), 1);

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Weekly Calories</h3>
        <div className="mt-4 grid grid-cols-7 gap-3 items-end h-48">
          {data.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-xl bg-gradient-to-t from-primary to-secondary transition-all duration-500"
                style={{ height: `${Math.max((item.calories / max) * 100, 8)}%` }}
                title={`${item.calories} kcal`}
              />
              <span className="text-xs font-semibold text-neutral/70">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
