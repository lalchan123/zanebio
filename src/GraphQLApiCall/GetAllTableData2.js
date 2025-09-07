import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TABLE_DATA_QUERY2 } from "../GraphQL/Queries";

const GetAllTableData2 = (id) => {
  const {
    loading: data_loading,
    error: data_error,
    data: all_table_data,
  } = useQuery(GET_ALL_TABLE_DATA_QUERY2, {
    variables: {
      tableId: id,
    },
  });

  return {
    all_table_data,
  };
};

export default GetAllTableData2;
