import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";

const useLazyQueryRel = () => {
  const [getTableId, setGetTableId] = useState(null);
  const [getTableColId, setGetTableColId] = useState(null);
  const [getTableRelId, setGetTableRelId] = useState(null);
  const [getTableData, setGetTableData] = useState(null);
  const [tableDataLog, setTableDataLog] = useState("");
  const [dataLog, setDataLog] = useState(false);

  const [
    onDataFire,
    { loading: data_loading, error: data_error, data: get_data },
  ] = useLazyQuery(TABLE_DATA_DETAIL, {});

  useEffect(() => {
    if (data_loading) {
      setTableDataLog("loading");
    } else if (data_error) {
      setTableDataLog("error");
    } else {
      setGetTableData(get_data);
    }
    setDataLog(true);
  }, [getTableData]);

  return {
    get_data,
    onDataFire,
  };
};

export default useLazyQueryRel;
