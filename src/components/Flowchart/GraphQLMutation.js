import React from "react";

import { gql, useQuery, useMutation } from "@apollo/client";

import { CREATE_CRUD_INFO_MUTATION } from "../GraphQL/Mutations";

const GraphQLMutation = () => {
  const [createCrudInfo] = useMutation(CREATE_CRUD_INFO_MUTATION, {
    // refetchQueries: [
    //   {
    //     query: TABLE_DATA_DETAIL,
    //     variables: { tableId: 471, tableColId: 0, tabRelId: "" },
    //   },
    // ],
  });
  const addNewFlowChart = () => {
    createCrudInfo({
      variables: {
        tableId: 471,
        tableColId: 1,
        tabRelId: "",
        tableRefId: "uniqueId",
        columnData: "flowchartName",
        columnName: "Flowchart_Name",
        userId: "",
      },
    });

    createCrudInfo({
      variables: {
        tableId: 471,
        tableColId: 2,
        tabRelId: "",
        tableRefId: "uniqueId",
        columnData: "defaultValue",
        columnName: "Flowchart_Data",
        userId: "",
      },
    });
    setFlowchartName("");
  };
  return <div>GraphQLMutation</div>;
};

export default GraphQLMutation;
