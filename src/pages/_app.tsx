import { ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import React from "react";
import theme from "../theme";
import { EmotionCache } from "@emotion/cache";
import createEmotionCache from "../createEmotionCache";
import { CacheProvider } from "@emotion/react";
import dynamic from "next/dynamic";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const DynamicAllProviders = dynamic(
  () => import("../components/all-providers/all-providers"),
  {
    loading: () => null,
  }
);

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
          <DynamicAllProviders>
            <Component {...pageProps} />
          </DynamicAllProviders>
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>
  );
}
