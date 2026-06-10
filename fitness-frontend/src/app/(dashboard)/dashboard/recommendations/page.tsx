"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Modal } from "@/components/common/Modal";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { RecommendationCard } from "@/components/recommendation/RecommendationCard";
import { RecommendationDetail } from "@/components/recommendation/RecommendationDetail";
import { useGenerateRecommendations, useRecommendations } from "@/hooks/useRecommendations";
import { useNotificationStore } from "@/store/notificationStore";
import type { Recommendation } from "@/types/models";

export default function RecommendationsPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? 1;
  const [selected, setSelected] = useState<Recommendation | null>(null);
  const addNotification = useNotificationStore((state) => state.add);

  const recommendationsQuery = useRecommendations(userId);
  const generateMutation = useGenerateRecommendations(userId);

  const recommendations = useMemo(
    () => recommendationsQuery.data?.data ?? [],
    [recommendationsQuery.data],
  );

  const handleGenerate = async () => {
    try {
      await generateMutation.mutateAsync();
      addNotification({ type: "success", message: "Recommendations refreshed" });
    } catch {
      addNotification({ type: "error", message: "Failed to refresh recommendations" });
    }
  };

  if (status === "loading" || recommendationsQuery.isLoading) {
    return <LoadingSpinner label="Loading recommendations..." />;
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-dark">Recommendations</h1>
          <p className="text-sm text-slate-600">AI-generated insights for your activity trends.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => void handleGenerate()}
          disabled={generateMutation.isPending}
        >
          {generateMutation.isPending ? "Refreshing..." : "Generate New Recommendations"}
        </button>
      </header>

      {recommendationsQuery.isError ? (
        <div className="alert alert-error">Unable to load recommendations right now.</div>
      ) : recommendations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <h3 className="text-lg font-semibold text-dark">No recommendations yet</h3>
          <p className="mt-1 text-sm text-slate-500">
            Track activities first, then generate recommendations.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onOpen={setSelected}
            />
          ))}
        </div>
      )}

      <Modal isOpen={Boolean(selected)} title="Recommendation Detail" onClose={() => setSelected(null)}>
        {selected ? <RecommendationDetail recommendation={selected} /> : null}
      </Modal>
    </section>
  );
}
