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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import LoopIcon from "@mui/icons-material/Loop";
import Tooltip from "@mui/material/Tooltip";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { TimePicker } from "react-ios-time-picker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  NEW_TABLE_DATA_REF_QUERY,
  TABLE_DATA_DETAIL,
  GET_ALL_TABLE_DATA_QUERY,
} from "../../GraphQL/Queries";

import axios from "axios";

import { CREATE_CRUD_INFO_MUTATION } from "../../GraphQL/Mutations.js";
import { ItemExtra } from "semantic-ui-react";
import { AppContext } from "../../AppContext.jsx";
import useRestAPIGet from "../../GraphQLApiCall/useRestAPIGet.js";

import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import useMutationRel from "../../GraphQLApiCall/useMutationRel";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function PipeLineNode({
  id,
  data,
  value,
  edges,
  nodes,
  isConnectable,
  sourcePosition,
  targetPosition,
  handleIndex,
  ...props
}) {
  const {
    processShow,

    setProcessShow,
    pyShow,
    setPyShow,
    pythonCode,
    setPythonCode,
    processNameCheck,
    setProcessNameCheck,
    adminAlert,
    alertStatus,
    setAdminALert,
    setAlertStatus,

    pipeLineShow,
    setPipeLineShow,
    pipeLineCode,
    setPipeLineCode,
    pipeLineCodeParams,
    setPipeLineCodeParams,
    BaseURL,
    setBaseURL,
    apiRouterG,
    setApiRouterG,
    pipeLineNodeValue,
    setPipeLineNodeValue,
  } = useContext(AppContext);

  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();
  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const [open, setOpen] = React.useState(false);
  const [openName, setOpenName] = React.useState(false);
  const [openDetials, setOpenDetials] = React.useState(false);
  const [parameterPopUp, setParameterPopUp] = React.useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState(data.name);
  const [details, setDetails] = useState(data.details);
  const [dateTime, setDateTime] = useState("");
  const [dateTimeShow, setDateTimeShow] = useState(false);
  const [proName, setProName] = useState(localStorage?.getItem("processName"));
  const [processFlow, setProcessFlow] = useState(
    localStorage?.getItem("processName")
  );
  const [serverList, setServerList] = useState([]);
  const [confKey, setConfKey] = useState("");
  const [confType, setConfType] = useState("");
  const [customConfKey, setCustomConfKey] = useState("");
  const [confValue, setConfValue] = useState("");
  const [checkApienv, setCheckApienv] = useState(false);
  const [checkApiadd, setCheckApiAdd] = useState(false);
  const [apiParameterData, setApiParameterData] = useState([]);
  const getUniqueId = () => `${+new Date()}`.slice(-9);
  const [userId, setUserId] = useState("null");
  const [userName, setUserName] = useState("null");
  const [apiRouter, setApiRouter] = useState(
    BaseURL + "/account/dynamic-get-api1"
  );
  const [apiRouter1, setApiRouter1] = useState("/account/dynamic-get-api1");
  const [apiParameterDataList, setApiParameterDataList] = useState({});
  // const [openSetting, setOpenSetting] = useState(false);

  // console.log(
  //   "122 apiParameterData apiParameterDataList name",
  //   apiParameterData,
  //   apiParameterDataList,
  //   typeof apiParameterDataList,
  //   name
  // );
  // console.log("123 pipeLineCode", pipeLineCode);
  // console.log("124 BaseURL", BaseURL);
  // console.log("124 pipeLineNodeValue", pipeLineNodeValue);

  // const { restApiData, restApiLoading, restApiError } = useRestAPIGet(
  //   "https://itb-usa.a2hosted.com/media/upload_file/investing/json/Heartbeat.json"
  // );

  const { setTableData, setTableId, setTableRel, setTableCol } =
    useMutationRel();

  const user = GetAllTableData(1);
  const userDetails = eval(
    user?.all_table_data?.getDynamicTableField?.jsonData
  );

  const adminUserData = JSON.parse(
    localStorage.getItem("admin_user") || `{"demo":"1"}`
  );

  useEffect(() => {
    if (adminUserData.user_flag === true) {
      userDetails?.map((item, i) => {
        if (adminUserData.user_email === item.email) {
          setUserId(item.user_id);
          setUserName(item.last_name);
        }
      });
    }
  }, [userId, userDetails, adminUserData]);

  const confApi = GetAllTableData(620);

  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );

  useEffect(() => {
    {
      confApiData?.map((item, index) => {
        console.log("114 confApiData", item);
        if (item.user === userName && item.ConfKey === "BaseURL") {
          setBaseURL(item.ConfValue);
        }
      });
    }
  });

  const apiCreate = GetAllTableData(579);

  const apiCreateData = eval(
    apiCreate?.all_table_data?.getDynamicTableField?.jsonData
  );

  console.log("191 apiCreateData", apiCreateData);

  // (nodes) => nodes.filter((node) => node.id !== id))

  // useEffect(() => {
  //   const filapiData = apiCreateData?.filter((node) => node.node_id === id)
  //   console.log("197 filapiData", filapiData)
  //   {
  //     filapiData?.map((item, index) => {
  //       console.log("199 filapiData item", item);
  //       setPipeLineCode(item?.custom_code)
  //       // setApiParameterDataList(JSON.parse(item?.api_parameter.replace(/'/g, '"')))
  //       // setApiParameterDataList(JSON.parse(JSON.stringify(item?.api_parameter)))
  //       // setApiParameterDataList(eval(item?.api_parameter))
  //   })}
  // }, []);
  // }, [apiCreateData, pipeLineCode, apiParameterDataList]);

  const {
    loading: process_log_loading,
    error: process_log_error,
    data: process_log,
  } = useQuery(GET_ALL_TABLE_DATA_QUERY, {
    variables: { tableId: 542 },
  });

  useEffect(() => {
    const sectionData = {};
    apiParameterData?.map((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        sectionData[key] = value;
      }
    });
    setApiParameterDataList(sectionData);
  }, [apiParameterData]);

  const processLogData =
    eval(process_log?.getDynamicTableField?.jsonData) || [];

  const serverListDic = [];

  // const OpenSettingF = (status) => {
  //   setOpenSetting(status)
  // }
  const ApiParameterDataListF = (ApiParameterDataList) => {
    setApiParameterDataList(ApiParameterDataList);
  };

  const process = process_log?.getDynamicTableField?.jsonData;
  const processData = eval(process);

  const [createCrudInfo] = useMutation(CREATE_CRUD_INFO_MUTATION, {
    refetchQueries: [
      {
        query: NEW_TABLE_DATA_REF_QUERY,
        variables: { tableId: 472, tableColId: 0, tableRefId: 0 },
      },
    ],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenName = () => {
    setOpenName(true);
  };

  const handleCloseName = () => {
    setOpenName(false);
  };

  const handleClickOpenDetails = () => {
    setOpenDetials(true);
  };

  const handleCloseDetails = () => {
    setOpenDetials(false);
  };

  let processDic = [];

  // const onProcessDataShow = (process) => {
  //   let check = false;
  //   processData?.map((item, i) => {
  //     if (item.Process_Name === process) {
  //       processDic.push({
  //         End_Date: item.End_Date,
  //         Flowchart_Name: item.Flowchart_Name,
  //         Process_Id: item.Process_Id,
  //         Process_Name: item.Process_Name,
  //         Process_Relation: item.Process_Relation,
  //         Process_Status: item.Process_Status,
  //         Process_Type: item.Process_Type,
  //         Schedule: item.Schedule,
  //         Start_Date: item.Start_Date,
  //         Time: item.Time,
  //       });
  //       setProcessLogData(processDic);
  //       check = true;
  //     }
  //   });
  //   if (check === false) {
  //     setProcessLogData([]);
  //   }
  // };

  // console.log("check log 180", processData, data.name, processLogData);

  const onSetPythonCode = () => {
    setPythonCode(data.Process_Code);
  };

  const onChange = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            id: evt.target.value,
          };
        }
        return node;
      })
    );

    setOpen(false);
  };

  const onChangeName = (evt) => {
    const { nodes } = store.getState();

    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          // const pipeLineNodeValueData = pipeLineNodeValue?.filter(
          //   (node1) => node1.node_id === nodeId
          // );
          // if (pipeLineNodeValueData.length !== 0) {
          //   setPipeLineNodeValue(
          //     pipeLineNodeValueData.map((item, i) => {
          //       if (item.node_id === nodeId) {
          //         console.log("348 item", item);
          //       }
          //     })
          //   );
          // } else {
          //   setPipeLineNodeValue([
          //     ...pipeLineNodeValue,
          //     { node_name: evt.target.value, node_id: node.id },
          //   ]);
          // }

          node.data = {
            ...node.data,
            name: evt.target.value,
          };
        }
        return node;
      })
    );
    setOpenName(false);
  };

  const onChangeDetails = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            details: evt.target.value,
          };
        }
        return node;
      })
    );
    setOpenDetials(false);
  };

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.target !== id));
  }, [id, setNodes, setEdges]);

  // Your code that you want to run every minute
  const yourCode = () => {
    processData?.map((item, i) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.data.name === item.Process_Name) {
            if (item.Process_Status === "Unprocess") {
              node.style = {
                ...node.style,
                border: "3px solid blue",
                borderRadius: "5px",
              };
            } else if (item.Process_Status === "process") {
              node.style = {
                ...node.style,
                border: "3px solid yellow",
                borderRadius: "5px",
              };
            } else if (item.Process_Status === "error") {
              node.style = {
                ...node.style,
                border: "3px solid red",
                borderRadius: "5px",
              };
            }
            // it's important that you create a new object here
            // in order to notify react flow about the change
          }

          return node;
        })
      );
    });
  };

  processLogData?.map((item, i) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.data.Process_Name === item.Process_Name) {
          if (item.Process_Status === "unprocess") {
            node.style = {
              ...node.style,
              border: "1px solid red",
              borderRadius: "5px",
            };
          } else if (item.Process_Name === "process") {
            node.style = {
              ...node.style,
              border: "1px solid yellow",
              borderRadius: "5px",
            };
          } else if (item.Process_Status === "error") {
            node.style = {
              ...node.style,
              border: "1px solid red",
              borderRadius: "5px",
            };
          }
          // it's important that you create a new object here
          // in order to notify react flow about the change
        }

        return node;
      })
    );
  });

  const onRunServerProcess = () => {};
  const [responseTime, setResponseTime] = useState("");
  const [timeValue, setTimeValue] = useState();
  const [processName, setProcessName] = useState(data.Process_Type);
  const [schedule, setSchedule] = useState(data.Schedule);
  const [startDate, setStartDate] = useState(data.Start_Date);
  const [endDate, setEndDate] = useState(data.End_Date);
  const [daysDifference, setDaysDifference] = useState(0);
  const [currentTime, setCurrentTime] = useState(timeValue);
  const [selectServer, setSelectServer] = useState("");

  const onChangeDataList = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            code: pipeLineCode,
            codeParams: pipeLineCodeParams,
          };
          setAdminALert(true);
          setAlertStatus("node_data_save");
        }
        return node;
      })
    );

    setOpenName(false);
  };

  const onSaveApiData = () => {
    let uniqueId = getUniqueId();

    let apiJson = [
      {
        tableId: 579,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: name,
        columnName: "api_name",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: apiRouter1 + "/" + name + "/" + userName + "/",
        columnName: "api_url",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: "api_file",
        columnName: "api_file",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 4,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: userName,
        columnName: "user",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 5,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: "restapi",
        columnName: "api_data_fetch_type",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 6,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: pipeLineCode,
        columnName: "custom_code",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 7,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: apiParameterDataList,
        columnName: "api_parameter",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 8,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: details,
        columnName: "api_desc",
        userId: userId,
      },
      {
        tableId: 579,
        tableColId: 9,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: nodeId,
        columnName: "node_id",
        userId: userId,
      },
    ];
    setTableData(apiJson);
    setTableId(579);
    setTableRel("");
    setTableCol(0);

    axios
      .post(
        BaseURL + "/account/pipeline-api-create-code-write/",
        {
          user: userName,
          api_name: name,
          api_url: apiRouter1 + "/" + name + "/" + userName + "/",
          api_method: "api_file",
          api_data_fetch_type: "restapi",
          code: pipeLineCode,
          paramList: apiParameterDataList,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // setRestApiPostData(response.data.data);
        console.log("check response 66", response.data);
        // setDataRestApiPostValue({ custom_code: code });
      })
      .catch((error) => {
        console.log("check data error 67", error);
      });
    setAdminALert(true);
    setAlertStatus("Successfully create api");
    // setApiRouter("");
    // setApiMethod("");
    // setApiDataType("");
    // set("");
    // setApiParameterData([]);
    // setApiParameterDataList({});
  };

  const OnConfDataCreateApiData = () => {
    // const validateApiData = useRestAPIGet(BaseURL+`/account/validate-api/${confKey}/`)
    console.log("565 confKey confValue confType", confKey, confValue, confType);
    // let objectData = {}
    // if(confType === 'nodevalue'){
    //   apiCreateData?.map((item1, i) => {
    //     if (confValue === item1?.api_name){
    //         console.log("621 api_name api_url", item1?.api_name, item1?.api_url);
    //         // setConfValue(item1?.api_url)
    //         objectData[confKey] = BaseURL+item1?.api_url
    //         console.log("134 objectData", objectData);

    //         setApiParameterData([...apiParameterData, objectData])
    //         setCheckApiAdd(false);
    //         setAdminALert(true);
    //         setAlertStatus("Configuration Parameter Created Successfully");
    //         setConfKey("");
    //         setConfValue("");
    //     }
    //   })
    // } else{
    //   objectData[confKey] = confValue
    //   console.log("134 objectData", objectData);

    //   setApiParameterData([...apiParameterData, objectData])
    //   setCheckApiAdd(false);
    //   setAdminALert(true);
    //   setAlertStatus("Configuration Parameter Created Successfully");
    //   setConfKey("");
    //   setConfValue("");
    // }

    let objectData = {};
    objectData[confKey] = confValue;
    console.log("134 objectData", objectData);

    setApiParameterData([...apiParameterData, objectData]);
    setCheckApiAdd(false);
    setAdminALert(true);
    setAlertStatus("Configuration Parameter Created Successfully");
    setConfKey("");
    setConfValue("");
  };

  return (
    <>
      <Handle
        id="a"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          // top: 0,
          width: "4px",
          height: "4px",
          borderRadius: "10px",
          backgroundColor: "#2d3972",
        }}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          // Left: 0,
          width: "4px",
          height: "4px",
          borderRadius: "10px",
          backgroundColor: "#2d3972",
        }}
      />

      <Box
        sx={{
          background: "white",
          padding: 1,
          borderRadius: 0.5,
          color: "white",
          // border: ".5px solid #2d3972",
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Text
            style={{
              margin: 0,
              padding: 0,
              fontSize: "7px",
              display: "inline",
              fontWeight: 500,
              color: "black",
              fontStyle: "blod",
            }}
          >
            {data.name}
          </Text>
          <Tooltip title="Edit" placement="top">
            <IconButton
              sx={{ marginLeft: "1px", marginRight: "1px" }}
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpenName();
              }}
            >
              <ModeEditOutlineOutlinedIcon
                sx={{
                  fontSize: "8px",
                  color: "black",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                deleteNode();
              }}
            >
              <DeleteOutlineIcon
                sx={{
                  marginLeft: "-2px",
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
          <Tooltip title="Setting" placement="top">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setCheckApienv(true);
                const filapiData = apiCreateData?.filter(
                  (node) => node.node_id === id
                );
                // console.log("197 filapiData", filapiData)
                if (filapiData.length !== 0) {
                  filapiData?.map((item, index) => {
                    // console.log("199 filapiData item", item);
                    setApiParameterDataList(
                      JSON.parse(item?.api_parameter.replace(/'/g, '"'))
                    );
                    var sectionDataList = [];
                    var sectionData = {};
                    for (const [key, value] of Object.entries(
                      JSON.parse(item?.api_parameter.replace(/'/g, '"'))
                    )) {
                      sectionData[key] = value;
                      if (sectionData.length !== 0) {
                        sectionDataList.push(sectionData);
                        sectionData = {};
                      }
                    }
                    setApiParameterData(sectionDataList);
                  });
                }
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

          <Tooltip title="Save" placement="top">
            <IconButton
              sx={{
                marginLeft: "-1px",
                marginTop: "0px",
                color: "white",
                fontSize: "6px",
              }}
              aria-label="delete"
              size="small"
              // onClick={() => {
              //   // onRunServerProcess();
              //   // calculateDays();
              //   // onScheduleDataSave();
              //   // onChangeDataList();
              //   onChangeDataList();
              // }}

              onClick={() => onSaveApiData()}
              // onClick={onChangeDataList}
              // onChange={onChangeDataList}
              value={"fd"}
              nodeId={id}
            >
              {/* <SaveAltOutlinedIcon
              sx={{ fontSize: "10px", color: "green" }}
              size="small"
            /> */}
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
          <Button
            onClick={() => {
              // setPipeLineShow(true);
              // setPipeLineCode(data.code);
              const filapiData = apiCreateData?.filter(
                (node) => node.node_id === id
              );
              // console.log("197 filapiData", filapiData)
              if (filapiData.length !== 0) {
                setPipeLineShow(true);
                {
                  filapiData?.map((item, index) => {
                    // console.log("199 filapiData item", item);
                    setPipeLineCode(item?.custom_code);
                    // setPipeLineCodeParams(JSON.parse(item?.api_parameter.replace(/'/g, '"')))
                    setPipeLineCodeParams(item?.api_parameter);
                    setApiRouterG(BaseURL + item?.api_url);
                  });
                }
              } else {
                setPipeLineShow(true);
                setPipeLineCode("");
              }
            }}
            variant="text"
            size="sm"
            endIcon={
              <ArrowOutwardIcon
                sx={{
                  fontSize: "12px",
                  marginLeft: "-8px",
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            }
            sx={{
              textTransform: "capitalize",
              fontSize: "7px",
              margin: 0,
              padding: 0,
              "&:hover": {
                color: "green",
              },
            }}
          >
            Details
          </Button>

          {/* <Tooltip title="Code" placement="top">
            <IconButton
              sx={{ marginLeft: 1, marginTop: "1px" }}
              aria-label="delete"
              size="small"
              onClick={() => {
                // onRunServerProcess();
                // calculateDays();
                // onScheduleDataSave();
              }}
              nodeId={id}
            >
              <ArrowOutwardIcon
                sx={{
                  fontSize: "12px",
                  color: "black",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip> */}
          {/* <Tooltip title="Status" placement="top">
            Details
            <IconButton
              sx={{ marginLeft: "0px", marginTop: ".50px" }}
              aria-label="delete"
              size="small"
              onClick={() => {
                setProcessShow(true);
                setPyShow(false);
                setProcessAllShow(false);
                setProcessNameCheck(data.Process_Name);
              }}
              nodeId={id}
            >
              <LoopIcon
                sx={{
                  fontSize: "10px",
                  color: "black",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip> */}
          {/* <div className="text-[10px] font-light cursor-pointer">start</div> */}
        </Box>

        <Divider variant="outside" component="div" sx={{ marginBottom: 1 }} />

        <Text
          style={{
            margin: 0,
            padding: 0,
            fontSize: "7px",
            display: "inline",
            fontWeight: 500,
            color: "black",
          }}
        >
          {data.details}
        </Text>
        <Tooltip title="Edit" placement="top">
          <IconButton
            sx={{ marginLeft: "1px", marginRight: "1px" }}
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpenDetails();
            }}
          >
            <ModeEditOutlineOutlinedIcon
              sx={{
                fontSize: "8px",
                color: "black",
                "&:hover": {
                  color: "green",
                },
              }}
              size="small"
            />
          </IconButton>
        </Tooltip>
        <Divider variant="outside" component="div" sx={{ marginBottom: 1 }} />
        <div className="flex items-center gap-1 justify-end">
          <div className="text-white bg-green-600 py-1 px-2 text-center text-[6px] rounded-sm">
            In Progress
          </div>
        </div>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <input onChange={(e) => setInput(e.target.value)} value={input} />
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        open={openName}
        onClose={handleCloseName}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            bgcolor: "#374151",
            borderTop: "1px solid white",
            borderRight: "1px solid white",
            borderLeft: "1px solid white",
            borderRadius: 1,
          }}
        >
          {/* <input onChange={(e) => setInput(e.target.value)} value={input} /> */}
          <div className="w-[350px]">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type..."
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#374151",
            borderBottom: "1px solid white",
            borderRight: "1px solid white",
            borderLeft: "1px solid white",
            borderRadius: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => {
              handleCloseName();
            }}
          >
            <CloseIcon sx={{ color: "white", fontSize: "20px" }} />
          </IconButton>
          <Button
            onChange={onChangeName}
            onClick={onChangeName}
            value={name}
            nodeId={id}
            autoFocus
            size="small"
            sx={{ fontSize: "20px", color: "white", margin: 0, padding: 0 }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="md"
        open={openDetials}
        onClose={handleCloseDetails}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            bgcolor: "#374151",
            borderTop: "1px solid white",
            borderRight: "1px solid white",
            borderLeft: "1px solid white",
            borderRadius: 1,
          }}
        >
          {/* <input onChange={(e) => setInput(e.target.value)} value={input} /> */}
          <div className="w-[350px]">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type..."
              required
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#374151",
            borderBottom: "1px solid white",
            borderRight: "1px solid white",
            borderLeft: "1px solid white",
            borderRadius: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => {
              handleCloseDetails();
            }}
          >
            <CloseIcon sx={{ color: "white", fontSize: "20px" }} />
          </IconButton>
          <Button
            onChange={onChangeDetails}
            onClick={onChangeDetails}
            value={details}
            nodeId={id}
            autoFocus
            size="small"
            sx={{ fontSize: "20px", color: "white", margin: 0, padding: 0 }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={checkApienv}
        onClose={() => setCheckApienv(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogContent>
          <div class="relative overflow-y-scroll shadow-md sm:rounded-lg h-[300px] w-[600px]">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-blue-700 dark:text-blue-400">
                <tr>
                  <th scope="col" class="px-14 py-2">
                    Key
                  </th>
                  <th scope="col" class="px-14 py-2">
                    Value
                  </th>
                  {/* <th scope="col" class="px-14 py-2">
                          Action
                        </th> */}
                </tr>
              </thead>
              <tbody>
                {apiParameterData?.map((item, index) => {
                  console.log("319 apiParameterData", item);
                  for (const [key, value] of Object.entries(item)) {
                    console.log(`321 ${key}: ${value}`);
                    return (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-14 py-2 ">{key}</td>
                        <td class="px-14 py-2 ">{value}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCheckApienv(false)}
            sx={{
              textTransform: "capitalize",
              color: "green",
              marginRight: -3,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
          <Button
            autoFocus
            sx={{ textTransform: "capitalize", color: "green" }}
            onClick={() => setCheckApiAdd(true)}
            // onClick={onSaveApiData}
          >
            <AddCircleOutlineIcon />
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={checkApiadd}
        onClose={() => setCheckApiAdd(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogContent>
          <div>
            <div class="w-screen md:mt-0 sm:max-w-md xl:p-0 ">
              <div class="p-8 space-y-2 md:space-y-4 sm:p-8">
                <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Input Parameter
                </h1>
                <div>
                  <label
                    for="Conf Key"
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Conf Key
                  </label>
                  <input
                    list="browsers"
                    name="browser"
                    className="bg-gray-100 text-black text-[12px] border rounded-md block w-[380px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    placeholder="Conf Key"
                    value={confKey}
                    onChange={(e) => setConfKey(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="Conf Key"
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Conf Type
                  </label>
                  <input
                    list="browsers"
                    name="browser"
                    className="bg-gray-100 text-black text-[12px] border rounded-md block w-[380px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    placeholder="Conf Type"
                    value={confType}
                    onChange={(e) => setConfType(e.target.value)}
                  />
                  <datalist id="browsers">
                    <option class="text-[12px]" value="int">
                      int
                    </option>
                    <option class="text-[12px]" value="float">
                      float
                    </option>
                    <option class="text-[12px]" value="string">
                      string
                    </option>
                    <option class="text-[12px]" value="nodevalue">
                      nodevalue
                    </option>
                  </datalist>
                </div>

                <div>
                  <label
                    for="Conf Value"
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Conf Value
                  </label>
                  {confType === "nodevalue" ? (
                    <>
                      <input
                        list="ConfValue"
                        name="ConfValue"
                        className="bg-gray-100 text-black text-[12px] border rounded-md block w-[380px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        placeholder="Conf Value"
                        value={confValue}
                        onChange={(e) => {
                          if (confType === "nodevalue") {
                            setConfValue(e.target.value);
                          }
                        }}
                      />
                      <datalist id="ConfValue">
                        {pipeLineNodeValue?.map((item, index) => {
                          console.log("1276 node_name", item?.node_name);
                          // apiCreateData?.map((item1, i) => {
                          //   if (item?.node_name === item1?.api_name){
                          //    console.log("1279 api_name api_url", item1?.api_name, item1?.api_url);
                          //    return (
                          //       <option class="text-[12px]" value={item1?.api_name}>
                          //         {item1?.api_name}
                          //       </option>
                          //     );
                          //   }
                          // })
                          return (
                            <option class="text-[12px]" value={item?.node_name}>
                              {item?.node_name}
                            </option>
                          );
                        })}
                      </datalist>
                    </>
                  ) : (
                    <input
                      type="text"
                      name="ConfValue"
                      id="ConfValue"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Conf Value"
                      required=""
                      value={confValue}
                      onChange={(e) => {
                        if (confType === "int") {
                          setConfValue(parseInt(e.target.value));
                        } else if (confType === "float") {
                          setConfValue(parseFloat(e.target.value));
                        } else if (confType === "string") {
                          setConfValue(e.target.value);
                        }
                      }}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                  onClick={() => OnConfDataCreateApiData()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCheckApiAdd(false);
              setConfKey("");
              setConfValue("");
            }}
            sx={{
              textTransform: "capitalize",
              color: "green",
              marginRight: 3,
              marginTop: -6,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(PipeLineNode);
