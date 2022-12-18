import { SeoHead } from "../../components/seo-head/seo-head";
import { FISH_LIMIT_LABELS } from "../../constants";
import { FishLimit, Waterbody } from "../../types/waterbody.type";
import { joinSentence } from "../../utils/array.utils";

type WaterbodyDetailsContentSeoHeadProps = {
  selectedWaterbody: Waterbody;
};

export const WaterbodyDetailsContentSeoHead: React.FC<
  WaterbodyDetailsContentSeoHeadProps
> = ({ selectedWaterbody }) => {
  const availableFishLimits = Object.entries(
    selectedWaterbody.fish_limits || {}
  )
    .filter(([_k, v]) => !!v)
    .map(([k]) => {
      const fishLimit = k as FishLimit;

      if (fishLimit === "trout_total") {
        return "Trout";
      }

      return FISH_LIMIT_LABELS[fishLimit];
    });

  const fishLimits = joinSentence(availableFishLimits);

  let description = `Fishing regulations for ${selectedWaterbody.waterbody}, ${selectedWaterbody.season}. `;

  if (fishLimits) {
    description += `View the catch limits for ${fishLimits}.`;
  }

  return (
    <SeoHead
      title={`${selectedWaterbody.waterbody} Fishing Regulations`}
      description={description}
    />
  );
};
