import React, {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";

import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  useNodeId,
  useUpdateNodeInternals,
} from "@xyflow/react";

import Box from "@mui/material/Box";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import Tooltip from "@mui/material/Tooltip";
import Papa, { parse } from "papaparse";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  FILE_NAME_LIST_QUERY,
  JSON_TABLE_NAME_LIST_QUERY
} from "../../../GraphQL/Queries.js";
import { AppContext } from "../../../AppContext.jsx";
import useLazyQueryAllTableCol2 from "../../../GraphQLApiCall/useLazyQueryAllTableCol2.js";
import useLazyQueryDynamic from "../../../GraphQLApiCall/useLazyQueryDynamic.js";
import useRestAPIGet from "../../../GraphQLApiCall/useRestAPIGet.js";
import AddIcon from "@mui/icons-material/Add";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import TestDataShowTable2 from "../TestDataShowTable/TestDataShowTable2.jsx";
import TestDataJsonDataTable from "../TestDataShowTable/TestDataJsonDataTable.jsx";
import GetAllTableData2 from "../../../GraphQLApiCall/GetAllTableData2.js";
import { useNavigate } from "react-router-dom";
import { EditorView } from "@codemirror/view";
import axios from "axios";
// import TableDataShowSqlData from "../../components/AdminComponent/StyledSettings/CardTemplate/ChartData.js/TableDataShowSqlData.js";
// import Erdigram from "../../components/AdminComponent/StyledSettings/ERDiagram/Erdigram.js";
// import mySqlData from "./TestDataShowTable/ConnectMySqlDatabase";

