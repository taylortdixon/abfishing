import { Alert, AlertTitle, Link, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FISH_LIMIT_LABELS } from "../../constants";
import { FishLimit, Waterbody } from "../../types/waterbody.type";
import { trackWaterbodyOfficialRegulations } from "../../utils/analytics.utils";
import { fishLimitsIconMap } from "../fish-icons/fish-icons";

import "./waterbody-group-item-info.css";

type WaterbodyGroupItemInfoProps = {
  includeDetail?: boolean;
  includeSeason?: boolean;
  waterbody: Waterbody;
};

export const WaterbodyGroupItemInfo: React.VFC<WaterbodyGroupItemInfoProps> = ({
  includeDetail,
  includeSeason,
  waterbody,
}) => {
  return (
    <List dense={true} className="list">
      <ListItem>
        <Alert style={{marginBottom: 10}} severity="warning">
          <AlertTitle>Warning!</AlertTitle>
          Time of day angling restrictions are in effect for some rivers and streams. Click <Link target="_blank" href="https://mywildalberta.ca/fishing/advisories-corrections-closures/time-of-day-angling-restrictions.aspx">here</Link> for more information.
        </Alert>
      </ListItem>
      {includeDetail && (
        <ListItem className="list_item">
          <ListItemText
            primary="Waterbody Details"
            secondary={waterbody.waterbody_detail}
          />
        </ListItem>
      )}
      {includeSeason && (
        <ListItem className="list_item">
          <ListItemText primary="Open Season" secondary={waterbody.season} />
        </ListItem>
      )}
      <ListItem className="list_item">
        <ListItemText primary="Bait Ban" secondary={waterbody.bait_ban} />
      </ListItem>
      <ListItem className="list_item">
        <ListItemText
          primary="Zone"
          secondary={waterbody.fish_management_zone}
        />
      </ListItem>
      <ListItem
        button
        className="list_item"
        component="a"
        target="_blank"
        onClick={() => trackWaterbodyOfficialRegulations(waterbody.waterbody)}
        rel="noreferrer noopener"
        href={`https://albertaregulations.ca/fishingregs/${waterbody.fish_management_zone}.pdf`}
      >
        <ListItemText
          primary="Alberta Regulations"
          secondary="Click to view official page"
        />
      </ListItem>
      {Object.entries(waterbody.fish_limits || {}).map(([limitName, limit]) => {
        if (!limit) {
          return null;
        }

        const Icon = fishLimitsIconMap[limitName as FishLimit];

        return (
          <ListItem key={limitName} className="list_item">
            <ListItemIcon>
              <Icon className="svg" />
            </ListItemIcon>
            <ListItemText
              primary={FISH_LIMIT_LABELS[limitName as FishLimit]}
              secondary={limit}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
