import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";

const useGetQueryNew = (id) => {
  const [getTableId, setGetTableId] = useState(id);
  const [getTableColId, setGetTableColId] = useState(0);
  const [getTableRelId, setGetTableRelId] = useState("");
  const [getTableData, setGetTableData] = useState("");
  const [tableDataLog, setTableDataLog] = useState("");
  const [dataLog, setDataLog] = useState(false);

  const {
    loading: data_loading,
    error: data_error,
    data: get_data,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: {
      tableId: getTableId,
      tableColId: getTableColId,
      tabRelId: getTableRelId,
    },
  });

  useEffect(() => {
    if (data_loading) {
      setTableDataLog("loading");
    } else if (data_error) {
      setTableDataLog("error");
    } else {
      setGetTableData(get_data);
    }
    setDataLog(false);
  }, [get_data]);

  return {
    getTableData,
    setGetTableId,
    tableDataLog,
    setGetTableColId,
    setGetTableRelId,
  };
};

export default useGetQueryNew;
