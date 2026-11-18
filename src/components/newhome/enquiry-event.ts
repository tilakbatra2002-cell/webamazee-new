export const SELECT_SERVICE_EVENT = "newhome:select-service";

export function triggerConsultationForm(service?: string) {
  if (typeof window === "undefined") return;

  if (service) {
    window.dispatchEvent(
      new CustomEvent<{ service: string }>(SELECT_SERVICE_EVENT, {
        detail: { service },
      })
    );
  } else {
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT));
  }

  const target = document.getElementById("hero-enquiry");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      const firstEmptyInput = target.querySelector<HTMLInputElement>(
        'input[name="name"], input[name="websiteUrl"]'
      );
      firstEmptyInput?.focus({ preventScroll: true });
    }, 450);
  }
}
