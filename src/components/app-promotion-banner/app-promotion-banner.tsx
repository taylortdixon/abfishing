import { Alert } from "@mui/lab";
import { Snackbar } from "@mui/material";
import { isAndroid } from "react-device-detect";
import "./app-promotion-banner.css";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "dismissed-promotion-cookie";
const COOKIE_EXPIRY_DAYS = 90;
const PROMOTION_TIMEOUT_MS = 1000;
const DISMISSED_COOKIE_VALUE = "accepted";

export const AppPromotionBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(Cookies.get(COOKIE_NAME) !== DISMISSED_COOKIE_VALUE);
    }, PROMOTION_TIMEOUT_MS);
  }, []);

  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    Cookies.set(COOKIE_NAME, DISMISSED_COOKIE_VALUE, {
      expires: COOKIE_EXPIRY_DAYS,
    });
  };

  if (!isAndroid) {
    return null;
  }

  return (
    <Snackbar open={isOpen} onClose={() => setIsOpen(false)}>
      <Alert
        icon={<InstallMobileIcon fontSize="large" />}
        className="alert"
        severity="info"
        onClick={() =>
          (window.location.href =
            "https://play.google.com/store/apps/details?id=com.abfishing.abfishingapp")
        }
        onClose={handleClose}
      >
        Get access to regulations offline.
        <AlertTitle>Use the app</AlertTitle>
      </Alert>
    </Snackbar>
  );
};
