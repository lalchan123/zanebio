import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";
import { CREATE_CRUD_INFO_MUTATION } from "../GraphQL/Mutations";

const useMutationJsonData = () => {
  const [tableIdJjson, setTableIdJson] = useState(null);
  const [tableRelJson, setTableRelJson] = useState(null);
  const [tableColJson, setTableColJson] = useState(null);
  const [tableNameJson, setTableNameJson] = useState(null);
  const [tableDataJson, setTableDataJson] = useState([]);
  const [userDataJsonId, setUserDataJsonId] = useState("");
  const [dataJsonDb, setDataJsonDb] = useState("");

  const [createCrudInfo] = useMutation(CREATE_CRUD_INFO_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL,
        variables: {
          tableId: tableIdJjson,
          tableColId: 1,
          tabRelId: "",
          userId: userDataJsonId,
        },
      },
    ],
  });

  useEffect(() => {
    if (tableDataJson.length > 0) {
      createCrudInfo({
        variables: {
          tableId: tableIdJjson,
          tableColId: tableColJson,
          tabRelId: tableRelJson,
          tableRefId: 1,
          columnData: JSON.stringify(tableDataJson),
          columnName: tableNameJson,
          userId: userDataJsonId,
          db: dataJsonDb,
        },
      });
    }
  }, [tableDataJson]);

  return {
    setTableDataJson,
    setTableIdJson,
    setTableRelJson,
    setTableColJson,
    setTableNameJson,
    setUserDataJsonId,
    setDataJsonDb,
  };
};

export default useMutationJsonData;
