export type GlobalStat = {
  to: number;
  label: string;
  prefix?: string;
  suffix: string;
};

/**
 * Approved global Webamazee statistics.
 * Keep shared figures here so every page reads from one source of truth.
 */
export const globalStats: GlobalStat[] = [
  { to: 10, suffix: "+", label: "Clients Served" },
  { to: 4, suffix: "", label: "Global Markets" },
  { to: 320, prefix: "+", suffix: "%", label: "Avg. Growth" },
  { to: 98, suffix: "/100", label: "Avg. AI Score" },
];

/** Semantic references for copy that uses one approved company statistic. */
export const clientsServedStat = globalStats[0];
export const avgAiScoreStat = globalStats[3];

export function formatGlobalStat(stat: GlobalStat): string {
  return `${stat.prefix ?? ""}${stat.to}${stat.suffix}`;
}
