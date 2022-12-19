import { lazy } from "react";
import { Typography } from "@mui/material";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import "./waterbody-list.css";
import { SiteLoader } from "../../components/site-loader/site-loader";
import { SeoHead } from "../../components/seo-head/seo-head";

const FishingRegulationTable = lazy(
  () =>
    import("../../components/fishing-regulation-table/fishing-regulation-table")
);

const WaterbodyDetailsModal = lazy(
  () =>
    import("../../components/waterbody-details-modal/waterbody-details-modal")
);

const WaterbodyGroupModal = lazy(
  () => import("../../components/waterbody-group-modal/waterbody-group-modal")
);

type UrlParams = {
  id?: string;
  groupId?: string;
};

export const WaterbodyListPage = () => {
  const params = useParams<UrlParams>();

  return (
    <>
      <SeoHead
        title="Alberta Fishing Regulations"
        description="Search for fishing regulations within Alberta's rivers and lakes. View details on open seasons, catch limits, and bait restrictions."
        canonicalHref="https://www.abfishing.ca"
      />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="App__title"
      >
        Alberta Fishing Regulations
      </Typography>
      <Typography variant="body1">
        Look up fishing regulations for lakes and rivers in Alberta. Search or
        filter to find results, and select a row to view details.
      </Typography>

      <Suspense fallback={<SiteLoader />}>
        <FishingRegulationTable />
      </Suspense>

      <Suspense fallback={<SiteLoader />}>
        {params.id && <WaterbodyDetailsModal selectedId={params.id} />}
        {params.groupId && (
          <WaterbodyGroupModal waterbodyGroupId={params.groupId} />
        )}
      </Suspense>
    </>
  );
};