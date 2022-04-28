import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router";
import { WaterbodyGroupAccordion } from "./waterbody-group-accordion";
import { waterbodyGroups } from "../../fishing-regulations";
import { isMobile } from "react-device-detect";

type WaterbodyGroupModalProps = {
  waterbodyGroupId: string;
};

export const WaterbodyGroupModal: React.VFC<WaterbodyGroupModalProps> = ({
  waterbodyGroupId,
}) => {
  const selectedWaterbodyGroup = Object.values(waterbodyGroups).find(
    (group) => group.id === waterbodyGroupId
  );

  const history = useHistory();
  const handleClose = () => history.push("/");

  return (
    <Dialog
      fullScreen={isMobile}
      scroll="paper"
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={!!selectedWaterbodyGroup}
    >
      {selectedWaterbodyGroup && (
        <>
          <DialogTitle id="simple-dialog-title">
            <Typography variant="h4" component="h1">
              <div className="waterbody_details__dialog_title">
                <span className="waterbody_details__dialog_title__text">
                  {selectedWaterbodyGroup.name}
                </span>
              </div>
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <WaterbodyGroupAccordion
              waterbodies={selectedWaterbodyGroup.waterbodies}
            />
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

export default WaterbodyGroupModal;
