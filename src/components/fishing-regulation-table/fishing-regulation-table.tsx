import { Typography } from "@material-ui/core";
import {
  DataGrid,
  GridColumns,
  GridFilterItem,
  GridRowParams,
} from "@material-ui/data-grid";
import { useState } from "react";
import { regulations } from "../../fishing-regulations";
import { Waterbody } from "../../types/waterbody.type";
import { BaitAllowedIcon } from "../bait-allowed-icon/bait-allowed-icon";
import { WaterbodyDetailsModal } from "../waterbody-details-modal/waterbody-details-modal";
import { FilterPanel } from "./filter-panel/filter-panel";
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

export const FishingRegulationTable = () => {
  const [selectedWaterbody, setSelectedWaterbody] = useState<
    Waterbody | undefined
  >(undefined);

  const [filters, setFilters] = useState<GridFilterItem[]>([]);

  const onRowClick = (params: GridRowParams) =>
    setSelectedWaterbody(params.row as Waterbody);
  return (
    <>
      <FilterPanel filters={filters} onFiltersChange={setFilters} />
      <DataGrid
        columns={columns}
        rows={regulations}
        onRowClick={onRowClick}
        sortModel={[
          {
            field: "waterbody",
            sort: "asc",
          },
        ]}
        filterModel={{
          items: filters,
        }}
        hideFooter
      />
      <WaterbodyDetailsModal
        selectedWaterbody={selectedWaterbody}
        handleClose={() => setSelectedWaterbody(undefined)}
      />
    </>
  );
};
