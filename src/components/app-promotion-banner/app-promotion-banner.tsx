import { Alert } from "@mui/lab";
import { Snackbar } from "@mui/material";
import { isAndroid, isIOS } from "react-device-detect";
import styles from "./app-promotion-banner.module.css";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { trackAppOpen } from "../../utils/analytics.utils";

const COOKIE_NAME = "dismissed-promotion-cookie-fixed";
const COOKIE_EXPIRY_DAYS = 45;
const DISMISSED_COOKIE_VALUE = "accepted";

export const AppPromotionBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shouldOpenBanner = useMemo(() => {
    if (!isAndroid && !isIOS) {
      return false;
    }

    return Cookies.get(COOKIE_NAME) !== DISMISSED_COOKIE_VALUE;
  }, []);

  useEffect(() => {
    if (!shouldOpenBanner) {
      return;
    }

    const onWindowInteraction = () => setIsOpen(true);
    window.addEventListener("click", onWindowInteraction);

    return () => window.removeEventListener("click", onWindowInteraction);
  }, [shouldOpenBanner]);

  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    Cookies.set(COOKIE_NAME, DISMISSED_COOKIE_VALUE, {
      expires: COOKIE_EXPIRY_DAYS,
    });
  };

  const handleOpen = (e: React.SyntheticEvent) => {
    handleClose(e);

    trackAppOpen(isAndroid ? "android" : "ios");

    window.location.href = isAndroid
      ? "https://play.google.com/store/apps/details?id=com.abfishing.abfishingapp&utm_source=abfishing&utm_medium=snackbar"
      : "https://apps.apple.com/app/apple-store/id1660992625?pt=125913340&ct=web&mt=8";
  };

  if (!shouldOpenBanner) {
    return null;
  }

  return (
    <Snackbar
      open={isOpen}
      onClose={() => setIsOpen(false)}
      ClickAwayListenerProps={{ onClickAway: (e) => e.stopPropagation() }}
    >
      <Alert
        icon={<InstallMobileIcon fontSize="large" />}
        className={styles.alert}
        severity="info"
        onClick={handleOpen}
        onClose={handleClose}
      >
        Get access to regulations offline.
        <AlertTitle>Try the free app</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
