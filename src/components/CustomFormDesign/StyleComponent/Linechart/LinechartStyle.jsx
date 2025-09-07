import React, { useState, useEffect, useContext } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";

import axios from "axios";
import { AppContext } from "../../../../AppContext";

const LinechartStyle = (props) => {
  const { item } = props;
  console.log("13 lalchan item", item)
  const {
    BaseURL,
    setBaseURL,
  } = useContext(AppContext);
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const [checkData, setCheckData] = useState("");
  const [input, setInput] = useState("");
  const [col, setCol] = useState([]);
  const [labels, setLabels] = useState(item?.labels || "");
  const [dataColumName, setDataColumnName] = useState(item?.dataColumName || "");
  const [columnList, setColumnList] = useState(item?.columnList || []);
  const [dataSource, setDataSource] = useState( item?.datasource || "");
  const [tableSize, setTableSize] = useState({
    width:  item?.width || "",
    height: item?.height || "",
  });
  const [size, setSize] = useState("");

  console.log("29 dataSource", dataSource);
  console.log("30 columnList", columnList);
  console.log("31 labels", labels);
  console.log("31 dataColumName", dataColumName);

  const onTableSize = (value) => {
    setSize({ size: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableSize({ ...tableSize, [name]: value });
  };

  // Function to add an item to the array
  const addCol = () => {
    if (input) {
      setCol([...col, input]);
      setInput("");
    }
  };

  // Function to delete an item from the array
  const deleteCol = (index) => {
    const newItems = [...col];
    newItems.splice(index, 1);
    setCol(newItems);
  };

  props.onLinechart(
    JSON.stringify({ ...tableSize, ...size, datasource: dataSource, flowchart_name: dataSource, labels: labels, dataColumName: dataColumName, columnList: columnList })
  );

  const onFlowChartList = async (value) => {
    const userResp = await onDataFire({
      variables: {
        tableId: 471,
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  let flowChartNameList = get_data?.getDynamicTableField?.jsonData;

  const selectFlowchartColumnData = (name) => {
    console.log("selectFlowchartColumnData name", name)
    axios
    .post(`${BaseURL}/account/flow-chart-data-edge/`, { flow_name: name}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // setRestApiPostData(response.data.data);
      console.log("response.data", response.data.sourceKey)
    
      var ItemData = []
      response?.data?.sourceKey?.map((key) => {
        ItemData.push({name: key})
      });
      setColumnList(ItemData)
    })
    .catch((error) => {
      // setRestApiPostError({ responseData: null, error: error.message });
      console.log("error.message", error)
    });

  };


  return (
    <div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Width
        </label>
        <input
          type="text"
          name="width"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={tableSize.width}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Height
        </label>
        <input
          type="text"
          name="height"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={tableSize.height}
          onChange={handleChange}
        />
      </div>
      {/* <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Add Column
        </label>
        <div className=" flex">
          <input
            type="text"
            name="price"
            id="price"
            class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            // variant="outlined"
            onClick={() => {
              addCol();
            }}
            size="md"
            sx={{
              marginLeft: 0.5,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "10px",
            }}
          >
            <AddOutlinedIcon
              sx={{
                fontSize: "20px",
                "&:hover": {
                  color: "green",
                },
              }}
            />
          </IconButton>
        </div>
        {col.length >= 1 ? (
          <div className="mt-2 border p-1">
            {col.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border gap-0.5 p-1"
              >
                <label className=" text-xs font-normal leading-2 text-gray-900">
                  {item}
                </label>
                <IconButton
                  // variant="outlined"
                  onClick={() => deleteCol(index)}
                  size="md"
                  sx={{
                    marginLeft: 0.5,
                    padding: 0,
                    textTransform: "capitalize",
                    fontSize: "8px",
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "16px",
                      "&:hover": {
                        color: "green",
                      },
                    }}
                  />
                </IconButton>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div> */}
      <div className="mb-2">
        <label
          for="countries"
          class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
          // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
        >
          Data Source
        </label>
        <select
          id="countries"
          class=" rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-100 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
          // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
          onClick={onFlowChartList}
        >
          <option selected className="text-xs">
            {dataSource ? dataSource : "Choose Data Source"} 
          </option>
          {eval(flowChartNameList)?.map((item, i) => {
            return (
              <option
                className="text-xs"
                value={item.Flowchart_Name}
                onClick={() => {
                  selectFlowchartColumnData(item.Flowchart_Name);
                }}
              >
                {eval(flowChartNameList)?.length === 0
                  ? "Data Loading"
                  : item.Flowchart_Name}
              </option>
            );
          })}
        </select>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <select
                id="countries"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
              >
                <option selected className="text-xs">
                  {labels ? labels : "Choose Column"}
                </option>
                {columnList?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex">
              <input
                type="text"
                name="price"
                id="price"
                class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
                value={"Labels"}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <select
                id="countries"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={dataColumName}
                onChange={(e) => setDataColumnName(e.target.value)}
              >
                <option selected className="text-xs">
                  {dataColumName ? dataColumName : "Choose Column"}
                </option>
                {columnList?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex">
              <input
                type="text"
                name="price"
                id="price"
                class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
                value={"Data"}
              />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LinechartStyle;
