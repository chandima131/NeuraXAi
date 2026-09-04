type AnalyticsValue = string | number | boolean;

type AnalyticsWindow = Window & {
  gtag?: (command: string, name: string, parameters?: Record<string, AnalyticsValue>) => void;
};

export function trackAnalyticsEvent(name: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined") return;
  (window as AnalyticsWindow).gtag?.("event", name, parameters);
}
