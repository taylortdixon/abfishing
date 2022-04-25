import { Helmet } from "react-helmet";
import { FISH_LIMIT_LABELS } from "../../constants";
import { waterbodyGroups } from "../../fishing-regulations";
import { FishLimit } from "../../types/waterbody.type";
import { joinSentence } from "../../utils/array.utils";
import { useSelectedWaterbody } from "../../utils/hooks";

export const SeoHead: React.VFC<{
  selectedId: string | undefined;
  waterbodyGroupId: string | undefined;
}> = ({ selectedId, waterbodyGroupId }) => {
  const selectedWaterbody = useSelectedWaterbody(selectedId);
  const waterbodyGroup = waterbodyGroupId
    ? waterbodyGroups[waterbodyGroupId]
    : undefined;

  if (!selectedWaterbody && !waterbodyGroup) {
    return (
      <Helmet>
        <title>Alberta Fishing Regulations | AB Fishing</title>
        <meta
          name="description"
          content="View Alberta's fishing regulations including catch limits, bait bans, and open seasons for lakes and rivers."
        />
        <meta
          property="og:title"
          content="Alberta Fishing Regulations"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="View Alberta's fishing regulations including catch limits, bait bans, and open seasons for lakes and rivers."
          data-react-helmet="true"
        />
      </Helmet>
    );
  }

  if (waterbodyGroup) {
    const title = `${waterbodyGroup.name} Regulations`;
    const description = `View ${waterbodyGroup.name}, Alberta fishing regulations including catch limits, bait bans, and open seasons.`;
    return (
      <Helmet>
        <title>{title} | AB Fishing</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} data-react-helmet="true" />
        <meta
          property="og:description"
          content={description}
          data-react-helmet="true"
        />
      </Helmet>
    );
  }

  if (!selectedWaterbody) {
    return null;
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

  const title = `${selectedWaterbody.waterbody} - ${selectedWaterbody.fish_management_zone}`;

  return (
    <Helmet>
      <title>{title} | AB Fishing</title>
      <meta name="description" content={descriptionContent} />
      <meta property="og:title" content={title} data-react-helmet="true" />
      <meta
        property="og:description"
        content={descriptionContent}
        data-react-helmet="true"
      />
    </Helmet>
  );
};

export default SeoHead;
