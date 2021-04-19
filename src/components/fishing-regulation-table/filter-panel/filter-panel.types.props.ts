import { GridFilterItem } from "@material-ui/data-grid";
import { Waterbody } from "../../../types/waterbody.type";

export type FilterPanelProps = {
  filters: GridFilterItem[];
  regulations: Waterbody[];
  onFiltersChange: (filters: GridFilterItem[]) => void;
};
