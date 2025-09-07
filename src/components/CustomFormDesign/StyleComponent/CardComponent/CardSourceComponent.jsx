import React, { useState, useEffect } from "react";
import useLazyQueryRel from "../../../../GraphQLApiCall/useLazyQueryRel";
import useChartRunData from "../../../../UseContext/useChartRunData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import GetQueryRel from "../../../../UseContext/GetQueryRel";
import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";

const CardSourceComponent = (props) => {
  const navigate = useNavigate();
  const {
    source,
    sourceData,
    selectChart,
    setSelectChart,
    allChartData,
    setDataLog,
    getAllData,
  } = useChartRunData();
  const { dataSource, setDataSource, processData, setProcessData } = props;
  const [data, setData] = useState([]);
  const [sqlData, setSqlData] = useState([]);

  const { get_data, onDataFire } = useLazyQueryDynamic();

  const onClickFlowName = async () => {
    const userResp = await onDataFire({
      variables: {
        tableId: 471,
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  let flowChartNameList = get_data?.getDynamicTableField?.jsonData;

  console.log("39 flowChartNameList", flowChartNameList)

  const get_data_all = GetQueryRel(544, 1, "");

  const onSelectDataSource = async (event) => {
    const flowName = event.target.value;
    setProcessData({ flowchart_name: flowName });
  };

  return (
    <div>
      <div className="p-3">
        <label
          for="countries"
          class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
        >
          Flowchart List
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
          value={dataSource}
          onChange={onSelectDataSource}
          onClick={onClickFlowName}
        >
          {/* <option selected className="text-xs">
            Choose Data Source
          </option> */}
          {eval(flowChartNameList)?.map((item, i) => {
            return (
              <option className="text-xs" value={item.Flowchart_Name}>
                {item.Flowchart_Name}
              </option>
            );
          })}

          <option selected className="text-xs" onClick={() => navigate("/")}>
            Add New
          </option>
        </select>
      </div>
    </div>
  );
};

export default CardSourceComponent;
