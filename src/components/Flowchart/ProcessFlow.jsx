import react, { useCallback, useState, useContext, useEffect } from "react";

import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  useStoreApi,
  ReactFlowProvider,
} from "@xyflow/react";
import Tooltip from "@mui/material/Tooltip";
import "@xyflow/react/dist/style.css";

import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContainterCustomNode from "./CustomNode/ContainterCustomNode.jsx";
import CustomNodeFIleUpload from "./CustomNode/CustomNodeFIleUpload.jsx";
import CustomLogicNode from "./CustomNode/CustomLogicNode.jsx";
import CustomNodeFilter from "./CustomNode/CustomNodeFilter.jsx";
import CustomFormNode from "./CustomNode/CustomFormNode.jsx";
import CustomFormMenuNode from "./CustomNode/CustomFormMenuNode.jsx";
import CustomNodeAction from "./CustomNode/CustomNodeAction.jsx";
import CustomNodeSQLRun from "./CustomNode/CustomNodeSQLRun.jsx";
import CustomSubFlowNode from "./CustomNode/CustomSubFlowNode.jsx";
import CustomSourceNode from "./CustomNode/CustomSourceNode.jsx";
import CustomFormulaNode from "./CustomNode/CustomFormulaNode.jsx";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import styled from "styled-components";
import Button from "@mui/material/Button";
import "./style.css";
import axios from "axios";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TABLE_DATA_DETAIL } from "../../GraphQL/Queries.js";

import {
  TABLE_COLUMN_DATA_UPDATE,
  CREATE_CRUD_INFO_MUTATION,
} from "../../GraphQL/Mutations.js";
import { AppContext } from "../../AppContext.jsx";
import useChartRunData from "../../UseContext/useChartRunData.js";
import useMutationJsonData from "../../GraphQLApiCall/useMutationJsonData.js";
import useLazyQueryDynamic from "../../GraphQLApiCall/useLazyQueryDynamic.js";
import useLazyQueryRel from "../../GraphQLApiCall/useLazyQueryRel.js";
import GetQueryRel from "../../UseContext/GetQueryRel.js";
import useMutationDeletedRel from "../../GraphQLApiCall/useMutationDeletedRel.js";
import useMutationRel from "../../GraphQLApiCall/useMutationRel.js";
import useMutationUpdateRel from "../../GraphQLApiCall/useMutationUpdateRel.js";
import CustomNodeJoin from "./CustomNode/CustomNodeJoin.jsx";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData.js";

// import JsonData from "../media/nodeSetup.json";

const Text = styled.p`
  font-family: "Nunito Sans", sans-serif;
`;

const rfStyle = {};

const nodeTypes = {
  container: ContainterCustomNode,
  fileupload: CustomNodeFIleUpload,
  logic: CustomLogicNode,
  filter: CustomNodeFilter,
  form: CustomFormNode,
  action: CustomNodeAction,
  sqldata: CustomNodeSQLRun,
  subflow: CustomSubFlowNode,
  source: CustomSourceNode,
  menu: CustomFormMenuNode,
  formula: CustomFormulaNode,
  join: CustomNodeJoin,
};

const defaultValue = `{"nodes":[],"edges":[],"viewport":{"x":386.08459106904024,"y":-247.06548077134772,"zoom":1.136029264786686}}`;

const flowKey = "example-flow";

// const getNodeId = () => `randomnode_${+new Date()}`;
const getNodeId = () => `${+new Date()}`;

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "#9ca8b3" },
  markerEnd: {
    type: "arrowclosed",
  },
};

