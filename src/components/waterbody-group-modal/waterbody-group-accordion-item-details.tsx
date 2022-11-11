import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Waterbody } from "../../types/waterbody.type";
import { WaterbodyGroupItemInfo } from "./waterbody-group-item-info";

type WaterbodyGroupAccordionItemDetailsProps = {
  includeDetail?: boolean;
  waterbodies: Waterbody[];
};

function TabPanel(props: any) {
  const { children, value, id, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== id} id={id} {...other}>
      {value === id && children}
    </div>
  );
}

const buildId = (season: string, index: number) => `${season}-${index}`;

export const WaterbodyGroupAccordionItemDetails: React.VFC<
  WaterbodyGroupAccordionItemDetailsProps
> = ({ includeDetail, waterbodies }) => {
  if (waterbodies.length === 0) {
    throw new Error("Missing waterbodies for accordion item details.");
  }

  const [currentTab, setCurrentTab] = useState<string>(
    buildId(waterbodies[0].season, 0)
  );

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: string) => {
    setCurrentTab(newTab);
  };

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
        {waterbodies.map((waterbody, i) => (
          <Tab
            label={waterbody.season.replace("Open ", "")}
            key={buildId(waterbody.season, i)}
            id={buildId(waterbody.season, i)}
            value={buildId(waterbody.season, i)}
          />
        ))}
      </Tabs>

      {waterbodies.map((waterbody, i) => (
        <TabPanel
          value={currentTab}
          key={buildId(waterbody.season, i)}
          id={buildId(waterbody.season, i)}
        >
          <WaterbodyGroupItemInfo
            includeDetail={includeDetail}
            waterbody={waterbody}
          />
        </TabPanel>
      ))}
    </>
  );
};
