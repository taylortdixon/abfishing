import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { WaterbodyGroupAccordion } from "./waterbody-group-accordion";
import { waterbodyGroups } from "../../fishing-regulations";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

type WaterbodyGroupModalProps = {
  waterbodyGroupId: string;
};

export const WaterbodyGroupModal: React.VFC<WaterbodyGroupModalProps> = ({
  waterbodyGroupId,
}) => {
  const navigate = useNavigate();
  const selectedWaterbodyGroup = Object.values(waterbodyGroups).find(
    (group) => group.id === waterbodyGroupId
  );

  const handleClose = () => navigate("/");

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
          <DialogTitle component="h1" variant="h4" id="simple-dialog-title">
            <div className="waterbody_details__dialog_title">
              <span className="waterbody_details__dialog_title__text">
                {selectedWaterbodyGroup.name}
              </span>
            </div>
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
