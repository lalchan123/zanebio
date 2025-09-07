import React, { useState, useContext, useEffect } from "react";
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
import { IconButton } from "@mui/material";
import useChartRunData from "../../../UseContext/useChartRunData";

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

export function LinechartDataShow({ sourceData }) {
  // const concatenatedData = [].concat(...sourceData);

  const concatenatedArray = sourceData.map((obj) => Object.values(obj)[0]);

  console.log("check source data", concatenatedArray);

  const myDataDic = [];
  const labels = [];

  const marDatavalue = [];

  for (let i = 0; i < concatenatedArray?.length; i++) {
    myDataDic.push({
      label: "demo",
      data: concatenatedArray[i]?.map((item1, k) => item1.High),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderWidth: 1,
      tension: 0.1,
      point: false,
      pointRadius: 0,
    });
  }

  const label = concatenatedArray[0]?.map((item1, k) => item1.Date);

  const dataValue = [];
  const data = {
    labels: label,
    datasets: myDataDic,
  };
  return (
    <div>
      <Line
        options={options}
        data={data}
        style={{ height: "400px", maxWidth: "100%" }}
      />
    </div>
  );
}
