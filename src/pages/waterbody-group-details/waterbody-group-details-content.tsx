import { waterbodyGroups } from "../../fishing-regulations";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { WaterbodyGroupAccordion } from "../../components/waterbody-group-modal/waterbody-group-accordion";
import "./waterbody-group-details.css";
import React from "react";
import { WaterbodyGroupDetailsSeoHead } from "./waterbody-group-details-seo-head";

type WaterbodyGroupDetailsContentProps = {
  waterbodyGroupId: string;
  defaultExpandedWaterbodyDetails?: string;
  defaultWaterbodySeason?: string;
};

export const WaterbodyGroupDetailsContent: React.FC<
  WaterbodyGroupDetailsContentProps
> = ({
  waterbodyGroupId,
  defaultExpandedWaterbodyDetails,
  defaultWaterbodySeason,
}) => {
  const navigate = useNavigate();
  const selectedWaterbodyGroup = Object.values(waterbodyGroups).find(
    (group) => group.id === waterbodyGroupId
  );

  const onNavigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  if (!selectedWaterbodyGroup) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <WaterbodyGroupDetailsSeoHead waterbodyGroup={selectedWaterbodyGroup} />
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
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

      <WaterbodyGroupAccordion
        waterbodies={selectedWaterbodyGroup.waterbodies}
        defaultExpandedWaterbodyDetails={defaultExpandedWaterbodyDetails}
        defaultWaterbodySeason={defaultWaterbodySeason}
      />
    </>
  );
};
