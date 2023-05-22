import React, { useEffect, useState, useRef, useCallback } from "react";
import "./TableComponent.css";
import { generateRandomIndex } from "../../utils/utils";
import Search from "../search/Search";
import SortIcons from "../sort/SortIcons";
import { BsFillPinFill, BsPinAngle } from "react-icons/bs";
import {
  debounce,
  startsWith,
  sortBy,
  includes,
  filter,
  isEmpty,
} from "lodash";
import { areAllValuesEmpty } from "../../utils/utils";

/**
 * TableComponent is a reusable component that displays tabular data with various features.
 *
 * @param {Array} data - The array of objects representing the data to be displayed in the table.
 * @param {Object} config - The configuration object containing the following options:
 *   - headerData: Array - An array of strings representing the table header column names.
 *   - theme: String - The theme of the table component (e.g., "light" or "dark").
 *   - setPage: Function - A callback function to update the current page when using pagination.
 *   - isLoading: Boolean - A flag indicating whether the data is currently being loaded.
 *   - pinnable: Boolean - A flag indicating whether the columns can be pinned.
 *   - searchable: Boolean - A flag indicating whether the table supports search functionality.
 *   - sortable: Boolean - A flag indicating whether the table supports column sorting.
 *
 * @returns {JSX.Element} The JSX element representing the table component with the provided data and configuration.
 */

