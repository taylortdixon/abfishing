import { Typography } from "@mui/material";
import { useState } from "react";
import { Waterbody } from "../../types/waterbody.type";
import { WaterbodyGroupAccordionItem } from "./waterbody-group-accordion-item";
import { WaterbodyGroupAccordionItemDetails } from "./waterbody-group-accordion-item-details";

type WaterbodyGroupAccordionProps = {
  waterbodies: Waterbody[];
};

type WaterbodyDetailMap = Record<string, Waterbody[]>;

export const WaterbodyGroupAccordion: React.VFC<
  WaterbodyGroupAccordionProps
> = ({ waterbodies }) => {
  const waterbodiesByWaterbodyDetail = waterbodies.reduce<WaterbodyDetailMap>(
    (acc, waterbody) => {
      if (!acc[waterbody.waterbody_detail]) {
        acc[waterbody.waterbody_detail] = [];
      }

      acc[waterbody.waterbody_detail].push(waterbody);
      return acc;
    },
    {}
  );

  const [expandedArea, setExpandedArea] = useState<string | undefined>();

  if (Object.keys(waterbodiesByWaterbodyDetail).length === 1) {
    return (
      <WaterbodyGroupAccordionItemDetails
        includeDetail
        waterbodies={waterbodies}
      />
    );
  }

  const accordions = Object.keys(waterbodiesByWaterbodyDetail).map(
    (waterbodyDetail) => (
      <WaterbodyGroupAccordionItem
        key={waterbodyDetail}
        id={waterbodyDetail}
        expanded={expandedArea === waterbodyDetail}
        waterbodies={waterbodiesByWaterbodyDetail[waterbodyDetail]}
        onChange={(id) => setExpandedArea(id)}
      />
    )
  );

  return (
    <>
      <Typography gutterBottom>
        There are multiple restrictions for the selected waterbody. Click to
        expand the desired region below:
      </Typography>
      {accordions}
    </>
  );
};
