import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";
import { CREATE_SCHEMA_DYNAMIC_TABLE_DATA } from "../GraphQL/Mutations";

const useDataSave = () => {
  const [tableId, setTableId] = useState(null);
  const [tableRel, setTableRel] = useState(null);
  const [tableCol, setTableCol] = useState(null);
  const [schemaTableData, setSchemaTableData] = useState([]);

  const [
    createMultipleDynamicTableDataJson,
    { data: dataSaveLog, error: dataSaveError, success: dataSaveSuccess },
  ] = useMutation(CREATE_SCHEMA_DYNAMIC_TABLE_DATA, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL,
        variables: {
          tableId: 541,
          tableColId: 1,
          tabRelId: "",
        },
      },
    ],
  });

  console.log("check data value 177", schemaTableData);

  useEffect(() => {
    if (schemaTableData.length > 0) {
      createMultipleDynamicTableDataJson({
        variables: {
          tableDataList: schemaTableData,
        },
      });
    }
  }, [schemaTableData]);

  return {
    dataSaveLog,
    dataSaveError,
    dataSaveSuccess,
    setSchemaTableData,
  };
};

export default useDataSave;
