import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        fullName: z.string().trim().min(1).max(120),
        email: z.string().trim().email().max(255).toLowerCase(),
        phone: z.string().trim().min(6).max(40),
        product: z.string().trim().min(1).max(120).optional().default("Recovery Plus"),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
    const publishableKey =
      process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !publishableKey) {
      console.error("waitlist configuration missing");
      return { ok: false, error: "Waitlist is temporarily unavailable." } as const;
    }

    const supabase = createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const createdAt = new Date().toISOString();
    const { error: insertError } = await supabase.from("waitlist").insert({
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phone,
      source: "website",
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return {
          ok: false,
          duplicate: true,
          error: `You're already on the ${data.product} waitlist.`,
        } as const;
      }

      console.error("waitlist insert error", insertError);
      return { ok: false, error: "Could not save your waitlist signup." } as const;
    }

    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/notify-waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
        },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone_number: data.phone,
          created_at: createdAt,
          product: data.product,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("notify-waitlist non-ok", res.status, text);
      }
    } catch (err) {
      console.error("notify-waitlist invocation failed", err);
    }

    return { ok: true } as const;
  });