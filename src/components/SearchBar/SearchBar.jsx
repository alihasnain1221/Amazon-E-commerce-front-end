import { IconButton, InputBase } from "@mui/material";
import React from "react";
import searchIcon from "../../assets/search.png";
import useStyles from "./styles";

const SearchBar = ({ searchText, setSearchText, handleSearchClick }) => {
  const classes = useStyles();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
  return (
    <>
      <div className={classes.searchContainer}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          className={classes.searchBar}
          value={searchText || ""}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => handleSearchClick()}
        >
          <img src={searchIcon} className={classes.iconImg} alt="search" />
        </IconButton>
      </div>
    </>
  );
};

export default SearchBar;
