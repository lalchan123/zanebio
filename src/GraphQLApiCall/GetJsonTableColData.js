import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_JSON_TABLE_COL_DATA_QUERY } from "../GraphQL/Queries";

const GetJsonTableColData = (db, user_id, table_id) => {
  const {
    loading: data_loading,
    error: data_error,
    data: json_table_col_data,
  } = useQuery(GET_JSON_TABLE_COL_DATA_QUERY, {
    variables: {
      db: db,
      userId: user_id,
      tableId: table_id,
    },
  });

  return {
    json_table_col_data,
  };
};

export default GetJsonTableColData;
