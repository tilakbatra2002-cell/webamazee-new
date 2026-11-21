const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function formatDisplayDate(
  dateInput?: Date | string | null,
  timeZone = "UTC"
): string {
  const parsed = dateInput ? new Date(dateInput) : new Date();
  const safeDate = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone,
    }).format(safeDate);
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(safeDate);
  }
}

export function parseDisplayDate(dateStr?: string | null): Date | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (!trimmed) return null;

  // ISO timestamp with explicit time/timezone
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    const iso = new Date(trimmed);
    return Number.isNaN(iso.getTime()) ? null : iso;
  }

  // ISO date-only YYYY-MM-DD -> UTC midnight
  const isoDateMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoDateMatch) {
    const year = Number(isoDateMatch[1]);
    const month = Number(isoDateMatch[2]) - 1;
    const day = Number(isoDateMatch[3]);
    const dt = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    return Number.isNaN(dt.getTime()) ? null : dt;
  }

  // "Nov 2, 2026" / "November 2, 2026" / "Nov 2 2026"
  const mdyMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (mdyMatch) {
    const monthIdx = MONTH_INDEX[mdyMatch[1].toLowerCase()];
    const day = Number(mdyMatch[2]);
    const year = Number(mdyMatch[3]);
    if (monthIdx !== undefined && day >= 1 && day <= 31) {
      return new Date(Date.UTC(year, monthIdx, day, 0, 0, 0, 0));
    }
  }

  // "2 Nov 2026" / "2 November 2026"
  const dmyMatch = trimmed.match(/^(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})$/);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const monthIdx = MONTH_INDEX[dmyMatch[2].toLowerCase()];
    const year = Number(dmyMatch[3]);
    if (monthIdx !== undefined && day >= 1 && day <= 31) {
      return new Date(Date.UTC(year, monthIdx, day, 0, 0, 0, 0));
    }
  }

  // "Nov 2026" -> 1st of month UTC
  const myMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (myMatch) {
    const monthIdx = MONTH_INDEX[myMatch[1].toLowerCase()];
    const year = Number(myMatch[2]);
    if (monthIdx !== undefined) {
      return new Date(Date.UTC(year, monthIdx, 1, 0, 0, 0, 0));
    }
  }

  const fallback = new Date(trimmed);
  if (Number.isNaN(fallback.getTime())) return null;
  return new Date(
    Date.UTC(fallback.getUTCFullYear(), fallback.getUTCMonth(), fallback.getUTCDate(), 0, 0, 0, 0)
  );
}
