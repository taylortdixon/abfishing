import { lazy } from "react";
import { Typography } from "@mui/material";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import styles from "./waterbody-list.module.css";
import { SiteLoader } from "../site-loader/site-loader";
import { SeoHead } from "../seo-head/seo-head";

const FishingRegulationTable = lazy(
  () => import("../fishing-regulation-table/fishing-regulation-table")
);

const WaterbodyGroupModal = lazy(
  () => import("../waterbody-group-modal/waterbody-group-modal")
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
        className={styles.App__title}
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
        {params.groupId && (
          <WaterbodyGroupModal waterbodyGroupId={params.groupId} />
        )}
      </Suspense>
    </>
  );
};