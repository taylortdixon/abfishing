import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { MainMenuNav } from "./components/main-menu-nav/main-menu-nav";
import { WarningModal } from "./components/warning-modal/warning-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <MainMenuNav />
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/waterbody/:id">
              <App />
            </Route>{" "}
            <Route path="/regulations/:groupId">
              <App />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
    <WarningModal />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
