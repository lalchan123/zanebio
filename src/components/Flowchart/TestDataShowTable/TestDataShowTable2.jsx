import React, { useEffect } from "react";
import useLazyQueryDynamic2 from "../../../GraphQLApiCall/useLazyQueryDynamic2";

const TestDataShowTable2 = (props) => {
  const { tableId } = props;

  console.log("7 tableId", tableId)

  const { get_data, onDataFire } = useLazyQueryDynamic2();

  const onAllDataGet = async (id) => {
    const userResp = await onDataFire({
      variables: {
        tableId: id,
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  useEffect(() => {
    if (tableId) {
      onAllDataGet(tableId);
    }
  }, [tableId]);

  const allTableDataJson = eval(get_data?.getDynamicTableFieldOnlyColumn2?.jsonData) || [
    { "loading...": "" },
  ];

  function getHeadings(data) {
    return Object?.keys(data[0])?.map((key) => {
      return (
        <th scope="col" className="sticky top-0 py-4 px-0  bg-slate-100">
          {key}
        </th>
      );
    });
  }

  function getRows(data) {
    return data.map((obj) => {
      return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          {getCells(obj)}
        </tr>
      );
    });
  }

  function getCells(obj) {
    return Object.values(obj).map((value) => {
      return <td>{value}</td>;
    });
  }

  function check(dataJson) {
    return !!dataJson && Object.keys(dataJson).length;
  }

  return (
    <div className="border p-2">
      <div className="relative overflow-x-scroll w-full h-[235px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {check(allTableDataJson) !=0 ? getHeadings(allTableDataJson) : ""}
          </thead>
          <tbody>{check(allTableDataJson) !=0 ? getRows(allTableDataJson) : ""}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TestDataShowTable2;
