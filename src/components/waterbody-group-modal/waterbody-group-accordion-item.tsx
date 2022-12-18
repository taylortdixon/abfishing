import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Waterbody } from "../../types/waterbody.type";
import { WaterbodyGroupAccordionItemDetails } from "./waterbody-group-accordion-item-details";
import { trackAccordionOpen } from "../../utils/analytics.utils";

type WaterbodyGroupAccordionItemProps = {
  id: string;
  expanded: boolean;
  waterbodies: Waterbody[];
  defaultWaterbodySeason?: string;
  onChange: (id: string | undefined) => void;
};

export const WaterbodyGroupAccordionItem: React.VFC<
  WaterbodyGroupAccordionItemProps
> = ({ expanded, id, waterbodies, defaultWaterbodySeason, onChange }) => {
  const handleChange = () => {
    const newId = expanded ? undefined : id;
    onChange(newId);

    if (newId) {
      trackAccordionOpen(newId);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={() => handleChange()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`panel-${id}`}>
        <Typography>{id}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: "column" }}>
        <WaterbodyGroupAccordionItemDetails
          waterbodies={waterbodies}
          defaultWaterbodySeason={defaultWaterbodySeason}
        />
      </AccordionDetails>
    </Accordion>
  );
};
