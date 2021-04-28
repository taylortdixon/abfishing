export const trackWaterbodyOpen = (waterbodyName: string) => {
  if ("ga" in window && (window as any).ga.loaded) {
    (window as any).ga("send", "event", "waterbody", "open", waterbodyName);
  }
};
