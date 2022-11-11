import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { WaterbodyDetailsModalProps } from "./waterbody-details-modal.props.types";
import "./waterbody-details-modal.css";
import { FishLimit } from "../../types/waterbody.type";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useAssociatedWaterbodyGroupId,
  useSelectedWaterbody,
} from "../../utils/hooks";
import { FISH_LIMIT_LABELS } from "../../constants";
import {
  trackGroupOpen,
  trackWaterbodyDirections,
  trackWaterbodyOfficialRegulations,
} from "../../utils/analytics.utils";
import { fishLimitsIconMap } from "../fish-icons/fish-icons";

export const WaterbodyDetailsModal: React.VFC<WaterbodyDetailsModalProps> = ({
  selectedId,
}) => {
  const selectedWaterbody = useSelectedWaterbody(selectedId);
  const associatedGroupId = useAssociatedWaterbodyGroupId(
    selectedWaterbody?.waterbody,
    selectedWaterbody?.fish_management_zone
  );

  const navigate = useNavigate();
  const handleClose = () => navigate("/");
  const handleViewGroup = () => {
    if (!selectedWaterbody || !associatedGroupId) {
      return;
    }

    trackGroupOpen(selectedWaterbody.waterbody);

    navigate(`/regulations/${associatedGroupId}`);
  };

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
          <DialogTitle id="simple-dialog-title" variant="h4" component="h1">
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
              <ListItem
                button
                component="a"
                target="_blank"
                rel="noreferrer noopener"
                onClick={() =>
                  trackWaterbodyDirections(selectedWaterbody.waterbody)
                }
                href={`https://maps.google.ca?q=${encodeURI(
                  `${selectedWaterbody.waterbody}, AB`
                )}`}
              >
                <ListItemText
                  primary="View Location"
                  secondary="Open on Google Maps."
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
                onClick={() =>
                  trackWaterbodyOfficialRegulations(selectedWaterbody.waterbody)
                }
                rel="noreferrer noopener"
                href={`https://albertaregulations.ca/fishingregs/${selectedWaterbody.fish_management_zone}.pdf`}
              >
                <ListItemText
                  primary="Alberta Regulations"
                  secondary="Click to view official page."
                />
              </ListItem>
              <Divider />
              {Object.entries(selectedWaterbody.fish_limits || {}).map(
                ([limitName, limit]) => {
                  if (!limit) {
                    return null;
                  }

                  const Icon = fishLimitsIconMap[limitName as FishLimit];

                  return (
                    <ListItem key={limitName}>
                      <ListItemIcon>
                        <Icon className="svg" />
                      </ListItemIcon>
                      <ListItemText
                        primary={FISH_LIMIT_LABELS[limitName as FishLimit]}
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
        <Button onClick={handleClose} color="info">
          Close
        </Button>
        {associatedGroupId && (
          <Button onClick={handleViewGroup} color="primary">
            View All
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default WaterbodyDetailsModal;
