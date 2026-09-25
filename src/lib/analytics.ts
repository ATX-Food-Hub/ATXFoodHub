// Small helper for sending custom events to Google Analytics 4.
// Safe to call anywhere: it does nothing if GA isn't loaded (no ID set, ad blocker, local dev).

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackEvent(name: string, params: EventParams = {}) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
}
