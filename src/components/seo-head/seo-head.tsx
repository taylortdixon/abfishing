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
          content="Search for fishing regulations within Alberta's rivers and lakes. View details on open seasons, catch limits, and bait restrictions."
        />
        <meta
          property="og:title"
          content="Alberta Fishing Regulations"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Search for fishing regulations within Alberta's rivers and lakes. View details on open seasons, catch limits, and bait restrictions."
          data-react-helmet="true"
        />
      </Helmet>
    );
  }

  if (waterbodyGroup) {
    const groupExceptionZoneName = waterbodyGroup.groupExceptionZone
      ? ` (${waterbodyGroup.groupExceptionZone.replace("-", " ")}) `
      : "";
    const title = `${waterbodyGroup.name}${groupExceptionZoneName} Fishing Regulations`;
    const description = `Fishing regulations for ${waterbodyGroup.name}${groupExceptionZoneName}. View catch limits, bait restrictions, and open seasons.`;
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
      .filter(([k, v]) => !!v)
      .map(([k, v]) => {
        const fishLimit = k as FishLimit;

        if (fishLimit === "trout_total") {
          return "Trout";
        }

        return FISH_LIMIT_LABELS[fishLimit];
      })
  );

  let descriptionContent = `Fishing regulations for ${selectedWaterbody.waterbody}, ${selectedWaterbody.season}. `;

  if (fishLimits) {
    descriptionContent += `View the catch limits for ${fishLimits}.`;
  }

  const title = `${selectedWaterbody.waterbody} Fishing Regulations`;

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
