import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_COLUMN_DATA_DELETE } from "../GraphQL/Mutations";

const useGraphQLDeleted = () => {
  const [vTableDataDeleted, setVTableDataDeleted] = useState([]);

  const [
    columnDataDelete,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(TABLE_COLUMN_DATA_DELETE, {
    // refetchQueries: [
    //   {
    //     query: TABLE_DATA_DETAIL,
    //     variables: { tableId: 9, tableColId: 1, tabRelId: value },
    //   },
    // ],
  });

  useEffect(() => {
    vTableDataDeleted?.map((item, i) => {
      columnDataDelete({
        variables: {
          id: parseInt(item.tableId),
        },
      });
    });

    if (data_error) {
      setMutationLog("mutation error");
    } else if (data_loading) {
      setMutationLog("mutation loading");
    } else if (finalData) {
      setMutationLog(finalData);
    }
  }, [vTableDataDeleted]);

  return {
    setVTableDataDeleted,
  };
};

export default useGraphQLDeleted;
