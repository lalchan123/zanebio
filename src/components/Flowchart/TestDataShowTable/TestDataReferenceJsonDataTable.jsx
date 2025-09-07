import React, { useEffect } from "react";

const TestDataReferenceJsonDataTable = (props) => {

  const data = props.data || [{ "loading...": "" }];

  console.log("7 data", data)
  function getHeadings(data) {
    return Object.keys(data[0])?.map((key) => {
      return (
        <th
          scope="col"
          // className=" py-2 px-0 fixed-top position-sticky bg-slate-100"
          className="sticky top-0 self-start py-2 px-0 bg-slate-100"
        >
          {key}
        </th>
      );
    });
  }

  function getRows(data) {
    return data.map((obj, index) => {
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
      <div className="relative overflow-scroll-auto w-full h-[300px] ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {check(data) !=0 ? getHeadings(data) : ""}{getHeadings(data)}
          </thead>
          <tbody>{check(data) !=0 ? getRows(data) : ""}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TestDataReferenceJsonDataTable;
