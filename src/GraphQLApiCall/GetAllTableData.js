import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TABLE_DATA_QUERY } from "../GraphQL/Queries";

const GetAllTableData = (id, user_id) => {
  const {
    loading: data_loading,
    error: data_error,
    data: all_table_data,
  } = useQuery(GET_ALL_TABLE_DATA_QUERY, {
    variables: {
      tableId: id,
      userId: user_id
    },
  });

  return {
    all_table_data,
  };
};

export default GetAllTableData;
