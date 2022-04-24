import { Container, Typography } from "@material-ui/core";
import { Suspense, useEffect } from "react";
import { lazy } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./App.css";
import { SiteLoader } from "./components/site-loader/site-loader";
import { WaterbodyGroupModal } from "./components/waterbody-group-modal/waterbody-group-modal";
import { trackPageview } from "./utils/analytics.utils";

const FishingRegulationTable = lazy(
  () => import("./components/fishing-regulation-table/fishing-regulation-table")
);

const WaterbodyDetailsModal = lazy(
  () => import("./components/waterbody-details-modal/waterbody-details-modal")
);

const SeoHead = lazy(() => import("./components/seo-head/seo-head"));

type UrlParams = {
  id?: string;
  name?: string;
};

function App() {
  const location = useLocation();
  const params = useParams<UrlParams>();

  // Manually track location to send google analytics pageviews when modals are opened/closed,
  // to reduce perceived bounce-rate.
  useEffect(() => {
    trackPageview(location.pathname);
  }, [location]);

  return (
    <Container className="Container">
      <Typography variant="h3" component="h1" gutterBottom>
        Search for Fishing Regulations
      </Typography>
      <Typography variant="body1">
        Look up the fishing regulations for the lakes, rivers, streams,
        resevoirs and tributaries in Alberta. Click on a row to view details.
      </Typography>

      <Suspense fallback={<SiteLoader />}>
        <FishingRegulationTable />
        {params.id && <WaterbodyDetailsModal selectedId={params.id} />}
        {params.name && <WaterbodyGroupModal name={params.name} />}
        <SeoHead selectedId={params.id} />
      </Suspense>
    </Container>
  );
}

export default App;
