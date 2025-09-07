import React, { useState, useContext } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../../AppContext";
import { IconButton } from "@mui/material";

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

export function DataShowOnChart() {
  const { sourceData, setChartDataShow } = useContext(UserContext);

  function getRandomColor() {
    // Generate random values for red, green, and blue channels
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Create a color string in the format "#RRGGBB"
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(
      16
    )}`;

    return color;
  }

  const myDataDic = [];
  const labels = [];

  const marDatavalue = [];

  for (let i = 0; i < sourceData?.length; i++) {
    myDataDic.push({
      label: "demo",
      data: sourceData[i]?.data?.map((item1, k) => item1.High),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderWidth: 1,
      tension: 0.1,
      point: false,
      pointRadius: 0,
    });
  }

  const label = sourceData[0]?.data?.map((item1, k) => item1.Date);

  const dataValue = [];
  const data = {
    labels: label,
    datasets: myDataDic,
  };
  return (
    <div>
      <IconButton
        size="small"
        color="success"
        variant="outlined"
        onClick={() => {
          setChartDataShow(false);
        }}
        sx={{
          marginRight: 1,
          display: "inline",
          textTransform: "capitalize",
          padding: 0,
          float: "right",
        }}
      >
        <CloseIcon size="small" sx={{ fontSize: "18px" }} />
      </IconButton>
      <Line
        options={options}
        data={data}
        style={{ height: 400, width: 1200 }}
      />
    </div>
  );
}
