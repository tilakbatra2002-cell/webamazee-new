export type FormFieldValue = string | number | boolean | null | undefined;

export async function submitWebsiteForm(
  formType: string,
  fields: Record<string, FormFieldValue>,
  honeypot = ""
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType,
      fields,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      websiteConfirm: honeypot,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(data.error || "We could not send your request. Please try again.");
  }
}
