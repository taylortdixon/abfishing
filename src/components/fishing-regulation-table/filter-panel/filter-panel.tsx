import {
  FormGroup,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { FilterPanelProps } from "./filter-panel.types.props";
import "./filter-panel.css";
import _ from "lodash";
import { GridFilterItem } from "@material-ui/data-grid";

export const FilterPanel: React.VFC<FilterPanelProps> = ({
  filters,
  regulations,
  onFiltersChange,
}) => {
  const managementZones = _.uniq(
    regulations.map((waterbody) =>
      waterbody.fish_management_zone.replace(/-[A-z]+/, "")
    )
  );

  const handleFilterChange = (filterItem: GridFilterItem) => {
    const newFilters = [...filters];
    const filterIndex = _.findIndex(
      filters,
      (predicate) => predicate.columnField === filterItem.columnField
    );

    if (filterIndex === -1) {
      newFilters.push(filterItem);
    } else {
      newFilters.splice(filterIndex, 1, filterItem);
    }

    onFiltersChange(newFilters);
  };

  return (
    <FormGroup className="filter_panel" row>
      <FormControl>
        <TextField
          id="filled-search"
          label="Search for lake, river, etc"
          type="search"
          onChange={(event) =>
            handleFilterChange({
              columnField: "waterbody",
              operatorValue: "contains",
              value: event.target.value,
            })
          }
        />
      </FormControl>
      <FormControl>
        <InputLabel>Zone</InputLabel>
        <Select
          defaultValue=""
          onChange={(event) =>
            handleFilterChange({
              columnField: "fish_management_zone",
              operatorValue: "startsWith",
              value: event.target.value as string,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {managementZones.map((zone) => (
            <MenuItem key={zone} value={zone}>
              {zone}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormGroup>
  );
};
