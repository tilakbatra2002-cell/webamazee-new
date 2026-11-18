/**
 * Shared pricing-market configuration.
 *
 * Webamazee runs two separate rate cards rather than one card converted at the
 * FX rate:
 * - `india` prices are set for Indian small and mid-sized businesses.
 * - `international` prices are independent market prices for the USA, UK,
 *   Australia and New Zealand, set against the deliverables and local agency
 *   benchmarks.
 *
 * Both markets resolve to an effective blended rate well below the live
 * USD/INR rate, which keeps Indian pricing competitive and international
 * pricing at a healthy margin.
 */
export type Market = "india" | "international";

export const PRICING_MARKETS: {
  id: Market;
  label: string;
  currency: string;
  symbol: string;
}[] = [
  { id: "india", label: "India", currency: "INR", symbol: "₹" },
  { id: "international", label: "International", currency: "USD", symbol: "$" },
];

export function formatUsd(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatInr(value: string) {
  return `₹${value}`;
}
