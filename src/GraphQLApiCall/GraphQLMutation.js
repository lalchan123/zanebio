import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";
import { CREATE_MULTIPLE_DYNAMIC_TABLE_DATA } from "../GraphQL/Mutations";

const GraphQLMutation = (data) => {
  //   const [tableId, setTableId] = useState();
  //   const [tableRel, setTableRel] = useState();
  //   const [tableCol, setTableCol] = useState();
  //   const [tableData, setTableData] = useState(data);

  const [
    createMultipleDynamicTableData,
    { error: data_error, loading: data_loading, data: finalData },
  ] = useMutation(CREATE_MULTIPLE_DYNAMIC_TABLE_DATA, {
    // refetchQueries: [
    //   {
    //     query: TABLE_DATA_DETAIL,
    //     variables: {
    //       tableId: tableId,
    //       tableColId: tableCol,
    //       tabRelId: tableRel,
    //     },
    //   },
    // ],
  });

  createMultipleDynamicTableData({
    variables: {
      tableDataList: data,
    },
  });

  //   useEffect(() => {
  //     createMultipleDynamicTableData({
  //       variables: {
  //         tableDataList: tableData,
  //       },
  //     });
  //   }, [tableData]);

  return "success";
};

export default GraphQLMutation;
