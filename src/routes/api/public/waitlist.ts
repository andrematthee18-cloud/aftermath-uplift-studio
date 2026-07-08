import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).toLowerCase(),
  phone: z.string().trim().min(6).max(40),
  product: z.string().trim().min(1).max(120).optional().default("Recovery Plus"),
});

export const Route = createFileRoute("/api/public/waitlist")({
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
        const { fullName, email, phone, product } = parsed.data;

        const supabaseUrl = process.env.SUPABASE_URL!;
        const publishableKey =
          process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !publishableKey) {
          console.error("waitlist configuration missing");
          return Response.json({ error: "Waitlist is temporarily unavailable" }, { status: 500 });
        }

        const supabase = createClient(
          supabaseUrl,
          publishableKey,
          { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const createdAt = new Date().toISOString();
        const { error: insertError } = await supabase
          .from("waitlist")
          .insert({
            full_name: fullName,
            email,
            phone_number: phone,
            source: "website",
          });

        if (insertError) {
          if (insertError?.code === "23505") {
            return Response.json(
              { error: `You're already on the ${product} waitlist.` },
              { status: 409 },
            );
          }
          console.error("waitlist insert error", insertError);
          return Response.json({ error: "Could not save signup" }, { status: 500 });
        }

        // Invoke edge function to send emails; failures do not block success
        try {
          const fnUrl = `${supabaseUrl}/functions/v1/notify-waitlist`;
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
              phone_number: phone,
              created_at: createdAt,
              product,
            }),
          });
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.error("notify-waitlist non-ok", res.status, text);
          }
        } catch (err) {
          console.error("notify-waitlist invocation failed", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
