"use client";

import type { Recommendation } from "@/types/models";

interface RecommendationDetailProps {
  recommendation: Recommendation;
}

export const RecommendationDetail = ({ recommendation }: RecommendationDetailProps) => {
  return (
    <div className="space-y-4">
      <section>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Summary</h4>
        <p className="mt-2 text-sm text-dark">{recommendation.recommendations}</p>
      </section>

      <section>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Improvements</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-dark">
          {recommendation.improvements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Suggestions</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-dark">
          {recommendation.suggestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Safety</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-dark">
          {recommendation.safety.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
