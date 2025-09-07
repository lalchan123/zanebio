import React, { useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_ALL_TABLE_DATA_QUERY, GET_Dynamic_Table_Field_Only_Column_Query1 } from "../GraphQL/Queries";

const useLazyQueryDynamic = () => {
  const [getTableData, setGetTableData] = useState(null);

  const [
    onDataFire,
    { loading: data_loading, error: data_error, data: get_data },
  ] = useLazyQuery(GET_Dynamic_Table_Field_Only_Column_Query1, {});
  // ] = useLazyQuery(GET_ALL_TABLE_DATA_QUERY, {});

  //   useEffect(() => {
  //     if (data_loading) {
  //       setTableDataLog("loading");
  //     } else if (data_error) {
  //       setTableDataLog("error");
  //     } else {
  //       setGetTableData(get_data);
  //     }
  //     setDataLog(true);
  //   }, [getTableData]);

  return {
    get_data,
    onDataFire,
  };
};

export default useLazyQueryDynamic;
