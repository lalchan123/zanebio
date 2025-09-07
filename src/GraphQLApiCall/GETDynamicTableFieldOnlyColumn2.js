import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_Dynamic_Table_Field_Only_Column_Query2 } from "../GraphQL/Queries";

const GETDynamicTableFieldOnlyColumn2 = (id) => {
  const {
    loading: data_loading,
    error: data_error,
    data: all_table_data,
  } = useQuery(GET_Dynamic_Table_Field_Only_Column_Query2, {
    variables: {
      tableId: id,
    },
  });

  return {
    all_table_data,
  };
};

export default GETDynamicTableFieldOnlyColumn2;
