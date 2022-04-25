import { Waterbody, WaterbodyGroupMap } from "../../src/types/waterbody.type";

type WaterbodyGroupException = { name: string; zone: string };

const waterbodyGroupExceptions: WaterbodyGroupException[] = [
  { name: "Clearwater River", zone: "NB4-Rivers" },
  { name: "Beaver Lake", zone: "NB1-Lakes" },
  { name: "Blue Lake", zone: "NB2-Lakes" },
  { name: "Cache Lake", zone: "NB1-Lakes" },
  { name: "Cow Lake", zone: "NB1-Lakes" },
  { name: "Crooked Lake", zone: "NB2-Lakes" },
  { name: "Eagle Lake", zone: "ES2-Lakes" },
  { name: "Eagle Lake", zone: "ES2-Lakes" },
  { name: "Gap Lake", zone: "ES2-Lakes" },
  { name: "Goose Lake", zone: "ES4-Lakes" },
  { name: "Island Lake", zone: "NB1-Lakes" },
  { name: "Long Lake", zone: "ES3-Lakes" },
  { name: "Long Lake", zone: "ES4-Lakes" },
  { name: "Long Lake", zone: "NB2-Lakes" },
  { name: "Long Lake", zone: "NB3-Lakes" },
  { name: "Rock Lake", zone: "ES3-Lakes" },
  { name: "Unnamed", zone: "NB3-Lakes" },
];

export const buildWaterbodyGroups = (
  waterbodies: Waterbody[]
): WaterbodyGroupMap => {
  return waterbodies.reduce<WaterbodyGroupMap>((acc, waterbody) => {
    const groupException = waterbodyGroupExceptions.find(
      (exception) =>
        waterbody.waterbody === exception.name &&
        waterbody.fish_management_zone === exception.zone
    );

    let id = waterbody.waterbody.replace(/\s/g, "-");

    if (groupException) {
      id = `${id}-${groupException.zone}`;
    }

    if (!acc[id]) {
      acc[id] = {
        id: id,
        name: waterbody.waterbody,
        waterbodies: [],
      };
    }

    // Need to do this mapping here to fix data issue without generating new ids.
    const mappedWaterbody: Waterbody = {
      ...waterbody,
      waterbody_detail: waterbody.waterbody_detail
        ? waterbody.waterbody_detail.replace(/\n/g, "")
        : waterbody.waterbody,
    };

    acc[id].waterbodies.push(mappedWaterbody);

    return acc;
  }, {});
};
