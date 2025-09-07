import React from "react";

const TableDataShow = ({ dataSource }) => {
  function getHeadings(data) {
    return Object.keys(data[0]).map((key) => {
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

  return (
    <>
      {dataSource && (
        <div className="relative overflow-x-scroll w-full h-[300px] border z-0 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              {getHeadings(dataSource)}
            </thead>
            <tbody>{getRows(dataSource)}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TableDataShow;
