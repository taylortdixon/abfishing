import { blue, green } from "@material-ui/core/colors";
import { DataGrid, GridColumns, GridRowData } from "@material-ui/data-grid";
import {
  CheckCircleOutline,
  NotInterested,
  RadioButtonUnchecked,
} from "@material-ui/icons";

const columns: GridColumns = [
  { field: "waterbody", flex: 0.1, headerName: "Waterbody" },
  {
    field: "waterbody_detail",
    flex: 0.25,
    headerName: "Waterbody Detail",
    filterable: false,
    sortable: false,
  },
  { field: "season", flex: 0.1, headerName: "Season" },
  {
    field: "bait_allowed",
    flex: 0.1,
    headerName: "Bait Allowed",
    renderCell: (params) => {
      if (params.value === "yes") {
        return <CheckCircleOutline style={{ color: green[500] }} />;
      }
      if (params.value === "partially") {
        return <RadioButtonUnchecked style={{ color: blue[500] }} />;
      }

      return <NotInterested color="error" />;
    },
  },
];

const data: GridRowData[] = [
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
    waterbody_detail: "26-21-10-W5; Includes tributaries and outlet",
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
  return <DataGrid columns={columns} rows={data} />;
};
