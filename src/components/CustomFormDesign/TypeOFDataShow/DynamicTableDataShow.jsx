import React, { useState, useEffect } from "react";

const DynamicTableDataShow = ({ data }) => {
  console.log("check data 7", data);

  function getHeadings(data) {
    return Object.keys(data[0] || [{ "loading...": "" }]).map((key) => {
      return (
        <th
          scope="col"
          class=" py-2 px-0 fixed-top position-sticky bg-slate-100"
        >
          {key}
        </th>
      );
    });
  }

  function getRows(data) {
    return data.map((obj) => {
      return (
        <tr className="bg-white border-b bg-gray-800 border-gray-700">
        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"> */}
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

  return (
    <>
      {data && (
        <div className="relative overflow-x-scroll w-full h-[300px] border ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {getHeadings(data)}
            </thead>
            <tbody>{getRows(data)}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DynamicTableDataShow;
