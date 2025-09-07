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
import { Divider, Tooltip } from "@mui/material";
import styled from "styled-components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InputLabel from "@mui/material/InputLabel";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AppContext } from "../../../AppContext";

import axios from "axios";
import Papa from "papaparse";

import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../../../GraphQL/Queries";
import TestDataJsonDataTable from "../TestDataShowTable/TestDataJsonDataTable";
import GetAllTableData from "../../../GraphQLApiCall/GetAllTableData";

const Text = styled.p`
  font-family: "Nunito Sans", sans-serif;
`;

function CustomNodeFilter({
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
    setChartDataShow,
    setFilterEditor,
    setLogicEditor,
    setFilterCondition,
    setFilterArg,
    filterCondition,
    filterArg,
    filterCode,
    formulaAllData,
    fileNameJoin,
    setFileNameJoin,
    joinAllData,
    setJoinAllData,
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

  
  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);
  const [input, setInput] = useState(data.label);
  const [flag, setFlag] = useState(false);

  const [type, setType] = React.useState("rectangular");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const filterDataList = Object.keys(formulaAllData[0] || [{ "": "" }])?.map(
    (key) => key
  );

  console.log("88 filterDataList", filterDataList)
  console.log("89 fileNameJoin", fileNameJoin[0])


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

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpenType = () => {
    setOpenType(true);
  };

  const handleCloseType = () => {
    setOpenType(false);
  };

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
            filter: true,
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
  };

  const onChangeLogic = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            logic: evt.target.value,
          };
        }
        return node;
      })
    );

    setOpen2(false);
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

  const [logic, setLogic] = React.useState();

  const handleChangeLogic = (event) => {
    setLogic(event.target.value);
  };

  const [code, setCode] = useState("");

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // String js code run

  const [data1, setData1] = useState([]);
  const {
    loading: flow_loading,
    error: flow_error,
    data: data_flow,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: { tableId: 536, tableColId: 0, tabRelId: "", userId: userId },
  });

  let processNameDic = [];
  let processTypeDic = [];
  let processLogicDic = [];
  let processFlowchartNameDic = [];
  let processFileDic = [];

  data_flow?.getTableDataRelIdInfo?.map((item, i) => {
    if (item.tableColId === 1) {
      processNameDic.push({
        process_name: item.columnData,
        id: item.tableRefId,
      });
    }
    if (item.tableColId === 2) {
      processTypeDic.push({
        process_type: item.columnData,
        id: item.tableRefId,
      });
    }
    if (item.tableColId === 3) {
      processLogicDic.push({
        process_logic: item.columnData,
        id: item.tableRefId,
      });
    }
    if (item.tableColId === 4) {
      processFlowchartNameDic.push({
        process_chart_name: item.columnData,
        id: item.tableRefId,
      });
    }
    if (item.tableColId === 5) {
      processFileDic.push({
        process_file: item.columnData,
        id: item.tableRefId,
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
      if (item4) {
        Object.assign(mergedObject, item5);
      }

      return mergedObject;
    });
  };

  // Call the function to get the merged array
  const allData = mergeArrays();

  let allFileName = [];
  var myLogic = "";
  var myFilter = "";

  processFileDic.map((item, i) => {
    if (item.process_file !== "no file") {
      allFileName.push(item.process_file);
    }
  });

  processLogicDic.map((item, i) => {
    if (item.process_logic !== "no logic") {
      myLogic = item.process_logic;
    }
  });

  processTypeDic.map((item, i) => {
    if (item.process_type !== "Max and Min Value") {
      myFilter = item.process_type;
      console.log();
    }
  });

  const mergeValue = [];
  const mergeValueFilter = [];

  const [sourceData, setSourceData] = useState([]);
  const [sourceFilter, setSourceFilter] = useState([]);

  const onSubmitData = () => {
    allFileName.map((item, i) => {
      const a = "a";

      const apiUrl =
        `${BaseURL}/media/upload_file/yahoo_finance_hist/` +
        item.toString();

      const intCode = new Function(a, myLogic);

      const codeResult = intCode(apiUrl);

      function initPromise() {
        return new Promise(function (res, rej) {
          res(codeResult);
        });
      }

      initPromise().then(function (result) {
        mergeValue.push(result);
        setSourceData(mergeValue);
      });
    });

    sourceData?.map((item, i) => {
      const intFilter = new Function("year", "dataset", myFilter);
      mergeValueFilter.push(intFilter(2023, item));
      setSourceFilter(mergeValueFilter);
    });
  };

  const dataKeyName = [];

  sourceData[0]?.data?.map((item) => {
    Object.keys(item).map((key) => {
      dataKeyName.push(key);
    });
  });

  const sourceDataKeyName = [...new Set(dataKeyName)];

  const [selectKey, setSelectKey] = useState("");
  const [selectOparator, setSelectOparator] = useState("");
  const [startsValue, setStartsValue] = useState("");
  const [equalValue, setEqualValue] = useState("");
  const [containsValue, setContainsValue] = useState("");
  const [lessthanValue, setLessthanValue] = useState("");
  const [greaterthanValue, setGreaterthanValue] = useState("");
  const [lessthanequalValue, setLessthanEqualValue] = useState("");
  const [greaterthanequalValue, setGreaterthanEqualValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log("selectKey", selectKey);
  console.log("nodes", Node);

  const onSubmitCondition = () => {
    if (selectOparator === "equal") {
      setFilterCondition("E");
      setFilterArg(equalValue);
    }
    if (selectOparator === "contains") {
      setFilterCondition("C");
      setFilterArg(containsValue);
    }
    if (selectOparator === "starts") {
      setFilterCondition("S");
      setFilterArg(startsValue);
    }
    if (selectOparator === "greater than") {
      setFilterCondition(">");
      setFilterArg(greaterthanValue);
    }
    if (selectOparator === "less than") {
      setFilterCondition("<");
      setFilterArg(lessthanValue);
    }
    if (selectOparator === "greater than equal") {
      setFilterCondition(">=");
      setFilterArg(greaterthanequalValue);
    }
    if (selectOparator === "less than equal") {
      setFilterCondition("<=");
      setFilterArg(lessthanequalValue);
    }
  };

  const saveFilterNodeData = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            filter: {
              sourceType: "filter data",
              sourceInfoType: "json data",
              filterKey: selectKey,
              filterCon: filterCondition,
              filterConValue: filterArg,
            },
          };
        }
        return node;
      })
    );
    toast.success("Filter Node Data Save Successfully.")
  };

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
            fontSize: "8px",
            display: "inline",
            color: "black",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {data.label}
        </Text>
        <Tooltip title="deleted" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <ModeEditOutlineOutlinedIcon
              sx={{
                fontSize: "12px",
                color: "black",
                fontSize: "7px",
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="deleted" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              deleteNode();
            }}
          >
            <DeleteOutlineIcon
              sx={{
                marginLeft: "-4px",
                marginTop: "1px",
                color: "black",
                fontSize: "7px",
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="setting" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpenType();
            }}
          >
            <SettingsOutlinedIcon
              sx={{
                marginLeft: "-4px",
                marginTop: "1px",
                color: "black",
                fontSize: "7px",
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="Filter" placement="top">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpen2();
              setFilterEditor(true);
              setLogicEditor(false);
              setChartDataShow(false);
            }}
          >
            <TerminalOutlinedIcon
              sx={{
                marginLeft: "-4px",
                marginTop: "1px",
                color: "black",
                fontSize: "7px",
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
            onClick={saveFilterNodeData}
            onChange={saveFilterNodeData}
            value={"demo"}
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
            {data.body}
          </Text>
          <Tooltip title="condition" placement="top">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpen1();
                onSubmitData();
              }}
            >
              <ModeEditOutlineOutlinedIcon
                sx={{
                  color: "black",
                  fontSize: "7px",
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
          <input
            type="text"
            name="price"
            id="price"
            className="block w-[200px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder=""
            onChange={(e) => setInput(e.target.value)}
            value={input}
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
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogContent>
          {/* <input onChange={(e) => setBody(e.target.value)} value={body} /> */}
          <Box sx={{ minWidth: 500, minHeight: 200 }}>
            <Box sx={{ minWidth: 200, marginTop: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel
                  sx={{ fontSize: "14px" }}
                  id="demo-simple-select-label"
                >
                  Key Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectKey}
                  label="key Name"
                  onChange={(e) => setSelectKey(e.target.value)}
                  size="small"
                  sx={{ fontSize: "14px" }}
                >
                  {joinAllData?.map((item, i) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "14px" }}
                        size="small"
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                  {/* {filterDataList?.map((item, i) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "14px" }}
                        size="small"
                        value={fileNameJoin[0]+'_'+item}
                      >
                        {fileNameJoin[0]+'_'+item}
                      </MenuItem>
                    );
                  })} */}
                </Select>
              </FormControl>
            </Box>
            {/* <Box sx={{ minWidth: 200, marginTop: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Oparator</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectKey}
                  label="key Name"
                  onChange={(e) => setSelectKey(e.target.value)}
                  size="small"
                >
                  <MenuItem size="small" value={"datafilter"}>
                    Data Filter
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Data Sort
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Unique Data
                  </MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            <Box sx={{ minWidth: 200, marginTop: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel
                  sx={{ fontSize: "14px" }}
                  id="demo-simple-select-label"
                >
                  Condition
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectOparator}
                  label="key Name"
                  onChange={(e) => setSelectOparator(e.target.value)}
                  size="small"
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"equal"}
                  >
                    Equal
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"contains"}
                  >
                    Contains
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"starts"}
                  >
                    Starts
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"greater than"}
                  >
                    greater than
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"less than"}
                  >
                    Less than
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"greater than equal"}
                  >
                    greater than equal
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"less than equal"}
                  >
                    less than equal
                  </MenuItem>
                  {/* <MenuItem size="small" value={"datafilter"}>
                    Three Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Four Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Five Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Six Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Seven Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Eight Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Nine Years
                  </MenuItem>
                  <MenuItem size="small" value={"datafilter"}>
                    Ten Years
                  </MenuItem> */}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200, marginTop: 2 }}>
              {selectOparator === "equal" && selectKey === "Date" ? (
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-full rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Date"
                  value={equalValue}
                  onChange={(e) => setEqualValue(e.target.value)}
                />
              ) : selectOparator === "equal" ? (
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Any equal value"
                  value={equalValue}
                  onChange={(e) => setEqualValue(e.target.value)}
                />
              ) : selectOparator === "contains" ? (
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Contains value"
                  value={containsValue}
                  onChange={(e) => setContainsValue(e.target.value)}
                />
              ) : selectOparator === "starts" ? (
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Start value"
                  value={startsValue}
                  onChange={(e) => setStartsValue(e.target.value)}
                />
              ) : selectOparator === "less than" && selectKey === "Date" ? (
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Less than value"
                  value={lessthanValue}
                  onChange={(e) => setLessthanValue(e.target.value)}
                />
              ) : selectOparator === "less than" ? (
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Less than value"
                  value={lessthanValue}
                  onChange={(e) => setLessthanValue(e.target.value)}
                />
              ) : selectOparator === "greater than" && selectKey === "Date" ? (
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                  placeholder="Date"
                  value={greaterthanValue}
                  onChange={(e) => setGreaterthanValue(e.target.value)}
                />
            ) : selectOparator === "greater than" ? (
              <input
                type="text"
                name="price"
                id="price"
                className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                placeholder="Greater than value"
                value={greaterthanValue}
                onChange={(e) => setGreaterthanValue(e.target.value)}
              />
            ) : selectOparator === "less than equal" && selectKey === "Date" ? (
              <input
                type="date"
                name="date"
                id="date"
                className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                placeholder="Less than equal value"
                value={lessthanequalValue}
                onChange={(e) => setLessthanEqualValue(e.target.value)}
              />
            ) : selectOparator === "less than equal" ? (
              <input
                type="text"
                name="price"
                id="price"
                className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                placeholder="Less than equal value"
                value={lessthanequalValue}
                onChange={(e) => setLessthanEqualValue(e.target.value)}
              />
            ) : selectOparator === "greater than equal" && selectKey === "Date" ? (
              <input
                type="date"
                name="date"
                id="date"
                className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                placeholder="Date"
                value={greaterthanequalValue}
                onChange={(e) => setGreaterthanEqualValue(e.target.value)}
              />
            ) : selectOparator === "greater than equal" ? (
              <input
                type="text"
                name="price"
                id="price"
                className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                placeholder="Greater than equal value"
                value={greaterthanequalValue}
                onChange={(e) => setGreaterthanEqualValue(e.target.value)}
              />
            ) : selectOparator === "between" ? (
                <Box>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-[200px] rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <Box sx={{ textAlign: "center" }}>to</Box>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mb-2"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Box>
              ) : (
                ""
              )}
              <Button
                variant="outlined"
                color="success"
                sx={{ textTransform: "capitalize", marginTop: 1 }}
                fullWidth
                size="small"
                onClick={onSubmitCondition}
              >
                Save
              </Button>
            </Box>
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
            value={"Filter One Year Data"}
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
          <Button onClick={handleClose1}>Cancle</Button>
          <Button
            onChange={onChangeList}
            onClick={onChangeList}
            value={"Filter One Year Data"}
            nodeId={id}
            autoFocus
          >
            submit
          </Button>
        </DialogActions> */}
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
                sx={{ fontSize: "14px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChangeType}
                size="small"
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
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"filter"}
                >
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
      </Dialog>
    </>
  );
}

export default memo(CustomNodeFilter);
