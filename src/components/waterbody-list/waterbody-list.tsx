import { lazy } from "react";
import { Alert, AlertTitle, Link, Typography } from "@mui/material";
import { Suspense } from "react";
import { SiteLoader } from "../site-loader/site-loader";
import { SeoHead } from "../seo-head/seo-head";

const FishingRegulationTable = lazy(
  () => import("../fishing-regulation-table/fishing-regulation-table")
);

export const WaterbodyListPage = () => {
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
        sx={{
          "@media only screen and (max-width: 600px)": {
            fontSize: "2em",
          },
        }}
      >
        Alberta Fishing Regulations
      </Typography>
      <Typography variant="body1">
        Look up fishing regulations for lakes and rivers in Alberta. Search or
        filter to find results, and select a row to view details.
      </Typography>

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

      <Suspense fallback={<SiteLoader />}>
        <FishingRegulationTable />
      </Suspense>
    </>
  );
};

export default WaterbodyListPage;
