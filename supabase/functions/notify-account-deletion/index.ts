// Edge function: sends deletion request notification + user confirmation via Zoho SMTP.
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  full_name: string;
  email: string;
  reason: string;
  created_at: string;
  product?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { full_name, email, reason, created_at, product = "Recovery Plus" } =
      (await req.json()) as Payload;

    if (!full_name || !email || !reason || !created_at) {
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

    try {
      await client.send({
        from: "sales@aftermathstudio.co.za",
        to: "contact@aftermathstudio.co.za",
        replyTo: email,
        subject: `${product} — Account Deletion Request`,
        content: `A user has requested account deletion.

Name: ${full_name}
Email: ${email}
Product: ${product}
Submitted: ${created_at}

Reason for leaving:
${reason}
`,
      });

      await client.send({
        from: "sales@aftermathstudio.co.za",
        to: email,
        subject: `${product} — Account Deletion Request Received`,
        content: `Hi ${full_name},

We have received your request to delete your ${product} account.

Please allow up to 24 hours for the deletion to be fully processed. Once complete, we will send a confirmation email to this address to let you know the deletion has been finalised.

If you did not submit this request, please reply to this email immediately.

Kind regards,
The Aftermath Studio Team
`,
      });
    } finally {
      await client.close();
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-account-deletion error", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
