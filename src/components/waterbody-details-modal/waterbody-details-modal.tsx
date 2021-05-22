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
} from "@material-ui/core";
import { WaterbodyDetailsModalProps } from "./waterbody-details-modal.props.types";
import "./waterbody-details-modal.css";
import { FishLimit } from "../../types/waterbody.type";
import React from "react";
import { ReactComponent as TroutIcon } from "../../static/trout.svg";
import { ReactComponent as WalleyeIcon } from "../../static/walleye.svg";
import { ReactComponent as PerchIcon } from "../../static/perch.svg";
import { ReactComponent as PikeIcon } from "../../static/pike.svg";
import { ReactComponent as BurbotIcon } from "../../static/burbot.svg";
import { ReactComponent as FishIcon } from "../../static/fish.svg";
import { ReactComponent as WhitefishIcon } from "../../static/whitefish.svg";
import { useHistory } from "react-router";
import { useSelectedWaterbody } from "../../utils/hooks";

const fishLimitsNameMap: Record<FishLimit, string> = {
  brook_trout: "Brook Trout",
  burbot: "Burbot",
  cisco: "Cisco",
  cutthroat_trout: "Cutthroat Trout",
  dolly_varden: "Dolly Varden",
  goldeye: "Goldeye",
  lake_trout: "Lake Trout",
  lake_whitefish: "Lake Whitefish",
  mountain_whitefish: "Mountain Whitefish",
  northern_pike: "Northern Pike",
  rainbow_trout: "Rainbow Trout",
  trout_total: "Trout Total",
  walleye: "Walleye",
  walleye_sauger: "Walleye + Sauger",
  yellow_perch: "Yellow Perch",
};

const fishLimitsIconMap: Record<
  FishLimit,
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >
> = {
  brook_trout: TroutIcon,
  burbot: BurbotIcon,
  cisco: FishIcon,
  cutthroat_trout: TroutIcon,
  dolly_varden: TroutIcon,
  goldeye: FishIcon,
  lake_trout: TroutIcon,
  lake_whitefish: WhitefishIcon,
  mountain_whitefish: WhitefishIcon,
  northern_pike: PikeIcon,
  rainbow_trout: TroutIcon,
  trout_total: TroutIcon,
  walleye: WalleyeIcon,
  walleye_sauger: WalleyeIcon,
  yellow_perch: PerchIcon,
};

export const WaterbodyDetailsModal: React.VFC<WaterbodyDetailsModalProps> = ({
  selectedId,
}) => {
  const history = useHistory();
  const handleClose = () => history.push("/");

  const selectedWaterbody = useSelectedWaterbody(selectedId);

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
          <DialogTitle id="simple-dialog-title" disableTypography>
            <Typography variant="h4" component="h1">
              <div className="waterbody_details__dialog_title">
                <span className="waterbody_details__dialog_title__text">
                  {selectedWaterbody.waterbody}
                </span>
              </div>
            </Typography>
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

                  const Icon = fishLimitsIconMap[limitName as FishLimit];

                  return (
                    <ListItem key={limitName}>
                      <ListItemIcon>
                        <Icon className="svg" />
                      </ListItemIcon>
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

export default WaterbodyDetailsModal;
