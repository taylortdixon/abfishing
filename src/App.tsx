import { Container, Typography } from "@material-ui/core";
import React from "react";
import "./App.css";
import { FishingRegulationTable } from "./components/fishing-regulation-table/fishing-regulation-table";

function App() {
  return (
    <Container className="Container">
      <Typography variant="h2" component="h1" gutterBottom>
        Search for Fishing Regulations
      </Typography>
      <FishingRegulationTable />
    </Container>
  );
}

export default App;
