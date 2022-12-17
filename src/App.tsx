import { Container } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { trackPageview } from "./utils/analytics.utils";

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Manually track location to send google analytics pageviews when modals are opened/closed,
  // to reduce perceived bounce-rate.
  useEffect(() => {
    trackPageview(location.pathname);
  }, [location]);

  return <Container className="Container">{children}</Container>;
};

export default App;
