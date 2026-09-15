export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return; // Keep admin activity out of marketing reports
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params || {});
  }
}

export function trackBookingClick(source: string): void {
  trackEvent("click_booking_button", { source_location: source });
}

export function trackContactClick(type: "phone" | "email"): void {
  trackEvent("click_contact_link", { contact_method: type });
}

export function trackFormSubmission(formName: string): void {
  trackEvent("submit_contact_form", { form_name: formName });
}
