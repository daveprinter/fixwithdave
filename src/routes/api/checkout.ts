import { createFileRoute } from "@tanstack/react-router";

import { isValidReceiptEmail, parseUsdAmount } from "@/lib/payment-validation";

const CHECKOUT_API_URL = "https://connector-gateway.lovable.dev/udc_bachs_payments_2/v1/checkout-sessions";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        const requestOrigin = new URL(request.url).origin;
        if (!origin || origin !== requestOrigin) {
          return Response.json({ error: "Please restart checkout from the TechTally website." }, { status: 403 });
        }

        if (!request.headers.get("content-type")?.includes("application/json")) {
          return Response.json({ error: "Invalid checkout request." }, { status: 415 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid checkout request." }, { status: 400 });
        }

        if (body === null || typeof body !== "object") {
          return Response.json({ error: "Invalid checkout request." }, { status: 400 });
        }

        const input = body as { amount?: unknown; email?: unknown };
        const amount = parseUsdAmount(input.amount);
        if (!amount || !isValidReceiptEmail(input.email)) {
          return Response.json({ error: "Enter a valid amount and receipt email." }, { status: 400 });
        }

        const apiKey = process.env["UDC_BACHS_PAYMENTS_2_API_KEY"];
        const lovableApiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey || !lovableApiKey) {
          console.error("Bachs checkout connection credentials are unavailable.");
          return Response.json({ error: "Payments are temporarily unavailable. Please try again later." }, { status: 503 });
        }

        let upstream: Response;
        try {
          upstream = await fetch(CHECKOUT_API_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${lovableApiKey}`,
              "X-Connection-Api-Key": apiKey,
              "Content-Type": "application/json",
              "Idempotency-Key": crypto.randomUUID(),
            },
            body: JSON.stringify({
              pricing: { amount, currency: "USD" },
              customer: { email: input.email.trim() },
              success_url: `${requestOrigin}/?payment=complete`,
              cancel_url: `${requestOrigin}/?payment=cancelled`,
            }),
          });
        } catch (error) {
          console.error("Bachs checkout request failed:", error);
          return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
        }

        if (!upstream.ok) {
          const errorBody = await upstream.text();
          console.error(`Bachs checkout failed [${upstream.status}]: ${errorBody}`);
          return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
        }

        let checkout: { checkout_url?: unknown; error?: unknown; detail?: unknown };
        try {
          checkout = (await upstream.json()) as typeof checkout;
        } catch (error) {
          console.error("Bachs checkout returned an unreadable response:", error);
          return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
        }

        if (checkout.error || typeof checkout.checkout_url !== "string") {
          console.error("Bachs checkout response did not include a checkout URL.", checkout.detail ?? checkout.error);
          return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
        }

        let checkoutUrl: URL;
        try {
          checkoutUrl = new URL(checkout.checkout_url);
        } catch {
          return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
        }

        if (checkoutUrl.origin !== "https://checkout.bachs.io") {
          console.error("Bachs checkout returned an unexpected checkout origin.");
          return Response.json({ error: "Could not start checkout. Please try again." }, { status: 502 });
        }

        return Response.json({ checkoutUrl: checkoutUrl.toString() }, {
          headers: { "Cache-Control": "no-store" },
        });
      },
    },
  },
});