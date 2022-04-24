import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Waterbody } from "../../types/waterbody.type";
import { WaterbodyGroupItemInfo } from "./waterbody-group-item-info";

type WaterbodyGroupAccordionItemDetailsProps = {
  includeDetail?: boolean;
  waterbodies: Waterbody[];
};

type WaterbodyOpenSeasonMap = Record<string, Waterbody[]>;

function TabPanel(props: any) {
  const { children, value, id, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== id} id={id} {...other}>
      {value === id && children}
    </div>
  );
}

export const WaterbodyGroupAccordionItemDetails: React.VFC<
  WaterbodyGroupAccordionItemDetailsProps
> = ({ includeDetail, waterbodies }) => {
  if (waterbodies.length === 0) {
    throw new Error("Missing waterbodies for accordion item details.");
  }

  const [currentTab, setCurrentTab] = useState<string>(waterbodies[0].season);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: string) => {
    setCurrentTab(newTab);
  };

  const waterbodiesByOpenSeason = waterbodies.reduce<WaterbodyOpenSeasonMap>(
    (acc, waterbody) => {
      if (!acc[waterbody.season]) {
        acc[waterbody.season] = [];
      }

      acc[waterbody.season].push(waterbody);
      return acc;
    },
    {}
  );

  if (waterbodies.length === 1) {
    return (
      <WaterbodyGroupItemInfo
        includeDetail={includeDetail}
        includeSeason
        waterbody={waterbodies[0]}
      />
    );
  }

  return (
    <>
      <Tabs value={currentTab} onChange={handleTabChange}>
        {Object.keys(waterbodiesByOpenSeason).map((waterbody) => (
          <Tab
            value={waterbody}
            label={waterbody.replace("Open ", "")}
            id={waterbody}
          />
        ))}
      </Tabs>

      {Object.keys(waterbodiesByOpenSeason).map((waterbody) => (
        <TabPanel value={currentTab} id={waterbody}>
          <WaterbodyGroupItemInfo
            includeDetail={includeDetail}
            waterbody={waterbodiesByOpenSeason[waterbody][0]}
          />
        </TabPanel>
      ))}
    </>
  );
};
