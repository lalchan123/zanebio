import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_BOX_DETAIL_REF } from "../GraphQL/Queries";

const GetQueryRef = (id, col, ref) => {
  const [getTableId, setGetTableId] = useState(null);
  const [getTableColId, setGetTableColId] = useState(null);
  const [getTableRefId, setGetTableRelId] = useState(null);

  const {
    loading: data_loading,
    error: data_error,
    data: get_data,
  } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
    variables: {
      tableId: getTableId,
      tableColId: getTableColId,
      tableRefId: getTableRefId,
    },
  });

  // useEffect(() => {
  //   setGetTableId(id);
  //   setGetTableColId(col);
  //   setGetTableRelId(ref);
  // }, [id, col, ref]);

  return get_data;
};

export default GetQueryRef;
