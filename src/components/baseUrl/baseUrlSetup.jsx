import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpNewIp } from "../../features/baseUrlSet/baseUrlSlice";

const BaseUrlSetup = () => {
  const dispatch = useDispatch();
  const baseUrlState = useSelector((state) => state.baseUrl);
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
    dispatch(setUpNewIp(confAllValue));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[500px]">
        <h2 className="font-bold text-lg m-2 text-center">
          Configuration Set Up
        </h2>
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
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default BaseUrlSetup;
