
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpNewIp } from "../../features/baseUrlSet/baseUrlSlice";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import useMutationRel from "../../GraphQLApiCall/useMutationRel";

const generateUniqueKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); // Ensures milliseconds are always 3 digits

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};

const ConfigurationSetUp = () => {
  // Fetch API data
  const confApi = GetAllTableData(620);

  const confApiData = confApi?.all_table_data?.getDynamicTableField?.jsonData;

  const dispatch = useDispatch();
  const baseUrlState = useSelector((state) => state.baseUrl);
  const { setTableData, setTableId, setTableRel, setTableCol } =
    useMutationRel();

  const [confAllValue, setConfAllValue] = useState({
    type: "",
    key: "",
    value: "",
  });

  const confInputChange = (event) => {
    const { name, value } = event.target;
    setConfAllValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const confSetupNewIp = (event) => {
    event.preventDefault();
    dispatch(
      setUpNewIp({
        type: confAllValue.type,
        key: confAllValue.key,
        value: confAllValue.value,
      })
    );

    // Construct API JSON after dispatch
    const uniqueKey = baseUrlState.uniqueKey || generateUniqueKey();

    const apiJson = [
      {
        tableId: 620,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueKey,
        columnData: confAllValue.type,
        columnName: "ConfType",
        userId: 123, // Example userId
      },
      {
        tableId: 620,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueKey,
        columnData: confAllValue.key,
        columnName: "ConfKey",
        userId: 123,
      },
      {
        tableId: 620,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueKey,
        columnData: confAllValue.value,
        columnName: "ConfValue",
        userId: 123,
      },
      {
        tableId: 620,
        tableColId: 4,
        tabRelId: "",
        tableRefId: uniqueKey,
        columnData: "demo",
        columnName: "user",
        userId: 123,
      },
    ];

    setTableData(apiJson);
    setTableId(620);
    setTableRel("");
    setTableCol(0);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className="absolute top-20 w-[1000px]">
      <div className="flex gap-x-6 items-start">
        <div className="flex-1 relative overflow-x-auto max-w-xl">
          <h2 className="font-bold text-lg m-2">Configuration List</h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Key
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {baseUrlState?.type &&
              baseUrlState?.key &&
              baseUrlState?.value ? (
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {baseUrlState.type}
                  </td>
                  <td className="px-6 py-4">{baseUrlState.key}</td>
                  <td className="px-6 py-4">{baseUrlState.value}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex-1">
          <h2 className="font-bold text-lg m-2">Configuration Set Up</h2>
          <form className="max-w-xl border p-4" onSubmit={confSetupNewIp}>
            <div className="mb-5">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Conf Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type your key..."
                required
                value={confAllValue.type}
                onChange={confInputChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="key"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Conf Key
              </label>
              <select
                id="key"
                name="key"
                value={confAllValue.key}
                onChange={confInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose a key</option>
                <option value="BaseURL">BaseURL</option>
                {/* Add other options as needed */}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="confValue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Conf Value
              </label>
              <input
                type="text"
                id="confValue"
                name="value"
                className="bg-gray-50 border-2 border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                placeholder="Type your value..."
                value={confAllValue.value}
                onChange={confInputChange}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-4"
            >
              Add
            </button>

            <Link
              to="/"
              className="text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-2"
            >
              Close
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSetUp;
