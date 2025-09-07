import { useState, useEffect } from "react";
import axios from "axios";

const useRestAPIPost = (url) => {
  const [restApiPostData, setRestApiPostData] = useState("");
  const [restApiPostValue, setDataRestApiPostValue] = useState(null);
  const [restApiPostLoading, setRestApiPostLoading] = useState(true);
  const [restApiPostError, setRestApiPostError] = useState(null);

  useEffect(() => {
    if (restApiPostValue !== null) {
      axios
        .post(url, restApiPostValue, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setRestApiPostData(response.data.data);
        })
        .catch((error) => {
          setRestApiPostError({ responseData: null, error: error.message });
        });
    }
  }, [restApiPostValue]);

  return {
    restApiPostData,
    restApiPostLoading,
    restApiPostError,
    setDataRestApiPostValue,
  };
};

export default useRestAPIPost;
