import { FishLimit, WaterbodyGroup } from "../../types/waterbody.type";
import { SeoHead } from "../../components/seo-head/seo-head";
import { FISH_LIMIT_LABELS } from "../../constants";
import { joinSentence } from "../../utils/array.utils";

type WaterbodyGroupDetailsSeoHeadProps = {
  waterbodyGroup: WaterbodyGroup;
};

type WaterbodyGroupFishLimitsLabelMap = { [K in FishLimit]?: true };

const MAX_FISH_LIMIT_COUNT = 3;

export const WaterbodyGroupDetailsSeoHead: React.FC<
  WaterbodyGroupDetailsSeoHeadProps
> = ({ waterbodyGroup }) => {
  const availableFishLimits =
    waterbodyGroup.waterbodies.reduce<WaterbodyGroupFishLimitsLabelMap>(
      (acc, waterbody) => {
        Object.entries(waterbody.fish_limits || {})
          .filter(([_k, v]) => !!v)
          .forEach(([k]) => {
            acc[k as FishLimit] = true;
          });

        return acc;
      },
      {}
    );

  const fishLimitsLabels = Object.keys(availableFishLimits)
    // Bring trout first so the first fish limit in the description is Trout for popular trout fishing spots like the Bow.
    .sort((k) => ((k as FishLimit) === "trout_total" ? -1 : 1))
    .map((k) => {
      const fishLimit = k as FishLimit;

      if (fishLimit === "trout_total") {
        return "Trout";
      }

      return FISH_LIMIT_LABELS[fishLimit];
    });

  // Avoid extra long descriptions by using the first few fish limits only.
  // Trying to keep all descriptions between 120 and 160 characters.
  const truncatedFishLimits =
    fishLimitsLabels.length <= MAX_FISH_LIMIT_COUNT
      ? fishLimitsLabels
      : [...fishLimitsLabels.slice(0, MAX_FISH_LIMIT_COUNT), "more"];

  const fishLimitsDescription = joinSentence(truncatedFishLimits);

  const groupExceptionZoneName = waterbodyGroup.groupExceptionZone
    ? ` (${waterbodyGroup.groupExceptionZone.replace("-", " ")})`
    : "";

  const description = `Fishing regulations for ${waterbodyGroup.name}${groupExceptionZoneName}. View open seasons, bait restrictions, and the catch limits for ${fishLimitsDescription}.`;

  return (
    <SeoHead
      title={`${waterbodyGroup.name}${groupExceptionZoneName} Fishing Regulations`}
      description={description}
      canonicalHref={`https://www.abfishing.ca/regulations/${waterbodyGroup.id}`}
    />
  );
};
