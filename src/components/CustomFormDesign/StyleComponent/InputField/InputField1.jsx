import React, { useContext, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";
import useLazyQueryAllTableCol from "../../../../GraphQLApiCall/useLazyQueryAllTableCol";
import GetQueryRel from "../../../../UseContext/GetQueryRel";
import { AppContext } from "../../../../AppContext";
import useRestAPIGet from "../../../../GraphQLApiCall/useRestAPIGet";



const InputField1 = (props) => {
  const { item } = props;

  const {
    BaseURL,
    setBaseURL,
    userId,
    setUserId
  } = useContext(AppContext);
  // const [inputLabel1, setInputLabel1] = useState("");
  // const [inputLabel2, setInputLabel2] = useState("");
  // const [buttonSize, setButtonSize] = useState("");
  // const [labelSize1, setLabelSize1] = useState("");
  // const [labelSize2, setLabelSize2] = useState("");
  const [inputLabel1, setInputLabel1] = useState(item?.name1 || "");
  const [inputLabel2, setInputLabel2] = useState(item?.name2 || "");
  const [buttonSize, setButtonSize] = useState("");
  const [labelSize1, setLabelSize1] = useState(item?.labelSize1 || "");
  const [labelSize2, setLabelSize2] = useState(item?.labelSize2 || "");
  const [inputColor1, setInputColor1] = useState("");
  const [inputColor2, setInputColor2] = useState("");
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol();
  const [input, setInput] = useState("");
  const [addColumn1, setAddColumn1] = useState(item?.addColumn1 || "");
  const [addColumn2, setAddColumn2] = useState(item?.addColumn2 || "");
  const [col1, setCol1] = useState([]);
  const [col2, setCol2] = useState([]);
  // const [dataSource, setDataSource] = useState("");
  const [dataSource1, setDataSource1] = useState(item?.dataSource1 ||  "");
  const [dataSource2, setDataSource2] = useState(item?.dataSource2 || "");
  const [tableId1, setTableId1] = useState(item?.tableId1 ||  0);
  const [tableId2, setTableId2] = useState(item?.tableId2 || 0);
  const [tableColId1, setTableColId1] = useState(item?.tableColId1 || 0);
  const [tableColId2, setTableColId2] = useState(item?.tableColId2 || 0);

  const [tableSize, setTableSize] = useState({
    width: "",
    height: "",
  });
  const [size, setSize] = useState("");
  const [columName1, setColumnName1] = useState(item?.columName1 || "");
  const [columName2, setColumnName2] = useState(item?.columName2 || "");
  const [columnList, setColumnList] = useState([]);

  console.log("addColumn1", addColumn1)
  console.log("addColumn2", addColumn2)
  console.log("columName1", columName1)
  console.log("columName2", columName2)
  console.log("all_table_col", all_table_col)



  console.log("props", props)
  console.log("item", item)

  
  const { restApiData: restAllTableData, restApiLoading: restApiLoadingAllTableData, restApiError: restApiErrorAllTableData  } = useRestAPIGet(`${BaseURL}/account/all-table-data-fetch-api/${userId}/`);
  console.log("73 restAllTableData", restAllTableData)



  const onLabelSize1 = (value) => {
    setLabelSize1(value);
  };
  const onLabelSize2 = (value) => {
    setLabelSize2(value);
  };
  
  const onInputColor1 = (value) => {
    setInputColor1(value);
  };
  const onInputColor2 = (value) => {
    setInputColor2(value);
  };



  
  let value = { name1: inputLabel1, name2: inputLabel2, size: buttonSize, labelSize1: labelSize1, labelSize2: labelSize2,  inputColor1: inputColor1,  inputColor2: inputColor2, dataSource1: dataSource1, dataSource2: dataSource2, addColumn1: addColumn1, addColumn2: addColumn2, columName1: columName1, columName2: columName2, tableId1: tableId1, tableId2: tableId2, tableColId1:tableColId1, tableColId2: tableColId2 };
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

  // Function to add an item to the array
  const addCol2 = () => {
    if (addColumn2) {
      let value = { colName: addColumn2, colMap: columName2 };
      setCol2([...col2, value]);
      setAddColumn2("");
    }
  };

  // Function to delete an item from the array
  const deleteCol2 = (index) => {
    const newItems = [...col2];
    newItems.splice(index, 1);
    setCol2(newItems);
  };

  // props.onTableStyle(
  //   JSON.stringify({
  //     ...tableSize,
  //     ...size,
  //     column: col,
  //     datasource: dataSource,
  //     flowchart_name: dataSource,
  //     process_name: "tabledata",
  //   })
  // );

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

  let flowdata = GetQueryRel(544, 1, "");

  const [colList, setCollist] = useState([]);

  const onDataClickValue = async (value) => {
    const userResp = await onTableDataFire({
      updateQuery() {},
    });

    console.log(
      // "check data all table col 100",
      eval(all_table_col?.getAllTableColumn?.jsonData)
    );
  };

  const selectColumnData = (table_id) => {
    // eval(all_table_col?.getAllTableColumn?.jsonData)?.map((item, i) => {
    //   if (item.table === name) {
    //     setColumnList(item.column);
    //   }
    // });
    restAllTableData?.data?.map((item, i) => {
      if (item?.id === table_id) {
        setColumnList(item?.column);
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
          placeholder="type label1"
          value={inputLabel1}
          onChange={(e) => setInputLabel1(e.target.value)}
        />
        
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
            onChange={(e) => {
              const splitData = e.target.value.split("_");
              console.log("185 splitData", splitData);
              setDataSource1(splitData[1])
              selectColumnData(parseInt(splitData[0]));
              setTableId1(parseInt(splitData[0]));
              localStorage.setItem("dataSourceId", splitData[2])
            }}
            // onClick={() => {
            //   onFlowChartList();
            //   onDataClickValue();
            // }}
          >
            {/* {eval(all_table_col?.getAllTableColumn?.jsonData)?.map((item, i) => { */}
            {restAllTableData?.data?.map((item, i) => {
              return (
                <option
                  className="text-xs"
                  value={`${item.id}_${item.table}_${item.type}`}
                  // onClick={() => {
                  //   selectColumnData(item.table);
                  //   setTableId1(item.id)
                  // }}
                >
                  {item.table} ({ item.type})
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
                class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
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
            {/* {col1.length === 0 ? (
              ""
            ) : (
              <div className="mt-2 p-1">
                {col1.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border gap-0.5 p-1"
                  >
                    <label className=" text-xs font-normal leading-2 text-gray-900">
                      {item.colMap}
                    </label>
                    <label className=" text-xs font-normal leading-2 text-gray-900">
                      {item.colName}
                    </label>

                    <IconButton
                      // variant="outlined"
                      onClick={() => deleteCol1(index)}
                      size="md"
                      sx={{
                        marginLeft: 0.5,
                        padding: 0,
                        textTransform: "capitalize",
                        fontSize: "8px",
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: "16px",
                          "&:hover": {
                            color: "green",
                          },
                        }}
                      />
                    </IconButton>
                  </div>
                ))}
              </div>
            )} */}
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
                    className="w-4 h-4 text-black hover:text-green-700 hover:text-green-700"
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
                    className="w-5 h-5 text-black hover:text-green-700 hover:text-green-700"
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
              class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
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
              // class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
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
              // class="px-3 py-2 text-sm font-normal text-white bg-gray-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor1("gray-50")}
              type="button"
            >
              Gray
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-black focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor1("yellow-500")}
              type="button"
            >
              Yellow
            </a>
          </div>
        </div>

        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 mt-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type type label2"
          value={inputLabel2}
          onChange={(e) => setInputLabel2(e.target.value)}
        />
        {/* <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-5  text-gray-900 mt-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type label2 size 25%, 45%, 70%, 100% "
          value={labelSize2}
          onChange={(e) => setLabelSize2(e.target.value)}
        /> */}
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
            value={dataSource2}
            onChange={(e) => {
              const splitData = e.target.value.split("_");
              // console.log("185 splitData", splitData);
              setDataSource2(splitData[1])
              selectColumnData(parseInt(splitData[0]));
              setTableId2(parseInt(splitData[0]));
              localStorage.setItem("dataSourceId2", splitData[2])
            }}
            // onClick={() => {
            //   onFlowChartList();
            //   onDataClickValue();
            // }}
          >
            {/* {eval(all_table_col?.getAllTableColumn?.jsonData)?.map((item, i) => { */}
            {restAllTableData?.data?.map((item, i) => {
              return (
                <option
                  className="text-xs"
                  value={`${item.id}_${item.table}_${item.type}`}
                  // onClick={() => {
                  //   selectColumnData(item.table);
                  //   setTableId2(item.id);
                  // }}
                >
                  {item.table} ({ item.type})
                </option>
              );
            })}
            <option selected className="text-xs" onClick={() => navigate("/")}>
              {dataSource2 ? dataSource2 : "Add New"}
            </option>
          </select>
        </div>

        <div className="flex items-center ">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <label
                for="countries"
                class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
              >
                Column Select
              </label>
              <select
                id="countries"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={columName2}
                onChange={(e) => {
                  setColumnName2(e.target.value);
                }}
                // onClick={onFlowChartList}
              >
                <option selected className="text-xs">
                  {columName2 ? columName2 : "Choose Column"}
                </option>
                {columnList?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={item.name}
                      onClick={() => {
                        selectColumnData(item.name);
                        setTableColId2(item.no);
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
                class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
                value={addColumn2}
                onChange={(e) => setAddColumn2(e.target.value)}
              />
              {/* {col2.length === 0 ? (
                <IconButton
                // variant="outlined"
                onClick={() => {
                  addCol2();
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
              </IconButton>
              ) : (
                ""
              )} */}
              
            </div>
          </div>
          </div>
          <div>
            {/* {col2.length === 0 ? (
              ""
            ) : (
              <div className="mt-2 p-1">
                {col2.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border gap-0.5 p-1"
                  >
                    <label className=" text-xs font-normal leading-2 text-gray-900">
                      {item.colMap}
                    </label>
                    <label className=" text-xs font-normal leading-2 text-gray-900">
                      {item.colName}
                    </label>

                    <IconButton
                      // variant="outlined"
                      onClick={() => deleteCol2(index)}
                      size="md"
                      sx={{
                        marginLeft: 0.5,
                        padding: 0,
                        textTransform: "capitalize",
                        fontSize: "8px",
                      }}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: "16px",
                          "&:hover": {
                            color: "green",
                          },
                        }}
                      />
                    </IconButton>
                  </div>
                ))}
              </div>
            )} */}
        </div>
        <div>
          <div className="">
            <div class="inline-flex rounded shadow-sm bg-white-700 px-2 py-1 items-center mt-1 gap-3">
            {/* <div class="inline-flex rounded shadow-sm dark:bg-slate-700 px-2 py-1 items-center mt-1 gap-3"> */}
              <Tooltip title="25%" placement="bottom">
                <div
                  onClick={() => onLabelSize2("25%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-black hover:text-green-700 hover:text-green-700"
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
                  onClick={() => onLabelSize2("50%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-black hover:text-green-700 hover:text-green-700"
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
                  onClick={() => onLabelSize2("75%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-black hover:text-green-700 hover:text-green-700"
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
                  onClick={() => onLabelSize2("100%")}
                  type="button"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-black hover:text-green-700 hover:text-green-700"
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
              onClick={() => onInputColor2("red-500")}
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
              onClick={() => onInputColor2("green-900")}
            >
              Green
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor2("blue-500")}
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
              onClick={() => onInputColor2("gray-50")}
              type="button"
            >
              Gray
            </a>
            <a
              href="#"
              class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-black focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 bg-gray-700 border-gray-600 text-black hover:text-black hover:bg-gray-600 focus:ring-blue-500 focus:text-black no-underline"
              // class="px-3 py-2 text-sm font-normal text-white bg-yellow-500 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
              name="buttonSize"
              value="big"
              onClick={() => onInputColor2("yellow-500")}
              type="button"
            >
              Yellow
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InputField1;
