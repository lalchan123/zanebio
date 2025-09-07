import React, { useCallback, useContext, useEffect, useState } from "react";

import {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  Panel,
  NodeToolbar,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import axios from "axios";

import Box from "@mui/material/Box";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import "reactflow/dist/style.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RectangularCustomNode from "./RectangularCustomNode";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import styled from "styled-components";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoopIcon from "@mui/icons-material/Loop";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  NEW_TABLE_DATA_REF_QUERY,
  GET_ALL_TABLE_DATA_QUERY,
  TABLE_DATA_DETAIL,
} from "../../GraphQL/Queries.js";

import {
  TABLE_COLUMN_DATA_UPDATE,
  CREATE_CRUD_INFO_MUTATION,
  DELETED_TABLE_DATA_BY_REF_ID,
} from "../../GraphQL/Mutations.js";

import { AppContext } from "../../AppContext";
import useChartRunData from "../../UseContext/useChartRunData.js";
import useMutationRel from "../../GraphQLApiCall/useMutationRel.js";
import useLazyQueryRel from "../../GraphQLApiCall/useLazyQueryRel.js";
import GetQueryRel from "../../UseContext/GetQueryRel.js";
import useMutationUpdateRel from "../../GraphQLApiCall/useMutationUpdateRel.js";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef.js";
import useMutationRelWithInfo from "../../GraphQLApiCall/useMutationRelWithInfo.js";
import useDataFetch from "../../NewSchemaApiCall/useDataFetch.js";
import useDataSave from "../../NewSchemaApiCall/useDataSave.js";

const Text = styled.p`
  font-family: "Nunito Sans", sans-serif;
`;

const nodeTypes = {
  rectangular: RectangularCustomNode,
};

const defaultValue = `{"nodes":[],"edges":[],"viewport":{"x":386.08459106904024,"y":-247.06548077134772,"zoom":1.136029264786686}}`;

const flowKey = "server-flow";

const getNodeId = () => `${+new Date()}`.slice(-9);

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "#9ca8b3" },
  markerEnd: {
    type: "arrowclosed",
  },
};

