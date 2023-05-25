import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { AppProps } from "next/app";
import React, { Suspense } from "react";
import { AppPromotionBanner } from "../components/app-promotion-banner/app-promotion-banner";
import { FiltersContextProvider } from "../components/filters-context/filters-context";
import { MainMenuNav } from "../components/main-menu-nav/main-menu-nav";
import WarningModal from "../components/warning-modal/warning-modal";
import "./_app.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3381b0",
      main: "#00629d",
      dark: "#00446d",
      contrastText: "#fff",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainMenuNav />
          <AppPromotionBanner />
          <FiltersContextProvider>
            <Component {...pageProps} />
          </FiltersContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
      <Suspense fallback={null}>
        <WarningModal />
      </Suspense>
    </React.StrictMode>
  );
}
