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
// import TimePicker from "react-time-picker";
import { TimePicker } from "react-ios-time-picker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  NEW_TABLE_DATA_REF_QUERY,
  TABLE_DATA_DETAIL,
  GET_ALL_TABLE_DATA_QUERY,
} from "../../GraphQL/Queries.js";

import { CREATE_CRUD_INFO_MUTATION } from "../../GraphQL/Mutations.js";
import { ItemExtra } from "semantic-ui-react";
import { AppContext } from "../../AppContext";
import useRestAPIGet from "../../GraphQLApiCall/useRestAPIGet.js";

import axios from "axios";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function RectangularCustomNode({
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
    setProcessAllShow,
    processSaveAlert,
    setProcessSaveAlert,
    processFlow,
    setProcessFlow,
    BaseURL,
    setBaseURL,
  } = useContext(AppContext);

  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();

  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const [open, setOpen] = React.useState(false);
  const [openName, setOpenName] = React.useState(false);
  const [input, setInput] = useState(data.label);
  const [dateTime, setDateTime] = useState("");
  const [dateTimeShow, setDateTimeShow] = useState(false);
  const [proName, setProName] = useState(localStorage?.getItem("processName"));
  const [serverList, setServerList] = useState([]);

  const { restApiData, restApiLoading, restApiError } = useRestAPIGet(
    // BaseURL+"/media/upload_file/investing/json/google_news.json"
    BaseURL + "/media/upload_file/investing/json/Heartbeat.json"
    // "https://itb-usa.a2hosted.com/media/upload_file/investing/json/Heartbeat.json"
  );

  axios
    .get(BaseURL + "/media/upload_file/investing/json/Heartbeat.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // setRestApiPostData(response.data.data);
      console.log("check response 716", response.data);
      // setAdminALert(true);
      // setAlertStatus(response.data.message);
      // setNodeSave(false)
    })
    .catch((error) => {
      console.log("check data error 67", error);
    });

  const {
    loading: process_log_loading,
    error: process_log_error,
    data: process_log,
  } = useQuery(GET_ALL_TABLE_DATA_QUERY, {
    variables: { tableId: 542 },
  });

  const processLogData =
    eval(process_log?.getDynamicTableField?.jsonData) || [];

  const serverListDic = [];

  const serverResponsCheck = () => {
    restApiData?.data?.map((item, j) => {
      const checkServer = new Date(item.response_time);
      const checkMachineCurrentTime = new Date();
      const serverMinutes = checkServer.getMinutes();
      const currentMinutes = checkMachineCurrentTime.getMinutes();
      if (
        serverMinutes === currentMinutes ||
        serverMinutes + 1 === currentMinutes ||
        serverMinutes + 2 === currentMinutes
      ) {
        const foundObject = processLogData?.map((log, i) => {
          if (
            log.Server_Name === item.server_name &&
            log.Process_Status === "unprocess"
          ) {
            return true;
          } else {
            return false;
          }
        });

        if (foundObject === true) {
          console.log("This server is busy now", item.server_name);
          serverListDic.push({
            server_name: item.server_name,
            server_name_label: item.server_name + "(busy)",
            response_time: item.response_time,
            status: item.status,
          });
        } else {
          console.log("This server is ready", item.server_name);
          serverListDic.push({
            server_name: item.server_name,
            server_name_label: item.server_name + "(ready)",
            response_time: item.response_time,
            status: item.status,
          });
        }
      } else {
        serverListDic.push({
          server_name: item.server_name,
          server_name_label: item.server_name + "( offline )",
          response_time: item.response_time,
          status: item.status,
        });
      }
    });
    setServerList(serverListDic);
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

  let processDic = [];

  const onSetPythonCode = () => {
    setPythonCode(data.Process_Code);
  };

  const onChange = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
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
    setOpenName(false);
  };

  const onChangeName = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            Process_Name: evt.target.value,
          };
          setProcessNameCheck(evt.target.value);
        }
        return node;
      })
    );
    setOpenName(false);
    handleCloseName();
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
        }

        return node;
      })
    );
  });

  const onRunServerProcess = () => {};
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  const [responseTime, setResponseTime] = useState("");
  const [timeValue, setTimeValue] = useState();
  const [processName, setProcessName] = useState(data.Process_Type);
  const [schedule, setSchedule] = useState(data.Schedule);
  const [startDate, setStartDate] = useState(data.Start_Date);
  const [endDate, setEndDate] = useState(data.End_Date);
  const [daysDifference, setDaysDifference] = useState(0);
  const [currentTime, setCurrentTime] = useState(timeValue);
  const [selectServer, setSelectServer] = useState("");

  // console.log(
  //   "419 processNameCheck processName, schedule, startDate, endDate, selectServer",
  //   processNameCheck,
  //   processName,
  //   schedule,
  //   startDate,
  //   endDate,
  //   selectServer
  // );

  const onChangeDataList = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            Schedule: schedule,
            Start_Date: startDate,
            End_Date: endDate,
            // Time: responseTime,
            Time: datetime,
            Process_Id: node.id,
            Process_Status: "unprocess",
            Process_Type: processName,
            Process_Relation: "Parent",
            Flowchart_Name: processFlow,
            Process_Code: "Custom.py",
            Function_Name: processName,
            Server_Name: selectServer,
          };
          setAdminALert(true);
          setAlertStatus("node_data_save");
        }
        return node;
      })
    );

    setOpenName(false);
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
          width: "14px",
          height: "10px",
          borderRadius: "2px",
          backgroundColor: "#3C486B",
          marginTop: -3,
        }}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          Bottom: 0,
          width: "14px",
          height: "10px",
          borderRadius: "2px",
          backgroundColor: "#3C486B",
        }}
      />

      <Box
        sx={{
          background: "linear-gradient(to right bottom, #162466, #040531)",
          padding: 1,
          borderRadius: 0.5,
          color: "white",
          border: ".5px solid #2d3972",
          boxShadow: 8,
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
            }}
          >
            {data.Process_Name}
          </Text>
          <Tooltip title="Edit" placement="top">
            <IconButton
              sx={{ marginLeft: "-4px", marginRight: "8px" }}
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpenName();
              }}
            >
              <ModeEditOutlineOutlinedIcon
                sx={{
                  fontSize: "8px",
                  color: "white",
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
              sx={{ marginRight: -1 }}
              aria-label="delete"
              size="small"
              onClick={() => {
                deleteNode();
              }}
            >
              <DeleteOutlineIcon
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
          </Tooltip>

          <Tooltip title="Code" placement="top">
            <IconButton
              sx={{ marginLeft: 0, marginTop: "1px" }}
              aria-label="delete"
              size="small"
              onClick={() => {
                // onRunServerProcess();
                // calculateDays();
                // onScheduleDataSave();
                onSetPythonCode();
                setProcessShow(false);
                setPyShow(true);
              }}
              nodeId={id}
            >
              <PlayArrowOutlinedIcon
                sx={{
                  fontSize: "12px",
                  color: "white",
                  "&:hover": {
                    color: "green",
                  },
                }}
                size="small"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Status" placement="top">
            <IconButton
              sx={{ marginLeft: "-6.5px", marginTop: "1.5px" }}
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
                  color: "white",
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
                color: "white",
                fontSize: "7px",
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

              onClick={onChangeDataList}
              onChange={onChangeDataList}
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
          {/* <div className="text-[10px] font-light cursor-pointer">start</div> */}
        </Box>

        <Divider variant="outside" component="div" sx={{ marginBottom: 1 }} />
        <Box sx={{ display: "block", marginBottom: 1 }}>
          <select
            className="bg-gray-700 text-slate-200 text-[5px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="Process Type"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
          >
            <option class="text-[8px]" value="">
              Process Type
            </option>
            <option class="text-[8px]" value="pythonscript">
              Python Script
            </option>
            <option class="text-[8px]" value="javascript">
              Java Script
            </option>
            <option class="text-[8px]" value="batchscript">
              Batch Script
            </option>
            <option class="text-[8px]" value="sqlscript">
              Sql Script
            </option>
          </select>
        </Box>
        <Box sx={{ display: "block", marginBottom: 1 }}>
          <select
            className="bg-gray-700 text-slate-200 text-[5px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          >
            <option class="text-[8px]" value="">
              Schedule
            </option>
            <option class="text-[8px]" value="one hour">
              One Hour
            </option>
            <option class="text-[8px]" value="half hour">
              Half Hour
            </option>
            <option class="text-[8px]" value="10 minutes">
              10 Minutes
            </option>
            <option class="text-[8px]" value="5 minutes">
              5 Minutes
            </option>
            <option class="text-[8px]" value="2 minutes">
              2 Minutes
            </option>
            <option class="text-[8px]" value="1 minute">
              1 Minute
            </option>
            <option class="text-[8px]" value="one day">
              One Day
            </option>
            <option class="text-[8px]" value="now">
              Now
            </option>
            <option class="text-[8px]" value="custom time">
              Custom Time
            </option>
          </select>
        </Box>
        {schedule === "custom time" ? (
          <Box
            sx={{
              display: "block",
              marginBottom: 1,
              width: 50,
              fontSize: "6px",
              // bgcolor: "red",
              marginBottom: 1,
              padding: 0,
              // border: "0.5px solid white",
            }}
          >
            <TimePicker onChange={setTimeValue} value={timeValue} style={{}} />
          </Box>
        ) : (
          ""
        )}

        <Box sx={{ display: "block", marginBottom: 1 }}>
          <select
            className="bg-gray-700 text-slate-200 text-[5px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            value={selectServer}
            onChange={(e) => setSelectServer(e.target.value)}
            onClick={serverResponsCheck}
          >
            <option class="text-[8px]">Select Server</option>
            {serverList.map((item, i) => {
              return (
                <option
                  class="text-[8px]"
                  onClick={() => setResponseTime(item.response_time)}
                  value={item.server_name}
                >
                  {item.server_name_label}
                </option>
              );
            })}
          </select>
        </Box>

        <Box sx={{ marginBottom: 1 }}>
          <Stack direction="row" spacing={1}>
            <div className="flex items-center">
              <label className="text-[6px] font-normal text-slate-50 mr-1">
                Start
              </label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                class="bg-gray-700 text-slate-100 text-[5px] rounded-sm inline w-full p-1 border-gray-300 focus:border-blue-500 focus:outline-none"
                placeholder="Select Date"
              />
            </div>
            <div className="flex items-center">
              <label className="text-[6px] font-normal text-slate-50 mr-1">
                End
              </label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                class="bg-gray-700 text-slate-100 text-[5px] rounded-sm inline w-full p-1 border-gray-300 focus:border-blue-500 focus:outline-none"
                placeholder="Select Date"
              />
            </div>
          </Stack>
        </Box>
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

      {/* Node name change dialog */}

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
              Name change is again
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type..."
              required
              onChange={(e) => setInput(e.target.value)}
              value={input}
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
            value={input}
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
        open={dateTimeShow}
        onClose={() => setDateTimeShow(false)}
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
          <div
            class="relative mb-3"
            data-te-date-timepicker-init
            data-te-input-wrapper-init
          >
            <input
              type="text"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="form1"
            />
            <label
              for="form1"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Select a time
            </label>
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
              setDateTimeShow(false);
            }}
          >
            <CloseIcon sx={{ color: "white", fontSize: "20px" }} />
          </IconButton>
          <Button
            onChange={onChangeName}
            onClick={onChangeName}
            value={input}
            nodeId={id}
            autoFocus
            size="small"
            sx={{ fontSize: "20px", color: "white", margin: 0, padding: 0 }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(RectangularCustomNode);
