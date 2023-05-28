import { Navigate } from "react-router-dom";
import { regulations } from "../../fishing-regulations";
import { WaterbodyGroupDetailsContent } from "../../components/waterbody-group-details-content/waterbody-group-details-content";
import { WaterbodyDetailsContentSeoHead } from "./waterbody-details-content-seo-head";
import { waterbodyGroups } from "../../fishing-waterbody-groups";

type WaterbodyDetailsContentProps = {
  waterbodyId: string;
};

// This page is a facade of waterbody group details, but exists to maintain existing url backlinks.
export const WaterbodyDetailsContent: React.FC<
  WaterbodyDetailsContentProps
> = ({ waterbodyId }) => {
  // Find the matching waterbody group by searching within each waterbody groups waterbody for a matching id.
  const [_, matchingWaterbodyGroup] =
    Object.entries(waterbodyGroups).find(
      ([_waterbodyGroupId, waterbodyGroup]) =>
        waterbodyGroup.waterbodies.some(
          (waterbody) => waterbody.id === waterbodyId
        )
    ) || [];

  const matchingWaterbody = regulations.find(
    (waterbody) => waterbody.id === waterbodyId
  );

  if (!matchingWaterbodyGroup || !matchingWaterbody) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <WaterbodyDetailsContentSeoHead selectedWaterbody={matchingWaterbody} />
      <WaterbodyGroupDetailsContent
        waterbodyGroup={matchingWaterbodyGroup}
        defaultExpandedWaterbodyDetails={matchingWaterbody.waterbody_detail}
        defaultWaterbodySeason={matchingWaterbody.season}
      />
    </>
  );
};

export default WaterbodyDetailsContent;
