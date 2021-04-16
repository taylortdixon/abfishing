import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { BaitAllowedIcon } from "../bait-allowed-icon/bait-allowed-icon";
import { WaterbodyDetailsModalProps } from "./waterbody-details-modal.props.types";
import "./waterbody-details-modal.css";

export const WaterbodyDetailsModal: React.VFC<WaterbodyDetailsModalProps> = ({
  selectedWaterbody,
  handleClose,
}) => {
  return (
    <Dialog
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
              <BaitAllowedIcon bait_allowed={selectedWaterbody.bait_allowed} />
            </div>
          </DialogTitle>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Season"
                secondary={selectedWaterbody.season}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Waterbody Details"
                secondary={selectedWaterbody.waterbody_detail}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Trout Total"
                secondary={"Other trout limit 1 under 35 cm"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Lake Trout" secondary={"3 fish"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Mountain Whitefish"
                secondary={"5 over 30cm"}
              />
            </ListItem>
          </List>
        </>
      )}
    </Dialog>
  );
};
