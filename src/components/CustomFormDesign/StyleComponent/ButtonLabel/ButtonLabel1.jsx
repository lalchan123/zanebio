import React, { useState } from "react";
import axios from "axios";



const ButtonLabel1 = (props) => {
  const { item } = props;

  const [buttonLabel1, setButtonLabel1] = useState(item?.name1 || "Button1");
  const [buttonLabel2, setButtonLabel2] = useState(item?.name2 || "Button2");
  const [buttonSize, setButtonSize] = useState("");
  const [buttonColor1, setButtonColor1] = useState( item?.buttonColor1 || "");
  const [buttonColor2, setButtonColor2] = useState(  item?.buttonColor2 || "");
  const [functionNameButton1, setFunctionNameButton1] = useState( item?.functionNameButton1 || "");
  const [functionNameButton2, setFunctionNameButton2] = useState( item?.functionNameButton2 || "");

  const onButtonSize = (value) => {
    setButtonSize(value);
  };

  const onButtonColor1 = (value) => {
    setButtonColor1(value);
  };
  const onButtonColor2 = (value) => {
    setButtonColor2(value);
  };

  let value = { name1: buttonLabel1, name2: buttonLabel2, size: buttonSize, buttonColor1: buttonColor1, buttonColor2: buttonColor2, functionNameButton1: functionNameButton1, functionNameButton2: functionNameButton2 };
  props.onButtonLabel(JSON.stringify(value));

  return (
    <div>
      <div className="mb-3">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Edit Button
        </label>
        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={buttonLabel1}
          onChange={(e) => setButtonLabel1(e.target.value)}
        />
      </div>
      <div className="flex items-center ">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <label
                for="function_name"
                class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
              >
                Function Name
              </label>
              <select
                id="function_name"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={functionNameButton1}
                onChange={(e) => setFunctionNameButton1(e.target.value)}
              >
                <option selected className="text-xs">
                  {functionNameButton1 ? functionNameButton1 : "Choose Function Name"}
                </option>
                <option
                  className="text-xs"
                  value="SaveData()"
                  >
                  SaveData()
                </option>
                <option
                  className="text-xs"
                  value="ClearData()"
                  >
                  ClearData()
                </option>
                <option
                  className="text-xs"
                  value="ViewData()"
                  >
                  ViewData()
                </option>
                <option
                  className="text-xs"
                  value="UpdateData()"
                  >
                  UpdateData()
                </option>
              </select>
          </div>
        </div>
      </div>  
      <div>
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Color
        </label>
        <div class="inline-flex rounded-md shadow-sm">
          <a
            href="#"
            aria-current="page"
            class="px-3 py-2 text-sm font-normal text-white bg-red-600 border border-gray-200 rounded-s-lg hover:bg-red-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
            // class="px-3 py-2 text-sm font-normal text-white bg-red-600 border border-gray-200 rounded-s-lg hover:bg-red-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            value="sm"
            onClick={() => onButtonColor1("red")}
            type="button"
          >
            Red
          </a>
          <a
            href="#"
            class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
            // class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            type="button"
            value="md"
            onClick={() => onButtonColor1("green")}
          >
            Green
          </a>
          <a
            href="#"
            class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            // class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            value="big"
            onClick={() => onButtonColor1("blue")}
            type="button"
          >
            Blue
          </a>
          <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-gray-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-gray-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onButtonColor1("gray")}
              type="button"
            >
              Gray
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onButtonColor1("yellow")}
              type="button"
            >
              Yellow
            </a>
        </div>
      </div>
      <div className="mt-3">
        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={buttonLabel2}
          onChange={(e) => setButtonLabel2(e.target.value)}
        />
      </div>

      <div className="flex items-center ">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <label
                for="function_name"
                class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
              >
                Function Name
              </label>
              <select
                id="function_name"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={functionNameButton2}
                onChange={(e) => setFunctionNameButton2(e.target.value)}
              >
                <option selected className="text-xs">
                  {functionNameButton2 ? functionNameButton2 : "Choose Function Name"}
                </option>
                <option
                  className="text-xs"
                  value="SaveData()"
                  >
                  SaveData()
                </option>
                <option
                  className="text-xs"
                  value="ClearData()"
                  >
                  ClearData()
                </option>
                <option
                  className="text-xs"
                  value="ViewData()"
                  >
                  ViewData()
                </option>
                <option
                  className="text-xs"
                  value="UpdateData()"
                  >
                  UpdateData()
                </option>
              </select>
          </div>
        </div>
      </div>  
     
      <div className="mt-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Color
        </label>
        <div class="inline-flex rounded-md shadow-sm">
          <a
            href="#"
            aria-current="page"
            class="px-3 py-2 text-sm font-normal text-white bg-red-600 border border-gray-200 rounded-s-lg hover:bg-red-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
            // class="px-3 py-2 text-sm font-normal text-white bg-red-600 border border-gray-200 rounded-s-lg hover:bg-red-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            value="sm"
            onClick={() => onButtonColor2("red")}
            type="button"
          >
            Red
          </a>
          <a
            href="#"
            class="px-3 py-2 text-sm font-normal text-black bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
            // class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            type="button"
            value="md"
            onClick={() => onButtonColor2("green")}
          >
            Green
          </a>
          <a
            href="#"
            class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            // class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            value="big"
            onClick={() => onButtonColor2("blue")}
            type="button"
          >
            Blue
          </a>
          <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-gray-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-gray-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onButtonColor2("gray")}
              type="button"
            >
              Gray
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onButtonColor2("yellow")}
              type="button"
            >
              Yellow
            </a>
        </div>
      </div>
    </div>
  );
};

export default ButtonLabel1;
