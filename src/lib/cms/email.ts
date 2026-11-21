import "server-only";

import { getCanonicalSiteUrl, isEmailConfigured } from "./config";

export async function sendAdminPasswordEmail(input: {
  to: string;
  recipientName: string;
  token: string;
  type: "invite" | "reset";
  baseUrl?: string;
}): Promise<{ sent: boolean; reason?: string }> {
  if (!isEmailConfigured()) {
    return { sent: false, reason: "RESEND_API_KEY or EMAIL_FROM is not configured." };
  }

  const apiKey = process.env.RESEND_API_KEY!.trim();
  const from = process.env.EMAIL_FROM!.trim();
  const base = (input.baseUrl || getCanonicalSiteUrl()).replace(/\/+$/, "");
  const resetUrl = `${base}/admin/reset-password?token=${encodeURIComponent(input.token)}`;

  const subject =
    input.type === "invite"
      ? "You have been invited to Webamazee Blog CMS"
      : "Reset your Webamazee Blog CMS password";

  const text =
    input.type === "invite"
      ? [
          `Hello ${input.recipientName},`,
          "",
          "An administrator has created your Webamazee Blog CMS account.",
          "Use this single-use link (valid for 24 hours) to set your password and sign in:",
          "",
          resetUrl,
          "",
          "If you did not expect this invitation, you can safely ignore this message.",
        ].join("\n")
      : [
          `Hello ${input.recipientName},`,
          "",
          "We received a request to reset your Webamazee Blog CMS password.",
          "Use this single-use link (valid for 1 hour) to choose a new password:",
          "",
          resetUrl,
          "",
          "If you did not request a reset, you can safely ignore this email.",
        ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { sent: false, reason: `Resend responded with status ${response.status}.` };
    }
    return { sent: true };
  } catch {
    return { sent: false, reason: "Email provider request failed or timed out." };
  }
}
