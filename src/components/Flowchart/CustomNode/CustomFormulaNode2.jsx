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

import toast, { Toaster } from 'react-hot-toast';

import Box from "@mui/material/Box";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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
import Papa from "papaparse";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  FILE_NAME_LIST_QUERY,
} from "../../../GraphQL/Queries";
import { AppContext } from "../../../AppContext";
import useLazyQueryAllTableCol2 from "../../../GraphQLApiCall/useLazyQueryAllTableCol2";
import useLazyQueryDynamic from "../../../GraphQLApiCall/useLazyQueryDynamic";
import useRestAPIGet from "../../../GraphQLApiCall/useRestAPIGet";
import AddIcon from "@mui/icons-material/Add";
import TestDataShowTable from "../TestDataShowTable/TestDataShowTable";
import TestDataJsonDataTable from "../TestDataShowTable/TestDataJsonDataTable";
import GetAllTableData from "../../../GraphQLApiCall/GetAllTableData";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
// import mySqlData from "./TestDataShowTable/ConnectMySqlDatabase";

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

function CustomFormulaNode2({
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
    formulaCode,
    valueName,
    setValueName,
    formulaName,
    setFormulaName,
    formulaNameDic,
    setFormulaNameDic,
    processFlow,
    setProcessFlow,
    ProcessFlowDataShowBool,
    setProcessFlowDataShowBool,
    BaseURL,
    setBaseURL,
    userId,
    setUserId
  } = useContext(AppContext);

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
    data: file_name,
  } = useQuery(FILE_NAME_LIST_QUERY);

  const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol2();
  const { get_data, onDataFire } = useLazyQueryDynamic();

  const onAllTableCol = async (value) => {
    const userResp = await onTableDataFire({
      updateQuery() {},
    });
    console.log({ userResp });
  };

  const allTableNameList = eval(all_table_col?.getAllTableColumn2?.jsonData);

  const fileList = eval(file_name?.getYahooHistFileName?.jsonData);

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
  const [fileName, setFileName] = useState("");
  const [testDataShow, setTestDataShow] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [selected, setSelected] = useState("");
  const [openFile, setOpenFile] = useState(false);
  const [openFileAdd, setOpenFileAdd] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const [Rows, setRows] = useState([]);
  const [ViewDataShow, setViewDataShow] = useState(false);
  
  const ViewDataShowHide = () => {
    setViewDataShow(false);
  }

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
          // console.log("472 response.data", response.data)
          if (response?.data?.dataType === 'json data'||response?.data?.dataType === 'database connection'||response?.data?.dataType === 'external file creation') {
            // console.log("472 response.data", response?.data?.DicSection)

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
                // console.log("496 Rows", Rows)
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
                // console.log("512 Rows", Rows)
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
                    console.log("616 Rows", Rows)
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

  const onFileNameSet = () => {
    setUrl(
      `${BaseURL}/media/upload_file/yahoo_finance_hist/` +
        fileName.toString()
    );
  };

  const { restApiData, restApiLoading, restApiError } = useRestAPIGet(url);

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

    // console.log("nodes", nodes)
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

  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
  };

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

  const getTableData = GetAllTableData(tableId);
  const allTableDataJson = eval(
    getTableData?.all_table_data?.getDynamicTableField?.jsonData
  );

  const onSetFormulaData = () => {
    if (sourceType === "external_file_creation") {
      setFormulaAllData(jsonData);
    } else if (sourceType === "database_conection") {
      setFormulaAllData([]);
    } else if (sourceType === "table_data_save") {
      setFormulaAllData(allTableDataJson);
      setValueName(tableId);
    } else if (sourceType === "json_data_save") {
      setFormulaAllData(restApiData.data);
      setValueName(fileName);
    }
  };

  console.log("formulaNameDic", formulaNameDic)

  const saveFormulaNodeData = (evt) => {
    const { nodes } = store.getState();
    console.log("formulaNameDic", formulaNameDic)

    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            // formula: { formulaName: formulaNameDic },
            formula: {
              sourceType: "formula data",
              sourceInfoType: "json data",
              formula: formulaNameDic,
            },
          };
        }
        return node;
      })
    );

    console.log("nodes", nodes)
    toast.success("Formula Node Data Save Successfully.")
  };

  const onFileCreateOnServer = () => {
    let url = `${BaseURL}/account/json-yahoo-dynamic-api/`;
    let restApiPostValue = {
      symbol: newFileName,
    };

    axios
      .post(url, restApiPostValue, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("check resposen dta", response.data?.message);
      })
      .catch((error) => {
        // setRestApiPostError({ responseData: null, error: error.message });
        console.log("check error data value", error.message);
      });
    setIsLoading(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // handleClickOpen();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading]);

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
        <Tooltip title="Formula" placement="top">
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
            onClick={saveFormulaNodeData}
            onChange={saveFormulaNodeData}
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
            Add Formula
            {/* Source: {data.body} */}
          </Text>
          {/* <Tooltip title="Source" placement="top">
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
                  color: "white",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip> */}
        </Box>
      </Box>

      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          {/* <input onChange={(e) => setInput(e.target.value)} value={input} /> */}
          <Box sx={{ minWidth: 300, minHeight: 80 }}>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-[200px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder=""
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
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
        maxWidth="lg"
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <Box sx={{ minWidth: 500, minHeight: 200 }}>
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
        open={sourceTypeShow}
        // onClose={sourceTypeHideHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Box sx={{ minWidth: 500, minHeight: 200 }}>
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
                    value={"json_data_save"}
                  >
                    Json Data Save
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"external_file_creation"}
                  >
                    External file creation
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"table_data_save"}
                    onClick={onAllTableCol}
                  >
                    Table Data Save
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"database_conection"}
                  >
                    Database Conection
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            {sourceType === "table_data_save" ? (
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
                  >
                    {allTableNameList?.map((item, i) => {
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
                    })}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={(e) => {
                    setTestDataShow(true);
                  }}
                >
                  Test
                </Button>
                <Button
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
                    navigate("/erdigram");
                  }}
                >
                  Add Table
                </Button>
                <Box
                  sx={{
                    // width: 800,
                    // height: 400,
                    marginTop: 2,
                    padding: 2,
                  }}
                >
                  {testDataShow === true ? (
                    <TestDataShowTable tableId={tableId} />
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            ) : sourceType === "external_file_creation" ? (
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
            ) : sourceType === "json_data_save" ? (
              <Box sx={{ marginTop: 2 }}>
                <div className="w-full font-normal text-sm max-h-80 ">
                  <div
                    onClick={() => setOpenFile(!openFile)}
                    className={`bg-white w-full p-2 flex items-center justify-between border rounded ${
                      !selected && "text-gray-700"
                    }`}
                  >
                    {selected
                      ? selected?.length > 25
                        ? selected?.substring(0, 25) + "..."
                        : selected
                      : "Select File Name"}
                    <BiChevronDown
                      size={20}
                      className={`${openFile && "rotate-180"}`}
                    />
                  </div>
                  <ul
                    className={`bg-white mt-1 overflow-y-auto ${
                      openFile ? "max-h-60 border" : "max-h-0"
                    } `}
                  >
                    <div className="flex items-center sticky top-0 bg-white justify-start ml-0 pl-0">
                      <AiOutlineSearch size={18} className="text-gray-700" />
                      <input
                        type="text"
                        value={inputSearchValue}
                        onChange={(e) =>
                          setInputSearchValue(e.target.value.toLowerCase())
                        }
                        placeholder="Search file name"
                        className="placeholder:text-gray-700 p-2 outline-none"
                      />
                    </div>
                    {fileList?.map((country) => (
                      <li
                        key={country}
                        className={`p-2 text-sm hover:bg-slate-100 hover:text-black
                        ${
                          country.toLowerCase() === selected?.toLowerCase() &&
                          "bg-slate-200"
                        }
                        ${
                          country.toLowerCase().startsWith(inputSearchValue)
                            ? "block"
                            : "hidden"
                        }`}
                        onClick={() => {
                          if (
                            country.toLowerCase() !== selected.toLowerCase()
                          ) {
                            setSelected(country);
                            setOpenFile(false);
                            setInputSearchValue("");
                            setFileName(country);
                          }
                        }}
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{
                    textTransform: "capitalize",
                    marginTop: 3,
                    marginRight: 2,
                  }}
                  startIcon={<PlayArrowIcon sx={{ marginRight: -1 }} />}
                  size="small"
                  onClick={(e) => {
                    setTestDataShow(true);
                    onFileNameSet();
                  }}
                >
                  Test
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 3 }}
                  startIcon={
                    <DriveFileMoveOutlinedIcon sx={{ marginRight: "-4px" }} />
                  }
                  size="small"
                  onClick={() => setOpenFileAdd(true)}
                >
                  Add
                </Button>
                <Dialog
                  maxWidth="lg"
                  open={openFileAdd}
                  // onClick={() => setOpenFileAdd(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <Box sx={{ minWidth: 500, minHeight: 200 }}>
                      <input
                        type="text"
                        name="file name"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                        placeholder="File Name"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                      />
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{ textTransform: "capitalize", marginTop: 1 }}
                        fullWidth
                        size="small"
                        onClick={onFileCreateOnServer}
                      >
                        {isLoading ? (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CircularProgress
                              color="success"
                              size={20}
                              sx={{ marginRight: 1, fontSize: "12px" }}
                            />
                            <span> Creating...</span>
                          </Box>
                        ) : (
                          <span>Create</span>
                        )}
                      </Button>
                    </Box>
                  </DialogContent>

                  <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
                    <Button
                      onClick={() => setOpenFileAdd(false)}
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
                      onClick={() => setOpenFileAdd(false)}
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
                <Box
                  sx={{
                    // width: 600,
                    // height: 400,
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
            ) : sourceType === "database_conection" ? (
              <Box sx={{ marginTop: 2 }}>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="name"
                  // value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="conection"
                  // value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="user"
                  // value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="password"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                  placeholder="password"
                  // value={startDate}
                  // onChange={(e) => setStartDate(e.target.value)}
                />
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "capitalize", marginTop: 1 }}
                  fullWidth
                  size="small"
                >
                  Connection
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
        maxWidth="lg"
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
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          <CodeMirror
            className="CodeMirror"
            value={code}
            height="450px"
            width="700px"
            fontSize="6px"
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => {
              onChangeCode(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button onClick={handleClose2} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(CustomFormulaNode2);
