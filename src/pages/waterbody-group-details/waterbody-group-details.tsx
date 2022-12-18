import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { WaterbodyGroupDetailsContent } from "./waterbody-group-details-content";

type UrlParams = {
  groupId?: string;
};

export const WaterbodyGroupDetailsPage = () => {
  const params = useParams<UrlParams>();

  return (
    <>
      <Suspense fallback={<SiteLoader />}>
        {params.groupId && (
          <WaterbodyGroupDetailsContent waterbodyGroupId={params.groupId} />
        )}
      </Suspense>
    </>
  );
};
