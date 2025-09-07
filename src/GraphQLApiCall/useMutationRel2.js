import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL2,
  GET_ALL_TABLE_DATA_QUERY2,
} from "../GraphQL/Queries";
import { CREATE_MULTIPLE_DYNAMIC_TABLE_DATA } from "../GraphQL/Mutations";

const useMutationRel2 = () => {
  const [tableId, setTableId] = useState(null);
  const [tableRel, setTableRel] = useState(null);
  const [tableCol, setTableCol] = useState(null);
  const [userDataId, setUserDataId] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [
    createMultipleDynamicTableData,
    { data: mutationLog, error: mutationError, success: mutationSuccess },
  ] = useMutation(CREATE_MULTIPLE_DYNAMIC_TABLE_DATA, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL2,
        variables: {
          tableId: tableId,
          tableColId: tableCol,
          tabRelId: tableRel,
          userId: userDataId
        },
      },
      {
        query: GET_ALL_TABLE_DATA_QUERY2,
        variables: {
          tableId: tableId,
          userId: userDataId
        },
      },
    ],
  });

  useEffect(() => {
    if (tableData.length > 0) {
      createMultipleDynamicTableData({
        variables: {
          tableDataList: tableData,
        },
      });
    }
  }, [tableData]);

  return {
    setTableData,
    setTableId,
    setTableRel,
    setTableCol,
    setUserDataId,
  };
};

export default useMutationRel2;
