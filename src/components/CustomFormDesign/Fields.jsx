// These will be available from the sidebar
import {
  DataGrid,
  // GridRowsProp,
  // GridColDef,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
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
// import faker from "faker";
import Box from "@mui/material/Box";
import imageicon from "../../../src/assets/formicon/image.png";

const columns = [
  { field: "1", headerName: "Data 1" },
  { field: "2", headerName: "Data 2" },
  { field: "3", headerName: "Data 3" },
  { field: "4", headerName: "Data 4" },
  { field: "5", headerName: "Data 5" },
  { field: "6", headerName: "Data 6" },
  { field: "7", headerName: "Data 7" },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

let rows = [];

export const fields = [
  {
    type: "card",
    title: "Card",
  },
  {
    type: "input",
    title: "Input",
  },
  {
    type: "input1",
    title: "Input",
  },
  {
    type: "box",
    title: "Box",
  },
  {
    type: "text",
    title: "Text",
  },
  {
    type: "richtext",
    title: "Rich Text",
  },
  {
    type: "button",
    title: "Button",
  },
  {
    type: "button1",
    title: "Button",
  },
  {
    type: "textarea",
    title: "Text Area",
  },
  {
    type: "contactform",
    title: "Contact Form",
  },
  {
    type: "image",
    title: "Image",
  },
  {
    type: "table",
    title: "Table",
  },
  {
    type: "editable",
    title: "Edit Table",
  },
  {
    type: "linechart",
    title: "Linechart",
  },
  {
    type: "menulist",
    title: "Menulist",
  },
  {
    type: "masterdlt",
    title: "Masterdlt",
  },
  {
    type: "text1",
    title: "Text1",
  },
];

// These define how we render the field
export const renderers = {
  card: () => (
    <div className="flex items-center text-center w-full text-black">
    {/* <div className="flex items-center text-center w-full dark:text-white"> */}
      Card Item...
    </div>
  ),
  input: () => (
    <div>
      <label
        htmlFor="input"
        className=" text-sm font-medium leading-6 text-gray-900 text-black"
        // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        Label
      </label>
      <input
        type="text"
        name="input"
        id="input"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="type..."
      />
    </div>
  ),
  input1: () => (
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label
          htmlFor="input"
          className=" text-sm font-medium leading-6 text-gray-900 text-black"
          // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Label1
        </label>
        <input
          type="input"
          name="input"
          id="input"
          className="block w-[380px] rounded-md border-0 py-1.5 pl-7  pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
        />
      </div>
      <div>
        <label
          htmlFor="input"
          className=" text-sm font-medium leading-6 text-gray-900 text-black"
          // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Label2
        </label>
        
        <input
          type="input"
          name="input"
          id="input"
          className="block w-[380px] rounded-md border-0 py-1.5 pl-7 pr-20  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
        />
      </div>  
    </div>
  ),
  box: () => (
    <div className="block w-full rounded-md border-1 border-lime-700 h-[50px] text-black">
    {/* <div className="block w-full rounded-md border-1 border-lime-700 h-[50px] dark:text-white"> */}
      box
    </div>
  ),
  textarea: () => (
    <div>
      <label
        htmlFor="textarea"
        className="block text-sm font-medium leading-6 text-gray-900 text-black"
        // className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        Text area
      </label>
      <textarea
        rows="3"
        type="text"
        name="textarea"
        id="textarea"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="type..."
      />
    </div>
  ),
  text: () => (
    <div>
      <p class="text-slate-900 text-xl text-black">
      {/* <p class="text-slate-900 text-xl dark:text-white"> */}
        Please Enter Type Any Text.
      </p>
    </div>
  ),
  richtext: () => (
    <div>
      <p class="text-slate-900 text-xl text-black">
      {/* <p class="text-slate-900 text-xl dark:text-white"> */}
        Please Enter Type Any Rich Text.
      </p>
    </div>
  ),
  button: () => (
    <button class="bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded">
      Button
    </button>
  ),
  button1: () => (
    <div class="grid grid-cols-2 gap-2">
      <div>
        <button class="bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded">
          Button
        </button>
      </div>
      <div>
        <button class="bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded">
          Button
        </button>
      </div>
    </div>
  ),
  contactform: () => (
    <section className=" dark:bg-gray-900">
      <div class="py-2 lg:py-4 px-2 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-md tracking-tight font-semibold text-center text-gray-900 text-black">
        {/* <h2 class="mb-4 text-md tracking-tight font-semibold text-center text-gray-900 dark:text-white"> */}
          Form
        </h2>
        <form action="#" class="space-y-8">
          <div>
            <label
              for="email"
              class="block mb-2 text-xs font-medium text-gray-900 text-gray-300"
              // class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
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
              Subject
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
              class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
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
            class="py-3 px-5 text-xs font-medium text-center text-black rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-black"
            // class="py-3 px-5 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  ),
  image: () => (
    <div className="flex items-center p-2 m-1 bg-white border border-r-2 w-[580px]">
      <div className="ml-3">
        <img
          style={{
            width: 70, // Customize the width as desired
            height: "auto", // Customize the height as desired
            opacity: "60%",
          }}
          src={imageicon}
        />
      </div>

      <div className="ml-5 opacity-80 text-black">Image... </div>
      {/* <div className="ml-5 opacity-80 dark:text-white">Image... </div> */}
    </div>
  ),
  table: () => (
    <Box
      sx={{
        height: 200,
        width: 690,
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
  ),
  editable: () => (
    <Box
      sx={{
        height: 200,
        width: 690,
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
  ),
  linechart: () => (
    <div style={{ height: 300, width: "100%", marginRight: 10 }}>
      <Line options={options} data={data} />
      {/* <Line options={options} data={data} style={{}} /> */}
    </div>
  ),
  masterdlt: () => (
    <div>
      <div className="">
        <div className="mb-2">
          <label
            htmlFor="input"
            className=" text-sm font-medium leading-6 text-gray-900 text-black"
            // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Label
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
            className=" text-sm font-medium leading-6 text-gray-900 text-black"
            // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Label
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
          width: 690,
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
  ),
  text1: () => (
    <div>
      <p class="bg-red text-slate-900 text-xl text-black">
      {/* <p class="text-slate-900 text-xl dark:text-black"> */}
        Text
      </p>
    </div>
  ),
};
// These define how we render the field
export const renderers1 = {
  card: () => {

    (
      <div className="flex items-center text-center w-full text-black">
      {/* <div className="flex items-center text-center w-full dark:text-white"> */}
        Card Item...
      </div>
    )
  },
  input: (value) => {
    console.log("393 value", value)
    (
      <div>
        <label
          htmlFor="input"
          className=" text-sm font-medium leading-6 text-gray-900 text-black"
          // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          {value.name || "Label"}
        </label>
        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
        />
      </div>
    )
  },
  box: () => (
    <div className="block w-full rounded-md border-1 border-lime-700 h-[50px] text-black">
    {/* <div className="block w-full rounded-md border-1 border-lime-700 h-[50px] dark:text-white"> */}
      box
    </div>
  ),
  textarea: () => (
    <div>
      <label
        htmlFor="textarea"
        className="block text-sm font-medium leading-6 text-gray-900 text-black"
        // className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        Text area
      </label>
      <textarea
        rows="3"
        type="text"
        name="textarea"
        id="textarea"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="type..."
      />
    </div>
  ),
  text: () => (
    <div>
      <p class="bg-red text-slate-900 text-xl text-black">
      {/* <p class="text-slate-900 text-xl dark:text-white"> */}
        This text is in the blue color.
      </p>
    </div>
  ),
  richtext: () => (
    <div>
      <p class="bg-red text-slate-900 text-xl text-black">
      {/* <p class="text-slate-900 text-xl dark:text-white"> */}
        This text is in the blue color.
      </p>
    </div>
  ),
  button: () => (
    <button class="bg-slate-900 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded">
      Button
    </button>
  ),
  contactform: () => (
    // <section className=" dark:bg-gray-900">
    <section className=" bg-gray-900">
      <div class="py-2 lg:py-4 px-2 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-md tracking-tight font-semibold text-center text-gray-900 text-black">
        {/* <h2 class="mb-4 text-md tracking-tight font-semibold text-center text-gray-900 dark:text-white"> */}
          Form
        </h2>
        <form action="#" class="space-y-8">
          <div>
            <label
              for="email"
              class="block mb-2 text-xs font-medium text-gray-900 text-gray-300"
              // class="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
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
              Subject
            </label>
            <input
              type="text"
              id="subject"
              class="block p-2 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
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
              Your message
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
            class="py-3 px-5 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-black"
            // class="py-3 px-5 text-xs font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  ),
  image: () => (
    <div className="flex items-center p-2 m-1 bg-white border border-r-2 w-[580px]">
      <div className="ml-3">
        <img
          style={{
            width: 70, // Customize the width as desired
            height: "auto", // Customize the height as desired
            opacity: "60%",
          }}
          src={imageicon}
        />
      </div>

      <div className="ml-5 opacity-80 text-black">Image... </div>
      {/* <div className="ml-5 opacity-80 dark:text-white">Image... </div> */}
    </div>
  ),
  table: () => (
    <Box
      sx={{
        height: 200,
        width: 690,
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
  ),
  editable: () => (
    <Box
      sx={{
        height: 200,
        width: 690,
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
  ),
  linechart: () => (
    <div style={{ height: 300, width: "100%", marginRight: 10 }}>
      <Line options={options} data={data} style={{}} />
    </div>
  ),
  masterdlt: () => (
    <div>
      <div className="">
        <div className="mb-2">
          <label
            htmlFor="input"
            className=" text-sm font-medium leading-6 text-gray-900 text-white"
            // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Label
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
            // className=" text-sm font-medium leading-6 text-gray-900 dark:text-white"
          >
            Label
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
          width: 690,
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
  ),
  text1: () => (
    <div>
      <p class="bg-red text-slate-900 text-xl text-black">
      {/* <p class="text-slate-900 text-xl dark:text-black"> */}
        Text1
      </p>
    </div>
  ),
};
