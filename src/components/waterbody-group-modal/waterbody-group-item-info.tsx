import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { FISH_LIMIT_LABELS } from "../../constants";
import { FishLimit, Waterbody } from "../../types/waterbody.type";
import { trackWaterbodyOfficialRegulations } from "../../utils/analytics.utils";
import { fishLimitsIconMap } from "../fish-icons/fish-icons";
import { SxProps } from "@mui/system";

type WaterbodyGroupItemInfoProps = {
  includeDetail?: boolean;
  includeSeason?: boolean;
  waterbody: Waterbody;
};

const listItemStyles: SxProps = {
  alignItems: "flex-start",
  width: "50%",
};

export const WaterbodyGroupItemInfo: React.VFC<WaterbodyGroupItemInfoProps> = ({
  includeDetail = false,
  includeSeason = false,
  waterbody,
}) => {
  return (
    <List
      dense={true}
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {includeDetail && (
        <ListItem sx={listItemStyles}>
          <ListItemText
            primary="Waterbody Details"
            secondary={waterbody.waterbody_detail}
          />
        </ListItem>
      )}
      {includeSeason && (
        <ListItem sx={listItemStyles}>
          <ListItemText primary="Open Season" secondary={waterbody.season} />
        </ListItem>
      )}
      <ListItem sx={listItemStyles}>
        <ListItemText primary="Bait Ban" secondary={waterbody.bait_ban} />
      </ListItem>
      <ListItem sx={listItemStyles}>
        <ListItemText
          primary="Zone"
          secondary={waterbody.fish_management_zone}
        />
      </ListItem>
      <ListItem
        button
        sx={listItemStyles}
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

        const iconPath = fishLimitsIconMap[limitName as FishLimit];

        return (
          <ListItem key={limitName} sx={listItemStyles}>
            <ListItemIcon sx={{ alignSelf: "center" }}>
              <Image
                src={iconPath}
                alt={`${limitName} icon`}
                height={35}
                width={56}
                style={{ width: 56, height: "auto", marginRight: "10px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={FISH_LIMIT_LABELS[limitName as FishLimit]}
              secondary={limit}
            />
          </ListItem>
        );
      })}
      <ListItem sx={{ marginTop: "12px" }}>
        <ListItemText
          primary="Disclaimer"
          secondary={
            <>
              This website is frequently updated and verified, but it is not an
              official government page. For official Alberta regulations,{" "}
              <Link
                href="https://albertaregulations.ca/fishingregs/"
                rel="noreferrer"
              >
                click here
              </Link>
              .
            </>
          }
        />
      </ListItem>
    </List>
  );
};
