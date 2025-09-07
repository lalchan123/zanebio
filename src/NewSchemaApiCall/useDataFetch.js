import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../AppContext";
const useDataFetch = (tableId) => {
  const { sqlData, setSqlData, BaseURL, setBaseURL } = useContext(AppContext);

  const [fetchData, setFetchData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(
          BaseURL + `/account/get-dynamic-table-json-field/${tableId}/`
        );
        setFetchData(response.data);
      } catch (error) {
        setFetchError(error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [tableId]);

  return { fetchData, fetchLoading, fetchError };
};

export default useDataFetch;
