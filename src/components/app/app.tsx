import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trackPageview } from "../../utils/analytics.utils";

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // Manually track location to send google analytics pageviews when modals are opened/closed,
  // to reduce perceived bounce-rate.
  useEffect(() => {
    trackPageview(router.asPath);
  }, [router.asPath]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        paddingTop: "24px",
      }}
    >
      {children}
    </Container>
  );
};

export default App;
