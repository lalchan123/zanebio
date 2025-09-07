import React, { useCallback, useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import axios from "axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  useStoreApi,
  ReactFlowProvider,
  ConnectionMode,
  useNodeId,
} from "@xyflow/react";

// import {
//   ReactFlow,
//   addEdge,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   ReactFlowProvider,
//   useReactFlow,
//   Panel,
//   ConnectionMode,
//   useNodeId,
// } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Tooltip from "@mui/material/Tooltip";

import { gql, useQuery, useMutation } from "@apollo/client";
import { NEW_TABLE_DATA_REF_QUERY2 } from "../../GraphQL/Queries";

import {
  CREATE_TABLE_MUTATION,
  TABLE_COLUMN_DATA_UPDATE,
  CREATE_CRUD_INFO_MUTATION,
} from "../../GraphQL/Mutations";

import CustomNode from "./CustomNode";
import CustomNodeTwo from "./CustomNodeTwo";
import ButtonEdge from "./ButtonEdge";

// import "reactflow/dist/style.css";
import "./overview.css";
import {
  deleteAllDataFromIndexedDB,
  saveJSONArrayToIndexedDB,
} from "./IndexedDBService";
import { AppContext } from "../../AppContext";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import toast from "react-hot-toast";
import { BaseURL } from "../../Constants";
import CustomButtonEdge from "./CustomButtonEdge";
import { User } from "lucide-react";
// import ButtonEdgeDemo from "./ButtonEdgeDemo";

const nodeTypes = {
  custom: CustomNode,
  customtwo: CustomNodeTwo,
};

const edgeTypes = {
  buttonedge: ButtonEdge,
  // buttonedge: ButtonEdgeDemo,
  // buttonedge: CustomButtonEdge,
};

const minimapStyle = {
  height: 120,
};

const flowKey = "adminFlow";

const getNodeId = () => `${+new Date()}`;

const defaultValue = `{"nodes":[],"edges":[],"viewport":{"x":386.08459106904024,"y":-247.06548077134772,"zoom":1.136029264786686}}`;

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "#9ca8b3" },
  markerEnd: {
    type: "arrowclosed",
  },
};


