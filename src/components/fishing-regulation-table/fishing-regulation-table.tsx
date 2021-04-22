import { Typography } from "@material-ui/core";
import {
  DataGrid,
  GridColumns,
  GridFilterItem,
  GridRowParams,
} from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { regulations } from "../../fishing-regulations";
import { Waterbody } from "../../types/waterbody.type";
import { WaterbodyDetailsModal } from "../waterbody-details-modal/waterbody-details-modal";
import { FilterPanel } from "./filter-panel/filter-panel";
import "./fishing-regulation-table.css";
import { filterRegulations } from "./fishing-regulation-table.utils";

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
    field: "fish_management_zone",
    flex: 0.1,
    headerName: "Zone",
    valueFormatter: (params) => (params.value as string).replace(/-/, " "),
  },
];

export const FishingRegulationTable = () => {
  const [selectedWaterbody, setSelectedWaterbody] = useState<
    Waterbody | undefined
  >(undefined);
  const [page, onPageChange] = useState<number>(0);
  const [filters, setFilters] = useState<GridFilterItem[]>([]);

  useEffect(() => {
    onPageChange(0);
  }, [filters]);

  const onRowClick = (params: GridRowParams) =>
    setSelectedWaterbody(params.row as Waterbody);

  const filteredRegulations = filterRegulations(
    regulations as Waterbody[],
    filters
  );
  return (
    <>
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        regulations={regulations as Waterbody[]}
      />
      <DataGrid
        columns={columns}
        rows={filteredRegulations}
        onRowClick={onRowClick}
        pagination
        page={page}
        rowsPerPageOptions={[100]}
        onPageChange={(params) => onPageChange(params.page)}
        // This fixes an annoying issue where the grid re-steals focus on rerendering.
        state={{
          keyboard: {
            cell: null,
            columnHeader: null,
            isMultipleKeyPressed: false,
          },
        }}
      />
      <WaterbodyDetailsModal
        selectedWaterbody={selectedWaterbody}
        handleClose={() => setSelectedWaterbody(undefined)}
      />
    </>
  );
};
