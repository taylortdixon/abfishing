import { Waterbody, WaterbodyGroupMap } from "../../src/types/waterbody.type";

export const buildWaterbodyGroups = (
  waterbodies: Waterbody[]
): WaterbodyGroupMap => {
  return waterbodies.reduce<WaterbodyGroupMap>((acc, waterbody) => {
    if (!acc[waterbody.waterbody]) {
      acc[waterbody.waterbody] = {
        id: waterbody.waterbody,
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

    acc[waterbody.waterbody].waterbodies.push(mappedWaterbody);

    return acc;
  }, {});
};
