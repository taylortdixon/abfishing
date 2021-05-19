import { Container, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import "./App.css";
import { FishingRegulationTable } from "./components/fishing-regulation-table/fishing-regulation-table";
import { SeoHead } from "./components/seo-head/seo-head";
import { WaterbodyDetailsModal } from "./components/waterbody-details-modal/waterbody-details-modal";
import { regulations } from "./fishing-regulations";

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
      <FishingRegulationTable
        openWaterbodyId={params.id}
        setOpenWaterbodyId={() => null}
      />

      <WaterbodyDetailsModal
        selectedWaterbody={selectedWaterbody}
        handleClose={() => null}
      />
    </Container>
  );
}

export default App;
