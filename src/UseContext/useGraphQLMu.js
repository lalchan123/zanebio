import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CREATE_CRUD_INFO_MUTATION } from "../GraphQL/Mutations";

const useGraphQLMu = () => {
  const [vTableId, setVTableId] = useState("");
  const [vTableColId, setVTableColId] = useState("");
  const [vTableRefId, setVTableRefId] = useState("");
  const [vTableRelId, setVTableRelId] = useState("");
  const [vTableData, setVTableData] = useState([]);
  const [vTableName, setVTableName] = useState("");
  const [vTableUser, setVTableUser] = useState("");
  const [vTableType, setVTableType] = useState("");
  const [mutationLog, setMutationLog] = useState("demo check");

  const [
    createCrudInfo,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(CREATE_CRUD_INFO_MUTATION);

  //demo

  useEffect(() => {
    if (vTableType === "createCrudInfo") {
      vTableData?.map((item, i) => {
        createCrudInfo({
          variables: {
            tableId: item.tableId,
            tableColId: item.tableColId,
            tabRelId: item.tableRelId,
            tableRefId: item.tableRefId,
            columnData: item.tableData,
            columnName: item.tableName,
            userId: item.tableName,
          },
        });
      });
    }

    if (data_error) {
      setMutationLog("mutation error");
    } else if (data_loading) {
      setMutationLog("mutation loading");
    } else if (finalData) {
      setMutationLog(finalData);
    }
  }, [vTableType]);

  return {
    setVTableData,
    setVTableType,
  };
};

export default useGraphQLMu;
