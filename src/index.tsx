import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { MainMenuNav } from "./components/main-menu-nav/main-menu-nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { WaterbodyListPage } from "./pages/waterbody-list/waterbody-list";
import { WaterbodyGroupDetailsPage } from "./pages/waterbody-group-details/waterbody-group-details";
import { WaterbodyDetailsPage } from "./pages/waterbody-details/waterbody-details";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const theme = createTheme();

const WarningModal = lazy(
  () => import("./components/warning-modal/warning-modal")
);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <MainMenuNav />
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/waterbody/:id"
              element={
                <App>
                  <WaterbodyDetailsPage />
                </App>
              }
            ></Route>
            <Route
              path="/regulations/:groupId"
              element={
                <App>
                  <WaterbodyGroupDetailsPage />
                </App>
              }
            ></Route>
            <Route
              path="/"
              element={
                <App>
                  <WaterbodyListPage />
                </App>
              }
            ></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
    <Suspense fallback={null}>
      <WarningModal />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
