import React, { useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_ALL_TABLE_COLUMN2 } from "../GraphQL/Queries";

const useLazyQueryAllTableCol2 = () => {
  const [getTableData, setGetTableData] = useState(null);

  const [
    onTableDataFire,
    { loading: data_loading, error: data_error, data: all_table_col },
  ] = useLazyQuery(GET_ALL_TABLE_COLUMN2);

  return {
    all_table_col,
    onTableDataFire,
  };
};

export default useLazyQueryAllTableCol2;
