interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
}

export function StatCard({ label, value, trend, positive = true }: StatCardProps) {
  return (
    <div className="card card-rise bg-base-100 border border-base-300 shadow-sm hover:shadow-glow">
      <div className="card-body p-5">
        <p className="text-sm text-neutral/70">{label}</p>
        <p className="text-3xl font-black text-neutral">{value}</p>
        <p className={`text-sm font-semibold ${positive ? 'text-success' : 'text-error'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}