const ServerFlowChart = () => {
  const {
    setChartDataShow,
    setFilterEditor,
    setSourceData,
    setLogicEditor,
    setAdminALert,
    setAlertStatus,
    setProcessAllShow,
    setProcessShow,
    processSaveAlert,
    setProcessSaveAlert,
    setPyShow,
    processFlow,
    setProcessFlow,
    BaseURL,
    setBaseURL,
  } = useContext(AppContext);

  const { source, selectChart, setSelectChart, setDataLog } = useChartRunData();

  const { setTableData, setTableId, setTableRel, setTableCol } =
    useMutationRel();

  const {
    setUpdateId,
    setUpdateData,
    setTableUpdateId,
    setTableUpdateRelId,
    setTableUpdateColId,
  } = useMutationUpdateRel();

  const {
    setTableDataWithInfo,
    setTableIdWithInfo,
    setTableRelWithInfo,
    setTableColWithInfo,
    mutationSuccessWithInfo,
    mutationErrorWithInfo,
    mutationLogWithInfo,
  } = useMutationRelWithInfo();

  const { setTableDeletedId, setTableDeletedRefId } =
    useMutationDeletedSetByRef();

  const { get_data, onDataFire } = useLazyQueryRel();

  const onOnClickTest = async () => {
    const userResp = await onDataFire({
      variables: {
        tableId: 541,
        tableColId: 0,
        tabRelId: "",
      },
      updateQuery() {},
    });
    console.log({ userResp });
  };

  let data_flow = GetQueryRel(541, 0, "");

  const {
    fetchData: newDataFetch,
    fetchLoading: error,
    fetchError: success,
  } = useDataFetch("700");

  const { dataSaveLog, dataSaveError, dataSaveSuccess, setSchemaTableData } =
    useDataSave();

  const jsonValue = JSON.stringify({
    id: "0001",
    type: "donut",
    name: "Cake",
    ppu: 0.55,
    batters: {
      batter: [
        {
          id: "1001",
          type: "Regular yest schlema",
        },
      ],
    },
  });

  let processNameDic = [];
  let processFlowDic = [];

  data_flow?.getTableDataRelIdInfo?.map((item, i) => {
    if (item.tableColId === 1) {
      processNameDic.push({
        process_name: item.columnData,
        id: item.tableRefId,
        nameRelId: item.tabRelId,
        nameDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 2) {
      processFlowDic.push({
        process_flow: item.columnData,
        id: item.tableRefId,
        flowRelId: item.tabRelId,
        flowDataId: item.tableDataId,
      });
    }
  });

  const mergeArrays = () => {
    return processNameDic.map((item1) => {
      const mergedObject = { ...item1 };
      const item2 = processFlowDic.find((item) => item.id === item1.id);
      if (item2) {
        Object.assign(mergedObject, item2);
      }
      return mergedObject;
    });
  };

  const serverFlowData = mergeArrays();

  console.log("201 serverFlowData", serverFlowData);

  const savedData = localStorage?.getItem("server-flow") || defaultValue;

  const jsonDataMy = JSON.parse(savedData);

  const initialNodes = jsonDataMy?.nodes;

  const initialEdges = jsonDataMy?.edges;

  const initialViewPort = jsonDataMy?.viewport;

  // const initialNodes = [];

  // const initialEdges = [];

  // const initialViewPort = [];

  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  // const { setViewport } = useReactFlow(visualViewport);
  const [flowchartName, setFlowchartName] = useState();
  const [flowId, setFlowId] = useState("215");
  const [processName, setProcessName] = useState(
    localStorage?.getItem("processName")
  );
  const [selectProcessName, setSelectProcessName] = useState("no_name");
  const [dataId, setDataId] = useState();
  const [nodeData, setNodeData] = useState();
  const [nodeSave, setNodeSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [serverProcessData, setServerProcessData] = useState([]);
  const [serverProcessFlowData, setServerProcessFlowData] = useState([]);

  const onProcessFlowSelectShow = () => {
    setNodes(serverProcessFlowData?.nodes);
    setEdges(serverProcessFlowData?.edges);
  };

  let flowChartData = [];
  let nameCheck = false;

  const handleClickOpen = () => {
    setOpen(true);
    serverFlowData.map((item, i) => {
      if (processName === item.process_name && nameCheck === false) {
        nameCheck = true;
        flowChartData.push({
          process_name: item.process_name,
          flowDataId: item.flowDataId,
          flowRelId: item.flowRelId,
          id: item.id,
          nameDataId: item.nameDataId,
          nameRelId: item.nameRelId,
          process_flow: item.process_flow,
        });
        setServerProcessData(flowChartData);
      }

      if (processName === null && nameCheck === false) {
        setServerProcessData(serverFlowData);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const {
  //   loading: process_name_loading,
  //   error: process_name_error,
  //   data: process_name,
  // } = useQuery(TABLE_DATA_DETAIL, {
  //   variables: { tableId: 542, tableColId: 0, tabRelId: "" },
  // });

  const process_name = GetQueryRel(542, 0, "");

  // const {
  //   loading: flowchart_name_loading,
  //   error: flowchart_name_error,
  //   data: flowchart_name,
  // } = useQuery(TABLE_DATA_DETAIL, {
  //   variables: { tableId: 536, tableColId: 4, tabRelId: "" },
  // });

  // const [createCrudInfo] = useMutation(CREATE_CRUD_INFO_MUTATION, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_DETAIL,
  //       variables: { tableId: 541, tableColId: 0, tabRelId: "" },
  //     },
  //     {
  //       query: TABLE_DATA_DETAIL,
  //       variables: { tableId: 542, tableColId: 0, tabRelId: "" },
  //     },
  //     {
  //       query: TABLE_DATA_DETAIL,
  //       variables: { tableId: 543, tableColId: 0, tabRelId: "" },
  //     },
  //     {
  //       query: GET_ALL_TABLE_DATA_QUERY,
  //       variables: { tableId: 542 },
  //     },
  //   ],
  // });

  // const [columnDataUpdate] = useMutation(TABLE_COLUMN_DATA_UPDATE, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_DETAIL,
  //       variables: { tableId: 541, tableColId: 0, tabRelId: "" },
  //     },
  //   ],
  // });

  // const [deleteTableRowWithTableRefId] = useMutation(
  //   DELETED_TABLE_DATA_BY_REF_ID,
  //   {
  //     refetchQueries: [
  //       {
  //         query: TABLE_DATA_DETAIL,
  //         variables: { tableId: 541, tableColId: 0, tabRelId: "" },
  //       },
  //     ],
  //   }
  // );

  serverFlowData?.map((item) => {
    if (item.id === flowId) {
      const value = JSON.parse(item.process_flow);
      localStorage.setItem(flowKey, JSON.stringify(value));
    }
  });

  const handleChange = (event) => {
    setFlowId(event.target.value);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,

            type: "smoothstep",
          },
          eds
        )
      ),
    []
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onDataSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      serverFlowData.map((item) => {
        if (item.id === flowId) {
          // columnDataUpdate({
          //   variables: {
          //     id: parseInt(item.flowDataId),
          //     columnData: JSON.stringify(flow),
          //   },
          // });

          setUpdateId(parseInt(item.flowDataId));
          setUpdateData(JSON.stringify(flow));
          setTableUpdateId(541);
          setTableUpdateRelId("");
          setTableUpdateColId(0);
        }
      });
    }
  };

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: {
        Process_Name: "node",
        Schedule: "",
        Start_Date: "",
        End_Date: "",
        Time: "",
        Process_Id: "",
        Process_Status: "unprocess",
        Process_Type: "",
        Process_Relation: "",
        Flowchart_Name: "",
        Process_Code: "",
        Function_Name: "",
      },
      type: "rectangular",
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addNewFlowChart = () => {
    const flowData = [
      {
        tableId: 541,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: flowchartName,
        columnName: "Process_Name",
        userId: "",
      },
      {
        tableId: 541,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: defaultValue,
        columnName: "Process_Flow",
        userId: "",
      },
    ];

    setTableData(flowData);
    setTableId(541);
    setTableCol(0);
    setTableRel("");
  };

  const handleRefresh = () => {
    window.location.reload(); // This will refresh the browser
    setOpen(false);
  };

  const changeColor = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "randomnode_1696355882797") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = {
            ...node.style,
            border: "3px solid #362FD9",
            borderRadius: "10px",
          };
        }

        return node;
      })
    );

    // setEdges((eds) =>
    //   eds.map((edge) => {
    //     if (
    //       edge.id ===
    //       "reactflow__edge-randomnode_1696336202946b-randomnode_1696336230115a"
    //     ) {
    //       edge.hidden = false;
    //     }

    //     return edge;
    //   })
    // );
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) {
      if (currentIndex < nodes.length) {
        const timeout = setTimeout(() => {
          // setDisplayedValue(jsonArray[currentIndex].value);
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === nodes[currentIndex].id) {
                // it's important that you create a new object here
                // in order to notify react flow about the change
                node.style = {
                  ...node.style,
                  border: "3px solid green",
                  borderRadius: "5px",
                };
              }

              return node;
            })
          );
          setCurrentIndex(currentIndex + 1);
        }, 1000);

        return () => clearTimeout(timeout);
      } else {
        setIsProcessing(false);
        setChartDataShow(true);
        setLogicEditor(false);
        setFilterEditor(false);
        setSourceData(source);
      }
    }
  }, [isProcessing, currentIndex, nodes]);

  const startProcessing = () => {
    setIsProcessing(true);
    setCurrentIndex(0);
    setDisplayedValue(null);
  };

  // const onCheckFlowChartName = () => {
  //   flowchart_name?.getTableDataRelIdInfo?.map((item, i) => {
  //     if (item.tableRefId === flowId) {
  //       setSelectChart(item.columnData);
  //     }
  //   });
  // };

  useEffect(() => {
    setTimeout(() => {
      setDataLog(selectChart);
    }, 1000);
  }, [selectChart]);

  const formatTime = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  const initialTime = new Date();
  const timeArray = [initialTime];

  var calculateTime = 0;

  let processJsonOneDic = [];
  let processJsonTwoDic = [];

  console.log("check data nodes 577", nodes);

  const onScheduleConfrimForSave = () => {
    let check = false;
    // let extraTime = 3;
    // setNodeSave(false);
    // process_name?.getTableDataRelIdInfo?.map((process) => {
    //   if (process.tableColId === 10) {
    //     if (process.columnData === processName && check === false) {
    //       setAdminALert(true);
    //       setAlertStatus("node_data_update_on_server");
    //       check = true;
    //       // deleteTableRowWithTableRefId({
    //       //   variables: {
    //       //     tableId: 542,
    //       //     tableRefId: parseInt(process.tableRefId),
    //       //   },
    //       // });
    //       // setTableDeletedId(542);
    //       // setTableDeletedRefId(parseInt(process.tableRefId));

    //       //     nodes.map((item, n) => {
    //       //       let scheduleValue = 0;
    //       //       let scheduleTime = 0;
    //       //       if (item.data.Schedule === "one hour") {
    //       //         scheduleValue = 24;
    //       //         scheduleTime = 60;
    //       //       } else if (item.data.Schedule === "half hour") {
    //       //         scheduleValue = 48;
    //       //         scheduleTime = 30;
    //       //       } else if (item.data.Schedule === "10 minutes") {
    //       //         scheduleValue = 144;
    //       //         scheduleTime = 10;
    //       //       } else if (item.data.Schedule === "1 minute") {
    //       //         scheduleValue = 1400;
    //       //         scheduleTime = 1;
    //       //       } else if (item.data.Schedule === "one day") {
    //       //         scheduleValue = 1;
    //       //         scheduleTime = 1;
    //       //       } else if (item.data.Schedule === "custom time") {
    //       //         scheduleValue = 1;
    //       //         scheduleTime = 1;
    //       //       }
    //       //       const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds *
    //       //       const dateStart = new Date(item.data.Start_Date);
    //       //       const dateEnd = new Date(item.data.End_Date);
    //       //       const start = dateStart.getTime();
    //       //       const end = dateEnd.getTime();
    //       //       const daysDifference = Math.round(Math.abs((end - start) / oneDay));

    //       //       const len = scheduleValue * daysDifference;
    //       //       const value = new Array(len).fill("null");

    //       //       for (let i = 1; i <= value.length; i++) {
    //       //         calculateTime += scheduleTime;
    //       //         const nextTime = new Date(item.data.Time);
    //       //         let myDate = new Date(
    //       //           nextTime.setMinutes(nextTime.getMinutes() + calculateTime)
    //       //         );

    //       //         let processTime = formatTime(new Date(myDate.setSeconds(0)));

    //       //         if (item.data.Schedule === "custom time") {
    //       //           item.data["Time"] =
    //       //             processTime.slice(0, 10) + " " + item.data.Time;
    //       //         } else {
    //       //           item.data["Time"] = processTime;
    //       //         }

    //       //         item.data["Process_Id"] = parseInt(item.id) + i;

    //       //         let dataId = item.data.Process_Id;

    //       //         edges.map((item2, j) => {
    //       //           if (item.id === item2.target) {
    //       //             item.data["Process_Relation"] = item2.source;
    //       //           }
    //       //         });

    //       //         Object.entries(item.data).map(([key, value], index) => {
    //       //           processJsonOneDic.push({
    //       //             tableId: 542,
    //       //             tableColId: index + 1,
    //       //             tabRelId: "",
    //       //             tableRefId: dataId,
    //       //             columnData: value,
    //       //             columnName: key,
    //       //             userId: "",
    //       //           });
    //       //         });
    //       //         setTableData(processJsonOneDic);
    //       //       }
    //       //     });
    //     }
    //   }
    // });

    if (check === false) {
      // setAdminALert(true);
      // setAlertStatus("node_data_save_on_server");
      nodes.map((item, n) => {
        // let scheduleValue = 0;
        // let scheduleTime = 0;
        // if (item.data.Schedule === "one hour") {
        //   scheduleValue = 24;
        //   scheduleTime = 60;
        // } else if (item.data.Schedule === "half hour") {
        //   scheduleValue = 48;
        //   scheduleTime = 30;
        // } else if (item.data.Schedule === "10 minutes") {
        //   scheduleValue = 144;
        //   scheduleTime = 10;
        // } else if (item.data.Schedule === "5 minutes") {
        //   scheduleValue = 288;
        //   scheduleTime = 5;
        // } else if (item.data.Schedule === "2 minutes") {
        //   scheduleValue = 720;
        //   scheduleTime = 2;
        // } else if (item.data.Schedule === "1 minute") {
        //   scheduleValue = 1440;
        //   scheduleTime = 1;
        // } else if (item.data.Schedule === "one day") {
        //   scheduleValue = 1;
        //   scheduleTime = 1440;
        // } else if (item.data.Schedule === "now") {
        //   scheduleValue = 1;
        //   scheduleTime = 1;
        // } else if (item.data.Schedule === "custom time") {
        //   scheduleValue = 1;
        //   scheduleTime = 1;
        // }

        // const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds *
        // const dateStart = new Date(item.data.Start_Date);
        // const dateEnd = new Date(item.data.End_Date);
        // const start = dateStart.getTime();
        // const end = dateEnd.getTime();

        console.log("701 item", item);
        console.log("701 item", item.data);

        const apidata = {
          Process_Name: "TestProcess26",
          Schedule: "2 minutes",
          Start_Date: "2024-04-26",
          End_Date: "2024-04-27",
          Time: "2024-04-26 19:44:00",
          Process_Id: "81369393026",
          Process_Status: "unprocess",
          Process_Type: "pythonscript",
          Process_Relation: "Parent",
          Flowchart_Name: "TestProcess26",
          Process_Code: "Custom.py",
          Function_Name: "pythonscript",
          Server_Name: "Server2",
        };

        axios
          .post(BaseURL + "/account/server-process-api/", item.data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // setRestApiPostData(response.data.data);
            console.log("check response 716", response);
            setAdminALert(true);
            setAlertStatus(response.data.message);
            setNodeSave(false);
          })
          .catch((error) => {
            console.log("check data error 67", error.message);
            setNodeSave(false);
          });

        // console.log("702 dateStart, dateEnd", dateStart, dateEnd)
        // const daysDifference = Math.round(Math.abs((end - start) / oneDay));

        // let len;

        // if (
        //   item.data.Schedule === "now" ||
        //   item.data.Schedule === "custom time"
        // ) {
        //   len = 1;
        // } else {
        //   len = scheduleValue * daysDifference + 1;
        // }

        // const value = new Array(len).fill("null");

        // for (let i = 1; i <= value.length; i++) {
        //   if (i === 1) {
        //     calculateTime = scheduleTime + extraTime;
        //   } else {
        //     calculateTime = scheduleTime;
        //   }

        //   // const nextTime = utcToZonedTime(new Date(), "Africa/Monrovia");
        //   const nextTime = new Date(item.data.Time);

        //   let myDate = new Date(
        //     nextTime.setMinutes(nextTime.getMinutes() + calculateTime)
        //   );

        //   let processTime = formatTime(new Date(myDate.setSeconds(0)));

        //   if (item.data.Schedule === "custom time") {
        //     item.data["Time"] = processTime.slice(0, 10) + " " + item.data.Time;
        //   } else {
        //     item.data["Time"] = processTime;
        //   }

        //   item.data["Process_Id"] = parseInt(item.id) + i;

        //   let dataId = item.data.Process_Id;

        //   edges.map((item2, j) => {
        //     if (item.id === item2.target) {
        //       item.data["Process_Relation"] = item2.source;
        //     }
        //   });

        //   Object.entries(item.data).map(([key, value], index) => {
        //     processJsonOneDic.push({
        //       tableId: 542,
        //       tableColId: index + 1,
        //       tabRelId: "",
        //       tableRefId: dataId,
        //       columnData: value,
        //       columnName: key,
        //       userId: "",
        //     });
        //   });
        //   setTableDataWithInfo(processJsonOneDic);
        // }
      });
      setNodeSave(false);
    }
  };

  useEffect(() => {
    if (
      mutationLogWithInfo?.createMultipleDynamicTableData?.mutation === true
    ) {
      setProcessSaveAlert(true);
    }
  }, [mutationLogWithInfo?.createMultipleDynamicTableData?.mutation]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        fitView
        // style={{ background: "#040531" }}
        onInit={setRfInstance}
        // connectionLineComponent={ConnectionLine}
        onConnect={onConnect}
      >
        <Panel position="top-left">
          <Box sx={{ display: "inline" }}>
            {/* <Button
        size="small"
        variant="outlined"
        color="success"
        onClick={onSaveJsonDataTest}
        sx={{
          display: "inline",
          marginRight: 1,
          padding: 0,
          textTransform: "capitalize",
        }}
      >
        Test Data
      </Button> */}
            <Tooltip title="Add" placement="bottom">
              <IconButton
                sx={{ marginLeft: "-6.5px", marginTop: "2px" }}
                aria-label="delete"
                size="small"
                onClick={onAdd}
              >
                <AddOutlinedIcon
                  size="small"
                  sx={{ fontSize: "18px", color: "green" }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Save" placement="top">
              <IconButton
                sx={{ marginLeft: "-6.5px", marginTop: "2px", color: "green" }}
                aria-label="delete"
                size="small"
                onClick={() => {
                  handleClickOpen();
                  onOnClickTest();
                }}
              >
                <ArrowForwardOutlinedIcon
                  size="small"
                  sx={{
                    fontSize: "18px",
                    color: "black",
                    "&:hover": {
                      color: "green",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="All Logs" placement="bottom">
              <IconButton
                sx={{ marginLeft: "-6.5px", marginTop: "2px" }}
                aria-label="delete"
                size="small"
                onClick={() => {
                  setProcessAllShow(true);
                  setProcessShow(false);
                  setPyShow(false);
                }}
              >
                <LoopIcon
                  sx={{
                    fontSize: "16px",
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
          <Dialog
            maxWidth="lg"
            open={processSaveAlert}
            onClose={() => setProcessSaveAlert(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ color: "green", fontSize: "16px" }}
            >
              {"You are successfully create new job task"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p className="text-sm">
                  Job Name: {nodes[0]?.data?.Process_Name}
                </p>
                <p className="text-sm">
                  Start Date: {nodes[0]?.data?.Start_Date}
                </p>
                <p className="text-sm">End Date: {nodes[0]?.data?.End_Date}</p>
                <p className="text-sm">
                  Server Name: {nodes[0]?.data?.Server_Name}
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setProcessSaveAlert(false)}
                sx={{
                  textTransform: "capitalize",
                  color: "green",
                  fontSize: "14px",
                  fontWeight: 300,
                }}
              >
                Cancle
              </Button>
              <Button
                onClick={() => setProcessSaveAlert(false)}
                autoFocus
                sx={{
                  textTransform: "capitalize",
                  color: "green",
                  fontSize: "14px",
                  fontWeight: 300,
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={nodeSave}
            onClose={() => setNodeSave(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ color: "red" }}>
              {"Are you sure?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to save your job task data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setNodeSave(false)}
                sx={{
                  textTransform: "capitalize",
                  color: "green",
                  fontSize: "14px",
                  fontWeight: 300,
                }}
              >
                Cancle
              </Button>
              <Button
                onClick={onScheduleConfrimForSave}
                autoFocus
                sx={{
                  textTransform: "capitalize",
                  color: "green",
                  fontSize: "14px",
                  fontWeight: 300,
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <FormControl
                sx={{ width: 250, marginRight: 1, marginTop: 2 }}
                variant="outlined"
                size="small"
              >
                <OutlinedInput
                  sx={{
                    height: 32,
                    fontFamily: "Nunito Sans",
                    textTransform: "capitalize",
                  }}
                  id="outlined-adornment-password"
                  type="text"
                  size="small"
                  placeholder="Add New Flowchart"
                  value={flowchartName}
                  onChange={(e) => setFlowchartName(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        // variant="contained"
                        onClick={addNewFlowChart}
                        sx={{ textTransform: "capitalize" }}
                        size="small"
                      >
                        <ArrowForwardOutlinedIcon size="small" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{ width: 250, display: "block", marginTop: 3 }}
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                <FormControl fullWidth size="small" sx={{ height: 32 }}>
                  <InputLabel id="demo-simple-select-label">
                    Flowchart List
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={flowId}
                    label="Flowchart List"
                    onChange={handleChange}
                    size="small"
                    sx={{
                      height: 32,
                      fontFamily: "Nunito Sans",
                      textTransform: "capitalize",
                    }}
                  >
                    {serverFlowData?.map((item, i) => {
                      return (
                        <MenuItem
                          size="small"
                          value={item.id}
                          sx={{
                            fontSize: "14px",
                            fontFamily: "Nunito Sans",
                            color:
                              processFlow === item.process_name ? "green" : "",
                          }}
                          onClick={(e) => {
                            setProcessFlow(item.process_name);
                            setServerProcessFlowData(
                              JSON.parse(item.process_flow)
                            );
                          }}
                        >
                          {item.process_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  onProcessFlowSelectShow();
                  handleClose();
                }}
                sx={{ fontFamily: "Nunito Sans", textTransform: "capitalize" }}
                color="success"
              >
                Show
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  onSave();
                  onDataSave();
                  setNodeSave(true);
                  // onScheduleDataSave();
                  handleClose();
                }}
                sx={{ fontFamily: "Nunito Sans", textTransform: "capitalize" }}
                color="success"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Panel>
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default ServerFlowChart;
