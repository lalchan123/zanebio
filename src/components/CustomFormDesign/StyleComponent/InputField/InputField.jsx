import React, { useContext, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


// import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";
// import useLazyQueryAllTableCol from "../../../../GraphQLApiCall/useLazyQueryAllTableCol";
import useLazyQueryDynamic2 from "../../../../GraphQLApiCall/useLazyQueryDynamic2";
import useLazyQueryAllTableCol2 from "../../../../GraphQLApiCall/useLazyQueryAllTableCol2";
import GetQueryRel from "../../../../UseContext/GetQueryRel";
import { AppContext } from "../../../../AppContext";
import useRestAPIGet from "../../../../GraphQLApiCall/useRestAPIGet";
import { data } from "autoprefixer";

const InputField = (props) => {

  const { item } = props;

  const {
    BaseURL,
    setBaseURL,
    userId,
    setUserId
  } = useContext(AppContext);

  const [inputLabel, setInputLabel] = useState(item?.name || "");
  const [buttonSize, setButtonSize] = useState("");
  const [inputColor1, setInputColor1] = useState("");
  // const { get_data, onDataFire } = useLazyQueryDynamic();
  // const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol();
  const { get_data, onDataFire } = useLazyQueryDynamic2();
  const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol2();
  const [input, setInput] = useState("");
  const [addColumn1, setAddColumn1] = useState(item?.addColumn1 || "");
  const [col1, setCol1] = useState([]);
  const [dataSource1, setDataSource1] = useState(item?.dataSource1 ||  "");
  const [tableId1, setTableId1] = useState(item?.tableId1 ||  0);
  const [tableColId1, setTableColId1] = useState(item?.tableColId1 || 0);
  const [labelSize1, setLabelSize1] = useState(item?.labelSize1 || "");

  const [tableSize, setTableSize] = useState({
    width: "",
    height: "",
  });
  const [size, setSize] = useState("");
  const [columName1, setColumnName1] = useState(item?.columName1 || "");
  const [columnList, setColumnList] = useState([]);

  const { restApiData: restAllTableData, restApiLoading: restApiLoadingAllTableData, restApiError: restApiErrorAllTableData  } = useRestAPIGet(`${BaseURL}/account/all-table-data-fetch-api/${userId}/`);
  console.log("51 restAllTableData", restAllTableData)
 
  const selectColumnAllTableData = (table_id) => {
    restAllTableData?.data?.map((item, i) => {
      if (item?.id === table_id) {
        setColumnList(item?.column);
      }
    });
  };


  const onButtonSize = (value) => {
    setButtonSize(value);
  };

  const onLabelSize1 = (value) => {
    setLabelSize1(value);
  };
 
  const onInputColor1 = (value) => {
    setInputColor1(value);
  };
  


  let value = { name: inputLabel, size: buttonSize, labelSize1: labelSize1,  inputColor1: inputColor1, dataSource1: dataSource1, addColumn1: addColumn1, columName1: columName1, tableId1: tableId1,  tableColId1:tableColId1 };
  props.onInputLabel(JSON.stringify(value));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataSource("");
  };

  const onTableSize = (value) => {
    setSize({ size: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableSize({ ...tableSize, [name]: value });
  };

  // Function to add an item to the array
  const addCol1 = () => {
    if (addColumn1) {
      let value = { colName: addColumn1, colMap: columName1 };
      setCol1([...col1, value]);
      setAddColumn1("");
    }
  };

  // Function to delete an item from the array
  const deleteCol1 = (index) => {
    const newItems = [...col1];
    newItems.splice(index, 1);
    setCol1(newItems);
  };

  const onFlowChartList = async (value) => {
    const userResp = await onDataFire({
      variables: {
        tableId: 471,
        // tableId: 4,
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  let flowChartNameList = get_data?.getDynamicTableField?.jsonData;

  let flowdata = GetQueryRel(544, 1, "");

  const [colList, setCollist] = useState([]);

  const onDataClickValue = async (value) => {
    const userResp = await onTableDataFire({
      updateQuery() {},
    });

    console.log(
      "check data all table col 100",
      eval(all_table_col?.getAllTableColumn2?.jsonData)
    );
  };

  const selectColumnData = (name) => {
    // eval(all_table_col?.getAllTableColumn2?.jsonData)?.map((item, i) => {
    restAllTableData?.data?.map((item, i) => {
      if (item.table === name) {
        setColumnList(item.column);
      }
    });
  };

  
  return (
    <div>
      <div>
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Edit Label
        </label>

        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
        />
      </div>
      <div className="mb-2">
          <label
            for="countries"
            class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
            // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
          >
            Data Source
          </label>
          <select
            id="countries"
            class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
            // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            value={dataSource1}
            // onChange={(e) => setDataSource1(e.target.value)}
            onChange={(e) => {
              const splitData = e.target.value.split("_");
              // console.log("185 splitData", splitData);
              setDataSource1(splitData[1])
              selectColumnAllTableData(parseInt(splitData[0]));
              setTableId1(parseInt(splitData[0]));
              localStorage.setItem("dataSourceId", splitData[2])
            }}
            // onClick={() => {
            //   onFlowChartList();
            //   onDataClickValue();
            // }}
          >
            {/* {eval(all_table_col?.getAllTableColumn2?.jsonData)?.map((item, i) => { */}
            {restAllTableData?.data?.map((item, i) => {
              return (
                <option
                  className="text-xs"
                  value={`${item.id}_${item.table}_${item.type}`}
                  // onClick={() => {
                  //   selectColumnData(item.table);
                  //   setTableId1(item.id)
                  //   if (item.type == 'table data') {
                  //     localStorage.setItem("dataSourceId", "2")
                  //   } else if (item.type == 'json data') {
                  //     localStorage.setItem("dataSourceId", item.type)
                  //   }
                  // }}
                >
                  {item.table} ({item.type})
                </option>
              );
            })}
            <option selected className="text-xs" onClick={() => navigate("/")}>
              {dataSource1 ? dataSource1 : "Add New"}
            </option>
          </select>
      </div>
      <div className="flex items-center ">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <label
                for="countries"
                class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
              >
                Column Select
              </label>
              <select
                id="countries"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={columName1}
                onChange={(e) => setColumnName1(e.target.value)}
                // onClick={onFlowChartList}
              >
                <option selected className="text-xs">
                  {columName1 ? columName1 : "Choose Column"}
                </option>
                {columnList?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={item.name}
                      onClick={() => {
                        selectColumnData(item.name);
                        setTableColId1(item.no);
                      }}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="input"
              className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
            >
              Add Column
            </label>
            <div className=" flex">
              <input
                type="text"
                name="price"
                id="price"
                class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-white-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
                value={addColumn1}
                onChange={(e) => setAddColumn1(e.target.value)}
              />
              {/* <IconButton
                // variant="outlined"
                onClick={() => {
                  addCol1();
                }}
                size="md"
                sx={{
                  marginLeft: 0.5,
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: "10px",
                }}
              >
                <AddOutlinedIcon
                  sx={{
                    fontSize: "20px",
                    "&:hover": {
                      color: "green",
                    },
                  }}
                />
              </IconButton> */}
            </div>
          </div>
          </div>
          <div>
            
      </div>

      <div>
          <div className="">
            <div class="inline-flex rounded shadow-sm bg-white-700 px-2 py-1 items-center mt-1 gap-3">
            {/* <div class="inline-flex rounded shadow-sm dark:bg-slate-700 px-2 py-1 items-center mt-1 gap-3"> */}
              <Tooltip title="25%" placement="bottom">
                <div
                  onClick={() => onLabelSize1("25%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-black hover:text-green-700"
                    // className="w-4 h-4 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </div>
              </Tooltip>
              <Tooltip title="50%" placement="bottom">
                <div
                  onClick={() => onLabelSize1("50%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-black hover:text-green-700"
                    // className="w-5 h-5 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </div>
              </Tooltip>

              <Tooltip title="75%" placement="bottom">
                <div
                  onClick={() => onLabelSize1("75%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-black hover:text-green-700"
                    // className="w-6 h-6 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </div>
              </Tooltip>

              <Tooltip title="100%" placement="bottom">
                <div
                  onClick={() => onLabelSize1("100%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-black hover:text-green-700"
                    // className="w-7 h-7 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </div>
              </Tooltip>
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
              onClick={() => onInputColor1("red-500")}
              type="button"
            >
              Red
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-white hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              type="button"
              value="md"
              onClick={() => onInputColor1("green-900")}
            >
              Green
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor1("blue-500")}
              type="button"
            >
              Blue
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-gray-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor1("gray-50")}
              type="button"
            >
              Gray
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor1("yellow-500")}
              type="button"
            >
              Yellow
            </a>
          </div>
        </div>

    </div>
  );
};

export default InputField;
