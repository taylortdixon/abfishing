import { Link, Typography } from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridFilterItem,
  GridRowParams,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { regulations } from "../../fishing-regulations";
import { Waterbody } from "../../types/waterbody.type";
import { trackWaterbodyOpen } from "../../utils/analytics.utils";
import { FilterPanel } from "./filter-panel/filter-panel";
import "./fishing-regulation-table.css";
import { filterRegulations } from "./fishing-regulation-table.utils";
import { NoResultsRowsOverlay } from "./no-results/no-results";
import { isMobile } from "react-device-detect";
import { FishingRegualationTableProps } from "./fishing-regulation-table.props.types";
import { useHistory } from "react-router-dom";

const useColumnDefinitions = (): GridColumns => {
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

    if (!isMobile) {
      columns.push({
        field: "fish_management_zone",
        flex: 0.4,
        headerName: "Zone",
        valueFormatter: (params) => (params.value as string).replace(/-/, " "),
      });
    }
    return columns;
  }, []);
};

export const FishingRegulationTable: React.VFC<
  FishingRegualationTableProps
> = () => {
  const history = useHistory();
  const columns = useColumnDefinitions();
  const [page, onPageChange] = useState<number>(0);
  const [filters, setFilters] = useState<GridFilterItem[]>([]);

  useEffect(() => {
    onPageChange(0);
  }, [filters]);

  const onRowClick = (params: GridRowParams) => {
    const waterbody = params.row as Waterbody;
    trackWaterbodyOpen(waterbody.waterbody);
    history.push(`/waterbody/${waterbody.id}`);
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
        onPageChange={(page) => onPageChange(page)}
        components={{
          NoRowsOverlay: NoResultsRowsOverlay,
        }}
        // This fixes an annoying issue where the grid re-steals focus on rerendering.
        // state={{
        //   keyboard: {
        //     cell: null,
        //     columnHeader: null,
        //     isMultipleKeyPressed: false,
        //   },
        // }}
      />
      <Typography display="block" variant="caption" gutterBottom>
        <Link href="/Privacy-Policy.pdf" target="_blank">
          Privacy Policy
        </Link>{" "}
        Updated Apr 28, 2022. See an issue?{" "}
        <Link href="mailto&#58;%&#54;1bfis%68in%67ca&#64;gm%61i&#108;&#46;c&#37;&#54;Fm">
          Reach Out!
        </Link>
      </Typography>
    </>
  );
};

export default FishingRegulationTable;
