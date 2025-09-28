import { Resend } from "resend";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST" });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY env var" });
    }

    const { to, subject, html } = req.body || {};
    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Missing 'to', 'subject', or 'html' in body" });
    }

    const resend = new Resend(RESEND_API_KEY);
    const from = "onboarding@resend.dev"; // sandbox sender

    const { data, error } = await resend.emails.send({ from, to, subject, html });

    if (error) {
      return res.status(500).json({ error: error.message || "Resend error" });
    }

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown server error" });
  }
}

