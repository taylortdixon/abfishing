import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { WaterbodyDetailsModalProps } from "./waterbody-details-modal.props.types";
import "./waterbody-details-modal.css";
import { FishLimit } from "../../types/waterbody.type";
import React from "react";

const fishLimitsNameMap: Record<FishLimit, string> = {
  brook_trout: "Brook Trout",
  burbot: "Burbot",
  cisco: "Cisco",
  cutthroat_trout: "Cutthroat Trout",
  dolly_varden: "Dolly Varden",
  goldeye: "Goldeye",
  lake_trout: "Lake Trout",
  mountain_whitefish: "Mountain Whitefish",
  northern_pike: "Northern Pike",
  rainbow_trout: "Rainbow Trout",
  trout_total: "Trout Total",
  walleye: "Walleye",
  walleye_sauger: "Walleye + Sauger",
  yellow_perch: "Yellow Perch",
};

export const WaterbodyDetailsModal: React.VFC<WaterbodyDetailsModalProps> = ({
  selectedWaterbody,
  handleClose,
}) => {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      scroll="paper"
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={!!selectedWaterbody}
    >
      {selectedWaterbody && (
        <>
          <DialogTitle id="simple-dialog-title">
            <div className="waterbody_details__dialog_title">
              <span className="waterbody_details__dialog_title__text">
                {selectedWaterbody.waterbody}
              </span>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <List dense={true}>
              <ListItem>
                <ListItemText
                  primary="Season"
                  secondary={selectedWaterbody.season}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Bait Ban"
                  secondary={selectedWaterbody.bait_ban}
                />
              </ListItem>
              {selectedWaterbody.waterbody_detail && (
                <ListItem>
                  <ListItemText
                    primary="Waterbody Details"
                    secondary={selectedWaterbody.waterbody_detail}
                  />
                </ListItem>
              )}
              <ListItem
                button
                component="a"
                target="_blank"
                rel="noreferrer noopener"
                href={`https://albertaregulations.ca/fishingregs/${selectedWaterbody.fish_management_zone}.pdf`}
              >
                <ListItemText
                  primary="Use this at your own risk"
                  secondary="Click here to view the official Alberta regulations."
                />
              </ListItem>
              <Divider />
              {Object.entries(selectedWaterbody.fish_limits || {}).map(
                ([limitName, limit]) => {
                  if (!limit) {
                    return null;
                  }

                  return (
                    <ListItem key={limitName}>
                      <ListItemText
                        primary={fishLimitsNameMap[limitName as FishLimit]}
                        secondary={limit}
                      />
                    </ListItem>
                  );
                }
              )}
            </List>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
