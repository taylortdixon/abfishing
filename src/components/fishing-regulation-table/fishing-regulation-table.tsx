import { Typography } from "@material-ui/core";
import { DataGrid, GridColumns, GridRowParams } from "@material-ui/data-grid";
import { useState } from "react";
import { Waterbody } from "../../types/waterbody.type";
import { BaitAllowedIcon } from "../bait-allowed-icon/bait-allowed-icon";
import { WaterbodyDetailsModal } from "../waterbody-details-modal/waterbody-details-modal";
import "./fishing-regulation-table.css";

const columns: GridColumns = [
  {
    field: "waterbody",
    flex: 0.3,
    headerName: "Waterbody",
    renderCell: (params) => {
      const row = params.row as Waterbody;
      return (
        <div className="fishing_regulation_table__name_cell">
          <Typography variant="body1" gutterBottom>
            {row.waterbody}
          </Typography>
          <Typography variant="body2" noWrap>
            {row.waterbody_detail}
          </Typography>
        </div>
      );
    },
  },
  { field: "season", flex: 0.1, headerName: "Season" },
  {
    field: "bait_allowed",
    flex: 0.1,
    headerName: "Bait Allowed",
    renderCell: (params) => {
      return (
        <BaitAllowedIcon
          bait_allowed={params.value as Waterbody["bait_allowed"]}
        />
      );
    },
  },
];

const data: Waterbody[] = [
  {
    id: 3,
    waterbody: "Ghost Reservoir",
    waterbody_detail: "",
    season: "Open All Year",
    bait_allowed: "yes",
  },
  {
    id: 2,
    waterbody: "Chester Lake",
    waterbody_detail: `35-19-9-W5; northwest bay-the
    portion north of a line drawn from the
    southernmost tip of the peninsula in
    NE 11-20-9-W5 due west to the point
    where the line intersects the shoreline
    of the lake (the northwest bay)`,
    season: "Open All Year",
    bait_allowed: "partially",
  },
  {
    id: 1,
    waterbody: "Carnarvon Lake",
    waterbody_detail: "30-16-6-W5",
    season: "Open All Year",
    bait_allowed: "no",
  },
];

export const FishingRegulationTable = () => {
  const [selectedWaterbody, setSelectedWaterbody] = useState<
    Waterbody | undefined
  >(undefined);

  const onRowClick = (params: GridRowParams) =>
    setSelectedWaterbody(params.row as Waterbody);
  return (
    <>
      <DataGrid columns={columns} rows={data} onRowClick={onRowClick} />
      <WaterbodyDetailsModal
        selectedWaterbody={selectedWaterbody}
        handleClose={() => setSelectedWaterbody(undefined)}
      />
    </>
  );
};
