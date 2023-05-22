import React, { memo } from "react";
import PropTypes from "prop-types";
import "./SortIcons.css";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

/**
 * SortIcons is a component that displays sort icons based on the sort direction.
 * It allows users to click on the icons to change the sort direction.
 *
 * @param {string} sortDirection - The current sort direction.
 * @param {function} handleSortDirection - The function to handle sort direction change.
 * @param {string} header - The header value for which the sort icons are displayed.
 */
const SortIcons = ({ sortDirection, handleSortDirection, header }) => {
  return (
    <>
      {sortDirection !== "" && sortDirection === `${header}-desc` ? (
        <FaSortUp
          className="sort-icon"
          onClick={(e) => handleSortDirection(e, header)}
        />
      ) : sortDirection === `${header}-asc` ? (
        <FaSortDown
          className="sort-icon"
          onClick={(e) => handleSortDirection(e, header)}
        />
      ) : (
        <FaSort
          className="sort-icon"
          onClick={(e) => handleSortDirection(e, header)}
        />
      )}
    </>
  );
};

SortIcons.propTypes = {
  sortDirection: PropTypes.string.isRequired,
  handleSortDirection: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};

export default memo(SortIcons);
