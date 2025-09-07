import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import {
  DataGrid,
  // GridRowsProp,
  // GridColDef,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import FormDesignDataShow from "./TypeOFDataShow/FormDesignDataShow.jsx";
// import TableDataShowSqlData from "../StyledSettings/CardTemplate/ChartData.js/TableDataShowSqlData.js";
// import LineChartShow from "../StyledSettings/CardTemplate/ChartData.js/LineChartShow.js";
import TableDataShow from "./TypeOFDataShow/TableDataShow.jsx";
import styled from "styled-components";
import useTheme from "../../UseContext/useTheme.js";
import Button from "@mui/material/Button";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { LinechartDataShow } from "./TypeOFDataShow/LinechartDataShow.jsx";
import useLazyQueryDynamic from "../../GraphQLApiCall/useLazyQueryDynamic";
import DynamicTableDataShow from "./TypeOFDataShow/DynamicTableDataShow.jsx";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData.js";
import ProcessDataFormServer from "./TypeOFDataShow/ProcessDataFormServer.jsx";
import { AppContext } from "../../AppContext.jsx";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
      legend: false,
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
  type: "line",
  scales: {
    x: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data1 = [
  15, 26, 17, 32, 59, 54, 45, 15, 26, 17, 32, 59, 62, 38, 45, 54, 45,
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: data1.map((item) => item),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderWidth: 1,
      tension: 0.1,
      point: false,
      pointRadius: 0,
    },
  ],
};

const Text = styled.p`
  font-family: "Nunito Sans", sans-serif;
`;

