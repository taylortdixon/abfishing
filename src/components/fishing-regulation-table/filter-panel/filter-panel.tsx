/* eslint-disable react/jsx-no-undef */
import {
  FormGroup,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import { FilterPanelProps } from "./filter-panel.types.props";
import styles from "./filter-panel.module.css";
import uniq from "lodash/uniq";
import findIndex from "lodash/findIndex";
import { GridFilterItem } from "@mui/x-data-grid";
import { trackOpenSeasonSearch } from "../../../utils/analytics.utils";

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

  const getValue = (key: string) =>
    filters.find((predicate) => predicate.columnField === key)?.value || "";

  const handleOpenSeasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;

    handleFilterChange({
      columnField: "open_season",
      operatorValue: "waterbody_date_range_in",
      value: checked ? "checked" : undefined,
    });

    if (checked) {
      trackOpenSeasonSearch();
    }
  };

  return (
    <FormGroup className={styles.filter_panel} row>
      <FormControl>
        <TextField
          id="filled-search"
          label="Search for lake, river, etc"
          type="search"
          value={getValue("waterbody")}
          variant="standard"
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
          variant="standard"
          onChange={(event) =>
            handleFilterChange({
              columnField: "fish_management_zone",
              operatorValue: "startsWith",
              value: event.target.value as string,
            })
          }
          value={getValue("fish_management_zone")}
        >
          <MenuItem value="">All</MenuItem>
          {managementZones.map((zone) => (
            <MenuItem key={zone} value={zone}>
              {zone}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{ justifyContent: "flex-end" }}>
        <FormControlLabel
          control={
            <Switch
              checked={!!getValue("open_season")}
              onChange={handleOpenSeasonChange}
              name="open_season"
            />
          }
          label="Open season only"
        />
      </FormControl>
      <Button variant="text" onClick={() => onFiltersChange([])}>
        Reset Filters
      </Button>
    </FormGroup>
  );
};
