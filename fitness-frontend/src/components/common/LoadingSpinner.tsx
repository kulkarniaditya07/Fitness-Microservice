"use client";

interface LoadingSpinnerProps {
  label?: string;
  fullPage?: boolean;
}

export const LoadingSpinner = ({
  label = "Loading...",
  fullPage = false,
}: LoadingSpinnerProps) => {
  const wrapperClasses = fullPage
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/80"
    : "flex items-center justify-center";

  return (
    <div className={wrapperClasses} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-dark">{label}</p>
      </div>
    </div>
  );
};
