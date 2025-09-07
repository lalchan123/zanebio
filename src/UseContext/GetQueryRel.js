import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";

const GetQueryRel = (id, col, rel, userId) => {
  // const [getTableId, setGetTableId] = useState(null);
  // const [getTableColId, setGetTableColId] = useState(null);
  // const [getTableRelId, setGetTableRelId] = useState(null);

  const {
    loading: data_loading,
    error: data_error,
    data: get_data,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: {
      tableId: id,
      tableColId: col,
      tabRelId: rel,
      userId: userId,
    },
  });

  // useEffect(() => {
  //   setGetTableId(id);
  //   setGetTableColId(col);
  //   setGetTableRelId(rel);
  // }, [id, col, rel]);

  return get_data;
};

export default GetQueryRel;
