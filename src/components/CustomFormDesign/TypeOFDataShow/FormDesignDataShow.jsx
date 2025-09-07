import React, { useEffect, useState } from "react";
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
import GetQueryRel from "../../../UseContext/GetQueryRel";

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

const FormDesignDataShow = ({ open, handleClose, formSize, flowName }) => {
  const get_data = GetQueryRel(544, 1, "");

  const [fields, setFields] = useState([]);

  useEffect(() => {
    get_data?.getTableDataRelIdInfo?.map((item, i) => {
      let itemData = JSON.parse(item?.columnData) || "";
      if (
        itemData?.flowchart_name === flowName &&
        itemData?.process_name === "formtable"
      ) {
        setFields(itemData?.formDesign);
      }
    });
  }, [flowName]);

  let rows = [];
  const columns = [];
  fields?.map((item, i) => {
    if (item.type === "table") {
      var value = JSON.parse(item.style);
      value?.column?.map((col) => {
        columns.push({ field: col, headerName: col });
      });
    }
  });

  return (
    <div>
      <div className="max-w-[100%] min-h-[500px] p-1 block">
        <div
        // className={`${fields?.length === 0 ? "" : "border pr-4"} ${
        //   formSize === "sm"
        //     ? "w-[380px]"
        //     : formSize === "md"
        //     ? "w-[600px]"
        //     : formSize === "big"
        //     ? "max-w-[1200px]"
        //     : "w-[350px]"
        // }`}
        >
          {fields?.map((item, i) => {
            if (item.type === "input") {
              const value = JSON.parse(item.style);
              return (
                <div className="mb-2">
                  <label
                    htmlFor="input"
                    className="block text-xs font-medium leading-6 text-gray-900 pl-4"
                  >
                    {value.name || "input"}
                  </label>
                  <input
                    type="text"
                    name="input"
                    id="input"
                    className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 m-2  
                    `}
                    placeholder="type..."
                  />
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
                    className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 m-2`}
                    placeholder="type..."
                  />
                </div>
              );
            } else if (item.type === "text") {
              var value = JSON.parse(item.style);
              return (
                <Box>
                  <div className="mb-2 block">
                    <p
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
                      {value.textValue || "This text is in the blue color"}
                    </p>
                  </div>
                </Box>
              );
            } else if (item.type === "button") {
              var value = JSON.parse(item.style);
              return (
                <div className="mb-2">
                  <button
                    className={`bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded m-2 block ${
                      value.size === "sm"
                        ? "w-[140px]"
                        : value.size === "md"
                        ? "w-[354px]"
                        : value.size === "big"
                        ? "w-[708px]"
                        : "w-[140px]"
                    }`}
                  >
                    {value.name || "button"}
                  </button>
                </div>
              );
            } else if (item.type === "contactform") {
              var value = JSON.parse(item.style);
              return (
                <section
                  class={` bg-white dark:bg-gray-900 className="mb-2 w-full" 
                   
                   `}
                >
                  <div class="py-2 lg:py-4 px-2 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-[22px] tracking-tight font-medium text-center text-gray-900 dark:text-white">
                      {value.title || "Contact Form"}
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
                    className={` text-white p-3 mt-2 mb-2 block`}
                    // className="text-white p-3 bg-[${value.color}] w-[300px], h-[200px]"
                    style={{
                      width: value.width || "350px",
                      height: value.height || "50px",
                    }}
                  >
                    <img
                      src={"https://itb-usa.a2hosted.com" + value.url}
                      alt="Zoom In/Out Image"
                      style={{
                        maxWidth: value.width, // Set your desired image dimensions
                        height: "auto",
                      }}
                    />
                  </div>
                </Box>
              );
            } else if (item.type === "table") {
              var value = JSON.parse(item.style);

              return (
                <Box
                  sx={{
                    padding: 1,
                    height: value.height || 200,
                    minWidth: 375,
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
              );
            } else if (item.type === "linechart") {
              var value = JSON.parse(item.style);

              return (
                <div style={{ height: 300, width: "100%" }}>
                  <Line options={options} data={data} style={{}} />
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

export default FormDesignDataShow;
