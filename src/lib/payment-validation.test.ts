import { describe, expect, it } from "bun:test";

import { isValidReceiptEmail, parseUsdAmount } from "./payment-validation";

describe("USD checkout amount validation", () => {
  it("formats whole-dollar and cent amounts for Bachs", () => {
    expect(parseUsdAmount("8")).toBe("8.00");
    expect(parseUsdAmount("12.5")).toBe("12.50");
    expect(parseUsdAmount("12.45")).toBe("12.45");
  });

  it("rejects zero, negative, and more than two decimal places", () => {
    expect(parseUsdAmount("0")).toBeNull();
    expect(parseUsdAmount("-1")).toBeNull();
    expect(parseUsdAmount("1.999")).toBeNull();
  });
});

describe("receipt email validation", () => {
  it("accepts a valid receipt email and rejects malformed addresses", () => {
    expect(isValidReceiptEmail("customer@example.com")).toBe(true);
    expect(isValidReceiptEmail("not-an-email")).toBe(false);
  });
});