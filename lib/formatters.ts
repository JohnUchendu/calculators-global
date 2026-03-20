// ─────────────────────────────────────────────
//  Formatters
//  Centralised number, currency, percent, and
//  date formatting used across all calculators.
// ─────────────────────────────────────────────

// ── Currency ─────────────────────────────────

/**
 * Format a number as currency.
 * Defaults to USD. Pass a locale/currency to customise.
 *
 * @example
 * formatCurrency(1234.5)           // "$1,234.50"
 * formatCurrency(1234.5, "en-GB", "GBP")  // "£1,234.50"
 */
export function formatCurrency(
  value: number,
  locale = "en-US",
  currency = "USD"
): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format as currency but strip the symbol — useful for table cells
 * where the symbol is already in the column header.
 */
export function formatAmount(value: number, locale = "en-US"): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// ── Percentage ───────────────────────────────

/**
 * Format a decimal or whole number as a percentage string.
 *
 * @example
 * formatPercent(0.075)   // "7.5%"
 * formatPercent(7.5, false) // "7.5%"  (already a whole %)
 */
export function formatPercent(
  value: number,
  isDecimal = false,
  decimals = 2
): string {
  if (!isFinite(value)) return "—";
  const pct = isDecimal ? value * 100 : value;
  return `${parseFloat(pct.toFixed(decimals))}%`;
}

// ── General numbers ──────────────────────────

/**
 * Format a plain number with thousands separators.
 *
 * @example
 * formatNumber(1234567.89, 2)  // "1,234,567.89"
 */
export function formatNumber(value: number, decimals = 0): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Compact notation for large numbers.
 *
 * @example
 * formatCompact(1500000)  // "1.5M"
 */
export function formatCompact(value: number): string {
  if (!isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

// ── Duration / time ──────────────────────────

/**
 * Format a number of months into "X years Y months".
 *
 * @example
 * formatMonths(25)  // "2 years 1 month"
 */
export function formatMonths(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  return parts.join(" ") || "0 months";
}

/**
 * Format a duration in days into "X years, Y months, Z days".
 */
export function formatDaysToYMD(days: number): string {
  const years = Math.floor(days / 365);
  const remaining = days % 365;
  const months = Math.floor(remaining / 30);
  const d = remaining % 30;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  if (d > 0) parts.push(`${d} ${d === 1 ? "day" : "days"}`);
  return parts.join(", ") || "0 days";
}

// ── Dates ────────────────────────────────────

/**
 * Format a Date object to a readable string.
 *
 * @example
 * formatDate(new Date("2025-01-15"))  // "Jan 15, 2025"
 */
export function formatDate(date: Date, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Format a Date to ISO date string (YYYY-MM-DD) — useful for input values.
 */
export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// ── Input parsing helpers ────────────────────

/**
 * Safely parse a string to a float.
 * Returns 0 (or the fallback) if parsing fails.
 */
export function parseFloat2(value: string, fallback = 0): number {
  const n = parseFloat(value);
  return isNaN(n) ? fallback : n;
}

/**
 * Safely parse a string to an integer.
 */
export function parseInt2(value: string, fallback = 0): number {
  const n = parseInt(value, 10);
  return isNaN(n) ? fallback : n;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}