import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_TABLE_DATA_QUERY,
  TABLE_DATA_DETAIL,
} from "../GraphQL/Queries";
import { DELETED_TABLE_DATA_BY_REF_ID } from "../GraphQL/Mutations";
import { AppContext } from "../AppContext";

const useMutationDeletedSetByRef = () => {
  const {
    adminAlert,
    alertStatus,
    setAdminALert,
    setAlertStatus,
    alertStatusFixed,
    setAlertStatusFixed,
  } = useContext(AppContext);

  const [tableDeletedId, setTableDeletedId] = useState(null);
  const [tableDeletedRefId, setTableDeletedRefId] = useState(null);
  const [userDeletedId, setUserDeletedId] = useState(null);

  const [
    deleteTableRowWithTableRefId,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(DELETED_TABLE_DATA_BY_REF_ID, {
    refetchQueries: [
      {
        query: GET_ALL_TABLE_DATA_QUERY,
        variables: {
          tableId: tableDeletedId,
          userId: userDeletedId,
        },
      },
      {
        query: TABLE_DATA_DETAIL,
        variables: {
          tableId: tableDeletedId,
          tableColId: 0,
          tabRelId: "",
          userId: userDeletedId,
        },
      },
    ],
  });

  useEffect(() => {
    if (tableDeletedRefId) {
      deleteTableRowWithTableRefId({
        variables: {
          tableId: tableDeletedId,
          tableRefId: tableDeletedRefId,
          userId: userDeletedId,
        },
      });
      // if (finalData?.message) {
      //   // setAlertStatus("job_data_deleted");
      //   // setAlertStatusFixed(finalData.message);
      //   // adminAlert(true);
      // }
    }
  }, [tableDeletedRefId]);
  return {
    setTableDeletedId,
    setTableDeletedRefId,
    setUserDeletedId,
  };
};

export default useMutationDeletedSetByRef;
