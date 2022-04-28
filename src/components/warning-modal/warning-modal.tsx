import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

const COOKIE_NAME = "accepted-disclaimer-cookie";
const COOKIE_EXPIRY_DAYS = 90;
const ACCEPTED_COOKIE_VALUE = "accepted";

export const WarningModal = () => {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(Cookies.get(COOKIE_NAME) !== ACCEPTED_COOKIE_VALUE);
    }, 500);
  }, []);

  const handleClose = () => {
    setVisible(false);
    Cookies.set(COOKIE_NAME, ACCEPTED_COOKIE_VALUE, {
      expires: COOKIE_EXPIRY_DAYS,
    });
  };

  return (
    <Dialog open={visible} onClose={handleClose}>
      <DialogTitle>Disclaimer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This site is not affiliated with the Province of Alberta. While much
          effort has been put into making the data displayed here as accurate as
          possible, it is the user's responsibility to fish legally in the body
          of water they are in.
        </DialogContentText>
        <DialogContentText>
          Use this at your own risk.{" "}
          <Link
            href="https://albertaregulations.ca/fishingregs/"
            rel="noreferrer"
          >
            Click here to go to Alberta Regulations
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          I Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
