import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Waterbody } from "../../types/waterbody.type";
import { trackDateToggle } from "../../utils/analytics.utils";
import { WaterbodyGroupItemInfo } from "./waterbody-group-item-info";

type WaterbodyGroupAccordionItemDetailsProps = {
  defaultWaterbodySeason?: string;
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
> = ({ includeDetail, waterbodies, defaultWaterbodySeason }) => {
  if (waterbodies.length === 0) {
    throw new Error("Missing waterbodies for accordion item details.");
  }

  const defualtWaterbodySeasonIndex = waterbodies.findIndex(
    (waterbody) => waterbody.season === defaultWaterbodySeason
  );

  const defaultTab = defaultWaterbodySeason
    ? buildId(defaultWaterbodySeason, defualtWaterbodySeasonIndex)
    : buildId(waterbodies[0].season, 0);

  const [currentTab, setCurrentTab] = useState<string>(defaultTab);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: string) => {
    setCurrentTab(newTab);
    trackDateToggle(waterbodies[0].waterbody);
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
