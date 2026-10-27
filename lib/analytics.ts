export const ANALYTICS_EVENTS = {
  demoCtaClick: "demo_cta_click",
  liveDemoOpen: "live_demo_open",
  downloadClick: "download_click",
  contactFormSubmitSuccess: "contact_form_submit_success",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsParams = Record<string, string>;

export function isDemoHref(href: string) {
  const path = href.split(/[?#]/, 1)[0] ?? "";
  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized === "/demo";
}

export function trackAnalyticsEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackDownloadClick(linkUrl: string, linkText: string, linkLocation: string) {
  trackAnalyticsEvent(ANALYTICS_EVENTS.downloadClick, {
    link_url: linkUrl,
    link_text: linkText,
    link_location: linkLocation,
  });
}
