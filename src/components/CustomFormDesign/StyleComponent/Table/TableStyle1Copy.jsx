import React, { useState, useEffect, useContext } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";
import useLazyQueryAllTableCol from "../../../../GraphQLApiCall/useLazyQueryAllTableCol";
import GetQueryRel from "../../../../UseContext/GetQueryRel";
import TestDataJsonDataTable from "../../../Flowchart/TestDataShowTable/TestDataJsonDataTable";
import TestDataShowTable from "../../../Flowchart/TestDataShowTable/TestDataShowTable";
import { AppContext } from "../../../../AppContext";

const TableStyle = (props) => {
  const { item } = props;
  console.log("20 TableStyle item", item)
  const navigate = useNavigate();

  const {
      BaseURL,
      setBaseURL,
      userId,
      setUserId
  } = useContext(AppContext);
  
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol();
  const [open, setOpen] = React.useState(false);
  const [checkData, setCheckData] = useState("");
  const [input, setInput] = useState("");
  const [col, setCol] = useState(item?.column || []);
  const [dataSource, setDataSource] = useState(item?.datasource || "");
  const [datasourcetype, setDataSourceType] = useState(item?.datasourcetype || "");
  const [tableId1, setTableId1] = useState(item?.tableId ||  0);
  const [tableSize, setTableSize] = useState({
    width: item?.width || "",
    height: item?.height || "",
  });
  const [size, setSize] = useState("");
  const [columName, setColumnName] = useState("");
  const [columnList, setColumnList] = useState([]);
  const [testDataShow, setTestDataShow] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setDataSource("");
  };

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
      let value = { colName: input, colMap: columName };
      setCol([...col, value]);
      setInput("");
    }
  };

  // Function to delete an item from the array
  const deleteCol = (index) => {
    const newItems = [...col];
    newItems.splice(index, 1);
    setCol(newItems);
  };

  props.onTableStyle(
    JSON.stringify({
      ...tableSize,
      ...size,
      column: col,
      datasourcetype: datasourcetype,
      datasource: dataSource,
      flowchart_name: dataSource,
      process_name: "tabledata",
      tableId: tableId1,
    })
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

  let flowdata = GetQueryRel(544, 1, "");

  const [colList, setCollist] = useState([]);

  const onDataClickValue = async (value) => {
    const userResp = await onTableDataFire({
      updateQuery() {},
    });

    console.log(
      // "check data all table col 100",
      eval(all_table_col?.getAllTableColumn?.jsonData)
    );
  };

  const selectColumnData = (name) => {
    eval(all_table_col?.getAllTableColumn?.jsonData)?.map((item, i) => {
      if (item.table === name) {
        setColumnList(item.column);
      }
    });
  };

 
  
  return (
    <div>
      <div className="flex items-center gap-4"> 
        <div className="mb-2">
          {/* demo value item */}
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
            // className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            className="block w-20 rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            // className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            className="block w-20 rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="type..."
            value={tableSize.height}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex items-center ">
          <div className="flex items-center">
            <div className="mb-2 mr-2">
              <label
                for="DataSource_Type"
                class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
              >
                DataSource Type
              </label>
              <select
                id="function_name"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={datasourcetype}
                onChange={(e) => setDataSourceType(e.target.value)}
              >
                <option selected className="text-xs">
                  {datasourcetype ? datasourcetype : "Choose DataSource Type"}
                </option>
                <option
                  className="text-xs"
                  value="json_data"
                >
                  Json Data
                </option>
                <option
                  className="text-xs"
                  value="reference_json_data"
                >
                  Reference Json Data
                </option>
                {/* <option
                  className="text-xs"
                  value="external_file_data"
                >
                  External File Creation
                </option> */}
                <option
                  className="text-xs"
                  value="table_data"
                >
                  Table Data
                </option>
             
                <option
                  className="text-xs"
                  value="flowchart_data"
                >
                  Flow Chart Data
                </option>
             
              </select>
          </div>
        </div>
      </div>   

      {
          datasourcetype === 'table_data' ?
          <>
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
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={dataSource}
                onChange={(e) => {
                  const splitData = e.target.value.split("_");
                  // console.log("635 splitData", splitData);
                  setDataSource(splitData[1])
                  selectColumnDataTable(parseInt(splitData[0]));
                  setTableId1(parseInt(splitData[0]));
                  localStorage.setItem("dataSourceId", splitData[2])
                }}
                onClick={() => {
                  // onFlowChartList();
                  // onDataClickValue();
                  TableDataSetAPi();
                }}
              >
                {tableData?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={`${item.id}_${item.table}_${item.type}`}
                      // onClick={() => {
                      //   selectColumnData(item.table);
                      //   setTableId1(item.id);
                      // }}
                    >
                      {item.table}
                    </option>
                  );
                })}
                <option selected className="text-xs" onClick={() => navigate("/")}>
                  {dataSource ? dataSource : "Add New"}
                </option>
              </select>
            </div>

            <div className="flex items-center ">
              <div className="flex items-center">
                <div className="mb-2 mr-2">
                  {/* <label
                    for="countries"
                    class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  >
                    Column Select
                  </label> */}
                  <select
                    id="countries"
                    class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                    // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                    value={columName}
                    onChange={(e) => setColumnName(e.target.value)}
                    // onClick={onFlowChartList}
                  >
                    <option selected className="text-xs">
                      Choose Column
                    </option>
                    {columnList?.map((item, i) => {
                      return (
                        <option
                          className="text-xs"
                          value={item.name}
                          onClick={() => selectColumnData(item.name)}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="input"
                  className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
                >
                  Add Column
                </label> */}
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
              </div>
            </div>
            <div>
              {col.length === 0 ? (
                ""
              ) : (
                <div className="mt-2 p-1">
                  {col.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border gap-0.5 p-1"
                    >
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colMap}
                      </label>
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colName}
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
              )}
            </div>
            {/* <Button
              variant="outlined"
              color="success"
              sx={{ textTransform: "capitalize", marginTop: 3 }}
              startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
              size="small"
              onClick={(e) => {
                setTestDataShow(true);
                setOpen(true);
              }}
            >
              Test
            </Button> */}
            
          </>
          : datasourcetype === "json_data" ? (
            <>
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
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={dataSource}
                onChange={(e) => {
                  // console.log("632 e.target.value", e.target.value);
                  const splitData = e.target.value.split("_");
                  // console.log("635 splitData", splitData);
                  setDataSource(splitData[1])
                  selectColumnDataJson(parseInt(splitData[0]));
                  setTableId1(parseInt(splitData[0]));
                  localStorage.setItem("dataSourceId", splitData[2])
                }}
                onClick={() => {
                  JsonDataSetAPi();
                }}
              >
                {jsonTableData?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={`${item.id}_${item.table}_${item.type}`}
                      // onClick={() => {
                      //   selectColumnDataJson(item.id);
                      //   setTableId1(item.id);
                      //   localStorage.setItem("dataSourceId", item.type)
                      // }}
                    >
                      {item.table}
                    </option>
                  );
                })}
                <option selected className="text-xs" onClick={() => navigate("/")}>
                  {dataSource ? dataSource : "Add New"}
                </option>
              </select>
            </div>

            <div className="flex items-center ">
              <div className="flex items-center">
                <div className="mb-2 mr-2">
                  {/* <label
                    for="countries"
                    class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  >
                    Column Select
                  </label> */}
                  <select
                    id="countries"
                    class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                    // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                    value={columName}
                    onChange={(e) => setColumnName(e.target.value)}
                    // onClick={() => {
                    //   ColumnSetMethod();
                    // }}
                   
                  >
                    <option selected className="text-xs">
                      Choose Column
                    </option>
                    {columnList?.map((item, i) => {
                      return (
                        <option
                          className="text-xs"
                          value={item.name}
                          onClick={() => selectColumnDataJsonTable(item.name)}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-2">
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
              </div>
            </div>
            <div>
              {col.length === 0 ? (
                ""
              ) : (
                <div className="mt-2 p-1">
                  {col.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border gap-0.5 p-1"
                    >
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colMap}
                      </label>
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colName}
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
              )}
            </div>
          </>
            // <Box sx={{ marginTop: 2 }}>
            //   <div className="flex items-center gap-4">
            //     <FormControl
            //       sx={{ fontSize: "12px" }}
            //       fullWidth
            //       size="small"
            //       color="success"
            //     >
            //       <InputLabel
            //         id="demo-multiple-checkbox-label"
            //         size="small"
            //         sx={{ fontSize: "12px" }}
            //         color="success"
            //       >
            //         File
            //       </InputLabel>
            //       <Select
            //         color="success"
            //         size="small"
            //         labelId="demo-multiple-checkbox-label"
            //         id="demo-multiple-checkbox"
            //         // multiple
            //         value={fileName}
            //         onChange={handleSelectFileName}
            //         input={<OutlinedInput label="Tag" />}
            //         renderValue={(selected) => selected.join(", ")}
            //         MenuProps={MenuProps}
            //         sx={{ fontSize: "12px" }}
            //       >
            //         {fileList?.map((item, i) => i <=100 && (
            //           <MenuItem
            //             color="success"
            //             size="small"
            //             key={i}
            //             value={item}
            //             sx={{ fontSize: "10px", margin: 1, padding: 0 }}
            //           >
            //             {/* <Checkbox
            //               size="small"
            //               checked={fileName.indexOf(item) > -1}
            //               sx={{ fontSize: "12px" }}
            //               color="success"
            //             /> */}
            //             <ListItemText
            //               color="success"
            //               size="small"
            //               primary={item}
            //               sx={{ fontSize: "10px" }}
            //             />
            //           </MenuItem>
            //         ))}
            //       </Select>
            //     </FormControl>

            //     <div>
            //       <Tooltip title="Column Show" placement="top">
            //         <Button
            //           variant="outlined"
            //           color="success"
            //           sx={{ textTransform: "capitalize", height: 35 }}
            //           startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
            //           size="small"
            //           onClick={(e) => {
            //             onFileNameSet();
            //             ColumnShow(e, url)
            //           }}
            //         >
            //           {/* Column Show */}
            //         </Button>
            //       </Tooltip>
            //     </div>
            //   </div>  

            //   <div className="flex items-center">
            //     <div className="flex items-center">
            //       <div className="mb-2 mr-2 mt-2">
            //         {/* <label
            //           for="countries"
            //           class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
            //         >
            //           Column Select
            //         </label> */}
            //         <select
            //           id="countries"
            //           class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
            //           // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            //           value={columName}
            //           onChange={(e) => setColumnName(e.target.value)}
            //           // onClick={onFlowChartList}
            //         >
            //           <option selected className="text-xs">
            //             Choose Column
            //           </option>
            //           {columnList?.map((item, i) => {
            //             return (
            //               <option
            //                 className="text-xs"
            //                 value={item.name}
            //                 onClick={() => selectColumnData(item.name)}
            //               >
            //                 {item.name}
            //               </option>
            //             );
            //           })}
            //         </select>
            //       </div>
            //     </div>
            //     <div className="mb-2 mt-2">
            //       {/* <label
            //         htmlFor="input"
            //         className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
            //       >
            //         Add Column
            //       </label> */}
            //       <div className=" flex">
            //         <input
            //           type="text"
            //           name="price"
            //           id="price"
            //           class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
            //           value={input}
            //           onChange={(e) => setInput(e.target.value)}
            //         />
            //         <IconButton
            //           // variant="outlined"
            //           onClick={() => {
            //             addCol();
            //           }}
            //           size="md"
            //           sx={{
            //             marginLeft: 0.5,
            //             padding: 0,
            //             textTransform: "capitalize",
            //             fontSize: "10px",
            //           }}
            //         >
            //           <AddOutlinedIcon
            //             sx={{
            //               fontSize: "20px",
            //               "&:hover": {
            //                 color: "green",
            //               },
            //             }}
            //           />
            //         </IconButton>
            //       </div>
            //     </div>
            //   </div>
            //   <div>
            //     {col.length === 0 ? (
            //       ""
            //     ) : (
            //       <div className="mt-2 p-1">
            //         {col.map((item, index) => (
            //           <div
            //             key={index}
            //             className="flex items-center justify-between border gap-0.5 p-1"
            //           >
            //             <label className=" text-xs font-normal leading-2 text-gray-900">
            //               {item.colMap}
            //             </label>
            //             <label className=" text-xs font-normal leading-2 text-gray-900">
            //               {item.colName}
            //             </label>

            //             <IconButton
            //               // variant="outlined"
            //               onClick={() => deleteCol(index)}
            //               size="md"
            //               sx={{
            //                 marginLeft: 0.5,
            //                 padding: 0,
            //                 textTransform: "capitalize",
            //                 fontSize: "8px",
            //               }}
            //             >
            //               <CloseIcon
            //                 sx={{
            //                   fontSize: "16px",
            //                   "&:hover": {
            //                     color: "green",
            //                   },
            //                 }}
            //               />
            //             </IconButton>
            //           </div>
            //         ))}
            //       </div>
            //     )}
            //   </div>

             
            //   {/* <Button
            //     variant="outlined"
            //     color="success"
            //     sx={{ textTransform: "capitalize", marginTop: 3 }}
            //     startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
            //     size="small"
            //     onClick={(e) => {
            //       setTestDataJsonShow(true);
            //       setOpen(true);
            //       onFileNameSet();
            //     }}
            //   >
            //     Test
            //   </Button> */}
            // </Box>
          ): datasourcetype === "reference_json_data" ? (
            <>
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
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={dataSource}
                onChange={(e) => {
                  // console.log("632 e.target.value", e.target.value);
                  const splitData = e.target.value.split("*");
                  // console.log("1034 splitData", splitData);
                  setDataSource(splitData[0])
                  selectColumnDataReferenceJson(splitData[0]);
                  setTableId1(parseInt(splitData[0]));
                  localStorage.setItem("dataSourceId", splitData[1])
                }}
                onClick={() => {
                  ReferenceJsonDataSetAPi();
                }}
              >
                {referenceJsonTableData?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={`${item.table}*${item.type}`}
                    >
                      {item.table}
                    </option>
                  );
                })}
                <option selected className="text-xs" onClick={() => navigate("/")}>
                  {dataSource ? dataSource : "Add New"}
                </option>
              </select>
            </div>

            <div className="flex items-center ">
              <div className="flex items-center">
                <div className="mb-2 mr-2">
                  {/* <label
                    for="countries"
                    class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  >
                    Column Select
                  </label> */}
                  <select
                    id="countries"
                    class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                    // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                    value={columName}
                    onChange={(e) => setColumnName(e.target.value)}
                    // onClick={() => {
                    //   ColumnSetMethod();
                    // }}
                   
                  >
                    <option selected className="text-xs">
                      Choose Column
                    </option>
                    {columnList?.map((item, i) => {
                      return (
                        <option
                          className="text-xs"
                          value={item.name}
                          onClick={() => selectColumnDataReferenceJsonTable(item.name)}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-2">
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
              </div>
            </div>
            <div>
              {col.length === 0 ? (
                ""
              ) : (
                <div className="mt-2 p-1">
                  {col.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border gap-0.5 p-1"
                    >
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colMap}
                      </label>
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colName}
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
              )}
            </div>
          </>
          ) : datasourcetype === 'flowchart_data' ?
          <>
            <div className="mb-2">
              <label
                for="countries"
                class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
              >
                Flowchart List
              </label>
              <select
                id="countries"
                class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                value={dataSource}
                onChange={(e) => {
                  // setDataSource(e.target.value)
                  const splitData = e.target.value.split("*");
                  console.log("1196 splitData", splitData);
                  setDataSource(splitData[0])
                  selectFlowchartColumnData(splitData[0]);
                  // setTableId1(splitData[0]);
                  localStorage.setItem("dataSourceId", splitData[1])
                }}
                onClick={() => {
                  FlowchartDataSetAPi();
                  // onFlowChartList();
                  // onDataClickValue();
                }}
              >      
                  {/* {eval(flowChartNameList)?.map((item, i) => { */}
                  {flowChartData?.map((item, i) => {
                  // console.log("742 item", item)
                  return (
                    <option
                      className="text-xs"
                      value={`${item.Flowchart_Name}*flowchart_data`}
                      // onClick={() => {
                      //   selectFlowchartColumnData(item.Flowchart_Name);
                      //   // setTableId1(item.id);
                      // }}
                    >
                      {item.Flowchart_Name}
                    </option>
                  );
                })}    
                    
                <option selected className="text-xs" onClick={() => navigate("/")}>
                  {dataSource ? dataSource : "Add New"}
                </option>
              </select>
            </div>
                 

            <div className="flex items-center ">
              <div className="flex items-center">
                <div className="mb-2 mr-2">
                  {/* <label
                    for="countries"
                    class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  >
                    Column Select
                  </label> */}
                  <select
                    id="countries"
                    class="bg-white-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                    // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                    value={columName}
                    onChange={(e) => setColumnName(e.target.value)}
                    // onClick={onFlowChartList}
                  >
                    <option selected className="text-xs">
                      Choose Column
                    </option>
                    {columnList?.map((item, i) => {
                      return (
                        <option
                          className="text-xs"
                          value={item.name}
                          onClick={() => selectColumnData(item.name)}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="input"
                  className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
                >
                  Add Column
                </label> */}
                <div className="flex">
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
              </div>
            </div>
            <div>
              {col.length === 0 ? (
                ""
              ) : (
                <div className="mt-2 p-1">
                  {col.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border gap-0.5 p-1"
                    >
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colMap}
                      </label>
                      <label className=" text-xs font-normal leading-2 text-gray-900">
                        {item.colName}
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
              )}
            </div>
            {/* <Button
              variant="outlined"
              color="success"
              sx={{ textTransform: "capitalize", marginTop: 3 }}
              startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
              size="small"
              onClick={(e) => {
                axios
                .post(`${BaseURL}/account/flow-chart-data-edge/`, { flow_name: dataSource}, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  // setRestApiPostData(response.data.data);
                  console.log("response.data", response.data.fl5)
                  // setColumnList(response.data.sourceKey)
                  // setRestAPIData(response?.data)

                  // var ItemData = []
                  // response?.data?.sourceKey?.map((key) => {
                  //   ItemData.push({name: key})
                  // });
                  // setColumnList(ItemData)

                  setTestDataShow(true);
                  setOpen(true);
                })
                .catch((error) => {
                  // setRestApiPostError({ responseData: null, error: error.message });
                  console.log("error.message", error)
                });
                
              }}
            >
              Test
            </Button> */}
            
          </>
          : ""
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex items-center ">
            <div className="flex items-center">
              <div className="mb-2 mr-2">
              {testDataShow === true ? (
                <TestDataShowTable tableId={tableId1} />
                ) : (
                ""
              )}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "capitalize", marginRight: -4 }}
            color="success"
          >
            <CloseOutlinedIcon />
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            <ArrowForwardIcon />
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex items-center ">
            <div className="flex items-center">
              <div className="mb-2 mr-2">
                <label
                  for="countries"
                  class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
                >
                  Column Select
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                  value={columName}
                  onChange={(e) => setColumnName(e.target.value)}
                  // onClick={onFlowChartList}
                >
                  <option selected className="text-xs">
                    Choose Column
                  </option>
                  {colList?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item.name}
                        // onClick={() => onDataClickValue()}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mb-2">
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
            </div>
          </div>
          <div>
            {col.length === 0 ? (
              ""
            ) : (
              <div className="mt-2 p-1">
                {col.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border gap-0.5 p-1"
                  >
                    <label className=" text-xs font-normal leading-2 text-gray-900">
                      {item.colMap}
                    </label>
                    <label className=" text-xs font-normal leading-2 text-gray-900">
                      {item.colName}
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
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "capitalize", marginRight: -4 }}
            color="success"
          >
            <CloseOutlinedIcon />
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            <ArrowForwardIcon />
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default TableStyle;
