import { useState, useEffect } from "react";
import axios from "axios";

const useRestAPIGetAxios = (url) => {
  const [arestApiData, setData] = useState("");
  const [arestApiLoading, setLoading] = useState(true);
  const [arestApiError, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false); 
      });
    };

    fetchData();
  }, [url]);

  return { arestApiData, arestApiLoading, arestApiError };
};

export default useRestAPIGetAxios;
