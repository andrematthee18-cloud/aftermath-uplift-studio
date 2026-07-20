import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).toLowerCase(),
  reason: z.string().trim().min(1).max(2000),
  product: z.string().trim().min(1).max(120).optional().default("Recovery Plus"),
});

export const Route = createFileRoute("/api/public/account-deletion")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const { fullName, email, reason, product } = parsed.data;

        const supabaseUrl = process.env.SUPABASE_URL!;
        const publishableKey =
          process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !publishableKey) {
          console.error("account-deletion configuration missing");
          return Response.json({ error: "Service temporarily unavailable" }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, publishableKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const createdAt = new Date().toISOString();
        const { error: insertError } = await supabase
          .from("account_deletion_requests")
          .insert({
            full_name: fullName,
            email,
            reason,
            product,
          });

        if (insertError) {
          console.error("account-deletion insert error", insertError);
          return Response.json({ error: "Could not save request" }, { status: 500 });
        }

        try {
          const fnUrl = `${supabaseUrl}/functions/v1/notify-account-deletion`;
          const res = await fetch(fnUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: publishableKey,
              Authorization: `Bearer ${publishableKey}`,
            },
            body: JSON.stringify({
              full_name: fullName,
              email,
              reason,
              created_at: createdAt,
              product,
            }),
          });
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.error("notify-account-deletion non-ok", res.status, text);
          }
        } catch (err) {
          console.error("notify-account-deletion invocation failed", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
