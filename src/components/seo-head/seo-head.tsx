import { Helmet } from "react-helmet";
import { FISH_LIMIT_LABELS } from "../../constants";
import { FishLimit } from "../../types/waterbody.type";
import { joinSentence } from "../../utils/array.utils";
import { useSelectedWaterbody } from "../../utils/hooks";

export const SeoHead: React.VFC<{ selectedId: string | undefined }> = ({
  selectedId,
}) => {
  const selectedWaterbody = useSelectedWaterbody(selectedId);

  if (!selectedWaterbody) {
    return (
      <Helmet>
        <title>Alberta Fishing Regulations | AB Fishing</title>
        <meta
          name="description"
          content="View the fishing regulations including catch limits, bait bans, and open seasons for lakes and rivers in Alberta."
        />
      </Helmet>
    );
  }

  const fishLimits = joinSentence(
    Object.entries(selectedWaterbody.fish_limits || {})
      .filter(([k, v]) => !!v && (k as FishLimit) !== "trout_total")
      .map(([k, v]) => FISH_LIMIT_LABELS[k as FishLimit])
  );

  let descriptionContent = `${selectedWaterbody.waterbody} fishing regulations. `;

  if (fishLimits) {
    descriptionContent += `Catch limits for ${fishLimits} - `;
  }

  descriptionContent += `${selectedWaterbody.season}.`;

  if (selectedWaterbody.waterbody_detail) {
    descriptionContent += ` ${selectedWaterbody.waterbody_detail}`;
  }

  return (
    <Helmet>
      <title>
        {selectedWaterbody.waterbody} - {selectedWaterbody.fish_management_zone}{" "}
        | AB Fishing
      </title>
      <meta name="description" content={descriptionContent} />
    </Helmet>
  );
};

export default SeoHead;
