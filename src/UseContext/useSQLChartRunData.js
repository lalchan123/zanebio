import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Papa from "papaparse";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AppContext } from "../AppContext";

import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";

const useSQLChartRunData = () => {
  const { sqlData, setSqlData, BaseURL, setBaseURL } = useContext(AppContext);
  const [selectChartSql, setSelectChartSql] = useState("");
  const [source, setSource] = useState([]);
  const [sourceDataSql, setSourceDataSql] = useState([]);
  const [dataLog, setDataLog] = useState("");
  const [data, setData] = useState([]);
  const [sqlGetDataSql, setSqlGetDataSql] = useState("");
  const [jsonResult, setJsonResult] = useState(null);
  const {
    loading: data_flow_loading,
    error: data_flow_error,
    data: data_flow,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: { tableId: 536, tableColId: 0, tabRelId: "" },
  });

  const {
    loading: flow_card_data_loading,
    error: flow_card_data_error,
    data: flow_card_data,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: { tableId: 544, tableColId: 1, tabRelId: "" },
  });

  let processNameDic = [];
  let processTypeDic = [];
  let processLogicDic = [];
  let processFlowchartNameDic = [];
  let processFileDic = [];
  let processFilterDic = [];
  let processFilterCondition = [];
  let processFilterConditionValue = [];
  let processUserDic = [];
  let processFormDic = [];
  let processFormArtiDic = [];

  data_flow?.getTableDataRelIdInfo?.map((item, i) => {
    if (item.tableColId === 1) {
      processNameDic.push({
        process_name: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        nameDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 2) {
      processTypeDic.push({
        process_type: item.columnData,
        id: item.tableRefId,
        type: item.tableDataId,
      });
    }
    if (item.tableColId === 3) {
      processLogicDic.push({
        process_logic: item.columnData,
        relId: item.tabRelId,
        id: item.tableRefId,
        logic: item.tableDataId,
      });
    }
    if (item.tableColId === 4) {
      processFlowchartNameDic.push({
        process_chart_name: item.columnData,
        relId: item.tabRelId,
        id: item.tableRefId,
        chartNameDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 5) {
      processFileDic.push({
        process_file: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        fileDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 6) {
      processFilterDic.push({
        process_filter: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        filterDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 7) {
      processFilterCondition.push({
        process_filter_Condition: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        filterconDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 8) {
      processFilterConditionValue.push({
        process_filter_convalue: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        filterconValueDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 9) {
      processUserDic.push({
        process_user: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        filteruser: item.tableDataId,
      });
    }
    if (item.tableColId === 10) {
      processFormDic.push({
        process_form: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        formId: item.tableDataId,
      });
    }
    if (item.tableColId === 11) {
      processFormArtiDic.push({
        process_form_arti: item.columnData,
        id: item.tableRefId,
        relId: item.tabRelId,
        formArtiId: item.tableDataId,
      });
    }
  });

  const mergeArrays = () => {
    return processNameDic.map((item1) => {
      const mergedObject = { ...item1 };

      const item2 = processTypeDic.find((item) => item.id === item1.id);
      if (item2) {
        Object.assign(mergedObject, item2);
      }

      const item3 = processLogicDic.find((item) => item.id === item1.id);
      if (item3) {
        Object.assign(mergedObject, item3);
      }

      const item4 = processFlowchartNameDic.find(
        (item) => item.id === item1.id
      );
      if (item4) {
        Object.assign(mergedObject, item4);
      }

      const item5 = processFileDic.find((item) => item.id === item1.id);
      if (item5) {
        Object.assign(mergedObject, item5);
      }

      const item6 = processFilterDic.find((item) => item.id === item1.id);
      if (item6) {
        Object.assign(mergedObject, item6);
      }

      const item7 = processFilterCondition.find((item) => item.id === item1.id);
      if (item7) {
        Object.assign(mergedObject, item7);
      }

      const item8 = processFilterConditionValue.find(
        (item) => item.id === item1.id
      );
      if (item8) {
        Object.assign(mergedObject, item8);
      }
      const item9 = processUserDic.find((item) => item.id === item1.id);
      if (item9) {
        Object.assign(mergedObject, item9);
      }
      const item10 = processFormDic.find((item) => item.id === item1.id);
      if (item10) {
        Object.assign(mergedObject, item10);
      }
      const item11 = processFormArtiDic.find((item) => item.id === item1.id);
      if (item11) {
        Object.assign(mergedObject, item11);
      }
      return mergedObject;
    });
  };

  const allChartData = mergeArrays();

  let mergeValue = [];
  let mergeValueFilter = [];
  let allFileName = "";
  let filter = "";
  let logic = "";
  let filtercon = "";
  let filterval = "";

  const slqQuery =
    "SELECT Date, High, Low FROM AAOI.json WHERE Date between 2023-10-08 and 2022-10-07 ORDER BY High";

  useEffect(() => {
    let sqlData = "";
    flow_card_data?.getTableDataRelIdInfo?.map((item, i) => {
      let checkData = JSON.parse(item.columnData);
      if (checkData.flowchart_name === selectChartSql) {
        sqlData = checkData.process_sql;
      }
    });

    const url = BaseURL + "/account/query-json-file/";
    const data = {
      Query: sqlData,
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
  }, [selectChartSql]);

  function convertCSVtoJSON(csvData) {
    const blob = new Blob([csvData], { type: "text/csv" });
    const reader = new FileReader();

    reader.onload = (event) => {
      const parsedData = Papa.parse(event.target.result, {
        header: true,
        dynamicTyping: true,
      });
      setSourceDataSql(parsedData.data);
    };

    reader.readAsText(blob);
  }

  useEffect(() => {
    // setTimeout(() => {
    convertCSVtoJSON(data);
    // }, 1000);
  }, [data]);

  return {
    selectChartSql,
    sourceDataSql,
    setSelectChartSql,
  };
};

export default useSQLChartRunData;
