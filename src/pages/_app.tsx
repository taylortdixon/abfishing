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
import theme from "../theme";
import { EmotionCache } from "@emotion/cache";
import createEmotionCache from "../createEmotionCache";
import { CacheProvider } from "@emotion/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <React.StrictMode>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <MainMenuNav />
          <AppPromotionBanner />
          <FiltersContextProvider>
            <Component {...pageProps} />
          </FiltersContextProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <WarningModal />
        </Suspense>
      </CacheProvider>
    </React.StrictMode>
  );
}
