import { Container, Typography } from "@material-ui/core";
import React from "react";
import "./App.css";
import { FishingRegulationTable } from "./components/fishing-regulation-table/fishing-regulation-table";

function App() {
  return (
    <Container className="Container">
      <Typography variant="h3" component="h2" gutterBottom>
        Search for Fishing Regulations
      </Typography>
      <Typography variant="body1">
        Look up the fishing regulations for the lakes, rivers, streams,
        resevoirs and tributaries in Alberta.
      </Typography>
      <FishingRegulationTable />
    </Container>
  );
}

export default App;
