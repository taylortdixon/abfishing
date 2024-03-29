export const trackWaterbodyDirections = (waterbodyName: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "directions",
      event_label: waterbodyName,
    });
  }
};
export const trackWaterbodyOfficialRegulations = (waterbodyName: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "official_regulations",
      event_label: waterbodyName,
    });
  }
};

export const trackPageview = (pathname: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "page_view", {
      page_title: document.title,
      page_location: `https://${window.location.hostname}${pathname}`,
      page_path: pathname,
    });
  }
};

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

export const trackGroupOpen = (groupName: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "group",
      event_label: groupName,
    });
  }
};
export const trackAccordionOpen = (groupName: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "groupAccordion",
      event_label: groupName,
    });
  }
};

export const trackDateToggle = (groupName: string) => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "groupDateToggle",
      event_label: groupName,
    });
  }
};

export const trackAppOpen = (operatingSystem: "ios" | "android") => {
  if ("dataLayer" in window && (window as any).dataLayer.length > 0) {
    (window as any).gtag("event", "open", {
      event_category: "app",
      event_label: operatingSystem,
    });
  }
};
