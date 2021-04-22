import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@material-ui/core";
import Cookies from "js-cookie";
import React from "react";

const COOKIE_NAME = "accepted-disclaimer-cookie";
const ACCEPTED_COOKIE_VALUE = "accepted";

export const WarningModal = () => {
  const [visible, setVisible] = React.useState(
    Cookies.get(COOKIE_NAME) !== ACCEPTED_COOKIE_VALUE
  );
  const handleClose = () => {
    setVisible(false);
    Cookies.set(COOKIE_NAME, ACCEPTED_COOKIE_VALUE);
  };

  return (
    <Dialog open={visible} onClose={handleClose}>
      <DialogTitle>Disclaimer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This site is not affiliated with the Province of Alberta. While much
          effort has been put into making the data displayed here as accurate as
          possible, it is your responsibility to ensure you are fishing legally
          where you are.
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
