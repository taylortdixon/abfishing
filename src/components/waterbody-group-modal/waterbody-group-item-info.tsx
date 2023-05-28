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
import styles from "./waterbody-group-item-info.module.css";

type WaterbodyGroupItemInfoProps = {
  includeDetail?: boolean;
  includeSeason?: boolean;
  waterbody: Waterbody;
};

export const WaterbodyGroupItemInfo: React.VFC<WaterbodyGroupItemInfoProps> = ({
  includeDetail = false,
  includeSeason = false,
  waterbody,
}) => {
  return (
    <List dense={true} className={styles.list}>
      {includeDetail && (
        <ListItem className={styles.list_item}>
          <ListItemText
            primary="Waterbody Details"
            secondary={waterbody.waterbody_detail}
          />
        </ListItem>
      )}
      {includeSeason && (
        <ListItem className={styles.list_item}>
          <ListItemText primary="Open Season" secondary={waterbody.season} />
        </ListItem>
      )}
      <ListItem className={styles.list_item}>
        <ListItemText primary="Bait Ban" secondary={waterbody.bait_ban} />
      </ListItem>
      <ListItem className={styles.list_item}>
        <ListItemText
          primary="Zone"
          secondary={waterbody.fish_management_zone}
        />
      </ListItem>
      <ListItem
        button
        className={styles.list_item}
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
          <ListItem key={limitName} className={styles.list_item}>
            <ListItemIcon className={styles.icon_container}>
              <Image
                src={iconPath}
                alt={`${limitName} icon`}
                className={styles.svg}
                height={35}
                width={56}
              />
            </ListItemIcon>
            <ListItemText
              primary={FISH_LIMIT_LABELS[limitName as FishLimit]}
              secondary={limit}
            />
          </ListItem>
        );
      })}
      <ListItem className={styles.disclaimer_row}>
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
