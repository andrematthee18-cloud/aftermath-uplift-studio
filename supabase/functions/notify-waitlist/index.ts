// Edge function: sends notification + confirmation emails via Zoho SMTP.
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  full_name: string;
  email: string;
  phone_number?: string | null;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { full_name, email, phone_number, created_at } = (await req.json()) as Payload;

    if (!full_name || !email || !created_at) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const password = Deno.env.get("ZOHO_SMTP_PASSWORD");
    if (!password) {
      console.error("ZOHO_SMTP_PASSWORD is not configured");
      return new Response(JSON.stringify({ error: "SMTP not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.zoho.com",
        port: 465,
        tls: true,
        auth: {
          username: "sales@aftermathstudio.co.za",
          password,
        },
      },
    });

    const phoneLine = phone_number ?? "Not provided";

    try {
      // Notify sales
      await client.send({
        from: "sales@aftermathstudio.co.za",
        to: "sales@aftermathstudio.co.za",
        replyTo: email,
        subject: "New Recovery+ Waitlist Signup",
        content: `A new user has joined the Recovery+ waitlist.

Name: ${full_name}
Email: ${email}
Phone: ${phoneLine}
Submitted: ${created_at}
`,
      });

      // Confirmation to user
      await client.send({
        from: "sales@aftermathstudio.co.za",
        to: email,
        subject: "Welcome to Recovery+",
        content: `Hi ${full_name},

Thank you for joining the Recovery+ waitlist.

We're excited to have you with us. We'll let you know as soon as Recovery+ is available.

Kind regards,
The Recovery+ Team
`,
      });
    } finally {
      await client.close();
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-waitlist error", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
