import { Typography } from "@mui/material";
import { useState } from "react";
import { Waterbody } from "../../types/waterbody.type";
import { WaterbodyGroupAccordionItem } from "./waterbody-group-accordion-item";
import { WaterbodyGroupAccordionItemDetails } from "./waterbody-group-accordion-item-details";

type WaterbodyGroupAccordionProps = {
  waterbodies: Waterbody[];
  defaultExpandedWaterbodyDetails?: string;
  defaultWaterbodySeason?: string;
};

type WaterbodyDetailMap = Record<string, Waterbody[]>;

export const WaterbodyGroupAccordion: React.VFC<
  WaterbodyGroupAccordionProps
> = ({
  waterbodies,
  defaultExpandedWaterbodyDetails,
  defaultWaterbodySeason,
}) => {
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

  const [expandedArea, setExpandedArea] = useState<string | undefined>(
    defaultExpandedWaterbodyDetails
  );

  if (Object.keys(waterbodiesByWaterbodyDetail).length === 1) {
    return (
      <WaterbodyGroupAccordionItemDetails
        includeDetail
        waterbodies={waterbodies}
        defaultWaterbodySeason={defaultWaterbodySeason}
      />
    );
  }

  const accordions = Object.keys(waterbodiesByWaterbodyDetail)
    // Sort to bring the default to the top if it exists
    .sort((waterbodyDetail) =>
      waterbodyDetail === defaultExpandedWaterbodyDetails ? -1 : 1
    )
    .map((waterbodyDetail) => (
      <WaterbodyGroupAccordionItem
        key={waterbodyDetail}
        id={waterbodyDetail}
        expanded={expandedArea === waterbodyDetail}
        waterbodies={waterbodiesByWaterbodyDetail[waterbodyDetail]}
        defaultWaterbodySeason={
          defaultExpandedWaterbodyDetails === waterbodyDetail
            ? defaultWaterbodySeason
            : undefined
        }
        onChange={(id) => setExpandedArea(id)}
      />
    ));

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

export default WaterbodyGroupAccordion;
