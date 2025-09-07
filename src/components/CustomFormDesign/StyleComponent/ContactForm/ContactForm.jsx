import React, { useState } from "react";
import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";
import { useNavigate } from "react-router-dom";

const ContactForm = (props) => {
  const navigate = useNavigate();
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const [conactForm, setContactForm] = useState({
    title: "Contact Us",
    name: "Your Email",
    email: "Subject",
    message: "Your Massage",
    button: "Submit",
  });
  const [buttonSize, setButtonSize] = useState("");
  const [dataSource, setDataSource] = useState("");

  const onFlowChartList = async (value) => {
    const userResp = await onDataFire({
      variables: {
        tableId: 471,
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  let flowChartNameList = get_data?.getDynamicTableField?.jsonData;

  const onButtonSize = (value) => {
    setButtonSize({ buttonSize: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...conactForm, [name]: value });
  };

  props.onContactForm(
    JSON.stringify({ ...conactForm, ...buttonSize, dataSource: dataSource })
  );

  return (
    <div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Edit titel
        </label>
        <input
          type="text"
          name="title"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={conactForm.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Edit name label
        </label>
        <input
          type="text"
          name="name"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={conactForm.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Edit email label
        </label>
        <input
          type="email"
          name="email"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={conactForm.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Edit message label
        </label>
        <input
          type="text"
          name="message"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={conactForm.message}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Edit button label
        </label>
        <input
          type="text"
          name="button"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={conactForm.button}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label
          for="countries"
          class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
        >
          Data Insert
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs h-[50px] overflow-scroll"
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
          onClick={onFlowChartList}
        >
          {/* <option selected className="text-xs">
            Choose Data Source
          </option> */}
          {eval(flowChartNameList)?.map((item, i) => {
            return (
              <option className="text-xs" value="h1">
                {eval(flowChartNameList)?.length === 0
                  ? "Data Loading"
                  : item.Flowchart_Name}
              </option>
            );
          })}
          <option selected className="text-xs" onClick={() => navigate("/")}>
            Add New
          </option>
        </select>
      </div>
    </div>
  );
};

export default ContactForm;
