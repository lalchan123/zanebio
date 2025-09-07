import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  GET_ALL_TABLE_DATA_QUERY,
} from "../GraphQL/Queries";
import { CREATE_MULTIPLE_DYNAMIC_TABLE_DATA } from "../GraphQL/Mutations";

const useMutationRelWithInfo = () => {
  const [tableIdWithInfo, setTableIdWithInfo] = useState(null);
  const [tableRelWithInfo, setTableRelWithInfo] = useState(null);
  const [tableColWithInfo, setTableColWithInfo] = useState(null);
  const [tableDataWithInfo, setTableDataWithInfo] = useState([]);

  const [
    createMultipleDynamicTableData,
    {
      data: mutationLogWithInfo,
      error: mutationErrorWithInfo,
      success: mutationSuccessWithInfo,
    },
  ] = useMutation(CREATE_MULTIPLE_DYNAMIC_TABLE_DATA, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL,
        variables: {
          tableId: tableIdWithInfo,
          tableColId: tableColWithInfo,
          tabRelId: tableRelWithInfo,
        },
      },
      {
        query: GET_ALL_TABLE_DATA_QUERY,
        variables: {
          tableId: tableIdWithInfo,
        },
      },
    ],
  });

  useEffect(() => {
    if (tableDataWithInfo.length > 0) {
      createMultipleDynamicTableData({
        variables: {
          tableDataList: tableDataWithInfo,
        },
      });
      console.log("check data fire 48");
    }
  }, [tableDataWithInfo]);

  return {
    setTableDataWithInfo,
    setTableIdWithInfo,
    setTableRelWithInfo,
    setTableColWithInfo,
    mutationSuccessWithInfo,
    mutationErrorWithInfo,
    mutationLogWithInfo,
  };
};

export default useMutationRelWithInfo;
