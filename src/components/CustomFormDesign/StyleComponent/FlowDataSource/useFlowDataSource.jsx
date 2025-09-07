import React, { useState, useEffect } from "react";
import useLazyQueryRel from "../../../../../GraphQLApiCall/useLazyQueryRel";
import useChartRunData from "../../../../../UseContext/useChartRunData";

import axios from "axios";
import Papa from "papaparse";
import GetQueryRel from "../../../../../UseContext/GetQueryRel";

const useFlowDataSource = (props) => {
  const {
    source,
    sourceData,
    selectChart,
    setSelectChart,
    allChartData,
    setDataLog,
    getAllData,
  } = useChartRunData();

  const [flowName, setFlowName] = useState("");

  const get_data = GetQueryRel(544, 1, "");

  const [data, setData] = useState([]);
  const [sqlData, setSqlData] = useState([]);

  useEffect(() => {
    get_data?.getTableDataRelIdInfo?.map((item, i) => {
      let itemData = JSON.parse(item?.columnData) || "";
      if (
        itemData?.flowchart_name === flowName &&
        itemData?.process_name === "formtable"
      ) {
        // setDataSource(itemData);
        setProcessData({
          flowchart_name: itemData.flowchart_name,
          process_name: itemData?.process_name,
          formDesign: itemData?.formDesign,
        });
      } else if (
        itemData?.flowchart_name === flowName &&
        itemData?.process_name === "sqlquery"
      ) {
        // console.log("demo 51", itemData);
        const url = "https://itb-usa.a2hosted.com/account/query-json-file/";
        const data = {
          Query:
            "SELECT Date, High, Low FROM AAOI.json WHERE Date between 2023-10-08 and 2022-10-07 ORDER BY High",
          table_data_id: 49213,
          json_file: [],
        };

        axios
          .post(url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setData({
              csvData: response.data.data,
              flowchart_name: itemData.flowchart_name,
              process_name: itemData.process_name,
            });
          })
          .catch((error) => {
            setData({ responseData: null, error: error.message });
          });
      } else if (
        itemData?.flowchart_name === flowName &&
        itemData?.process_name === "linebarchart"
      ) {
        setSelectChart(itemData.flowchart_name);
      }
    });
  }, [third]);

  function convertCSVtoJSON(csvData) {
    const blob = new Blob([csvData.csvData], { type: "text/csv" });
    const reader = new FileReader();

    reader.onload = (event) => {
      const parsedData = Papa.parse(event.target.result, {
        header: true,
        dynamicTyping: true,
      });
      setSqlData(parsedData.data);
      setTimeout(() => {
        setProcessData({
          processData: parsedData.data,
          flowchart_name: csvData.flowchart_name,
          process_name: csvData.process_name,
        });
      }, 2000);
    };

    reader.readAsText(blob);
  }

  useEffect(() => {
    convertCSVtoJSON(data);
  }, [data]);

  return "demo";
};

export default useFlowDataSource;