const PreviewFormDesgin = ({ fields, open, handleClose, formSize }) => {
  const getTableData = GetAllTableData(18);
  const {
    BaseURL,
    setBaseURL,
   } = useContext(AppContext);
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const [masterdltValue, setMasterdltValue] = useState("");
  const [masterdltData, setMasterdltData] = useState([]);
  const [masterdltFilterList, setMasterdltFilterList] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [selected, setSelected] = useState("");
  const [openFile, setOpenFile] = useState(false);
  const [openFileAdd, setOpenFileAdd] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const data = [
  //   {
  //     column1: "Data 1-1",
  //     column2: "Data 1-2",
  //     col: [{ col1: "demo1", col2: "demo2" }],
  //   },
  //   {
  //     column1: "Data 2-1",
  //     column2: "Data 2-2",
  //     col: [{ col1: "demo1111", col2: "demo2" }],
  //   },
  //   // Add more data as needed
  // ];

  const data1 = [
    15, 26, 17, 32, 59, 54, 45, 15, 26, 17, 32, 59, 62, 38, 45, 54, 45,
  ];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data1.map((item) => item),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 1,
        tension: 0.1,
        point: false,
        pointRadius: 0,
      },
    ],
  };

  const [collapsedRows, setCollapsedRows] = useState([]);

  const toggleRow = (index) => {
    setCollapsedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // const { darkMode, toggleTheme } = useTheme();
  let rows = [];
  const columns = [];
  fields?.map((item, i) => {
    if (item.type === "table") {
      var value = JSON.parse(item.style);
      value?.column?.map((col) => {
        // columns.push({ field: col.colName, headerName: col.colName });
        columns.push({ field: col.colMap, headerName: col.colName });
      });
    }
    if (item.type === "editable") {
      var value1 = JSON.parse(item.style);
      value1?.column?.map((col) => {
        // columns.push({ field: col.colName, headerName: col.colName });
        columns.push({ field: col.colMap, headerName: col.colName, editable: true });
      });
    }
  });

  let courseInfo = eval(
    getTableData?.all_table_data?.getDynamicTableField?.jsonData
  );

  const onMasterDltDataSearch = (event) => {
    let searchValue = event.target.value;
    setMasterdltValue(searchValue);

    const newFilter = courseInfo?.filter((value) => {
      return value?.course_name
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
    });

    setMasterdltFilterList(newFilter);
  };

  const onMasterDltDataShow = (value) => {
    courseInfo?.map((item) => {
      if (value === item?.course_name) {
        setMasterdltData([item]);
        setMasterdltFilterList([]);
        setMasterdltValue("");
      }
    });
  };

  return (
    <div>
      <div className="max-w-[100%] min-h-[500px] p-2 block">
        <div className="flex justify-end">
          <IconButton
            size="small"
            onClick={handleClose}
            // sx={{ border: ".5px solid #B6BBC4" }}
          >
            {/* <EditOutlinedIcon
              size="small"
              sx={{
                width: 10,
                height: 10,
                "&:hover": {
                  color: "green",
                },
                color: "red",
              }}
            /> */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-green-600 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </IconButton>
        </div>
        <div
          className={`${fields?.length === 0 ? "" : "border p-1 "} ${
            formSize === "extrasmall"
              ? "w-[25%]"
              : formSize === "sm"
              ? "w-[50%]"
              : formSize === "medium"
              ? "w-[75%]"
              : formSize === "big"
              ? "max-w-[100%]"
              : "w-[50%]"
          }`}
        >
          {fields?.map((item, i) => {
            if (item.type === "input") {
              const value = JSON.parse(item.style);
              console.log("215 input value", value)
              return (
                <div className="flex-auto">
                  <div className={`w-[${value.labelSize1}]`}>
                    <label
                      for="first_name"
                      className="block text-xs font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {value.name || "input"}
                    </label>
                    <input
                      type="text"
                      class={`bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      placeholder="type..."
                      required
                    />
                  </div>
                </div>
              );
            } else if (item.type === "input1") {
              const value = JSON.parse(item.style);
              console.log("215 input value", value)
              return (
                // <div class="grid grid-cols-2 gap-2">
                <div class="flex gap-2">
                  <div className={`w-[${value.labelSize1}]`}>
                    <label
                      for="input_label1"
                      className="block text-xs font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {value.name1 || "input_label1"}
                    </label>
                    <input
                      type="text"
                      // class={`w-[${value?.labelSize1}] bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      class={`bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      placeholder="type..."
                      required
                    />
                  </div>  
                  <div className={`w-[${value.labelSize2}]`}>
                    <label
                      for="input_label2"
                      className="block text-xs font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {value.name2 || "input_label2"}
                    </label>
                  
                    <input
                      type="text"
                      class={`bg-${value.inputColor2} border border-gray-300 text-xs rounded-md focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      placeholder="type..."
                      required
                    />
                  </div>  
                </div>
              );
            } else if (item.type === "textarea") {
              var value = JSON.parse(item.style);
              return (
                <div className="mb-2">
                  <label
                    for="first_name"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    {value.textLabel || "input"}
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="type..."
                    required
                  />
                </div>
              );
            } else if (item.type === "text") {
              var value = JSON.parse(item.style);
              return (
                <Box
                  sx={{ p: 2, border: '1px dashed grey' }}
                >
                  <div className="mb-2 block">
                    <p
                      style={{
                        color: value.textColor,
                      }}
                      className={`block text-slate-900 m-2 
                        ${
                          value.textStyle === "h1"
                            ? "text-9xl"
                            : value.textStyle === "h2"
                            ? "text-7xl"
                            : value.textStyle === "h3"
                            ? "text-5xl"
                            : value.textStyle === "h4"
                            ? "text-5xl"
                            : value.textStyle === "h5"
                            ? "text-2xl"
                            : value.textStyle === "h6"
                            ? "text-lg"
                            : "text-sm"
                        }
                        `}
                    >
                      {/* {value.textValue || "This text is in the blue color"} */}
                      <Text
                        style={{
                          margin: 0,
                          padding: 0,
                          fontSize: "16px",
                          color: "black",
                          // color: darkMode === true ? "white" : "#4D4D4D",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: value.textValue,
                        }}
                      ></Text>
                    </p>
                  </div>
                </Box>
              );
            } else if (item.type === "richtext") {
              var value = JSON.parse(item.style);
              return (
                <Box
                  sx={{ p: 2, border: '1px dashed grey' }}
                >
                  <div className="mb-2 block">
                    <p
                      style={{
                        color: value.textColor,
                      }}
                      className={`block text-slate-900 m-2 
                        ${
                          value.textStyle === "h1"
                            ? "text-9xl"
                            : value.textStyle === "h2"
                            ? "text-7xl"
                            : value.textStyle === "h3"
                            ? "text-5xl"
                            : value.textStyle === "h4"
                            ? "text-5xl"
                            : value.textStyle === "h5"
                            ? "text-2xl"
                            : value.textStyle === "h6"
                            ? "text-lg"
                            : "text-sm"
                        }
                        `}
                    >
                      {/* {value.textValue || "This text is in the blue color"} */}
                      <Text
                        style={{
                          margin: 0,
                          padding: 0,
                          fontSize: "16px",
                          color: "black",
                          // color: darkMode === true ? "white" : "#4D4D4D",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: value.textValue,
                        }}
                      ></Text>
                    </p>
                  </div>
                </Box>
              );
            } else if (item.type === "button") {
              var value = JSON.parse(item.style);
              console.log("295 button value", value)
              return (
                <div className="mb-2 mt-2">
                  <button
                    style={{ backgroundColor: value.buttonColor1 }}
                    // className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded block ${
                    //   formSize === "extrasmall"
                    //     ? "w-[25%]"
                    //     : formSize === "sm"
                    //     ? "w-[45%]"
                    //     : formSize === "medium"
                    //     ? "w-[70%]"
                    //     : formSize === "big"
                    //     ? "w-[100%]"
                    //     : "w-[45%]"
                    // }`}
                    // className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded block ${
                    //   value.size === "sm"
                    //     ? "w-[140px]"
                    //     : value.size === "md"
                    //     ? "w-[354px]"
                    //     : value.size === "big"
                    //     ? "w-[708px]"
                    //     : "w-[140px]"
                    // }`}
                    className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded block ${
                      formSize === "extrasmall"
                          ? "w-[70px]"
                          : formSize === "sm"
                          ? "w-[150px]"
                          : formSize === "medium"
                          ? "w-[150px]"
                          : formSize === "big"
                          ? "w-[150px]"
                          : "w-[150px]"
                    }`}
                  >
                    {value.name1 || "button"}
                  </button>
                </div>
              );
            } else if (item.type === "button1") {
              var value = JSON.parse(item.style);
              console.log("295 button1 value", value)
              return (
                <div class="grid grid-cols-2 gap-2 mb-2 mt-2">
                  <div>
                    <button
                      style={{ backgroundColor: value.buttonColor1 }}
                      className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 rounded ${
                        formSize === "extrasmall"
                          ? "w-[70px]"
                          : formSize === "sm"
                          ? "w-[150px]"
                          : formSize === "medium"
                          ? "w-[150px]"
                          : formSize === "big"
                          ? "w-[150px]"
                          : "w-[150px]"
                      }`}
                    >
                      {value.name1 || "button"}
                    </button>
                  </div>
                  <div>
                    <button
                      style={{ backgroundColor: value.buttonColor2 }}
                      className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 rounded ${
                        formSize === "extrasmall"
                          ? "w-[70px] -ml-[30px]"
                          : formSize === "sm"
                          ? "w-[150px] -ml-[300px]"
                          : formSize === "medium"
                          ? "w-[150px] -ml-[135px]"
                          : formSize === "big"
                          ? "w-[150px] -ml-[262px]"
                          : "w-[150px] -ml-[28px]"
                      }`}
                    >
                      {value.name2 || "button"}
                    </button>
                  </div>
                </div>  
              );
            } else if (item.type === "contactform") {
              var value = JSON.parse(item.style);
              return (
                <section
                  class={` dark:bg-gray-900 className="mb-2 w-full" 
                   
                   `}
                >
                  <div class="py-2 lg:py-4 px-2 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-[22px] tracking-tight font-medium text-center text-gray-900 dark:text-white">
                      {value.title || "Form"}
                    </h2>
                    <form action="#" class="space-y-8">
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          {value.name || "email"}
                        </label>
                        <input
                          type="email"
                          id="email"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="subject"
                          class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          {value.email || "Subject"}
                        </label>
                        <input
                          type="text"
                          id="subject"
                          class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          placeholder="Let us know how we can help you"
                          required
                        />
                      </div>
                      <div class="sm:col-span-2">
                        <label
                          for="message"
                          class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
                        >
                          {value.message || "Message"}
                        </label>
                        <textarea
                          id="message"
                          rows="6"
                          class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Leave a comment..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className={`py-2.5 px-5 text-xs font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black flex items-center justify-center
                      ${
                        value.buttonSize === "sm"
                          ? "w-[140px]"
                          : value.buttonSize === "md"
                          ? "w-[480px]"
                          : value.buttonSize === "big"
                          ? "w-[708px]"
                          : "w-[140px]"
                      }
                      `}
                      >
                        {value.button || "Button"}
                      </button>
                    </form>
                  </div>
                </section>
              );
            } else if (item.type === "box") {
              var value = JSON.parse(item.style);

              return (
                <>
                  <div
                    className={` text-white p-3 flex items-center justify-center 
                      
                     `}
                    // className="text-white p-3 bg-[${value.color}] w-[300px], h-[200px]"
                    style={{
                      width: value.width || "340px",
                      height: value.height || "50px",
                      backgroundColor: value.color || "green",
                    }}
                  >
                    <p>{value.text}</p>
                  </div>
                </>
              );
            } else if (item.type === "box") {
              var value = JSON.parse(item.style);

              return (
                <div className="mb-3">
                  <div
                    className={` text-white p-3 flex items-center justify-center `}
                    // className="text-white p-3 bg-[${value.color}] w-[300px], h-[200px]"
                    style={{
                      maxWidth: value.width || "350px",
                      height: value.height || "50px",
                      backgroundColor: value.color || "green",
                    }}
                  >
                    <p>{value.text}</p>
                  </div>
                </div>
              );
            } else if (item.type === "image") {
              var value = JSON.parse(item.style);
              console.log("value", value)
              return (
                <Box sx={{ display: "block" }}>
                  <div
                    className={` text-white p-1 mt-2 mb-2 block overflow-hidden`}
                  >
                    <img
                      src={`${BaseURL}` + value.url}
                      // srcSet="image-url-300.jpg 300w, image-url-768.jpg 768w, image-url-1280.jpg 1280w"
                      style={{
                        width: value.width, // Set your desired image dimensions
                        height: "auto",
                      }}
                    />
                  </div>
                </Box>
              );
            } else if (item.type === "table") {
              var value = JSON.parse(item.style);
              console.log("556 columns", columns)
              return (
                <Box
                  sx={{
                    padding: 1,
                    height: value.height || 200,
                    minWidth: 345,
                    marginRight: 12,
                    marginTop: 0,
                    "& .super-app-theme--header": {
                      backgroundColor: "rgba(255, 7, 0, 0.55)",
                    },
                  }}
                >
                  <DataGrid
                    hideFooter={true}
                    rows={rows}
                    columns={columns}
                    rowHeight={16}
                    headerHeight={16}
                    sx={{
                      ".MuiDataGrid-columnSeparator": {
                        fontSize: "12px",
                      },
                      "&.MuiDataGrid-root": {
                        fontSize: "12px",
                      },
                      boxShadow: 0,
                      border: 0.5,
                      borderColor: "white",
                    }}
                  />
                </Box>
              );
            } else if (item.type === "editable") {
              var value = JSON.parse(item.style);
              console.log("556 columns", columns)
              return (
                <Box
                  sx={{
                    padding: 1,
                    height: value.height || 200,
                    minWidth: 345,
                    marginRight: 12,
                    marginTop: 0,
                    "& .super-app-theme--header": {
                      backgroundColor: "rgba(255, 7, 0, 0.55)",
                    },
                  }}
                >
                  <DataGrid
                    hideFooter={true}
                    rows={rows}
                    columns={columns}
                    rowHeight={16}
                    headerHeight={16}
                    sx={{
                      ".MuiDataGrid-columnSeparator": {
                        fontSize: "12px",
                      },
                      "&.MuiDataGrid-root": {
                        fontSize: "12px",
                      },
                      boxShadow: 0,
                      border: 0.5,
                      borderColor: "white",
                    }}
                  />
                </Box>
              );
            } else if (item.type === "linechart") {
              var value = JSON.parse(item.style);

              return (
                <div
                  style={{
                    height: 300,
                    width: "100%",
                    marginRight: 10,
                    padding: 1,
                  }}
                >
                  <Line options={options} data={data} />
                  {/* <Line options={options} data={data} style={{}} /> */}
                </div>
              );
            } else if (item.type === "card") {
              var value = item.style;

              return (
                <div
                  style={{
                    height: 300,
                    width: "100%",
                    padding: 2,
                    marginBottom: 1,
                  }}
                >
                  <ProcessDataFormServer flowName={value.flowchart_name} />
                </div>
              );
            } else if (item.type === "masterdlt") {
              var value = JSON.parse(item.style);
              return (
                <div>
                  <div className="">
                    <div className="mb-2">
                      <label
                        htmlFor="input"
                        className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        {value.labelOne || "label"}
                      </label>
                      <input
                        type="text"
                        name="input"
                        id="input"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="type..."
                        value={masterdltValue}
                        onChange={onMasterDltDataSearch}
                      />
                    </div>

                    {masterdltFilterList.length != 0 && (
                      <div className="p-2 overflow-auto scroll-smooth">
                        <div className="grid grid-cols-1 divide-y ">
                          {masterdltFilterList?.map((value, key) => {
                            return (
                              <div
                                key={key}
                                className={`p-1 text-sm font-mono cursor-pointer hover:text-green-600 hover:bg-slate-100`}
                                onClick={(e) =>
                                  onMasterDltDataShow(value?.course_name)
                                }
                              >
                                {value?.course_name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mb-2">
                      <label
                        htmlFor="input"
                        className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        {value.labelTwo || "label"}
                      </label>
                      <input
                        type="text"
                        name="input"
                        id="input"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="type..."
                      />
                    </div>
                  </div>
                  <Box
                    sx={{
                      height: 200,
                      width: "100%",
                    }}
                  >
                    <DynamicTableDataShow data={masterdltData} />
                  </Box>
                  <button
                    type="submit"
                    class="py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black mt-3"
                  >
                    Submit
                  </button>

                  <Button
                    variant="contained"
                    onClick={onMasterDltDataShow}
                    sx={{
                      marginLeft: 1,
                      textTransform: "capitalize",
                      fontSize: "12px",
                    }}
                  >
                    View
                  </Button>

                  {/* <button
                    type="submit"
                    class="py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black mt-3 ml-2"
                    onClick={onMasterDltDataShow}
                  >
                    View
                  </button> */}
                </div>
              );
            } else {
              return <>No form Item</>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewFormDesgin;
