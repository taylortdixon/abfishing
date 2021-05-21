/* eslint-disable react/jsx-no-undef */
import {
  FormGroup,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React from "react";
import { FilterPanelProps } from "./filter-panel.types.props";
import "./filter-panel.css";
import uniq from "lodash/uniq";
import findIndex from "lodash/findIndex";
import { GridFilterItem } from "@material-ui/data-grid";

export const FilterPanel: React.VFC<FilterPanelProps> = ({
  filters,
  regulations,
  onFiltersChange,
}) => {
  const managementZones = uniq(
    regulations.map((waterbody) =>
      waterbody.fish_management_zone.replace(/-[A-z]+/, "")
    )
  ).sort();

  const handleFilterChange = (filterItem: GridFilterItem) => {
    const newFilters = [...filters];
    const filterIndex = findIndex(
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
          value={
            filters.find((predicate) => predicate.columnField === "waterbody")
              ?.value || ""
          }
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
          value={
            filters.find(
              (predicate) => predicate.columnField === "fish_management_zone"
            )?.value || ""
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
      <Button variant="text" onClick={() => onFiltersChange([])}>
        Reset Filters
      </Button>
    </FormGroup>
  );
};
