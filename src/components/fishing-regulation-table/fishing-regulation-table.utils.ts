import { GridFilterItem } from "@material-ui/data-grid";
import { Waterbody } from "../../types/waterbody.type";

const filterItem = (filter: GridFilterItem, regulation: Waterbody) => {
  if (!filter.columnField || !filter.operatorValue) {
    return false;
  }

  const value = regulation[filter.columnField as keyof Waterbody];

  switch (filter.operatorValue.toLowerCase()) {
    case "contains":
      return (value as string)
        .toLowerCase()
        .includes((filter.value as string).toLowerCase());
    case "startswith":
      return (value as string)
        .toLowerCase()
        .startsWith((filter.value as string).toLowerCase());
    default:
      return false;
  }
};

export const filterRegulations = (
  regulations: Waterbody[],
  filters: GridFilterItem[]
) => {
  return regulations.filter((regulation) => {
    return filters.every((filter) => filterItem(filter, regulation));
  });
};
