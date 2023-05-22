import React, { useState, useContext } from "react";
import useDataFetching from "../../utils/hooks/useDataFetching";
import TableComponent from "./TableComponent";
import { API_URL } from "../../constants/constant";
import ThemeContext from "../common/ThemeContext";
import ToggleButton from "../toggleButton/ToggleButton";
import withErrorBoundary from "../common/withErrorBoundary";

/**
 * TableDataComponent is a component that displays table data.
 * It fetches data from the specified API URL, uses reusable TableComponent to display Custom Tables,
 * and allows users to switch between light and dark themes.
 */
const TableDataComponent = () => {
  const [page, setPage] = useState(1); // use this to implement infinite scrolling
  const { data, isLoading, headerData } = useDataFetching(API_URL, {
    page,
  });
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {/* Header and theme toggle */}
      <div className="diaplayFlex">
        <h1 className="heading-app">Data Gridify Demo</h1>
        <ToggleButton toggleTheme={toggleTheme} theme={theme} />
      </div>

      {/* Reusable Table Component */}
      <TableComponent
        data={data}
        config={{
          headerData: headerData,
          pinnable: true,
          searchable: true,
          sortable: true,
          theme: theme,
          isLoading: isLoading,
          setPage: setPage,
        }}
      />

      {/* Uncomment to view a Static Table */}
      {/* <TableComponent
          data={data}
          config={{
            headerData: headerData,
            theme: theme,
            isLoading: isLoading,
          }}
        /> */}
    </>
  );
};

export default withErrorBoundary(TableDataComponent);