const TableComponent = ({
  data,
  config: {
    headerData,
    theme,
    setPage = () => {},
    isLoading,
    pinnable = false,
    searchable = false,
    sortable = false,
  },
}) => {
  const [filteredData, setFilteredData] = useState(data || []);
  const [headers, setHeaders] = useState(headerData);
  const [searchValues, setSearchValues] = useState({});
  const [sortDirection, setSortDirection] = useState("");
  const [pinnedHeaders, setPinnedHeaders] = useState([]);
  const [waiting, setwaiting] = useState(false);
  const tableRef = useRef(null);

  /**
   * useEffect hook to set the initial page to 1.
   */
  useEffect(() => {
    setPage(1);
  }, []);

  /**
   * useEffect hook to update the headers state when new headerData is added.
   * Also resets the pinned headers.
   *
   * @param {array} headerData - The new header data to be updated.
   * @param {array} headers - The current headers state.
   */
  useEffect(() => {
    if (headerData.length !== headers.length) {
      setHeaders(headerData);
      setPinnedHeaders([]);
    }
  }, [headerData, headers]);

  /**
   * useEffect hook to update the filteredData state with the current data state.
   *
   * @param {array} data - The current data state.
   */
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  /**
   * useEffect hook to perform search when searchValues or data change.
   * Calls the handleSearch function to filter the data based on search criteria.
   *
   * @param {object} searchValues - The search values object containing the search criteria.
   * @param {array} data - The current data state.
   */
  useEffect(() => {
    setwaiting(true);
    if (data.length > 0 && Object.keys(searchValues).length > 0) {
      handleSearch();
    }
    setwaiting(false);
  }, [searchValues, data]);

  /**
   * Handle scroll event on the table container with debounced execution
   * i.e. function execution is delayed by a specified time period (300 milliseconds in this case).
   * If the scroll reaches the bottom of the container, trigger the 'handleLoadMore' function.
   *
   * @param {object} searchValues - The search values object containing the search criteria.
   */
  const handleScroll = useCallback(
    debounce(() => {
      setwaiting(true);
      if (isEmpty(searchValues) || areAllValuesEmpty(searchValues)) {
        const tableContainer = tableRef.current;
        if (
          tableContainer.scrollTop + tableContainer.clientHeight >=
          tableContainer.scrollHeight - 1
        ) {
          handleLoadMore();
          setSortDirection("");
        }
      }
      setwaiting(false);
    }, 300),
    [searchValues]
  );

  /**
   * Effect hook to add scroll event listener to the table body and clean up the listener on unmount.
   *
   * @param {Function} handleScroll - The callback function to handle the scroll event.
   */
  useEffect(() => {
    const tableBody = tableRef.current;
    tableBody.addEventListener("scroll", handleScroll);

    return () => {
      tableBody.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  /**
   * Handles the "Load More" action by incrementing the page number.
   */
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  /**
   * Handler function for search functionality with debounce.
   * Filters the data based on search values and updates the filtered data state.
   * Scrolls to the top of the table if any search values are present.
   *
   * @param {object} searchValues - The search values object containing the search criteria.
   */
  const handleSearch = useCallback(
    debounce(() => {
      let filtered = data;

      for (let key in searchValues) {
        const searchValue = searchValues[key]?.toString().toLowerCase();
        if (searchValue) {
          filtered = filtered.filter((item) => {
            const fieldValue = item[key]?.toString().toLowerCase();
            return startsWith(fieldValue, searchValue);
          });
        }
      }

      setFilteredData(filtered.length > 0 ? filtered : []);

      if (!areAllValuesEmpty(searchValues)) {
        const tableContainer = tableRef.current;
        tableContainer.scrollTop = 0;
      }
      setwaiting(false);
    }, 1000),
    [data, searchValues]
  );

  /**
   * Handles the input change event and updates the search values state.
   *
   * @param {object} e - The event object representing the input change event.
   * @param {string} header - The header/key of the search value being updated.
   * @param {string|null} val - The value to be assigned to the search value. If null, the value is extracted from the event target.
   */
  const handleInputChange = (e, header, val = null) => {
    let value;
    if (val === null) {
      value = e.target.value;
    } else {
      value = val;
    }

    setSearchValues((prevSearchValues) => ({
      ...prevSearchValues,
      [header]: value,
    }));
  };

  /**
   * Handler function for sorting the data based on a specific header.
   * Updates the sorted data state and toggles the sort direction.
   *
   * @param {Event} e - The event object.
   * @param {string} header - The header to sort the data by.
   */
  const handleSortDirection = (e, header) => {
    let sortedData;

    if (sortDirection === `${header}-desc`) {
      sortedData = sortBy(filteredData, header).reverse();
      setSortDirection(`${header}-asc`);
    } else {
      sortedData = sortBy(filteredData, header);
      setSortDirection(`${header}-desc`);
    }

    setFilteredData(sortedData);
  };

  /**
   * Handles the pin toggle functionality for a header column.
   * If the header is already pinned, it removes it from the pinned headers.
   * If the header is not pinned, it adds it to the pinned headers.
   *
   * @param {string} header - The header column to toggle pinning.
   */
  const handlePinToggle = (header) => {
    if (includes(pinnedHeaders, header)) {
      const updatedPinnedHeaders = filter(
        pinnedHeaders,
        (pinnedHeader) => pinnedHeader !== header
      );
      const updatedHeaders = [
        ...updatedPinnedHeaders,
        ...filter(headers, (h) => !includes(updatedPinnedHeaders, h)),
      ];
      setHeaders(updatedHeaders);
      setPinnedHeaders(updatedPinnedHeaders);
    } else {
      const updatedPinnedHeaders = [...pinnedHeaders, header];
      const updatedHeaders = [
        ...updatedPinnedHeaders,
        ...filter(headers, (h) => !includes(updatedPinnedHeaders, h)),
      ];
      setHeaders(updatedHeaders);
      setPinnedHeaders(updatedPinnedHeaders);
    }
  };

  return (
    <div className={`table-container ${theme}-theme`} ref={tableRef}>
      <div className="table-header">
        {headers.map((header) => (
          <div className="header-cell" key={header}>
            <div className="displayFlex">
              {pinnable && (
                <>
                  {pinnedHeaders.includes(header) ? (
                    <BsFillPinFill
                      className="pin-icon"
                      key={header}
                      onClick={() => handlePinToggle(header)}
                    />
                  ) : (
                    <BsPinAngle
                      className="pin-icon"
                      key={header}
                      onClick={() => handlePinToggle(header)}
                    />
                  )}
                </>
              )}
              <span>{header.toUpperCase()}</span>
              {sortable && filteredData.length > 0 && (
                <SortIcons
                  handleSortDirection={handleSortDirection}
                  sortDirection={sortDirection}
                  header={header.toLowerCase()}
                />
              )}
            </div>
            {searchable && (
              <Search
                placeholder={header.toLowerCase()}
                handleInputChange={handleInputChange}
                searchValues={searchValues}
              />
            )}
          </div>
        ))}
      </div>
      {filteredData.length > 0 ? (
        <div className="table-body">
          {filteredData.map((item, index) => (
            <div className="row" key={`${generateRandomIndex()}-${index}`}>
              {headers.map((header) => (
                <div
                  className="cell"
                  key={`${generateRandomIndex()}-${header}`}
                >
                  {item[header]}
                </div>
              ))}
            </div>
          ))}
          {isLoading ||
            (waiting && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ))}
        </div>
      ) : (
        !isLoading &&
        !waiting && <div className="cell-error">No Data Found</div>
      )}
    </div>
  );
};

export default TableComponent;
