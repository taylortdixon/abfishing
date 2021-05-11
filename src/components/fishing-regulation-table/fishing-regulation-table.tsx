import { Typography } from "@material-ui/core";
import {
  DataGrid,
  GridColumns,
  GridFilterItem,
  GridRowParams,
} from "@material-ui/data-grid";
import { useEffect, useMemo, useState } from "react";
import { regulations } from "../../fishing-regulations";
import { Waterbody } from "../../types/waterbody.type";
import { trackWaterbodyOpen } from "../../utils/analytics.utils";
import { useWindowSize } from "../../utils/window-resize-hook";
import { WaterbodyDetailsModal } from "../waterbody-details-modal/waterbody-details-modal";
import { FilterPanel } from "./filter-panel/filter-panel";
import "./fishing-regulation-table.css";
import { filterRegulations } from "./fishing-regulation-table.utils";
import { NoResultsRowsOverlay } from "./no-results/no-results";

const useColumnDefinitions = (): GridColumns => {
  const size = useWindowSize();

  return useMemo(() => {
    const columns: GridColumns = [
      {
        field: "waterbody",
        flex: 1,
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
      { field: "season", flex: 0.6, headerName: "Season" },
    ];

    if (size.width && size.width > 400) {
      columns.push({
        field: "fish_management_zone",
        flex: 0.4,
        headerName: "Zone",
        valueFormatter: (params) => (params.value as string).replace(/-/, " "),
      });
    }
    return columns;
  }, [size.width]);
};

export const FishingRegulationTable = () => {
  const [selectedWaterbody, setSelectedWaterbody] = useState<
    Waterbody | undefined
  >(undefined);
  const [page, onPageChange] = useState<number>(0);
  const [filters, setFilters] = useState<GridFilterItem[]>([]);

  useEffect(() => {
    onPageChange(0);
  }, [filters]);

  const columns = useColumnDefinitions();

  const onRowClick = (params: GridRowParams) => {
    const waterbody = params.row as Waterbody;
    trackWaterbodyOpen(waterbody.waterbody);
    setSelectedWaterbody(waterbody);
  };

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
        className="fishing_regulation_table"
        rows={filteredRegulations}
        onRowClick={onRowClick}
        pagination
        page={page}
        rowsPerPageOptions={[100]}
        onPageChange={(params) => onPageChange(params.page)}
        components={{
          NoRowsOverlay: NoResultsRowsOverlay,
        }}
        // This fixes an annoying issue where the grid re-steals focus on rerendering.
        state={{
          keyboard: {
            cell: null,
            columnHeader: null,
            isMultipleKeyPressed: false,
          },
        }}
      />
      <Typography display="block" variant="caption" gutterBottom>
        Regulations last updated May 10, 2021
      </Typography>
      <WaterbodyDetailsModal
        selectedWaterbody={selectedWaterbody}
        handleClose={() => setSelectedWaterbody(undefined)}
      />
    </>
  );
};
