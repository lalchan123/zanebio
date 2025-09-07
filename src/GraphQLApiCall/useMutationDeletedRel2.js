import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL2 } from "../GraphQL/Queries";
import { TABLE_COLUMN_DATA_DELETE2 } from "../GraphQL/Mutations";

const useMutationDeletedRel2 = () => {
  const [deletedId, setDeletedId] = useState(0);
  const [tableDeletedId, setTableDeletedId] = useState(null);
  const [tableDeletedRelId, setTableDeletedRelId] = useState(null);
  const [tableDeletedColId, setTableDeletedColId] = useState(null);
  const [userDeletedId, setUserDeletedId] = useState(null);

  const [
    columnDataDelete2,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(TABLE_COLUMN_DATA_DELETE2, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL2,
        variables: {
          tableId: tableDeletedId,
          tableColId: tableDeletedColId,
          tabRelId: tableDeletedRelId,
          userId: userDeletedId,
        },
      },
    ],
  });

  useEffect(() => {
    if (deletedId) {
      columnDataDelete2({
        variables: {
          id: deletedId,
          userId: userDeletedId,
        },
      });
    }
  }, [deletedId]);

  return {
    setDeletedId,
    setTableDeletedId,
    setTableDeletedRelId,
    setTableDeletedColId,
    setUserDeletedId,
  };
};

export default useMutationDeletedRel2;
