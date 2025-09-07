import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AppContext } from "../AppContext";
import { TABLE_DATA_DETAIL } from "../GraphQL/Queries";

const useChartRunData = () => {
  const { sqlData, setSqlData, BaseURL, setBaseURL } = useContext(AppContext);
  const [selectChart, setSelectChart] = useState("");
  const [source, setSource] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [dataLog, setDataLog] = useState("");
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
      return mergedObject;
    });
  };

  // Call the function to get the merged array and All FC_Process_Logic Data Here
  const allChartData = mergeArrays();

  let mergeValue = [];
  let mergeValueFilter = [];
  let allFileName = "";
  let filter = "";
  let logic = "";
  let filtercon = "";
  let filterval = "";

  console.log(
    "select chart",
    selectChart,
    allChartData,
    flow_card_data?.getTableDataRelIdInfo
  );

  const [getAllData, setGetAllData] = useState(
    flow_card_data?.getTableDataRelIdInfo
  );

  useEffect(() => {
    flow_card_data?.getTableDataRelIdInfo?.map((item, i) => {
      let checkData = JSON.parse(item.columnData);
      if (checkData.flowchart_name === selectChart) {
        allFileName = checkData.process_filename;
        filter = checkData.process_filter;
        logic = checkData.process_logic;
        filtercon = checkData.process_filter_con;
        filterval = checkData.process_filter_value;
      }
    });

    eval(allFileName)?.map((item, i) => {
      const a = "a";
      const apiUrl =
        BaseURL + "/media/upload_file/yahoo_finance_hist/" + item.toString();
      const intCode = new Function(a, logic);
      const codeResult = intCode(apiUrl);
      function initPromise() {
        return new Promise(function (res, rej) {
          res(codeResult);
        });
      }
      initPromise().then(function (result) {
        mergeValue.push(result);
        setSource(mergeValue);
      });
    });
    source?.map((item2, i) => {
      const intFilter = new Function(
        "condition",
        "conditionvalue",
        "dataset",
        filter
      );
      const filterData = intFilter(filtercon, filterval, item2);
      mergeValueFilter.push(filterData);
      setSourceData(mergeValueFilter);
    });
  }, [selectChart, dataLog]);

  return {
    source,
    sourceData,
    selectChart,
    setSelectChart,
    allChartData,
    setDataLog,
    getAllData,
  };
};

export default useChartRunData;
