import React, { useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_ALL_TABLE_DATA_QUERY2, GET_Dynamic_Table_Field_Only_Column_Query2 } from "../GraphQL/Queries";

const useLazyQueryDynamic2 = () => {
  const [getTableData, setGetTableData] = useState(null);

  const [
    onDataFire,
    { loading: data_loading, error: data_error, data: get_data },
  // ] = useLazyQuery(GET_ALL_TABLE_DATA_QUERY2, {});
  ] = useLazyQuery(GET_Dynamic_Table_Field_Only_Column_Query2, {});

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

export default useLazyQueryDynamic2;
