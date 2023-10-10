import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const Sort = ({ sortChange }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    sortChange(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          labelId="sort-by-todos"
          label="Sort by"
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Has Priority</MenuItem>
          <MenuItem value={2}>By date</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Sort;
