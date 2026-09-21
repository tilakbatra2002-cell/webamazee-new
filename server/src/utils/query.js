import mongoose from 'mongoose';

/** Escapes regex metacharacters from user-supplied search text. */
export function escapeRegex(value) {
  return String(value ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Builds a case-insensitive "contains" matcher for an already-escaped term.
 *
 * `mongoose.trusted` marks this operator object as server-authored so the
 * global `sanitizeFilter` guard (which protects every other query against
 * operator injection from request bodies) does not wrap it in `$eq`.
 */
export function containsInsensitive(term) {
  return mongoose.trusted({ $regex: escapeRegex(term), $options: 'i' });
}

/**
 * Builds an inclusive date-range clause over the numeric `invoiceDateMs`
 * mirror, which compares identically on every storage engine.
 * Returns null when neither bound is usable.
 */
export function dateRangeClause(field, from, to) {
  const range = {};

  if (from) {
    const lower = new Date(from);
    if (!Number.isNaN(lower.getTime())) {
      lower.setUTCHours(0, 0, 0, 0);
      range.$gte = lower.getTime();
    }
  }
  if (to) {
    const upper = new Date(to);
    if (!Number.isNaN(upper.getTime())) {
      upper.setUTCHours(23, 59, 59, 999);
      range.$lte = upper.getTime();
    }
  }

  if (!Object.keys(range).length) return null;
  // Server-authored operators, so exempt from the global sanitizeFilter guard.
  return { [field]: mongoose.trusted(range) };
}