function ProcessFlow() {
  // Card Data Show Detials
  const {
    chartDataShow,
    setChartDataShow,
    filterEditor,
    setFilterEditor,
    setSourceData,
    logicEditor,
    setLogicEditor,
    filterCode,
    setFilterCode,
    logicCode,
    setLogicCode,
    cardTemplated,
    setCardTemplated,
    filterCondition,
    setFilterCondition,
    filterArg,
    setFilterArg,
    cardItems,
    setCardItems,
    sqlData,
    setSqlData,
    sqlShow,
    itemShow,
    menuShow,
    setMenuShow,
    menuItems,
    setMenuItems,
    formulaTestShow,
    setFormulaTestShow,
    processFlow,
    setProcessFlow,
    ProcessFlowDataShowBool,
    setProcessFlowDataShowBool,
    userId,
    setUserId
  } = useContext(AppContext);

  // Api

  const {
    source,
    sourceData,
    selectChart,
    setSelectChart,
    allChartData,
    setDataLog,
  } = useChartRunData();

  const {
    setTableDataJson,
    setTableIdJson,
    setTableRelJson,
    setTableColJson,
    setTableNameJson,
    setUserDataJsonId,
    setDataJsonDb,
  } = useMutationJsonData();

  const {
    setDeletedId,
    setTableDeletedId,
    setTableDeletedRelId,
    setTableDeletedColId,
    setUserDeletedId,
  } = useMutationDeletedRel();

  const {
    setUpdateId,
    setUpdateData,
    setTableUpdateId,
    setTableUpdateRelId,
    setTableUpdateColId,
    setUserUpdateId,
    setUpdateDb,
  } = useMutationUpdateRel();

  const { setTableData, setTableId, setTableRel, setTableCol, setUserDataId } =
    useMutationRel();

  const process_flow = GetQueryRel(544, 1, "", userId);

  const data_flow = GetQueryRel(471, 0, "", userId);

  
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


  let flowNameDic = [];
  let FlowDic = [];

  console.log("187 processFlow", processFlow)
  console.log("187 ProcessFlowDataShowBool", ProcessFlowDataShowBool)

  data_flow?.getTableDataRelIdInfo?.map((item, i) => {
    if (item.tableColId === 1) {
      flowNameDic.push({
        flow_name: item.columnData,
        id: item.tableRefId,
        nameRelId: item.tabRelId,
        nameDataId: item.tableDataId,
      });
    }
    if (item.tableColId === 2) {
      FlowDic.push({
        flow_data: item.columnData,
        id: item.tableRefId,
        flowRelId: item.tabRelId,
        flowDataId: item.tableDataId,
      });
    }
  });

  const mergeArrays = () => {
    return flowNameDic.map((item1) => {
      const mergedObject = { ...item1 };

      const item2 = FlowDic.find((item) => item.id === item1.id);
      if (item2) {
        Object.assign(mergedObject, item2);
      }
      return mergedObject;
    });
  };

  const allFlowData = mergeArrays();

  const checkLogicAndFilterData = () => {
    // processFileDic.map((item, i) => {
    //   if (item.process_file !== "no filter") {
    //     setFilterCode(item.process_filter);
    //   }
    // });
    // processLogicDic.map((item, i) => {
    //   if (item.process_logic !== "no logic") {
    //     setCodeLogicInfo(item.process_logic);
    //   }
    // });
  };

  const savedData = localStorage?.getItem("example-flow");

  // const jsonDataMy = JSON.parse(savedData);

  const jsonDataMy = JSON.parse(savedData);

  const initialNodes = jsonDataMy?.nodes;

  const initialEdges = jsonDataMy?.edges;

  const initialViewPort = jsonDataMy?.viewport;

  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  // const { setViewport } = useReactFlow(visualViewport);
  const [flowchartName, setFlowchartName] = useState();
  const [namelist, setNamelist] = useState("215");
  const [dataId, setDataId] = useState();
  const [nodeData, setNodeData] = useState();
  const [flowName, setFlowName] = useState(localStorage?.getItem("flowName"));
  const [checkItem, setCheckItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [serverFlowData, setServerFlowData] = useState([]);

  const onSelectFlowDataShow = () => {
    setNodes(serverFlowData?.nodes);
    setEdges(serverFlowData?.edges);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNamelist(event.target.value);
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

  useEffect(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [itemShow]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  useEffect(() => {
    onSave();
  }, [itemShow]);

  const onDataSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      allFlowData?.map((item) => {
        if (item.id === namelist) {
          setUpdateId(parseInt(item.flowDataId));
          setUpdateData(JSON.stringify(flow));
          setTableUpdateId(471);
          setTableUpdateRelId("");
          setTableUpdateColId(0);
          setUserUpdateId(userId);
          setUpdateDb(parseInt(db));
        }
      });
      setOpen(false);
    }
    toast.success("Data Save Successfully.")
  };

  useEffect(() => {
    setTimeout(() => {
      setCheckItem(true);
    }, 20000);
  }, [itemShow]);

  useEffect(() => {
    process_flow?.getTableDataRelIdInfo?.map((item1, i) => {
      let checkData = JSON.parse(item1.columnData);
      if (checkData.flowchart_name === flowName) {
        setFilterCode(checkData.process_filter);
        setLogicCode(checkData.process_logic);
        setFilterCondition(checkData.process_filter_con);
        setFilterArg(checkData.process_filter_value);
        setCardItems(
          JSON.parse(checkData.process_card_item || `[{"demo": "demo"}]`)
        );
        setMenuItems(
          JSON.parse(checkData.process_menu_item || `[{"demo": "demo"}]`)
        );
        setSqlData(checkData.process_sql);
      }
    });
  }, [
    filterEditor,
    sqlShow,
    logicEditor,
    itemShow,
    flowName,
    checkItem,
    menuShow,
  ]);

  let jsonMutationData = 0;

  let payDataDic = [];

  const onPlayButtonFire = () => {
    nodes?.map((item, i) => {
      if (
        item?.type === "container" &&
        item?.data?.container?.processType === "formtable"
      ) {
        setFormulaTestShow(true);
      }
    });
  };

  const AllFlowChartDataSelect = (item) => {
    setServerFlowData(JSON.parse(item.flow_data));
    setProcessFlow(item.flow_name);
    setProcessFlowDataShowBool(true);
  }

  const onMutationLogicSave = () => {
    let check = false;
    process_flow?.getTableDataRelIdInfo?.map((item, i) => {
      let columnData = JSON.parse(item.columnData);
      if (columnData.flowchart_name === flowName && check === false) {
        check = true;
        setDeletedId(parseInt(item.tableDataId));
        setTableDeletedId(544);
        setTableDeletedRelId("");
        setTableDeletedColId(1);
        setUserDeletedId(userId);
        nodes?.map((item, i) => {
          if (
            item?.type === "container" &&
            item?.data?.container?.processType === "formtable"
          ) {
            let container = item?.data?.container?.processType;
            let formDesign = "";
            let action = "";
            let tableId = "";
            let formula = "";
            let join = "";
            nodes?.map((value, i) => {
              if (value?.type === "form") {
                formDesign = value?.data?.form?.formDesign;
              } else if (value?.type === "action") {
                action = value?.data?.action?.action;
              } else if (value?.type === "source") {
                tableId = value?.data?.source?.tableId;
              } else if (value?.type === "formula") {
                console.log("value", value)
                formula = value?.data?.formula?.formula;
                console.log("formula", formula)
              } else if (value?.type === "join") {
                console.log("value", value)
                join = value?.data?.join?.join;
                console.log("join", join)
              }
            });
            payDataDic.push({
              user_id: "123456789",
              flowchart_name: flowName,
              process_name: container,
              formDesign: formDesign,
              action: action,
              tableId: tableId,
              formula: formula,
              join: join,
            });

            setTableDataJson(payDataDic);
            setTableIdJson(544);
            setTableRelJson("");
            setTableColJson(1);
            setTableNameJson("Process_Data");
            setUserDataJsonId(userId);
            setDataJsonDb(parseInt(db));
            payDataDic = [];
          } else if (
            item?.type === "container" &&
            item?.data?.container?.processType === "menucard"
          ) {
            let container = item?.data?.container?.processType;
            let menuDesign = "";
            nodes?.map((value, i) => {
              if (value?.type === "menu") {
                menuDesign = value?.data?.menu?.menuDesign;
              }
            });
            payDataDic.push({
              user_id: "123456789",
              process_name: container,
              flowchart_name: flowName,
              process_menu_item: JSON.stringify(menuDesign),
            });
            setTableDataJson(payDataDic);
            setTableIdJson(544);
            setTableRelJson("");
            setTableColJson(1);
            setTableNameJson("Process_Data");
            setUserDataJsonId(userId);
            setDataJsonDb(parseInt(db));
            payDataDic = [];
          } else if (
            item?.type === "container" &&
            item?.data?.container?.processType === "tabledata"
          ) {
            let container = item?.data?.container?.processType;
            let process_source_type = "";
            let process_source_id = "";
            nodes?.map((value, i) => {
              if (value?.type === "source") {
                process_source_type = value?.data?.source?.sourceType;
                process_source_id = value?.data?.source?.tableId;
              }
            });
            payDataDic.push({
              user_id: "123456789",
              process_name: container,
              flowchart_name: flowName,
              process_source_type: process_source_type,
              process_source_id: process_source_id,
            });
            setTableDataJson(payDataDic);
            setTableIdJson(544);
            setTableRelJson("");
            setTableColJson(1);
            setTableNameJson("Process_Data");
            setUserDataJsonId(userId);
            setDataJsonDb(parseInt(db));
            payDataDic = [];
          } else if (
            item?.type === "container" &&
            item?.data?.container?.processType === "linebarchart"
          ) {
            let container = item?.data?.container?.processType;
            let process_logic = "";
            let process_filter = "";
            let process_filename = "";
            let process_filter_con = "";
            let process_filter_value = "";
            nodes?.map((value, i) => {
              if (value?.type === "logic") {
                process_logic = value?.data?.logic?.logic;
              } else if (value?.type === "filter") {
                process_filter_value = value?.data?.filter?.fitler_con_value;
                process_filter = value?.data?.filter?.filter;
                process_filter_con = value?.data?.filter?.filter_con;
              } else if (value?.type === "fileupload") {
                process_filename = value?.data?.filename?.filename;
              }
            });
            payDataDic.push({
              user_id: "123456789",
              process_name: container,
              process_logic: process_logic,
              process_filter: process_filter,
              flowchart_name: flowName,
              process_filename: process_filename,
              process_filter_con: process_filter_con,
              process_filter_value: process_filter_value,
            });
            setTableDataJson(payDataDic);
            setTableIdJson(544);
            setTableRelJson("");
            setTableColJson(1);
            setTableNameJson("Process_Data");
            setUserDataJsonId(userId);
            setDataJsonDb(parseInt(db));
            payDataDic = [];
          } else if (
            item?.type === "container" &&
            item?.data?.container?.processType === "sqlquery"
          ) {
            let container = item?.data?.container?.processType;
            let process_sql = "";
            nodes?.map((value, i) => {
              if (value?.type === "sqldata") {
                process_sql = value?.data?.sqlquery?.sqlquery;
              }
            });
            payDataDic.push({
              user_id: "123456789",
              flowchart_name: flowName,
              process_name: container,
              process_sql: process_sql,
            });
            setTableDataJson(payDataDic);
            setTableIdJson(544);
            setTableRelJson("");
            setTableColJson(1);
            setTableNameJson("Process_Data");
            setUserDataJsonId(userId);
            setDataJsonDb(parseInt(db));
            payDataDic = [];
          } else if (
            item?.type === "container" &&
            item?.data?.container?.processType === "custom"
          ) {
            // payDataDic["process_name"] = item?.data?.container?.processType;
            let payDataDic = [];
            nodes?.map((value, i) => {
              if (
                value?.type === "container" ||
                value?.type === "sqldata" ||
                value?.type === "logic" ||
                value?.type === "file" ||
                value?.type === "formula" ||
                value?.type === "containe" ||
                value?.type === "source" ||
                value?.type === "form" ||
                value?.type === "action" ||
                value?.type === "menu" ||
                value?.type === "filename" ||
                value?.type === "filter"
              ) {
                payDataDic.push({
                  step: parseInt(i + 1),
                  [value?.type]: value?.data?.[value?.type],
                });
              }
            });
            console.log("check 732 update", payDataDic);
            setTableDataJson(payDataDic);
            setTableIdJson(544);
            setTableRelJson("");
            setTableColJson(1);
            setTableNameJson("Process_Data");
            setUserDataJsonId(userId);
            setDataJsonDb(parseInt(db));
            // payDataDic = [];
          }
        });
      }
    });
    if (check === false) {
      check = true;
      nodes?.map((item, i) => {
        if (
          item?.type === "container" &&
          item?.data?.container?.processType === "formtable"
        ) {
          let container = item?.data?.container?.processType;
          let formDesign = "";
          let action = "";
          let tableId = "";
          let formula = "";
          let join = "";
          nodes?.map((value, i) => {
            if (value?.type === "form") {
              formDesign = value?.data?.form?.formDesign;
            } else if (value?.type === "action") {
              action = value?.data?.action?.action;
            } else if (value?.type === "source") {
              tableId = value?.data?.source?.tableId;
            } else if (value?.type === "formula") {
              formula = value?.data?.formula?.formula;
            } else if (value?.type === "join") {
              join = value?.data?.join?.join;
            }
          });
          payDataDic.push({
            user_id: "123456789",
            flowchart_name: flowName,
            process_name: container,
            formDesign: formDesign,
            action: action,
            tableId: tableId,
            formula: formula,
            join: join,
          });
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          payDataDic = [];
        } else if (
          item?.type === "container" &&
          item?.data?.container?.processType === "menucard"
        ) {
          let container = item?.data?.container?.processType;
          let menuDesign = "";
          nodes?.map((value, i) => {
            if (value?.type === "menu") {
              menuDesign = value?.data?.menu?.menuDesign;
            }
          });
          payDataDic.push({
            user_id: "123456789",
            process_name: container,
            flowchart_name: flowName,
            process_menu_item: JSON.stringify(menuDesign),
          });
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          payDataDic = [];
        } else if (
          item?.type === "container" &&
          item?.data?.container?.processType === "tabeldata"
        ) {
          let container = item?.data?.container?.processType;
          let process_logic = "";
          let process_filter = "";
          let process_filename = "";
          let process_filter_con = "";
          let process_filter_value = "";
          nodes?.map((value, i) => {
            if (value?.type === "logic") {
              process_logic = value?.data?.logic?.logic;
            } else if (value?.type === "filter") {
              process_filter = value?.data?.filter?.filter;
              process_filter_con = value?.data?.filter?.filter_con;
              process_filter_value = value?.data?.filter?.filter_con_value;
            } else if (value?.type === "fileupload") {
              process_filename = value?.data?.filename?.filelist;
            }
          });
          payDataDic.push({
            user_id: "123456789",
            process_name: container,
            process_logic: process_logic,
            process_filter: process_filter,
            flowchart_name: flowName,
            process_filename: process_filename,
            process_filter_con: process_filter_con,
            process_filter_value: process_filter_value,
          });
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          payDataDic = [];
        } else if (
          item?.type === "container" &&
          item?.data?.container?.processType === "linebarchart"
        ) {
          let container = item?.data?.container?.processType;
          let process_logic = "";
          let process_filter = "";
          let process_filename = "";
          let process_filter_con = "";
          let process_filter_value = "";
          nodes?.map((value, i) => {
            if (value?.type === "logic") {
              process_logic = value?.data?.logic?.logic;
            } else if (value?.type === "filter") {
              process_filter_value = value?.data?.filter?.fitler_con_value;
              process_filter = value?.data?.filter?.filter;
              process_filter_con = value?.data?.filter?.filter_con;
            } else if (value?.type === "fileupload") {
              process_filename = value?.data?.filename?.filename;
            }
          });
          payDataDic.push({
            user_id: "123456789",
            process_name: container,
            process_logic: process_logic,
            process_filter: process_filter,
            flowchart_name: flowName,
            process_filename: process_filename,
            process_filter_con: process_filter_con,
            process_filter_value: process_filter_value,
          });
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          payDataDic = [];
        } else if (
          item?.type === "container" &&
          item?.data?.container?.processType === "sqlquery"
        ) {
          let container = item?.data?.container?.processType;
          let process_sql = "";
          nodes?.map((value, i) => {
            if (value?.type === "sqldata") {
              process_sql = value?.data?.sqlquery?.sqlquery;
            }
          });
          payDataDic.push({
            user_id: "123456789",
            flowchart_name: flowName,
            process_name: container,
            process_sql: process_sql,
          });
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          payDataDic = [];
        } else if (
          item?.type === "container" &&
          item?.data?.container?.processType === "sqlquery"
        ) {
          let container = item?.data?.container?.processType;
          let process_sql = "";
          nodes?.map((value, i) => {
            if (value?.type === "sqldata") {
              process_sql = value?.data?.sqlquery?.sqlquery;
            }
          });
          payDataDic.push({
            user_id: "123456789",
            flowchart_name: flowName,
            process_name: container,
            process_sql: process_sql,
          });
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          payDataDic = [];
        }

        if (
          item?.type === "container" &&
          item?.data?.container?.processType === "custom"
        ) {
          // payDataDic["process_name"] = item?.data?.container?.processType;
          let payDataDic = [
            {
              flowchart_name: flowName,
              process_name: item?.data?.container?.processType,
            },
          ];
          nodes?.map((value, i) => {
            if (
              value?.type === "container" ||
              value?.type === "sqldata" ||
              value?.type === "logic" ||
              value?.type === "file" ||
              value?.type === "formula" ||
              value?.type === "containe" ||
              value?.type === "source" ||
              value?.type === "form" ||
              value?.type === "action" ||
              value?.type === "menu" ||
              value?.type === "filename" ||
              value?.type === "filter" ||
              value?.type === "join" 
            ) {
              payDataDic.push({
                step: parseInt(i + 1),
                [value?.type]: value?.data?.[value?.type],
              });
            }
          });
          console.log("check 732 save", payDataDic);
          setTableDataJson(payDataDic);
          setTableIdJson(544);
          setTableRelJson("");
          setTableColJson(1);
          setTableNameJson("Process_Data");
          setUserDataJsonId(userId);
          setDataJsonDb(parseInt(db));
          // payDataDic = [];
        }
      });
    }
  };

  const onClickCheckValue = () => {
    nodes?.map((item, i) => {
      if (
        item?.type === "container" &&
        item?.data?.container?.processType === "custom"
      ) {
        // payDataDic["process_name"] = item?.data?.container?.processType;
        let payDataDic = [];
        nodes?.map((value, i) => {
          if (
            value?.type === "container" ||
            value?.type === "sqldata" ||
            value?.type === "logic" ||
            value?.type === "file" ||
            value?.type === "formula" ||
            value?.type === "containe" ||
            value?.type === "source" ||
            value?.type === "form" ||
            value?.type === "action" ||
            value?.type === "menu" ||
            value?.type === "filename" ||
            value?.type === "filter" ||
            value?.type === "join" 
          ) {
            payDataDic.push({
              step: parseInt(i + 1),
              [value?.type]: value?.data?.[value?.type],
            });
          }
        });
        console.log("check 732", payDataDic);
      }
    });
  };

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: {
        label: "Node",
        body: "",
        logic: "",
        file: "",
        formula: "",
        container: "",
        source: "",
        form: "",
        action: "",
        menu: "",
        fileupload: "",
        filter: "",
        sqldata: "",
        subflow: "",
        join: "",
      },
      type: "container",
      position: {
        // x: Math.random() * window.innerWidth - 100,
        // y: Math.random() * window.innerHeight,
        x: window.innerWidth / 2 + (Math.random() * 200 - 100),
        y: window.innerHeight / 2 + (Math.random() * 200 - 100),
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addNewFlowChart = () => {
    let flowJson = [
      {
        tableId: 471,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: flowchartName,
        columnName: "Flowchart_Name",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 471,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: defaultValue,
        columnName: "Flowchart_Data",
        userId: userId,
        db: parseInt(db),
      },
    ];
    setTableData(flowJson);
    setTableId(471);
    setTableRel("");
    setTableCol(0);
    setUserDataId(userId);
    setFlowchartName("");
    toast.success("New Flowchart created successfully.")
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

  const onCheckFlowChartName = () => {
    // flow_card_data?.getTableDataRelIdInfo?.map((item1, i) => {
    //   let checkData = JSON.parse(item1.columnData);
    //   if (checkData.flowchart_name === flowName) {
    //     setSelectChart(flowName);
    //   }
    // });

    setFlowName(localStorage?.getItem("flowName"));

    setTimeout(() => {
      setSelectChart(flowName);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setDataLog(selectChart);
    }, 1500);
  }, [selectChart]);

  // console.log("nodes item 703", nodes);

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
        onInit={setRfInstance}
        // connectionLineComponent={ConnectionLine}
        onConnect={onConnect}
      >
        <Controls />
        <Background color="#3C486B" gap={16} />
        {/* <Background color="red" gap={16} /> */}
        <Panel position="top-left">
          <Box sx={{ display: "inline" }}>
            <Tooltip title="Add" placement="top">
              <IconButton
                size="small"
                variant="outlined"
                color="success"
                onClick={onAdd}
                sx={{
                  display: "inline",
                  marginRight: 1,
                  padding: 0,
                  textTransform: "capitalize",
                }}
              >
                <AddOutlinedIcon size="small" sx={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip> 
            <Tooltip title="Save" placement="top">
              <IconButton
                size="small"
                color="success"
                variant="outlined"
                onClick={() => {
                  handleClickOpen();
                  checkLogicAndFilterData();
                }}
                sx={{
                  marginRight: 1,
                  display: "inline",
                  textTransform: "capitalize",
                  padding: 0,
                }}
              >
                <ArrowForwardOutlinedIcon
                  size="small"
                  sx={{ fontSize: "18px" }}
                />
              </IconButton>
            </Tooltip> 
            <Tooltip title="Run" placement="top">
              <IconButton
                size="small"
                color="success"
                variant="outlined"
                onClick={() => {
                  startProcessing();
                  onCheckFlowChartName();
                  startProcessing();
                  setChartDataShow(true);
                  setLogicEditor(false);
                  setFilterEditor(false);
                  onPlayButtonFire();
                }}
                sx={{
                  marginRight: 1,
                  display: "inline",
                  textTransform: "capitalize",
                  padding: 0,
                }}
              >
                <PlayArrowOutlinedIcon size="small" sx={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>  
          </Box>

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
              <Box sx={{ width: 250, display: "block", marginTop: 3 }}>
                <FormControl fullWidth size="small" sx={{ height: 32 }}>
                  <InputLabel id="demo-simple-select-label">
                    Flowchart List
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={namelist}
                    label="Flowchart List"
                    onChange={handleChange}
                    size="small"
                    sx={{
                      height: 32,
                      fontFamily: "Nunito Sans",
                      textTransform: "capitalize",
                    }}
                  >
                    {allFlowData?.map((item, i) => {
                      return (
                        <MenuItem
                          size="small"
                          value={item.id}
                          sx={{ fontSize: "14px", fontFamily: "Nunito Sans" }}
                          onClick={()=> AllFlowChartDataSelect(item)}
                          // onClick={() => 
                          //   setServerFlowData(JSON.parse(item.flow_data))
                          // }
                        >
                          {item.flow_name}
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
                  onSelectFlowDataShow();
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
                  onMutationLogicSave();
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
}

export default ProcessFlow;
