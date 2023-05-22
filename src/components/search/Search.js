import React, { memo } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import "./Search.css";

/**
 * SearchBox is a component that displays a search input box with a clear icon.
 * It allows users to input search values and clear the input when needed.
 */
const SearchBox = ({ placeholder, handleInputChange, searchValues }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-input"
        placeholder={`Search ${placeholder}`}
        value={searchValues[placeholder] || ""}
        onChange={(e) => handleInputChange(e, placeholder, null)}
      />
      {searchValues[placeholder] && (
        <FaTimes
          className="clear-icon"
          onClick={(e) => handleInputChange(e, placeholder, "")}
        />
      )}
    </div>
  );
};

SearchBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  searchValues: PropTypes.object.isRequired,
};

export default memo(SearchBox);
