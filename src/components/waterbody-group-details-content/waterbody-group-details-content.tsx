import { Breadcrumbs, Link, Typography } from "@mui/material";
import styles from "./waterbody-group-details.module.css";
import React, { useEffect } from "react";
import { WaterbodyGroupDetailsSeoHead } from "./waterbody-group-details-seo-head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { waterbodyGroups } from "../../fishing-waterbody-groups";

type WaterbodyGroupDetailsContentProps = {
  waterbodyGroupId: string;
  defaultExpandedWaterbodyDetails?: string;
  defaultWaterbodySeason?: string;
};

const DynamicWaterbodyGroupAccordion = dynamic(
  () => import("../waterbody-group-modal/waterbody-group-accordion"),
  {
    loading: () => null,
  }
);

export const WaterbodyGroupDetailsContent: React.FC<
  WaterbodyGroupDetailsContentProps
> = ({
  waterbodyGroupId,
  defaultExpandedWaterbodyDetails,
  defaultWaterbodySeason,
}) => {
  const router = useRouter();
  const selectedWaterbodyGroup = Object.values(waterbodyGroups).find(
    (group) => group.id === waterbodyGroupId
  );

  useEffect(() => {
    if (!selectedWaterbodyGroup) {
      router.replace("/");
    }
  }, [selectedWaterbodyGroup]);

  const onNavigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  if (!selectedWaterbodyGroup) {
    return null;
  }

  return (
    <>
      <WaterbodyGroupDetailsSeoHead waterbodyGroup={selectedWaterbodyGroup} />
      <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
        <Link color="inherit" href="/" onClick={onNavigateHome}>
          Alberta Fishing Regulations
        </Link>
        <Typography color="text.primary">
          {selectedWaterbodyGroup.name}
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="App__title"
      >
        {selectedWaterbodyGroup.name}
      </Typography>

      <DynamicWaterbodyGroupAccordion
        waterbodies={selectedWaterbodyGroup.waterbodies}
        defaultExpandedWaterbodyDetails={defaultExpandedWaterbodyDetails}
        defaultWaterbodySeason={defaultWaterbodySeason}
      />
    </>
  );
};

export default WaterbodyGroupDetailsContent;
