import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_Table_Data_Query } from "../GraphQL/Queries";

const GETTableData = (db, user_id, table_id) => {
  const {
    loading: data_loading,
    error: data_error,
    data: all_table_data,
  } = useQuery(GET_Table_Data_Query, {
    variables: {
      db: db,
      userId: user_id,
      tableId: table_id,
    },
  });

  return {
    all_table_data,
  };
};

export default GETTableData;
