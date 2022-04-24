import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState } from "react";
import { useHistory } from "react-router";
import { FISH_LIMIT_LABELS } from "../../constants";
import { FishLimit } from "../../types/waterbody.type";
import {
  trackWaterbodyDirections,
  trackWaterbodyOfficialRegulations,
} from "../../utils/analytics.utils";
import { fishLimitsIconMap } from "../waterbody-details-modal/waterbody-details-modal";

type WaterbodyGroupModalProps = {
  name: string;
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const WaterbodyGroupModal: React.VFC<WaterbodyGroupModalProps> = () => {
  const selectedWaterbody: any = true;

  const history = useHistory();
  const handleClose = () => history.push("/");

  const [expanded, setExpanded] = useState<string | false>(false);
  const [openTab, setOpenTab] = useState<number>(1);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleTabChange = (_: any, newValue: number) => {
    setOpenTab(newValue);
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
          <DialogTitle id="simple-dialog-title" disableTypography>
            <Typography variant="h4" component="h1">
              <div className="waterbody_details__dialog_title">
                <span className="waterbody_details__dialog_title__text">
                  Red Deer River
                </span>
              </div>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>
                  Red Deer River Mainstem and tributaries from Tolman Bridge
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ flexDirection: "column" }}>
                <Tabs
                  value={openTab}
                  onChange={handleTabChange}
                  aria-label="simple tabs example"
                >
                  <Tab value={1} label="Apr 1 to Aug 31" id="simple-tab-1" />
                  <Tab value={2} label="Sept 1 to Oct 31" id="simple-tab-2" />
                </Tabs>
                <TabPanel value={openTab} index={1}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText
                        primary="Bait Ban"
                        secondary={"Fish and bait fish allowed"}
                      />
                    </ListItem>
                  </List>
                </TabPanel>
                <TabPanel value={openTab} index={2}>
                  Item Two
                </TabPanel>
                <TabPanel value={openTab} index={3}>
                  Item Three
                </TabPanel>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography>
                  Red Deer River Mainstem and tributaries from Banff National
                  Park boundary downstream
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
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
