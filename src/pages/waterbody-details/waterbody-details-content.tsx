import { Navigate } from "react-router-dom";
import { regulations, waterbodyGroups } from "../../fishing-regulations";
import { WaterbodyGroupDetailsContent } from "../waterbody-group-details/waterbody-group-details-content";

type WaterbodyDetailsContentProps = {
  waterbodyId: string;
};

// This page is a facade of waterbody group details, but exists to maintain existing url backlinks.
export const WaterbodyDetailsContent: React.FC<
  WaterbodyDetailsContentProps
> = ({ waterbodyId }) => {
  // Find the matching waterbody group by searching within each waterbody groups waterbody for a matching id.
  const [matchingWaterbodyGroupId] =
    Object.entries(waterbodyGroups).find(
      ([_waterbodyGroupId, waterbodyGroup]) =>
        waterbodyGroup.waterbodies.some(
          (waterbody) => waterbody.id === waterbodyId
        )
    ) || [];

  const matchingWaterbody = regulations.find(
    (waterbody) => waterbody.id === waterbodyId
  );

  if (!matchingWaterbodyGroupId || !matchingWaterbody) {
    return <Navigate to="/" replace />;
  }

  return (
    <WaterbodyGroupDetailsContent
      waterbodyGroupId={matchingWaterbodyGroupId}
      defaultExpandedWaterbodyDetails={matchingWaterbody.waterbody_detail}
      defaultWaterbodySeason={matchingWaterbody.season}
    />
  );
};
