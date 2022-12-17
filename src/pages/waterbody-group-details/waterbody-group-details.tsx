import { Typography } from "@mui/material";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import SeoHead from "../../components/seo-head/seo-head";
import { SiteLoader } from "../../components/site-loader/site-loader";
import WaterbodyDetailsModal from "../../components/waterbody-details-modal/waterbody-details-modal";
import WaterbodyGroupModal from "../../components/waterbody-group-modal/waterbody-group-modal";
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
      <Suspense fallback={<SiteLoader />}>
        <SeoHead selectedId={undefined} waterbodyGroupId={params.groupId} />
      </Suspense>
    </>
  );
};
