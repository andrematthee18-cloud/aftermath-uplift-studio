import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).toLowerCase(),
  phone: z.string().trim().max(40).optional().default(""),
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
        const { fullName, email, phone } = parsed.data;
        const phoneNumber = phone.length > 0 ? phone : null;

        const supabaseUrl = process.env.SUPABASE_URL!;
        const supabase = createClient(
          supabaseUrl,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { persistSession: false, autoRefreshToken: false } },
        );

        // Check for existing signup
        const { data: existing, error: selectError } = await supabase
          .from("waitlist")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        if (selectError) {
          console.error("waitlist select error", selectError);
          return Response.json({ error: "Could not process signup" }, { status: 500 });
        }

        if (existing) {
          return Response.json(
            { error: "You're already on the Recovery+ waitlist." },
            { status: 409 },
          );
        }

        const { data: inserted, error: insertError } = await supabase
          .from("waitlist")
          .insert({
            full_name: fullName,
            email,
            phone_number: phoneNumber,
            source: "website",
          })
          .select("full_name, email, phone_number, created_at")
          .single();

        if (insertError || !inserted) {
          // Unique constraint race
          if (insertError?.code === "23505") {
            return Response.json(
              { error: "You're already on the Recovery+ waitlist." },
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
              Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
            },
            body: JSON.stringify(inserted),
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
