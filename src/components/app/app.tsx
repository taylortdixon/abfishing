import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./App.module.css";
import { trackPageview } from "../../utils/analytics.utils";

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  console.log(router.pathname);
  // Manually track location to send google analytics pageviews when modals are opened/closed,
  // to reduce perceived bounce-rate.
  useEffect(() => {
    trackPageview(router.pathname);
  }, [router.pathname]);

  return <Container className={styles.Container}>{children}</Container>;
};

export default App;
