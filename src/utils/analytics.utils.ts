export const trackWaterbodyOpen = (waterbodyName: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "waterbody",
      event_label: waterbodyName,
    });
  }
};

export const trackOpenSeasonSearch = () => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "toggle", {
      event_category: "open_seaon_filter",
    });
  }
};
