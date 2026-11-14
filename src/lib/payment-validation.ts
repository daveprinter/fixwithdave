export function parseUsdAmount(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 18) return null;

  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(value.trim());
  if (!match) return null;

  const whole = match[1];
  const cents = (match[2] ?? "").padEnd(2, "0");
  if (whole === undefined) return null;

  try {
    const amountInCents = BigInt(whole) * 100n + BigInt(cents);
    if (amountInCents <= 0n || amountInCents > BigInt(Number.MAX_SAFE_INTEGER)) return null;
  } catch {
    return null;
  }

  return `${whole}.${cents}`;
}

export function isValidReceiptEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}