import toast, { Toaster } from 'react-hot-toast';
import GETDynamicTableFieldOnlyColumn2 from "../../../GraphQLApiCall/GETDynamicTableFieldOnlyColumn2.js";
import TestDataReferenceJsonDataTable from "../TestDataShowTable/TestDataReferenceJsonDataTable.jsx";
import GetJsonTableColData from "../../../GraphQLApiCall/GetJsonTableColData.js";
import GetAllTableData from "../../../GraphQLApiCall/GetAllTableData.js";
import GETTableData from "../../../GraphQLApiCall/GETTableData.js";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomSourceNode2({
  id,
  data,
  value,
  isConnectable,
  sourcePosition,
  targetPosition,
  handleIndex,
  ...props
}) {

  const {
    setFormulaShow,
    setFormulaAllData,
    formulaAllData,
    joinAllData,
    setJoinAllData,
    fileNameJoin,
    setFileNameJoin,
    singIn,
    processFlow,
    setProcessFlow,
    ProcessFlowDataShowBool,
    setProcessFlowDataShowBool,
    BaseURL,
    setBaseURL,
    userId,
    setUserId
  } =
    useContext(AppContext);
  
  const [db, setDb] = useState(1);
  const confApi = GetAllTableData(620, userId);
  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );
              
           
  useEffect(() => {
    {
      confApiData?.map((item, index) => {
        if (item.ConfKey === "DB") {
          setDb(item.ConfValue);
        }
      });
    }
  }, [confApiData]);
  

  const {
    loading: file_name_loading,
    error: file_name_error,
    data: file_names,
  } = useQuery(FILE_NAME_LIST_QUERY);

  const {
    loading: json_table_name_loading,
    error: json_table_name_error,
    data: json_table_name,
  } = useQuery(JSON_TABLE_NAME_LIST_QUERY,{
    variables: { db: db, userId: userId },
  }
  );

  const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol2();
  const { get_data, onDataFire } = useLazyQueryDynamic();

  const [count, setCount] = useState(0);
  const onAllTableCol = async (value) => {
    const userResp = await onTableDataFire({
      updateQuery() {},
    });
    console.log({ userResp });
    console.log("check this data for test for value event fire or not 121");
    setCount(count + 1);
  };

  const allTableNameList = eval(all_table_col?.getAllTableColumn2?.jsonData);

  const fileList = eval(file_names?.getYahooHistFileName?.jsonData);
  const JsonTableNameList = eval(json_table_name?.getAllJsonTableName?.jsonData);


  
  console.log("155 fileNameJoin", fileNameJoin);

  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);
  const [input, setInput] = useState(data.label);
  const [body, setBody] = useState(data.body);
  const [tableName, setTableName] = useState("Node Name");
  const [flag, setFlag] = useState(false);
  const [processType, setProcessType] = useState("");
  const [type, setType] = React.useState("rectangular");
  const [sourceTypeShow, setSourceTypeShow] = useState(false);
  const [sourceType, setSourceType] = useState("");
  const [tableId, setTableId] = useState("");
  const [fileName, setFileName] = useState([]);
  const [jsonTableName, setJsonTableName] = useState("");
  const [testDataShow, setTestDataShow] = useState(false);
  const [testJsonDataShow, setTestJsonDataShow] = useState(false);
  const [sourceDataType, setSourceDataType] = useState("");
  const [name, setName] = useState("files");
  const [date, setData] = useState(new Date().getUTCMilliseconds());
  const [upload_file_name, SetUpload] = useState("");
  const [file_name, SetUploadfile] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  console.log("171 uploadFileName", uploadFileName)

  const [sqlDataRun, setSqlDataRun] = useState([]);
  const [tableShow, setTableShow] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [Rows, setRows] = useState([]);


  const [keyName, setKeyName] = React.useState([]);

  console.log("178 keyName", keyName)
  console.log("178 fileNameJoin[0]", fileNameJoin[0])
  console.log("187 Rows", Rows)

  // database connection
  const [databaseUser, setDatabaseUser] = useState("");
  const [host, setHost] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [password, setPassword] = useState("");

  const [addNewTable, setAddNewTable] = useState(false);
  const [ViewDataShow, setViewDataShow] = useState(false);

  const ViewDataShowHide = () => {
    setViewDataShow(false);
  }

  const user = GetAllTableData2(1);

  const userDetails = eval(
    user?.all_table_data?.getDynamicTableField2?.jsonData
  );

  const adminUserData = JSON.parse(
    localStorage.getItem("admin_user") || `{"demo":"1"}`
  );

  useEffect(() => {
    if (adminUserData.user_flag === true) {
      userDetails?.map((item, i) => {
        if (adminUserData.user_email === item.email) {
          setUserId(item.user_id);
        }
      });
    }
  }, [userId, userDetails, adminUserData, singIn]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setKeyName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  let colDataAll = [];

  useEffect(() => {
    allTableNameList?.map((item, i) => {
      if (item.id === parseInt(tableId)) {
        colDataAll.push(...item.column);
      }
    });
  }, [tableId]);

  const handleSelectFileName = (event) => {
    const {
      target: { value },
    } = event;
    setFileName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSelectTableName = (event) => {
    const {
      target: { value },
    } = event;
    setJsonTableName(value);
  };

  const filterDataList = Object.keys(
    formulaAllData[0] || [{ none: "none" }]
  )?.map((key) => key);

  const navigate = useNavigate();

  const sourceTypeShowHandle = () => {
    setSourceTypeShow(true);
  };

  const sourceTypeHideHandle = () => {
    setSourceTypeShow(false);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpenType = () => {
    setOpenType(true);
  };

  const handleCloseType = () => {
    setOpenType(false);
  };

  const [url, setUrl] = useState("");
  console.log("305 url", url)

  const onFileNameSet = () => {
    setUrl(
      `${BaseURL}/media/upload_file/yahoo_finance_hist/` +
      fileName[0].toString()
    );
    // setFileNameJoin([...fileNameJoin, fileName[0].toString()])
    setFileNameJoin([fileName[0].toString()])

    // if (sourceType=='table data') {
    //   setFileNameJoin(tableId)
    // }
    // else if(sourceType=='json data'){
    //   setUrl(
    //     `${BaseURL}/media/upload_file/yahoo_finance_hist/` +
    //     fileName[0].toString()
    //   );
    //   // setFileNameJoin([...fileNameJoin, fileName[0].toString()])
    //   setFileNameJoin([fileName[0].toString()])
    // }
    
    
  };

  console.log("312 Row", Rows);
  
  const json_data = GetJsonTableColData(db, userId, jsonTableName == "" ? "0": jsonTableName )
  const jsonTableColData = eval(json_data?.json_table_col_data?.getJsonTableColData?.jsonData)

  const DatabaseConnectionCheck = () => {
      axios
        .post(`${BaseURL}/account/database-connection-mysql/`, data = {
          "user": databaseUser,
          "host": host,
          "database": databaseName,
          "password": password
        },{
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("response.data", response.data.message)
          alert(response.data.message)
        })
        .catch((error) => {
          // setRestApiPostError({ responseData: null, error: error.message });
          console.log("error.message", error)
          alert("No")
        });
  }
  
  const { restApiData, restApiLoading, restApiError } = useRestAPIGet(url);
  console.log("348 url", url);
  console.log("349 restApiData", restApiData);

  const onChange = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: evt.target.value,
          };
        }
        return node;
      })
    );

    setOpen(false);
  };

  const onChangeType = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node = {
            ...node,
            type: evt.target.value,
          };
          node.data = {
            ...node.data,
            label: evt.target.value,
          };
        }
        return node;
      })
    );

    toast.success("Save Successfully.");
    setOpenType(false);
    setSourceTypeShow(false);
  };

  const onChangeList = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            body: evt.target.value,
          };
        }
        return node;
      })
    );

    setOpen1(false);
    setSourceTypeShow(false);
  };

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Functions for handling actions
  const addItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }

    setFlag(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes?.filter((node) => node?.id !== id));
    setEdges((edges) => edges?.filter((edge) => edge?.target !== id));
  }, [id, setNodes, setEdges]);

  const [logic, setLogic] = React.useState("");

  const handleChangeLogic = (event) => {
    setLogic(event.target.value);
  };

  const [code, setCode] = useState("");

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  // sql code test

  const onSqlDataShowRun = () => {
    const url = "https://itb-usa.a2hosted.com/account/query-json-file/";
    const data = {
      Query: code,
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
        setCsvData(response.data.data);
      })
      .catch((error) => {
        setCsvData({
          responseData: null,
          error: error?.response?.data?.message,
        });
      });

    setTableShow(true);
  };

  // view data
  const ViewDataSubmit = () => {
    
    // console.log
    axios
        .post(`${BaseURL}/account/flow-chart-data-edge/`, {
          flow_name: processFlow,
          // flow_name: datasourcename
         }, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // setLoading(true)
          // setRestApiPostData(response.data.data);
          console.log("472 response.data", response.data)
          if (response?.data?.dataType === 'json data' || response?.data?.dataType === 'reference json data' ||response?.data?.dataType === 'database connection'||response?.data?.dataType === 'external file creation') {
            console.log("472 response.data", response?.data?.DicSection)

            var rows1 = [];
            var count = 0

            if (Object.keys(response?.data?.DicSection?.fl5).length !==0) {
              for (const [key1, value1] of Object.entries(response?.data?.DicSection?.fl2)) {
                for (const [key2, value2] of Object.entries(value1)) { 
                    value2?.sourceData?.map((row, idx) => {
                      count+=1
                      let newObj = { ...row, id: count };
                      rows1.push(newObj);
                    })
                }
                // setRows({ [uniqueID]: rows1 })
                setRows(rows1)
                // setLoading(false)
                console.log("496 Rows", Rows)
                setViewDataShow(true)

              }
             
            }
            else if (Object.keys(response?.data?.DicSection?.fl5).length ===0 && Object.keys(response?.data?.DicSection?.fl4).length !==0) {
              for (const [key1, value1] of Object.entries(response?.data?.DicSection?.fl4)) {
                for (const [key2, value2] of Object.entries(value1)) { 
                    value2?.sourceData?.map((row, idx) => {
                      count+=1
                      let newObj = { ...row, id: count };
                      rows1.push(newObj);
                    })
                }
                // setRows({ [uniqueID]: rows1 })
                setRows(rows1)
                console.log("512 Rows", Rows)
                // setLoading(false)
                setViewDataShow(true)

              }
            }
            else if (Object.keys(response?.data?.DicSection?.fl5).length ===0 && Object.keys(response?.data?.DicSection?.fl4).length ===0 && Object.keys(response?.data?.DicSection?.fl3).length !==0) {
              // console.log("response?.data?.DicSection?.fl3", response?.data?.DicSection?.fl3);
              for (const [key1, value1] of Object.entries(response?.data?.DicSection?.fl3)) {
                // console.log("key1", key1)
                // console.log("value1", value1)

                for (const [key2, value2] of Object.entries(value1)) { 
                    // console.log("key2", key2)
                    // console.log("value2", value2)
                    value2?.sourceData?.map((row, idx) => {
                      // console.log("row", row)
                      count+=1
                      let newObj = { ...row, id: count };
                      rows1.push(newObj);
                    })
                }

                // setRows({ [uniqueID]: rows1 })
                setRows(rows1)
                // console.log("536 Rows", Rows)
                // setLoading(false)
                setViewDataShow(true)

              }
              // // console.log("rows1", rows1)
              // setRows({ [uniqueID]: rows1 })
              // setLoading(false)
            }
            else if (Object.keys(response?.data?.DicSection?.fl5).length ===0 && Object.keys(response?.data?.DicSection?.fl4).length ===0 && Object.keys(response?.data?.DicSection?.fl3).length ===0 && Object.keys(response?.data?.DicSection?.fl2).length !==0) {
              for (const [key1, value1] of Object.entries(response?.data?.DicSection?.fl2)) {
                for (const [key2, value2] of Object.entries(value1)) { 
                    value2?.sourceData?.map((row, idx) => {
                      count+=1
                      let newObj = { ...row, id: count };
                      rows1.push(newObj);
                    })
                }
                // setRows({ [uniqueID]: rows1 })
                // setLoading(false)
                setRows(rows1)
                // console.log("556 Rows", Rows)
                setViewDataShow(true)

              }
              // // console.log("rows1", rows1)
              // setRows({ [uniqueID]: rows1 })
              // setLoading(false)
            }
            else if (Object.keys(response?.data?.DicSection?.fl5).length ===0 && Object.keys(response?.data?.DicSection?.fl4).length ===0 && Object.keys(response?.data?.DicSection?.fl3).length ===0 && Object.keys(response?.data?.DicSection?.fl2).length ===0 && Object.keys(response?.data?.DicSection?.fl1).length !==0) {
              for (const [key1, value1] of Object.entries(response?.data?.DicSection?.fl1)) {
                for (const [key2, value2] of Object.entries(value1)) { 
                    value2?.sourceData?.map((row, idx) => {
                      count+=1
                      let newObj = { ...row, id: count };
                      rows1.push(newObj);
                    })
                }
                // setRows({ [uniqueID]: rows1 })
                // setLoading(false)
                setRows(rows1)
                // console.log("575 Rows", Rows)
                setViewDataShow(true)

              }
              // for (const [key1, value1] of Object.entries(response?.data?.fl1)) {
              //   value1?.map((row, idx) => {
              //     count+=1
              //     let newObj = { ...row, id: count };
              //     rows1.push(newObj);
              //   })
              // }
              // // console.log("rows1", rows1)
              // setRows({ [uniqueID]: rows1 })
              // setLoading(false)
            }
                        
          }
          else if (response?.data?.dataType === 'external file creation') { 
            
            // Fetch and parse the CSV file
            fetch(`${BaseURL}${response?.data?.external_source}`)
              .then((response) => {
                if (!response.ok) {
                  // throw new Error(`HTTP error! Status: ${response.status}`);
                  console.log(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
              })
              .then((csvText) => {
                Papa.parse(csvText, {
                  header: true, // Parse CSV into JSON
                  skipEmptyLines: true,
                  complete: (result) => {
                    // setData(result.data); // Set parsed data to state
                    // console.log("result.data", result.data)
                    var rows1 = []
                    result?.data?.map((row, idx) => {
                      let newObj = { ...row, id: idx };
                      rows1.push(newObj);
                    })
                    // setRows({ [uniqueID]: rows1 })
                    setRows(rows1)
                    // console.log("616 Rows", Rows)
                    // setLoading(false)
                    setViewDataShow(true)
                  },
                  error: (err) => {
                    console.log(`Parsing Error: ${err.message}`);
                    // setLoading(false)
                  },
                });
              })
              .catch((err) => console.log(`Fetch Error: ${err.message}`));
            }
         
        })
        .catch((error) => {
          // setRestApiPostError({ responseData: null, error: error.message });
          console.log("error.message", error)
        });
  }

  function convertCSVtoJSON(csvData) {
    const blob = new Blob([csvData], { type: "text/csv" });
    const reader = new FileReader();

    reader.onload = (event) => {
      const parsedData = Papa.parse(event.target.result, {
        header: true,
        dynamicTyping: true,
      });
      setSqlDataRun(parsedData?.data);
    };

    reader.readAsText(blob);
  }

  useEffect(() => {
    convertCSVtoJSON(csvData);
  }, [csvData]);

  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file)
    console.log("file.name", file.name)
    setCsvFile(file);
    SetUploadfile(event.target.files[0]);
    setFileNameJoin([file.name])
  };

  const onSubmitImage = () => {};

  const handleConvert = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
          setJsonData(result.data);
        },
        header: true, // Set to false if your CSV doesn't have headers
      });
    }
  };

  // const getTableData = GetAllTableData2(tableId);
  // const allTableDataJson = eval(
  //   getTableData?.all_table_data?.getDynamicTableField2?.jsonData
  // );
  // const getTableData = GETDynamicTableFieldOnlyColumn2(tableId);
  // const allTableDataJson = eval(
  //   getTableData?.all_table_data?.getDynamicTableFieldOnlyColumn2?.jsonData
  // );

  const getTableData = GETTableData(db, userId, tableId);
  const allTableDataJson = eval(
      getTableData?.all_table_data?.getTableData?.jsonData
    );

  const onSetFormulaData = () => {
    if (sourceType === "external file creation") {
      setFormulaAllData(jsonData);
      const JsonKey = Object.keys(jsonData[0] || [{ "": "" }])?.map(
        (key) => key
      );
      console.log("JsonKey", JsonKey)
      // const JsonKey1= fileNameJoin.concat(JsonKey)
      // const JsonKey1 = JsonKey.join('_');
      // const JsonKey1 = JsonKey.map(value => `${fileNameJoin[0]}_${value}`);
      // const joinAllData1= joinAllData.concat(JsonKey)
      setJoinAllData(JsonKey)
      const data = new FormData();
      // data.append("name", name);
      // data.append("file_name", file_name);
      // data.append("date", date);

      axios
        .post(`${BaseURL}/course/upload_file_apiview/`, data)
        .then((response) => setUploadFileName(response?.data?.file_name))
        .catch((err) => console.log(err));

      setName("");
      SetUploadfile("");
      // console.log("check file name 317", file_name.name.split(".").pop());
    } else if (sourceType === "database connection") {
      setFormulaAllData([]);
      setJoinAllData([]);
    } else if (sourceType === "table data") {
      console.log("727 allTableDataJson", allTableDataJson)
      setFormulaAllData(allTableDataJson);
      console.log("")
      // setJoinAllData(allTableDataJson);
      const JsonKey = Object.keys(allTableDataJson[0] || [{ "": "" }])?.map(
        (key) => key
      );
      // const JsonKey1= fileNameJoin.concat(JsonKey)
      const JsonKey1 = JsonKey.map(value => `${tableId}_${value}`);
      // const JsonKey1 = JsonKey.map(value => `${value}`);
      const joinAllData1= joinAllData.concat(JsonKey1)
      setJoinAllData(joinAllData1)
      // setJoinAllData(JsonKey)
    } else if (sourceType === "reference json data") {
      setFormulaAllData(restApiData.data);
      const JsonKey = Object.keys(restApiData.data[0] || [{ "": "" }])?.map(
        (key) => key
      );
      // const JsonKey1= fileNameJoin.concat(JsonKey)
      // const JsonKey1 = JsonKey.join('_');
      const JsonKey1 = JsonKey.map(value => `${fileNameJoin[0]}_${value}`);
      const joinAllData1= joinAllData.concat(JsonKey1)
      setJoinAllData(joinAllData1)
      // setJoinAllData(restApiData.data);
    } else if (sourceType === "json data") {
      setFormulaAllData(jsonTableColData);
      const JsonKey = Object.keys(jsonTableColData[0] || [{ "": "" }])?.map(
        (key) => key
      );
      // const JsonKey1= fileNameJoin.concat(JsonKey)
      // const JsonKey1 = JsonKey.join('_');
      const JsonKey1 = JsonKey.map(value => `${jsonTableName}_${value}`);
      const joinAllData1= joinAllData.concat(JsonKey1)
      setJoinAllData(joinAllData1)
      // setJoinAllData(restApiData.data);
    } else if (sourceType === "sql query") {
      setFormulaAllData(sqlDataRun);
      // setJoinAllData(sqlDataRun);
      const JsonKey = Object.keys(sqlDataRun[0] || [{ "": "" }])?.map(
        (key) => key
      );
      const JsonKey1= fileNameJoin.concat(JsonKey)
      const joinAllData1= joinAllData.concat(JsonKey1)
      setJoinAllData(joinAllData1)
    }
    sourceTypeHideHandle();
  };

  const saveSourceNodeData = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            source: {
              sourceType: sourceDataType,
              sourceInfoType: sourceType,
              sourceKey: keyName,
              source:
                sourceType === "table data"
                  ? tableId
                  : sourceType === "json data"
                  ? jsonTableName
                  : sourceType === "reference json data"
                  ? fileName
                  : sourceType === "external file creation"
                  ? uploadFileName
                  : sourceType === "sql query"
                  ? code
                  : sourceType === "database connection"
                  ? {
                    "user": databaseUser,
                    "host": host,
                    "database": databaseName,
                    "password": password
                  }
                  : "",
            },
          };
        }
        return node;
      })
    );
    toast.success("Source Node Data Save Successfully.")
  };

  console.log("check table id 457", tableId);

  return (
    <>
      <Handle
        id="a"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          top: 0,
          width: "10px",
          height: "5px",
          borderRadius: "5px",
          backgroundColor: "#3C486B",
        }}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          Bottom: 0,
          width: "10px",
          height: "5px",
          borderRadius: "5px",
          backgroundColor: "#3C486B",
        }}
      />
      <Box
        sx={{
          bgcolor: "#ffffff",
          padding: 1,
          borderRadius: 5,
          width: "130px",
          height: "70px",
          color: "black",
          border: "1px solid #DA0C81",
        }}
      >
        <Text
          style={{
            margin: 0,
            padding: 0,
            fontSize: "7px",
            display: "inline",
            fontWeight: 500,
            color: "black",
            textTransform: "capitalize",
          }}
        >
          {data.label}
        </Text>

        <Tooltip title="Name" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={sourceTypeShowHandle}
          >
            <ModeEditOutlineOutlinedIcon
              sx={{
                fontSize: "9px",
                color: "black",
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deleted" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              deleteNode();
            }}
          >
            <DeleteOutlineIcon
              sx={{
                fontSize: "9px",
                color: "black",
                marginLeft: -0.5,
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Setting" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpenType();
            }}
          >
            <SettingsOutlinedIcon
              sx={{
                fontSize: "9px",
                color: "black",
                marginLeft: -0.5,
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Formula" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              // handleClickOpen2();
              // setFilterEditor(false);
              // setLogicEditor(false);
              // setChartDataShow(false);
              // setSqlShow(true);
              // setSelectChart("sqlquery");
              onSetFormulaData();
              setFormulaShow(true);
            }}
          >
            <TerminalOutlinedIcon
              sx={{
                fontSize: "9px",
                color: "white",
                marginLeft: -0.5,
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip> */}
        
        <Tooltip title="Save" placement="top">
          <IconButton
            sx={{
              marginLeft: "-4px",
              marginTop: "1px",
              color: "black",
              fontSize: "7px",
              "&:hover": {
                color: "green",
              },
            }}
            aria-label="delete"
            size="small"
            onClick={saveSourceNodeData}
            onChange={saveSourceNodeData}
            value={"fd"}
            nodeId={id}
          >
            <Box
              sx={{
                "&:hover": {
                  opacity: "50%",
                },
              }}
            >
              📝
            </Box>
          </IconButton>
        </Tooltip>
        {
          ProcessFlowDataShowBool == true ? 
          <Tooltip title="View" placement="top">
            <IconButton
              sx={{
                marginLeft: "-4px",
                marginTop: "1px",
                color: "black",
                fontSize: "7px",
                "&:hover": {
                  color: "green",
                },
              }}
              aria-label="delete"
              size="small"
              onClick={ViewDataSubmit}
              value={"fd"}
              nodeId={id}
            >
              <Box
                sx={{
                  "&:hover": {
                    opacity: "50%",
                  },
                }}
              >
                👁️
              </Box>
            </IconButton>
          </Tooltip>
          : ""
        }
       

        <Divider variant="outside" component="div" sx={{ marginBottom: 1 }} />
        <Box sx={{ display: "inline" }}>
          <Text
            style={{
              fontWeight: "250",
              fontSize: "7px",
              padding: 0,
              margin: 0,
              display: "inline",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Source: {data.body}
          </Text>
          <Tooltip title="Source" placement="top">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                sourceTypeShowHandle();
              }}
            >
              <ModeEditOutlineOutlinedIcon
                sx={{
                  fontSize: "9px",
                  color: "black",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip>
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "250",
              fontSize: "7px",
              padding: 0,
              margin: 0,
              display: "inline",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            Key
          </Text>
          <Tooltip title="Key" placement="top">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpen2();
              }}
            >
              <ModeEditOutlineOutlinedIcon
                sx={{
                  fontSize: "9px",
                  color: "black",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          {/* <input onChange={(e) => setInput(e.target.value)} value={input} /> */}
          <input
            type="text"
            name="price"
            id="price"
            className="block w-[200px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder=""
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={() => {
              handleClose();
            }}
            size="small"
            sx={{
              fontSize: "16px",
              color: "black",
              marginRight: -4,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ✘
          </Button>
          <Button
            onChange={onChange}
            onClick={onChange}
            value={input}
            nodeId={id}
            autoFocus
            size="small"
            sx={{
              fontSize: "20px",
              color: "black",
              margin: 0,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ⮕
          </Button>
        </DialogActions>
        {/* <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancle
          </Button>
          <Button
            onChange={onChange}
            onClick={onChange}
            value={input}
            nodeId={id}
            autoFocus
          >
            Update
          </Button>
        </DialogActions> */}
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{ fontSize: "16px" }}
                id="demo-simple-select-label"
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={processType}
                label="Type"
                onChange={(e) => setProcessType(e.target.value)}
                size="small"
                sx={{ fontSize: "16px" }}
              >
                {eval(allTableNameList)?.map((item, i) => {

                  if (item?.type === sourceType) {
                    return (
                      <MenuItem
                        key={i}
                        sx={{ fontSize: "14px" }}
                        size="small"
                        value={item.table}
                      >
                        {item.table}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={handleClose1}
            size="small"
            sx={{
              fontSize: "16px",
              color: "black",
              marginRight: -4,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ✘
          </Button>
          <Button
            onChange={onChangeList}
            onClick={onChangeList}
            value={processType}
            nodeId={id}
            autoFocus
            size="small"
            sx={{
              fontSize: "20px",
              color: "black",
              margin: 0,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={sourceTypeShow}
        onClose={sourceTypeHideHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Box sx={{ minWidth: 450 }}>
              <FormControl
                color="success"
                fullWidth
                size="small"
                sx={{ fontSize: "14px" }}
              >
                <InputLabel
                  sx={{ fontSize: "14px" }}
                  id="demo-simple-select-label"
                  color="success"
                >
                  Select
                </InputLabel>
                <Select
                  color="success"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sourceDataType}
                  label="Type"
                  onChange={(e) => setSourceDataType(e.target.value)}
                  size="small"
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"get data"}
                  >
                    Get Data
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"mutation data"}
                  >
                    Mutation Data
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box sx={{ minWidth: 450 }}>
              <FormControl
                color="success"
                fullWidth
                size="small"
                sx={{ fontSize: "14px" }}
              >
                <InputLabel
                  sx={{ fontSize: "14px" }}
                  id="demo-simple-select-label"
                  color="success"
                >
                  Type
                </InputLabel>
                <Select
                  color="success"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sourceType}
                  label="Type"
                  onChange={(e) => setSourceType(e.target.value)}
                  size="small"
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"json data"}
                  >
                    Json Data
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"reference json data"}
                  >
                    Reference Json Data
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"external file creation"}
                  >
                    External file creation
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"table data"}
                    onClick={onAllTableCol}
                  >
                    Table Data
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"database connection"}
                  >
                    Database Connection
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"sql query"}
                  >
                    Sql Query
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            {sourceType === "table data" ? (
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <FormControl
                  color="success"
                  sx={{ fontSize: "14px" }}
                  fullWidth
                  size="small"
                >
                  <InputLabel
                    sx={{ fontSize: "14px" }}
                    id="demo-simple-select-label"
                    color="success"
                  >
                    Select
                  </InputLabel>
                  <Select
                    color="success"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tableId}
                    label="Type"
                    onChange={(e) => setTableId(e.target.value)}
                    size="small"
                    sx={{ fontSize: "14px" }}
                    onClick={onAllTableCol}
                  >
                    {allTableNameList?.map((item, i) => {
                      // console.log("1382 item?.type", item?.type);
                      // console.log("1383 sourceType", sourceType);
                      if (item?.type == sourceType) {
                        return (
                          <MenuItem
                            color="success"
                            key={i}
                            sx={{ fontSize: "14px" }}
                            size="small"
                            value={item.id}
                          >
                            {item.table}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
                {/* <FormControl
                  sx={{
                    mt: 3,
                    mr: 2,
                    width: 450,
                    height: 200,
                    fontSize: "14px",
                  }}
                  fullWidth
                  size="small"
                  color="success"
                >
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    size="small"
                    sx={{ fontSize: "14px" }}
                    color="success"
                  >
                    Key
                  </InputLabel>
                  <Select
                    color="success"
                    size="small"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={keyName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    sx={{ fontSize: "14px" }}
                  >
                    {allTableNameList
                      ?.filter((value) => value.id === parseInt(tableId))
                      ?.map((item) => (
                        <MenuItem
                          color="success"
                          size="small"
                          key={name}
                          value={item.id}
                          sx={{ fontSize: "14px", margin: 0, padding: 0 }}
                        >
                          <Checkbox
                            size="small"
                            checked={item.table.indexOf(item.table) > -1}
                            sx={{ fontSize: "12px" }}
                            color="success"
                          />
                          <ListItemText
                            color="success"
                            size="small"
                            primary={item.table}
                            sx={{ fontSize: "14px" }}
                          />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl> */}
                {/* <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={onAllTableCol}
                >
                  Test Table Data
                </Button> */}
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={(e) => {
                    setTestDataShow(true);
                    // onFileNameSet();
                  }}
                >
                  Test
                </Button>
                {/* <Button
                  variant="outlined"
                  color="success"
                  sx={{
                    textTransform: "capitalize",
                    marginTop: 3,
                    marginLeft: 2,
                  }}
                  startIcon={<AddIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={() => {
                    // navigate("/erdigram");
                    setAddNewTable(true);
                  }}
                >
                  Add Table
                </Button> */}
                <Box
                  sx={{
                    // width: 800,
                    // height: 400,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  {testDataShow === true ? (
                    <TestDataShowTable2 tableId={tableId} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ) : sourceType === "external file creation" ? (
              <Box sx={{ marginTop: 2 }}>
                <Button
                  fullWidth
                  color="success"
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  type="file"
                  onChange={handleFileChange}
                  sx={{
                    textTransform: "capitalize",
                    marginTop: 1,
                  }}
                >
                  Upload csv
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{
                    textTransform: "capitalize",
                    marginTop: 3,
                  }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={(e) => {
                    setTestDataShow(true);
                    handleConvert();
                  }}
                >
                  Test
                </Button>
                <Box
                  sx={{
                    // width: 500,
                    // height: 200,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  {testDataShow === true ? (
                    <TestDataJsonDataTable data={jsonData} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ) : sourceType === "reference json data" ? (
              <Box sx={{ marginTop: 2 }}>
                <FormControl
                  sx={{ fontSize: "14px" }}
                  fullWidth
                  size="small"
                  color="success"
                >
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    size="small"
                    sx={{ fontSize: "14px" }}
                    color="success"
                  >
                    File
                  </InputLabel>
                  <Select
                    color="success"
                    size="small"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    value={fileName}
                    onChange={handleSelectFileName}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    sx={{ fontSize: "14px" }}
                  >
                    {fileList?.map((item, i) => i<=100 && (
                      <MenuItem
                        color="success"
                        size="small"
                        key={i}
                        value={item}
                        sx={{ fontSize: "14px", margin: 0, padding: 0 }}
                      >
                        <Checkbox
                          size="small"
                          checked={fileName.indexOf(item) > -1}
                          sx={{ fontSize: "12px" }}
                          color="success"
                        />
                        <ListItemText
                          color="success"
                          size="small"
                          primary={item}
                          sx={{ fontSize: "14px" }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={(e) => {
                    // setTestJsonDataShow(true);
                    setTestDataShow(true);
                    onFileNameSet();
                  }}
                >
                  Test
                </Button>
                <Box
                  sx={{
                    // width: 600,
                    // height: 400,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  {testDataShow === true ? (
                    <TestDataReferenceJsonDataTable data={restApiData.data} />  
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ) : sourceType === "json data" ? (
              <Box sx={{ marginTop: 2 }}>
                <FormControl
                  sx={{ fontSize: "14px" }}
                  fullWidth
                  size="small"
                  color="success"
                >
                  <InputLabel
                    id="demo-multiple-checkbox-label"
                    size="small"
                    sx={{ fontSize: "14px" }}
                    color="success"
                  >
                    File
                  </InputLabel>
                  <Select
                    color="success"
                    size="small"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    value={jsonTableName}
                    onChange={handleSelectTableName}
                    input={<OutlinedInput label="Tag" />}
                    // renderValue={(selected) => selected.join("")}
                    MenuProps={MenuProps}
                    sx={{ fontSize: "14px" }}
                  >
                    {JsonTableNameList?.map((item, i) => (
                      <MenuItem
                        color="success"
                        size="small"
                        key={i}
                        value={item?.table_id}
                        sx={{ fontSize: "14px", margin: 0, padding: 0 }}
                      >
                        <Checkbox
                          size="small"
                          // checked={jsonTableName.indexOf(item?.tableName) > -1}
                          checked={item?.table_name}
                          sx={{ fontSize: "12px" }}
                          color="success"
                        />
                        <ListItemText
                          color="success"
                          size="small"
                          primary={item?.table_name}
                          sx={{ fontSize: "14px" }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={(e) => {
                    // setTestJsonDataShow(true);
                    setTestDataShow(true);
                    // onFileNameSet();
                  }}
                >
                  Test
                </Button>
                <Box
                  sx={{
                    // width: 600,
                    // height: 400,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  {testDataShow === true ? (
                    <TestDataJsonDataTable data={jsonTableColData} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ) : sourceType === "sql query" ? (
              <Box sx={{ marginTop: 2 }}>
                <Box>
                  <CodeMirror
                    className="CodeMirror"
                    value={""}
                    height="300px"
                    width="450px"
                    fontSize="6px"
                    extensions={[
                      javascript({ jsx: true }),
                      EditorView.lineWrapping,
                    ]}
                    onChange={(value, viewUpdate) => {
                      onChangeCode(value);
                    }}
                  />
                </Box>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={onSqlDataShowRun}
                >
                  Test
                </Button>
                <Box
                  sx={{
                    // width: 600,
                    // height: 400,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  <Box sx={{ p: 1 }}>
                    {csvData?.error && (
                      <div className="text-sm font-mono p-2">
                        {csvData?.error}
                      </div>
                    )}

                    {tableShow && (
                      <TableDataShowSqlData dataSource={[sqlDataRun]} />
                    )}
                  </Box>
                </Box>
              </Box>
            ) : sourceType === "database connection" ? (
              <Box sx={{ marginTop: 2 }}>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="user"
                  value={databaseUser}
                  onChange={(e) => setDatabaseUser(e.target.value)}
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                />
                {/* <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="conection"
                  // value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                /> */}
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="database name"
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                />
                <input
                  type="password"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 1 }}
                  fullWidth
                  size="small"
                  onClick={()=> DatabaseConnectionCheck()}        
                >
                  Conection
                </Button>

                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  size="small"
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  onClick={(e) => setTestDataShow(true)}
                >
                  Test
                </Button>
                <Box
                  sx={{
                    // width: 500,
                    // height: 200,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  {testDataShow === true ? (
                    <TestDataJsonDataTable data={restApiData.data} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={sourceTypeHideHandle}
            size="small"
            sx={{
              fontSize: "16px",
              color: "black",
              marginRight: -4,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ✘
          </Button>
          <Button
            // onChange={onChangeList}
            // value={processType}
            // nodeId={id}
            onClick={onSetFormulaData}
            autoFocus
            size="small"
            sx={{
              fontSize: "20px",
              color: "black",
              margin: 0,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={ViewDataShow}
        onClose={ViewDataShowHide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        // PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <Box sx={{ minWidth: 450 }}>
            {
              Rows && 
              <Box sx={{ p: 2 }}>
                <TestDataJsonDataTable data={Rows} />
              </Box>
            }

          </Box>  
          
        </DialogContent>

        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={ViewDataShowHide}
            size="small"
            sx={{
              fontSize: "16px",
              color: "black",
              // marginRight: -2,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ✘
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openType}
        onClose={handleCloseType}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <Box sx={{ minWidth: 500, minHeight: 200 }}>
            <FormControl fullWidth size="small">
              <InputLabel
                sx={{ fontSize: "14px" }}
                id="demo-simple-select-label"
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChangeType}
                size="small"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"container"}
                >
                  Container
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"fileupload"}
                >
                  File Upload
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"logic"}
                >
                  Fetch Data
                </MenuItem>
                <MenuItem size="small" value={"filter"}>
                  Filter
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} size="small" value={"form"}>
                  Form
                </MenuItem>
                <MenuItem sx={{ fontSize: "14px" }} size="small" value={"menu"}>
                  Menu
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"action"}
                >
                  Action
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"sqldata"}
                >
                  SQL Data
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"subflow"}
                >
                  Sub Flow
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"source"}
                >
                  Source
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"datasource"}
                >
                  Data Source
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"formula"}
                >
                  Formula
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"join"}
                >
                  Join
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={handleCloseType}
            size="small"
            sx={{
              fontSize: "16px",
              color: "black",
              marginRight: -4,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ✘
          </Button>
          <Button
            onChange={onChangeType}
            onClick={onChangeType}
            value={type}
            nodeId={id}
            autoFocus
            size="small"
            sx={{
              fontSize: "20px",
              color: "black",
              margin: 0,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ⮕
          </Button>
        </DialogActions>
        {/* <DialogActions>
          <Button onClick={handleCloseType}>Cancle</Button>
          <Button
            onChange={onChangeType}
            onClick={onChangeType}
            value={type}
            nodeId={id}
            autoFocus
          >
            Update
          </Button>
        </DialogActions> */}
      </Dialog>
      <Dialog
        maxWidth="lg"
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <FormControl sx={{ m: 1, width: 450, height: 200 }} size="small">
            <InputLabel
              id="demo-multiple-checkbox-label"
              size="small"
              sx={{ fontSize: "16px" }}
              color="success"
            >
              Key
            </InputLabel>
            <Select
              color="success"
              size="small"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={keyName}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              sx={{ fontSize: "16px" }}
            >
              {
                sourceType == 'table data' ?
                  filterDataList?.map((name) => (
                    <MenuItem
                      color="success"
                      size="small"
                      key={tableId+'_'+name}
                      value={tableId+'_'+name}
                      // key={name}
                      // value={name}
                      sx={{ fontSize: "16px", margin: 0, padding: 0 }}
                    >
                      <Checkbox
                        size="small"
                        checked={keyName.indexOf(tableId+'_'+name) > -1}
                        // checked={keyName.indexOf(name) > -1}
                        sx={{ fontSize: "12px" }}
                        color="success"
                      />
                      <ListItemText
                        color="success"
                        size="small"
                        primary={tableId+'_'+name}
                        // primary={name}
                        sx={{ fontSize: "16px" }}
                      />
                    </MenuItem>
                  ))
                  : sourceType == 'reference json data' ? 
                    filterDataList?.map((name) => (
                      <MenuItem
                        color="success"
                        size="small"
                        key={fileNameJoin[0]+'_'+name}
                        value={fileNameJoin[0]+'_'+name}
                        // key={name}
                        // value={name}
                        sx={{ fontSize: "16px", margin: 0, padding: 0 }}
                      >
                        <Checkbox
                          size="small"
                          checked={keyName.indexOf(fileNameJoin[0]+'_'+name) > -1}
                          // checked={keyName.indexOf(name) > -1}
                          sx={{ fontSize: "12px" }}
                          color="success"
                        />
                        <ListItemText
                          color="success"
                          size="small"
                          primary={fileNameJoin[0]+'_'+name}
                          // primary={name}
                          sx={{ fontSize: "16px" }}
                        />
                      </MenuItem>
                    )) : sourceType == 'json data' ? 
                    filterDataList?.map((name) => (
                      <MenuItem
                        color="success"
                        size="small"
                        key={jsonTableName+'_'+name}
                        value={jsonTableName+'_'+name}
                        // key={name}
                        // value={name}
                        sx={{ fontSize: "16px", margin: 0, padding: 0 }}
                      >
                        <Checkbox
                          size="small"
                          checked={keyName.indexOf(jsonTableName+'_'+name) > -1}
                          // checked={keyName.indexOf(name) > -1}
                          sx={{ fontSize: "12px" }}
                          color="success"
                        />
                        <ListItemText
                          color="success"
                          size="small"
                          primary={jsonTableName+'_'+name}
                          // primary={name}
                          sx={{ fontSize: "16px" }}
                        />
                      </MenuItem>
                    )) : ""
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={handleClose2}
            size="small"
            sx={{
              fontSize: "16px",
              color: "black",
              marginRight: -4,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ✘
          </Button>
          <Button
            onClick={handleClose2}
            autoFocus
            size="small"
            sx={{
              fontSize: "20px",
              color: "black",
              margin: 0,
              padding: 0,
              "&:hover": {
                color: "green",
              },
              height: 0,
              width: 0,
            }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={addNewTable}
        onClose={(e) => setAddNewTable(false)}
        TransitionComponent={Transition}
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <AppBar sx={{ position: "relative", bgcolor: "green" }}>
          <Toolbar sx={{}}>
            <Typography
              sx={{ ml: 2, flex: 1, margin: "auto" }}
              variant="h6"
              component="div"
            >
              Add New Table
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setAddNewTable(false)}
              sx={{ textDecoration: "capitalize" }}
            >
              Save
            </Button>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setAddNewTable(false)}
              sx={{ textDecoration: "capitalize" }}
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {/* <Erdigram /> */}
      </Dialog>
    </>
  );
}

export default memo(CustomSourceNode2);
