import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { WaterbodyGroupDetailsSeoHead } from "./waterbody-group-details-seo-head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { WaterbodyGroup } from "../../types/waterbody.type";

type WaterbodyGroupDetailsContentProps = {
  waterbodyGroup: WaterbodyGroup;
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
  waterbodyGroup,
  defaultExpandedWaterbodyDetails,
  defaultWaterbodySeason,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!waterbodyGroup) {
      router.replace("/");
    }
  }, [waterbodyGroup]);

  const onNavigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  if (!waterbodyGroup) {
    return null;
  }

  return (
    <>
      <WaterbodyGroupDetailsSeoHead waterbodyGroup={waterbodyGroup} />
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 16 }}>
        <Link color="inherit" href="/" onClick={onNavigateHome}>
          Alberta Fishing Regulations
        </Link>
        <Typography color="text.primary">{waterbodyGroup.name}</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="App__title"
      >
        {waterbodyGroup.name}
      </Typography>

      <DynamicWaterbodyGroupAccordion
        waterbodies={waterbodyGroup.waterbodies}
        defaultExpandedWaterbodyDetails={defaultExpandedWaterbodyDetails}
        defaultWaterbodySeason={defaultWaterbodySeason}
      />
    </>
  );
};

export default WaterbodyGroupDetailsContent;
