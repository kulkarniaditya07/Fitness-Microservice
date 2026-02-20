'use client';

import { useMemo, useState } from 'react';

interface Recommendation {
  type: 'RUNNING' | 'CYCLING' | 'YOGA' | 'ALL';
  title: string;
  tip: string;
}

const mockRecommendations: Recommendation[] = [
  {
    type: 'RUNNING',
    title: 'Improve Cadence',
    tip: 'Add 3 x 60-second fast strides after warm-up to improve pace control.',
  },
  {
    type: 'CYCLING',
    title: 'Safer Climbing Sessions',
    tip: 'Keep cadence above 70 RPM and avoid heavy gears on steep climbs.',
  },
  {
    type: 'YOGA',
    title: 'Mobility Focus',
    tip: 'Hold hip-openers for 45 seconds and sync breathing with movement.',
  },
];

export function RecommendationPanel() {
  const [filter, setFilter] = useState<Recommendation['type']>('ALL');

  const items = useMemo(
    () => mockRecommendations.filter((item) => filter === 'ALL' || item.type === filter),
    [filter],
  );

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="card-title">AI Recommendations</h3>
          <select
            className="select select-bordered select-sm"
            aria-label="Recommendation filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value as Recommendation['type'])}
          >
            <option value="ALL">All</option>
            <option value="RUNNING">Running</option>
            <option value="CYCLING">Cycling</option>
            <option value="YOGA">Yoga</option>
          </select>
        </div>
        <div className="grid gap-3 mt-2">
          {items.map((item) => (
            <article key={item.title} className="p-4 border border-base-300 rounded-xl bg-base-200/50">
              <p className="badge badge-outline mb-2">{item.type}</p>
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-sm text-neutral/80 mt-1">{item.tip}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
