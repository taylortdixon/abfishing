import { Navigate } from "react-router-dom";
import { WaterbodyGroupDetailsContent } from "../../components/waterbody-group-details-content/waterbody-group-details-content";
import { WaterbodyDetailsContentSeoHead } from "./waterbody-details-content-seo-head";
import { Waterbody, WaterbodyGroup } from "../../types/waterbody.type";
import { Alert, AlertTitle, Link } from "@mui/material";

type WaterbodyDetailsContentProps = {
  waterbody: Waterbody;
  waterbodyGroup: WaterbodyGroup;
};

// This page is a facade of waterbody group details, but exists to maintain existing url backlinks.
export const WaterbodyDetailsContent: React.FC<
  WaterbodyDetailsContentProps
> = ({ waterbody, waterbodyGroup }) => {
  // Find the matching waterbody group by searching within each waterbody groups waterbody for a matching id.

  if (!waterbodyGroup || !waterbody) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Alert style={{ marginBottom: 10 }} severity="warning">
        <AlertTitle>Warning!</AlertTitle>Time of day angling restrictions are in
        effect for some rivers and streams. Click{" "}
        <Link
          target="_blank"
          href="https://mywildalberta.ca/fishing/advisories-corrections-closures/time-of-day-angling-restrictions.aspx"
        >
          here
        </Link>{" "}
        for more information.
      </Alert>
      <WaterbodyDetailsContentSeoHead
        selectedWaterbody={waterbody}
        selectedWaterbodyGroup={waterbodyGroup}
      />
      <WaterbodyGroupDetailsContent
        waterbodyGroup={waterbodyGroup}
        defaultExpandedWaterbodyDetails={waterbody.waterbody_detail}
        defaultWaterbodySeason={waterbody.season}
      />
    </>
  );
};

export default WaterbodyDetailsContent;
