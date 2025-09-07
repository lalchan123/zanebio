import React, { useState } from "react";
import useLazyQueryRel from "../../GraphQLApiCall/useLazyQueryRel";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import useSqlQuerySource from "../../UseContext/useSqlQuerySource";
import GetQueryRel from "../../UseContext/GetQueryRel";

const AddCardBar = (props) => {
  const getCardInfo = GetAllTableData(534);
  const getCardInfoAll = eval(
    getCardInfo?.all_table_data?.getDynamicTableField?.jsonData
  );
  const { get_data, onDataFire } = useLazyQueryRel();
  const { sqlData, formDesign, setFlowName } = useSqlQuerySource();

  const {
    flowChartNameList,
    dataSource,
    setDataSource,
    setPreViewData,
    setFormSize,
    setCardId,
    cardId,
    userId,
  } = props;

  const demo = GetQueryRel(534, 1, "");

  const onCardList = async () => {
    const userResp = await onDataFire({
      variables: {
        tableId: 534,
        tableColId: 1,
        tabRelId: "",
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  const onSelectDataSource = (event) => {
    const flowName = event.target.value;
    setTimeout(() => {
      getCardInfoAll?.map((item, i) => {
        if (item.Card_Name === flowName) {
          setDataSource({ ...item, id: cardId });
          setFormSize(item.Card_Size);
        }
      });
    }, 1000);
  };

  return (
    <div>
      <div className="border p-0 h-[650px] w-[280px] mr-4 shadow-md overflow-y-scroll">
        <div className="p-3">
          <label
            for="countries"
            class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
            // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
          >
            Flowchart List
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-xs"
            // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            value={dataSource}
            onChange={onSelectDataSource}
            onClick={onCardList}
          >
            <option selected className="text-xs">
              Choose Data Source
            </option>
            {get_data?.getTableDataRelIdInfo?.map((item, i) => {
              // if (item.userId === userId) {
                return (
                  <option
                    className="text-xs"
                    value={item.columnData}
                    onClick={() => {
                      setCardId(item.tableRefId);
                    }}
                  >
                    {item.columnData}
                  </option>
                );
              // }
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddCardBar;
