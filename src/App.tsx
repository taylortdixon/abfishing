import { Container, Typography } from "@material-ui/core";
import { Suspense } from "react";
import { lazy } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { SeoHead } from "./components/seo-head/seo-head";
import { SiteLoader } from "./components/site-loader/site-loader";
import { WaterbodyDetailsModal } from "./components/waterbody-details-modal/waterbody-details-modal";
import { regulations } from "./fishing-regulations";

const FishingRegulationTable = lazy(
  () => import("./components/fishing-regulation-table/fishing-regulation-table")
);

type UrlParams = {
  id?: string;
};

function App() {
  const params = useParams<UrlParams>();
  const selectedWaterbody = regulations.find(
    (waterbody) => waterbody.id === params.id
  );

  return (
    <Container className="Container">
      <SeoHead selectedWaterbody={selectedWaterbody} />
      <Typography variant="h3" component="h1" gutterBottom>
        Search for Fishing Regulations
      </Typography>
      <Typography variant="body1">
        Look up the fishing regulations for the lakes, rivers, streams,
        resevoirs and tributaries in Alberta. Click on a row to view details.
      </Typography>

      <Suspense fallback={<SiteLoader />}>
        <FishingRegulationTable />
      </Suspense>

      <WaterbodyDetailsModal selectedWaterbody={selectedWaterbody} />
    </Container>
  );
}

export default App;
