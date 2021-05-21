import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { MainMenuNav } from "./components/main-menu-nav/main-menu-nav";
import ReactGA from "react-ga";
import { WarningModal } from "./components/warning-modal/warning-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SiteLoader } from "./components/site-loader/site-loader";
const App = lazy(() => import("./App"));

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-195051054-1");
}
ReactDOM.render(
  <React.StrictMode>
    <MainMenuNav />
    <Router>
      <Suspense fallback={<SiteLoader />}>
        <Switch>
          <Route path="/waterbody/:id">
            <App />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Suspense>
    </Router>
    <WarningModal />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
