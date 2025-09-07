import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";

const useGetQuery = (id, colid, relid) => {
  const [tabname, setTabname] = useState();
  const [tableid, setTableid] = useState();
  const [tablecolid, setTablecolid] = useState();
  const [tablerelid, setTablerelid] = useState();
  const [getQueryData, setGetQueryData] = React.useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const {
    loading: data_loading,
    data: get_data,
    error: data_error,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: {
      tableId: tableid,
      tableColId: tablecolid,
      tabRelId: tablerelid,
    },
  });

  useEffect(() => {
    if (data_loading) {
      console.log("Loading data...");
      setStartTime(new Date().getTime() / 1000);
    } else if (data_error) {
      console.error(data_error);
    } else {
      const endTime = new Date().getTime() / 1000;
      const loadingTime = endTime - startTime;
      console.log("start time 110", startTime);
      console.log("end time 112", endTime);
      console.log(`Data loaded in ${loadingTime} sec`);
    }
    setTableid(id);
    setTablecolid(colid);
    setTablerelid(relid);

    if (get_data) {
      // mutate data if you need to
      setGetQueryData(get_data);
    }
  }, [get_data]);

  return { getQueryData, data_loading, data_error, setGetQueryData };
};

export default useGetQuery;
