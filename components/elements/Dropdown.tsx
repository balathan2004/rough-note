import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SortField, sortOrder } from "@/server/utils/interfaces";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName == name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export type ElementType = {
  name: string;
  value: ElementValue;
};

export type ElementValue = {
  sort: SortField;
  order: sortOrder;
};

const sortData: ElementType[] = [
  {
    name: "Modified Latest",
    value: { sort: "lastUpdated", order: "desc" },
  },
  {
    name: "Modified Oldest",
    value: { sort: "lastUpdated", order: "asc" },
  },
  {
    name: "Newest first",
    value: { sort: "doc_created", order: "desc" },
  },
  {
    name: "Oldest first",
    value: { sort: "doc_created", order: "asc" },
  },
];

type Props = {
  onChange: (value: ElementValue) => void;
};

export default function Dropdown({ onChange }: Props) {
  const theme = useTheme();
  const [selected, setSelected] = React.useState("Modified Latest");

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    setSelected(value);
    onChange(
      sortData.find((item) => item.name == value)?.value || sortData[0].value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200, mt: 2 }}>
        <Select
          displayEmpty
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {sortData.map((item) => (
            <MenuItem
              key={item.name}
              value={item.name}
              style={getStyles(item.name, selected, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
