import { GridFilterItem } from "@material-ui/data-grid";
import dayjs from "dayjs";
import { Waterbody } from "../../types/waterbody.type";

const REGULATIONS_CUTOFF_MONTH_INDEX = 2; // March
const TODAY = dayjs();
const CURRENT_YEAR = TODAY.year();
const REGULATIONS_YEAR =
  TODAY.month() > REGULATIONS_CUTOFF_MONTH_INDEX
    ? CURRENT_YEAR
    : CURRENT_YEAR - 1;

const filterOpenSeason = (dateRange: string) => {
  const match = dateRange.match(/Open ([A-z]+ [0-9]+) to ([A-z]+ [0-9]+)/i);

  if (!match) {
    return false;
  }

  // Format like "Jan 12", "Oct 25"
  const [, startDateString, endDateString] = match;
  const startDate = dayjs(`${startDateString} ${REGULATIONS_YEAR}`);
  let endDate = dayjs(`${endDateString} ${REGULATIONS_YEAR}`);

  if (endDate.isBefore(startDate)) {
    endDate = dayjs(`${endDateString} ${REGULATIONS_YEAR + 1}`);
  }

  return TODAY.isSameOrAfter(startDate) && TODAY.isSameOrBefore(endDate);
};

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
    case "waterbody_date_range_in":
      if (!filter.value) {
        return true;
      }
      if (regulation.season === "Open All Year") {
        return true;
      }
      if (regulation.season === "Closed All Year") {
        return false;
      }
      return filterOpenSeason(regulation.season);
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
