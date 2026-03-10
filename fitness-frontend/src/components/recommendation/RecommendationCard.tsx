"use client";

import type { Recommendation } from "@/types/models";
import { formatDate } from "@/utils/formatters";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onOpen: (recommendation: Recommendation) => void;
}

export const RecommendationCard = ({ recommendation, onOpen }: RecommendationCardProps) => {
  return (
    <article className="card border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="card-body p-4">
        <p className="text-xs uppercase tracking-wide text-secondary">
          {recommendation.activityType} • {formatDate(recommendation.createdAt, "PPP")}
        </p>
        <h3 className="text-lg font-semibold text-dark">AI Performance Insight</h3>
        <p className="line-clamp-3 text-sm text-slate-600">{recommendation.recommendations}</p>
        <div className="card-actions justify-end">
          <button type="button" className="btn btn-sm btn-primary" onClick={() => onOpen(recommendation)}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};
