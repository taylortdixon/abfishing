import { FormGroup, FormControl, TextField } from "@material-ui/core";
import React from "react";
import { FilterPanelProps } from "./filter-panel.types.props";
import "./filter-panel.css";

export const FilterPanel: React.VFC<FilterPanelProps> = ({
  onFiltersChange,
}) => {
  return (
    <FormGroup className="filter_panel" row>
      <FormControl>
        <TextField
          id="filled-search"
          label="Search for lake, river, etc"
          type="search"
          onChange={(event) =>
            onFiltersChange([
              {
                columnField: "waterbody",
                operatorValue: "contains",
                value: event.target.value,
              },
            ])
          }
        />
      </FormControl>
    </FormGroup>
  );
};
