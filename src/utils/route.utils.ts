import { useEffect, useState } from "react";
import { regulations } from "../fishing-regulations";

const PATH_PATTERN = /waterbody\/([\w-]+)/;

const DEFAULT_TITLE_NAME = "Alberta Fishing Regulations | AB Fishing";

const parseRouteParam = (pathname: string): string | undefined =>
  pathname.match(PATH_PATTERN)?.[1] || undefined;

// {selectedWaterbody.waterbody} -{" "}
// {selectedWaterbody.fish_management_zone.replace("-", " ")} | AB
// Fishing

type SelectedWaterbody = string | undefined;

export const useWaterbodyRoute = (): [
  SelectedWaterbody,
  (waterbody: SelectedWaterbody) => void
] => {
  const [openWaterbodyId, setOpenWaterbodyId] = useState(
    parseRouteParam(window.location.pathname)
  );

  useEffect(() => {
    window.onpopstate = function () {
      setOpenWaterbodyId(parseRouteParam(window.location.pathname));
    };
  }, []);

  useEffect(() => {
    let url = "/";

    if (openWaterbodyId) {
      url = `/waterbody/${openWaterbodyId}`;
    }

    console.log("url", url);

    window.history.pushState({}, "", url);

    if (url === "/") {
      document.title = DEFAULT_TITLE_NAME;
    } else {
      const waterbody = regulations.find((reg) => reg.id === openWaterbodyId);

      document.title = waterbody
        ? `${waterbody?.waterbody} - ${waterbody?.fish_management_zone} | AB Fishing`
        : DEFAULT_TITLE_NAME;
    }
  }, [openWaterbodyId]);

  return [openWaterbodyId, setOpenWaterbodyId];
};
