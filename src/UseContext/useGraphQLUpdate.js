import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_COLUMN_DATA_UPDATE } from "../GraphQL/Mutations";

const useGraphQLMu = () => {
  const [vTableId, setVTableId] = useState("");
  const [vTableColId, setVTableColId] = useState("");
  const [vTableRefId, setVTableRefId] = useState("");
  const [vTableRelId, setVTableRelId] = useState("");
  const [vTableDataUpdate, setVTableDataUpdate] = useState([]);
  const [vTableName, setVTableName] = useState("");
  const [vTableUser, setVTableUser] = useState("");
  const [vTableTypeUpdate, setVTableTypeUpdate] = useState("");
  const [mutationLog, setMutationLog] = useState("demo check");

  const [
    columnDataUpdate,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(TABLE_COLUMN_DATA_UPDATE, {
    // refetchQueries: [
    //   {
    //     query: TABLE_DATA_DETAIL,
    //     variables: { tableId: 471, tableColId: 0, tabRelId: "" },
    //   },
    // ],
  });

  useEffect(() => {
    vTableDataUpdate?.map((item, i) => {
      columnDataUpdate({
        variables: {
          id: parseInt(item.tableId),
          columnData: item.tableData,
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
  }, [vTableDataUpdate]);

  return {
    setVTableDataUpdate,
  };
};

export default useGraphQLMu;
