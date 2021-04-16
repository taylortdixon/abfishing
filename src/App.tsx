import { Container } from "@material-ui/core";
import React from "react";
import "./App.css";
import { FishingRegulationTable } from "./components/fishing-regulation-table/fishing-regulation-table";

function App() {
  return (
    <Container className="Container">
      <FishingRegulationTable />
    </Container>
  );
}

export default App;
