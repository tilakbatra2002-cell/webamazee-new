type FormFieldValue = string | number | boolean | null;

export type ContactEmailInput = {
  formType: string;
  fields: Record<string, FormFieldValue>;
  pageUrl?: string;
  referrer?: string;
  visitorEmail?: string;
  submittedAt: string;
};

function cleanHeader(value: string, max = 120): string {
  return value.replace(/[\r\n\0]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanText(value: FormFieldValue, max = 5000): string {
  if (value === null) return "";
  return String(value)
    .replace(/\0/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);
}

function fieldLabel(key: string): string {
  const cleaned = cleanHeader(key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " "), 80);
  return cleaned.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildText(input: ContactEmailInput): string {
  const formType = cleanHeader(input.formType);
  const lines = [
    `New ${formType} Enquiry`,
    "",
    `Form type: ${formType}`,
  ];

  for (const [key, value] of Object.entries(input.fields)) {
    if (key.startsWith("_")) continue;
    const cleaned = cleanText(value);
    lines.push(`${fieldLabel(key)}: ${cleaned || "Not provided"}`);
  }

  lines.push(
    "",
    `Page submitted from: ${cleanText(input.pageUrl ?? "Not available", 2048)}`,
    `Referrer: ${cleanText(input.referrer ?? "Not available", 2048)}`,
    `Submission time: ${cleanText(input.submittedAt, 100)}`
  );

  return lines.join("\n");
}

export async function sendContactEmail(input: ContactEmailInput): Promise<{ id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL || "info@webamazee.com";

  if (!apiKey || !from) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const formType = cleanHeader(input.formType);
  const payload: Record<string, unknown> = {
    from: cleanHeader(from, 254),
    to: [cleanHeader(to, 254)],
    subject: `[Webamazee Website] New ${formType} Enquiry`,
    text: buildText(input),
  };

  if (input.visitorEmail) {
    payload.reply_to = cleanHeader(input.visitorEmail, 254);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error("EMAIL_DELIVERY_FAILED");
  }

  const data = (await response.json().catch(() => ({}))) as { id?: string };
  return { id: data.id };
}
