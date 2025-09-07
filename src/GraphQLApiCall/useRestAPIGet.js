import { useState, useEffect } from "react";

const useRestAPIGet = (url) => {
  const [restApiData, setData] = useState("");
  const [restApiLoading, setLoading] = useState(true);
  const [restApiError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { restApiData, restApiLoading, restApiError };
};

export default useRestAPIGet;
