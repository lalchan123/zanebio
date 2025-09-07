import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useImageUpload = (url) => {
  const [name, setName] = useState("files");
  const [date, setData] = useState(new Date().getUTCMilliseconds());
  const [file_name, SetUploadfile] = useState("");
  const [unique_id, setUniqueid] = useState(new Date().getUTCMilliseconds());

  useEffect(() => {
    // getAgeWiseData();
    const imageUpload = () => {
      const data = new FormData();
      data.append("name", name);
      data.append("file_name", file_name);
      data.append("date", date);

      axios
        .post(url, data)
        .then((response) => console.log("49", response.data))
        .catch((err) => console.log(err));

      setName("");
      SetUploadfile("");
    };
  }, []);

  return { name, setName, file_name, SetUploadfile,  };
};

export default useImageUpload;
