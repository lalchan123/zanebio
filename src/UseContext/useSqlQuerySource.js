import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import axios from "axios";
import Papa from "papaparse";
import GetQueryRel from "../UseContext/GetQueryRel";

const useSqlQuerySource = (props) => {
  const { sqlData, setSqlData, BaseURL, setBaseURL } = useContext(AppContext);
  const [flowName, setFlowName] = useState("");
  const [data, setData] = useState([]);
  // const [sqlData, setSqlData] = useState([]);
  const [formDesign, setFormDesign] = useState("");

  const get_data = GetQueryRel(544, 1, "");

  useEffect(() => {
    let sqlDataValue = "";
    get_data?.getTableDataRelIdInfo?.map((item, i) => {
      let itemData = JSON.parse(item?.columnData) || "";

      if (itemData?.flowchart_name === flowName) {
        setFormDesign(itemData?.formDesign);
      }

      if (itemData.flowchart_name === flowName) {
        const url = BaseURL + "/account/query-json-file/";
        const data = {
          Query: itemData.process_sql,
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
            setData(response.data.data);
          })
          .catch((error) => {
            setData({ responseData: null, error: error.message });
          });
      }
    });
  }, [flowName]);

  function convertCSVtoJSON(csvData) {
    const blob = new Blob([csvData], { type: "text/csv" });
    const reader = new FileReader();

    reader.onload = (event) => {
      const parsedData = Papa.parse(event.target.result, {
        header: true,
        dynamicTyping: true,
      });
      setSqlData(parsedData.data);
      //   setTimeout(() => {
      //     setProcessData(parsedData.data);
      //   }, 2000);
    };

    reader.readAsText(blob);
  }

  useEffect(() => {
    convertCSVtoJSON(data);
  }, [data]);

  return { sqlData, setFlowName, formDesign };
};

export default useSqlQuerySource;
