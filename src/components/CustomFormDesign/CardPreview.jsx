import React, { useContext } from "react";
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
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
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
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef.js";
import { AppContext } from "../../AppContext.jsx";
import useSqlQuerySource from "../../UseContext/useSqlQuerySource.js";
import TableDataShow from "./TypeOFDataShow/TableDataShow.jsx";
import styled from "styled-components";
import ProcessDataFormServer from "./TypeOFDataShow/ProcessDataFormServer.jsx";
import { BaseURL } from "../../Constants.js";

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

const CardPreview = ({
  fields,
  open,
  handleClose,
  formSize,
  dataSource,
  setComponentShow,
  updateData,
  previewData,
  setCardId,
  cardId,
  setDataSource,
}) => {
  const { setTableDeletedId, setTableDeletedRefId } =
    useMutationDeletedSetByRef();
  const {
    cardEditMode,
    setCardEditMode,
    cardPreviewMode,
    setCardPreviewMode,
    setCustomFormDesgin,
  } = useContext(AppContext);
  const { sqlData, setFlowName } = useSqlQuerySource();

  let rows = [];
  const columns = [];
  eval(dataSource.Card_Item)?.map((item, i) => {
    if (item.type === "table") {
      var value = JSON.parse(item.style);
      value?.column?.map((col) => {
        // columns.push({ field: col.colName, headerName: col.colName });
        columns.push({ field: col.colMap, headerName: col.colName });
      });
    }
    if (item.type === "editable") {
      var value = JSON.parse(item.style);
      value?.column?.map((col) => {
        // columns.push({ field: col.colName, headerName: col.colName });
        columns.push({ field: col.colMap, headerName: col.colName });
      });
    }
  });

  const onDeletedCardItem = (id) => {
    setTableDeletedId(534);
    setTableDeletedRefId(cardId);

    setTimeout(() => {
      setCardPreviewMode(false);
      setDataSource([]);
    }, 1000);
  };

  const onEditCardItem = (id) => {
    setCardEditMode(true);
    setCardPreviewMode(false);
    setComponentShow(true);
    handleClose();
    updateData((draft) => {
      draft.fields = eval(dataSource.Card_Item);
    });
  };

  return (
    <div>
      <div className="max-w-[100%] min-h-[500px] p-1 block">
        {
        // dataSource?.length === 0 ? (
        //   ""
        // ) : (
        // {dataSource?.length === 0 ? (
        //   ""
        //       ) :
        (
          <div className="flex justify-end">
            <IconButton
              size="small"
              onClick={onEditCardItem}
              // sx={{ border: ".5px solid #B6BBC4" }}
            >
              <EditOutlinedIcon
                size="small"
                sx={{
                  fontSize: "12px",
                  width: 10,
                  height: 10,
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDeletedCardItem()}
              // sx={{ border: ".5px solid #B6BBC4" }}
            >
              <ClearOutlinedIcon
                size="small"
                sx={{
                  fontSize: "12px",
                  width: 10,
                  height: 10,
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            </IconButton>
          </div>
        )}

        <div
          // className={`${dataSource?.length === 0 ? "" : "border p-2"} ${
          className={`"border p-2"} ${
            dataSource.Card_Size === "extrasmall"
              ? "w-[380px]"
              : dataSource.Card_Size === "small"
              ? "w-[380px]"
              : dataSource.Card_Size === "medium"
              ? "w-[600px]"
              : dataSource.Card_Size === "big"
              ? "max-w-[1200px]"
              : "w-[350px]"
          }`}
        >
          {eval(dataSource.Card_Item)?.map((item, i) => {
            if (item.type === "input") {
              const value = JSON.parse(item.style);
              return (
                <div className="mb-2">
                  <label
                    htmlFor="input"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    {value.name || "input"}
                  </label>
                  <input
                    type="text"
                    name="input"
                    id="input"
                    class={`bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    // class={`bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    placeholder="type..."
                  />
                </div>
              );
            }  else if (item.type === "input1") {
              const value = JSON.parse(item.style);
              console.log("216 value", value)
              return (
                <div class="flex gap-2">
                  <div className={`w-[${value.labelSize1}]`}>
                    <label
                      for="input_label1"
                      className="block text-xs font-medium leading-6 text-gray-900 text-black"
                      // className="block text-xs font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {value.name1 || "input_label1"}
                    </label>
                    <input
                      type="text"
                      // class={`w-[${value?.labelSize1}] bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      class={`bg-${value.inputColor1} border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      placeholder="type..."
                      required
                    />
                  </div>  
                  <div className={`w-[${value.labelSize2}]`}>
                    <label
                      for="input_label2"
                      className="block text-xs font-medium leading-6 text-gray-900 text-black"
                      // className="block text-xs font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {value.name2 || "input_label2"}
                    </label>
                  
                    <input
                      type="text"
                      class={`bg-${value.inputColor2} border border-gray-300 text-xs rounded-md focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      // class={`bg-${value.inputColor2} border border-gray-300 text-xs rounded-md focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
                    htmlFor="input"
                    className="block text-xs font-medium leading-6 text-gray-900 pl-4"
                  >
                    {value.textLabel || "input"}
                  </label>
                  <textarea
                    rows="3"
                    type="text"
                    name="textarea"
                    id="textarea"
                    class="bg-gray-50 border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // class="bg-gray-50 border border-gray-300 text-xs rounded-md  focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="type..."
                  />
                </div>
              );
            } else if (item.type === "text") {
              var value = JSON.parse(item.style);
              return (
                <Box>
                  <div className="mb-2 block">
                    <Text
                      style={{
                        margin: 0,
                        padding: 0,
                        fontSize: "16px",
                        color: "#4D4D4D",
                      }}an
                      dangerouslySetInnerHTML={{
                        __html: value.textValue,
                      }}
                    ></Text>
                  </div>
                </Box>
              );
            } else if (item.type === "richtext") {
              var value = JSON.parse(item.style);
              return (
                <Box>
                  <div className="mb-2 block">
                    <Text
                      style={{
                        margin: 0,
                        padding: 0,
                        fontSize: "16px",
                        color: "#4D4D4D",
                      }}an
                      dangerouslySetInnerHTML={{
                        __html: value.textValue,
                      }}
                    ></Text>
                  </div>
                </Box>
              );
            } else if (item.type === "button") {
              var value = JSON.parse(item.style);
              return (
                <div className="mb-2">
                  <button
                    style={{ backgroundColor: value.buttonColor1 }}
                    className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded m-2 block ${
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
              return (
                // <div class="grid grid-cols-2 gap-2 mb-2 mt-2">
                <div class="flex gap-8 mb-2 mt-2">
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
                  class={` bg-white bg-gray-900 className="mb-2 w-full" `}
                  // class={` bg-white dark:bg-gray-900 className="mb-2 w-full" `}
                >
                  <div class="py-2 lg:py-4 px-2 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-[22px] tracking-tight font-medium text-center text-gray-900 text-black">
                    {/* <h2 class="mb-4 text-[22px] tracking-tight font-medium text-center text-gray-900 dark:text-white"> */}
                      {value.title || "Contact Form"}
                    </h2>
                    <form action="#" class="space-y-8">
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-xs font-medium text-gray-900 text-gray-300"
                          // class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          {value.name || "email"}
                        </label>
                        <input
                          type="email"
                          id="email"
                          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                          // class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          placeholder="name@flowbite.com"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="subject"
                          class="block mb-2 text-xs font-medium text-gray-900 text-gray-300"
                          // class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                        >
                          {value.email || "Subject"}
                        </label>
                        <input
                          type="text"
                          id="subject"
                          class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                          // class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                          placeholder="Let us know how we can help you"
                          required
                        />
                      </div>
                      <div class="sm:col-span-2">
                        <label
                          for="message"
                          class="block mb-2 text-xs font-medium text-gray-900 text-gray-400"
                          // class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
                        >
                          {value.message || "Message"}
                        </label>
                        <textarea
                          id="message"
                          rows="6"
                          class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-primary-500 focus:border-primary-500"
                          // class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Leave a comment..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className={`py-2.5 px-5 text-xs font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-black flex items-center justify-center
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
                      width: value.width || "350px",
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
                <div className="m-3">
                  <div
                    className={` text-white p-3 flex items-center justify-center`}
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
              console.log("490 value", value)
              console.log("491 columns", columns)
              console.log("492 rows", rows)
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
              console.log("490 value", value)
              console.log("491 columns", columns)
              console.log("492 rows", rows)
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
                <div style={{ height: 300, width: "100%", marginRight: 10 }}>
                  <Line options={options} data={data} style={{}} />
                </div>
              );
            } else if (item.type === "card") {
              var value = item.style;

              return (
                <div style={{ height: 300, width: "100%", padding: 2 }}>
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
                        className=" text-sm font-medium leading-6 text-gray-900 text-black"
                      >
                        {value.labelOne || "label"}
                      </label>
                      <input
                        type="text"
                        name="input"
                        id="input"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="type..."
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="input"
                        className=" text-sm font-medium leading-6 text-gray-900 text-white"
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
                          fontSize: "7px",
                        },
                        "&.MuiDataGrid-root": {
                          fontSize: "7px",
                        },
                        boxShadow: 0,
                        border: 0.5,
                        borderColor: "white",
                      }}
                    />
                  </Box>
                  <button
                    type="submit"
                    class="py-2.5 px-5 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-black mt-3"
                    // class="py-2.5 px-5 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black mt-3"
                  >
                    Submit
                  </button>
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

export default CardPreview;
