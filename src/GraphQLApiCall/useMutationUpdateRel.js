import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  GET_ALL_TABLE_DATA_QUERY,
} from "../GraphQL/Queries";
import { TABLE_COLUMN_DATA_UPDATE } from "../GraphQL/Mutations";

const useMutationUpdateRel = () => {
  const [updateId, setUpdateId] = useState(0);
  const [updateData, setUpdateData] = useState([]);
  const [tableUpdateId, setTableUpdateId] = useState(null);
  const [tableUpdateRelId, setTableUpdateRelId] = useState(null);
  const [tableUpdateColId, setTableUpdateColId] = useState(null);
  const [userUpdateId, setUserUpdateId] = useState("");
  const [updateDb, setUpdateDb] = useState("");

  const [
    columnDataUpdate,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(TABLE_COLUMN_DATA_UPDATE, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL,
        variables: {
          tableId: tableUpdateId,
          tableColId: tableUpdateColId,
          tabRelId: tableUpdateRelId,
          userId: userUpdateId,
        },
      },
      {
        query: GET_ALL_TABLE_DATA_QUERY,
        variables: {
          tableId: tableUpdateId,
          userId: userUpdateId,
        },
      },
    ],
  });

  useEffect(() => {
    if (updateId) {
      columnDataUpdate({
        variables: {
          id: updateId,
          columnData: updateData,
          userId: userUpdateId,
          db: updateDb,
        },
      });
    }
  }, [updateId]);

  return {
    setUpdateId,
    setUpdateData,
    setTableUpdateId,
    setTableUpdateRelId,
    setTableUpdateColId,
    setUserUpdateId,
    setUpdateDb,
  };
};

export default useMutationUpdateRel;

// [
//   { flowchart_name: "new flow filter" },
//   { sl: 1, stepType: "container", processType: "linebarchart" },
//   {
//     sl: 2,
//     stepType: "source",
//     sourceType: "get data",
//     sourceInfoType: "json data",
//     source: ["PINC.json", "PINC.json", "PINC.json"],
//   },
// {
//   sl: 3,
//   stepType: "filter",
//   sourceType: "filter data",
//   sourceInfoType: "json data",
//   source: ["PINC.json", "PINC.json", "PINC.json"],
//   filterKey: "date",
//   filterCon: "E",
//   filterConValue: "2022",
// },
// ];

// [
//   {
//     flowName: "new flow filter",
//     nodeType: "source",
//     api: "https://itb-usa.a2hosted.com/media/upload_file/yahoo_finance_hist/",
//   },
//   {
//     flowName: "new flow filter",
//     nodeType: "filter",
//     api: 'function filterData(logic, logicvalue, itemvalue) {\n            try {\n              let filteredItems = [];\n              if (logic === "E") {\n                filteredItems = itemvalue?.data?.filter((item) => {\n                  const year = new Date(item.Date).getFullYear();\n                  return year === parseInt(logicvalue);\n                });\n              } else if (logic === "LT") {\n                filteredItems = itemvalue?.data?.filter((item) => {\n                  const year = new Date(item.Date).getFullYear();\n                  return year <= parseInt(logicvalue);\n                });\n              } else if (logic === "B") {\n                filteredItems = itemvalue?.data?.filter((item) => {\n                  const year = new Date(item.Date).getFullYear();\n                  const dateParts = logicvalue.split(" to ");\n             const filterStartDate = new Date(dateParts[0]).getFullYear();\n                  const filterEndDate = new Date(dateParts[1]).getFullYear();\n                  return year >= filterStartDate && year <= filterEndDate;\n                });\n              }\n              return filteredItems;\n            } catch (error) {\n              console.error("Error fetching data:", error);\n              throw error;\n            }\n          }\n          const logic = condition;\n          const logicvalue = conditionvalue;\n          const itemvalue = dataset;\n          const myFilter = filterData(logic, logicvalue, itemvalue);\n          return myFilter;',
//   },
// ];