const MainFlow2 = () => {
  const {
    adminAlert,
    setAdminALert,
    alertStatus,
    setAlertStatus,
    alertStatusFixed,
    setAlertStatusFixed,
    singIn,
    tableColRelData,
    setTableColRelData,
    userId,
    setUserId
  } = useContext(AppContext);

  const user = GetAllTableData(1, userId);

  const [alertData, setAlertData] = useState(null); // { x, y, message }

  const userDetails = eval(
    user?.all_table_data?.getDynamicTableField?.jsonData
  );

  const adminUserData = JSON.parse(
    localStorage.getItem("admin_user") || `{"demo":"1"}`
  );

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

  // const [userId, setUserId] = useState("null");
  const [open, setOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const [flowData, setFlowData] = useState();
  const [nodeData, setNodeData] = useState();
  const [rfInstance, setRfInstance] = useState(null);
  const [jsonData, setJsonData] = useState();
  const [projectName, setProjectName] = useState("");
  const [projectList, setProjectList] = useState("215");
  const nodeId = useNodeId();
  console.log("projectList", projectList)

  // useEffect(() => {
  //   if (adminUserData.user_flag === true) {
  //     userDetails?.map((item, i) => {
  //       if (adminUserData.user_email === item.email) {
  //         setUserId(item.user_id);
  //       }
  //     });
  //   }
  // }, [userId, userDetails, adminUserData, singIn]);

  const handleChange = (event) => {
    setProjectList(event.target.value);
  };

  const {
    loading: project_name_loading2,
    error: project_name_error2,
    data: project_name2,
  } = useQuery(NEW_TABLE_DATA_REF_QUERY2,{
    variables: { tableId: 513, tableColId: 1, tableRefId: 0, userId: userId  },
  });

  const {
    loading: project_data_loading2,
    error: project_data_error2,
    data: project_data2,
  } = useQuery(NEW_TABLE_DATA_REF_QUERY2, {
    variables: { tableId: 513, tableColId: 2, tableRefId: projectList, userId: userId },
  });

  const [createTableInfoDtl, { data }] = useMutation(CREATE_TABLE_MUTATION);

  const [createCrudInfo] = useMutation(CREATE_CRUD_INFO_MUTATION, {
    refetchQueries: [
      {
        query: NEW_TABLE_DATA_REF_QUERY2,
        variables: { tableId: 513, tableColId: 1, tableRefId: 0, userId: userId },
      },
    ],
  });

  const [columnDataUpdate] = useMutation(TABLE_COLUMN_DATA_UPDATE, {
    refetchQueries: [
      {
        query: NEW_TABLE_DATA_REF_QUERY2,
        variables: { tableId: 513, tableColId: 2, tableRefId: projectList, userId: userId },
      },
    ],
  });

  project_data2?.getTableDataRefIdInfoUpdate2?.map((item) => {
    const value = JSON.parse(item.columnData);
    localStorage.setItem(flowKey, JSON.stringify(value));
  });

 
  // const savedData = localStorage?.getItem("adminFlow");
  // const jsonDataMy = JSON.parse(savedData);
  
  // const [initialNodes, setInitialNodes] = useState(jsonDataMy?.nodes);
  // const [initialEdges, setInitialEdges] = useState(jsonDataMy?.edges);
  // const [initialViewPort, setInitialViewPort] = useState(jsonDataMy?.viewport);

  // console.log("initialNodes", initialNodes)

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // console.log("184 nodes", nodes)
  // console.log("185 onNodesChange", onNodesChange)
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  console.log("215 nodes", nodes)
  console.log("216 edges", edges)
  // const { setViewport } = useReactFlow(initialViewPort);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const handleRefresh = () => {
    // window.location.reload(); // This will refresh the browser
    setOpen(false);
    const savedData = localStorage?.getItem("adminFlow");
    const jsonDataMy = JSON.parse(savedData);
    setNodes(jsonDataMy?.nodes)
    setEdges(jsonDataMy?.edges)
    // const [initialNodes, setInitialNodes] = useState();
    // const [initialEdges, setInitialEdges] = useState(jsonDataMy?.edges);
    // const [initialViewPort, setInitialViewPort] = useState(jsonDataMy?.viewport);

  };

  // const onConnect = useCallback(
  //   (params) =>
  //     setEdges((eds) =>
  //       addEdge(
  //         {
  //           ...params,

  //           style: { type: "buttonedge" },
  //         },
  //         eds
  //       )
  //     ),
  //   []
  // );

  const onConnect = useCallback(
    (params) =>{
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "buttonedge",
            style: { stroke: 'black' },
          },
          eds,
        )
      );
  }, []);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [{ type: "buttonedge" }]
  // );

  // const onConnect = (params) =>
  //   setEdges((els) => addEdge({ ...params, type: "buttonedge" }, els));

  const onSave = useCallback(() => {
    // if (rfInstance) {
    //   const flow = rfInstance.toObject();
    //   localStorage.setItem(flowKey, JSON.stringify(flow));
    //   setNodeData(JSON.stringify(flow));
    // }
  }, [rfInstance]);

  const onProjectDataSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      // localStorage.setItem(flowKey, JSON.stringify(flow));
      project_data2?.getTableDataRefIdInfoUpdate2?.map((item) => {
        columnDataUpdate({
          variables: {
            id: parseInt(item.tableDataId),
            columnData: JSON.stringify(flow),
            userId: userId,
            db: parseInt(db)
          },
        });
      });
      setAdminALert(true);
      setAlertStatus("Successfully save flow data");
      toast.success("Successfully save flow data")
      setOpen(false);
    }
  };

  const retrieveData = () => {
    const dbName = "myDB";
    const storeName = "jsonArrayStore";

    const request = indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        setJsonData(getAllRequest.result);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  };

  const handleSubmit1 = async () => {
    deleteAllDataFromIndexedDB()
      .then(() => {
        console.log("All data cleared from IndexedDB");
        setJsonData([]);
      })
      .catch(() => {
        console.error("Failed to clear data from IndexedDB");
      });

    saveJSONArrayToIndexedDB(nodes)
      .then(() => {
        console.log("JSONArray data saved to IndexedDB");
        retrieveData();
      })
      .catch(() => {
        console.error("Failed to save JSONArray data");
      });
  };

  // const handleSubmit = async (e) => {
  //   // e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://itb-usa.a2hosted.com/account/create-node-data/",
  //       { node_data: nodeData }
  //     );
  //     console.log("Post created:", response.data);
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };

  const [responseMessage, setResponseMessage] = useState("");

  const dataSubmit = async () => {
    try {
      const apiUrl = `${BaseURL}/account/create-node-data/`;
      const dataToSend = {
        name: "tableflow",
        node_data: nodeData, // Replace with the actual data you want to send
      };

      const response = await axios.post(apiUrl, dataToSend);

      setResponseMessage(response.data.message); // Assuming the API returns a message in the response
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleSubmit = () => {
    setTimeout(() => {
      dataSubmit();
    }, 5000);
  };

  const onAdd = useCallback(() => {
    const newId = getNodeId();

    // createTableInfoDtl({
    //   variables: {
    //     tableName: newId,
    //     tableDescription: "NodeName",
    //     tableType: "General",
    //   },
    // });

    const newNode = {
      id: getNodeId(),

      data: {
        label: newId,
        rows: 0,
        collist: "",
        name: "TableName",
        tableDesc: "",
        tableType: "",
        column: {},
      },
      type: "custom",
      position: {
        // x: Math.random() * window.innerWidth - 100,
        // y: Math.random() * window.innerHeight,
        x: window.innerWidth / 2 + (Math.random() * 200 - 100),
        y: window.innerHeight / 2 + (Math.random() * 200 - 100),
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addNewProjectName = () => {
    createCrudInfo({
      variables: {
        tableId: 513,
        tableColId: 1,
        tabRelId: "40007",
        tableRefId: uniqueId,
        columnData: projectName,
        columnName: "project_name",
        userId: userId,
        db: parseInt(db)
      },
    });

    createCrudInfo({
      variables: {
        tableId: 513,
        tableColId: 2,
        tabRelId: "40007",
        tableRefId: uniqueId,
        columnData: defaultValue,
        columnName: "project_flow_data",
        userId: userId,
         db: parseInt(db)
      },
    });
    setAdminALert(true);
    setAlertStatus("Successfully create new project name");
    toast.success("Successfully create new project name")
  };

  const handleAlertClick = () => {
    alert(alertData.message);
    setAlertData(null); // hide after clicking
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        onInit={setRfInstance}
      >
        <Controls />
        <Background color="#3C486B" gap={16} />
        <Panel position="top-left">
          <Box sx={{ display: "inline" }}>
            <Tooltip title="Add" placement="top">
              <IconButton
                size="small"
                variant="outlined"
                color="success"
                sx={{
                  display: "inline",
                  marginRight: 1,
                  padding: 0,
                  textTransform: "capitalize",
                }}
                onClick={onAdd}
              >
                <AddOutlinedIcon size="small" sx={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip> 
            <Tooltip title="Save" placement="top">
              <IconButton
                size="small"
                color="success"
                variant="outlined"
                onClick={() => setOpen(true)}
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
          </Box>

          {/* <Button
            variant="contained"
            startIcon={<SendIcon />}
            size="small"
            onClick={() => {
              onSave();
              onProjectDataSave();
            }}
            sx={{ textTransform: "capitalize" }}
          >
            Save
          </Button>

          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            size="small"
            onClick={onAdd}
            sx={{ textTransform: "capitalize" }}
          >
            Add Object
          </Button>
          <FormControl
            sx={{ width: 250, marginRight: 1 }}
            variant="outlined"
            size="small"
          >
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              size="small"
              placeholder="Add New Project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              endAdornment={
                <InputAdornment position="end" size="small">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={addNewProjectName}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Add
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box
            sx={{ width: 200, float: "right" }}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Flowchart List
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={projectList}
                label="Flowchart List"
                onChange={handleChange}
                size="small"
              >
                {project_name?.getTableDataRefIdInfoUpdate?.map((item, i) => {
                  if (item.userId === userId) {
                    return (
                      <MenuItem
                        size="small"
                        value={item.tableRefId}
                        // onClick={onChangeDataValue}
                      >
                        {item.columnData}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </Box> */}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
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
                  placeholder="Add New Project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        // variant="contained"
                        // onClick={addNewFlowChart}
                        onClick={addNewProjectName}
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
                    Project List
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={projectList}
                    label="Flowchart List"
                    onChange={handleChange}
                    size="small"
                    sx={{
                      height: 32,
                      fontFamily: "Nunito Sans",
                      textTransform: "capitalize",
                    }}
                  >
                    {project_name2?.getTableDataRefIdInfoUpdate2
                      ?.filter((acc) => acc.userId === userId)
                      ?.map((item, i) => {
                        return (
                          <MenuItem
                            size="small"
                            value={item.tableRefId}
                            sx={{ fontSize: "14px", fontFamily: "Nunito Sans" }}
                          >
                            {item.columnData}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ fontFamily: "Nunito Sans", textTransform: "capitalize" }}
                color="success"
                onClick={handleRefresh}
              >
                Show
              </Button>
              <Button
                autoFocus
                sx={{ fontFamily: "Nunito Sans", textTransform: "capitalize" }}
                color="success"
                onClick={() => {
                  onSave();
                  onProjectDataSave();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Panel>
        <Controls />
      </ReactFlow>
      
    </ReactFlowProvider>
  );
};

export default MainFlow2;
