import { GridFilterItem } from "@material-ui/data-grid";

export type FilterPanelProps = {
  filters: GridFilterItem[];
  onFiltersChange: (filters: GridFilterItem[]) => void;
};
