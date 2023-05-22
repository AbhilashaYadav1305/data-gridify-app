import { useEffect, useState } from "react";
import axios from "axios";
import { API_ERROR } from "../../constants/constant";
import { debounce, isEmpty } from "lodash";

/**
 * Custom hook for fetching data from an API.
 *
 * @param {string} url - The URL of the API.
 * @param {Object} options - Additional options for the API request.
 * @param {number} options.page - The page number for pagination.
 * @returns {Object} - An object containing the fetched data, loading state, error, and header data.
 */
const useDataFetching = (url, { page }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headerData, setHeaders] = useState([]);

  useEffect(() => {
    const fetchData = debounce(async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { params: { page } });
        if (response?.data && Array.isArray(response.data)) {
          const newData = Object.values(response.data).map((item) => item);
          if (!isEmpty(newData)) {
            setHeaders(Object.keys(newData[0]));
            setData((prevData) => [...prevData, ...newData]);
          }
        } else {
          setError(API_ERROR);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.response?.data || API_ERROR);
        setIsLoading(false);
      }
    }, 100);

    fetchData();
    return () => {
      fetchData.cancel();
    };
  }, [url, page]);

  return { data, isLoading, error, headerData };
};

export default useDataFetching;
