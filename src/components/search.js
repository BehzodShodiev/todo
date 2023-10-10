import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { SearchContext } from "../pages/home";

const SearchField = ({ classes }) => {
  const { searchTerm, setSearchTerm, handleSearch } = useContext(SearchContext);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <TextField
      label="Search"
      variant="filled"
      className={classes.searchField}
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchField;
