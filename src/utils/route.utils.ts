import { useEffect, useState } from "react";

const PATH_PATTERN = /waterbody\/([\w-]+)/;

const parseRouteParam = (pathname: string): string | undefined =>
  pathname.match(PATH_PATTERN)?.[1] || undefined;

type SelectedWaterbody = string | undefined;

export const useWaterbodyRoute = (): [
  SelectedWaterbody,
  (waterbody: SelectedWaterbody) => void
] => {
  const [openWaterbodyId, setOpenWaterbodyId] = useState(
    parseRouteParam(window.location.pathname)
  );

  useEffect(() => {
    let url = "/";

    if (openWaterbodyId) {
      url = `/waterbody/${openWaterbodyId}`;
    }

    window.history.pushState({}, "", url);
  }, [openWaterbodyId]);

  return [openWaterbodyId, setOpenWaterbodyId];
};
