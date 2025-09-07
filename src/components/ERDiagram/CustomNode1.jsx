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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import { list, tab } from "@material-tailwind/react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  GET_TABLE_DATA_QUERY,
  GET_TABLE_COL_DATA_QUERY,
} from "../../GraphQL/Queries";

import {
  CREATE_TABLE_MUTATION,
  CREATE_TABLE_UPDATE_MUTATION,
  CREATE_TABLE_DELETED_MUTATION,
  CREATE_TABLE_COL_MUTATION,
  CREATE_TABLE_COL_UPDATE_MUTATION,
  CREATE_TABLE_COL_DELETED_MUTATION,
} from "../../GraphQL/Mutations";
import { AppContext } from "../../AppContext";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function CustomNode({
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
    adminAlert,
    setAdminALert,
    alertStatus,
    setAlertStatus,
    alertStatusFixed,
    setAlertStatusFixed,
  } = useContext(AppContext);

  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [input, setInput] = useState(data.label);
  const [tableName, setTableName] = useState("Node Name");
  const [openName, setOpenName] = React.useState(false);
  const [flag, setFlag] = useState(false);
  const [skipItem, setSkipItem] = useState([]);
  const [name, setName] = useState(data.label);

  const [localData, setLocalData] = useState("");

  const [createTableColInfo] = useMutation(CREATE_TABLE_COL_MUTATION);
  const [updateTableColInfo] = useMutation(CREATE_TABLE_COL_UPDATE_MUTATION);
  const [deleteTableColInfo] = useMutation(CREATE_TABLE_COL_DELETED_MUTATION);

  // Load data from local storage when the component mounts

  const savedData = localStorage.getItem("example-flow");

  const jsonDataMy = JSON.parse(savedData);

  const datalist1 = data.collist;
  const arrayFromInput1 = datalist1
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const handleCount2 = arrayFromInput1.colhandleCount || 0;

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

  const handleCloseName = () => {
    setOpenName(false);
  };

  const handleDataChange = () => {
    const { nodes } = store.getState();
    nodes.map((node) => {
      if (node.id === id) {
        const datalist = node.data.collist;
        const listValue = datalist
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        setSkipItem(listValue);
        setItems(listValue);
      }
      // console.log("248", id, data.label, savedData, nodeInternals, nodeId);
    });
  };

  const onTableDataMutation = () => {
    const { nodes } = store.getState();
    nodes.map((node) => {
      if (node.id === id) {
        localStorage.setItem("flowData", node.data.label);
      }
      // console.log("248", id, data.label, savedData, nodeInternals, nodeId);
    });
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

  const [updateTableInfoDtl] = useMutation(CREATE_TABLE_UPDATE_MUTATION, {
    refetchQueries: [
      {
        query: GET_TABLE_DATA_QUERY,
        variables: { tableName: data.label },
      },
    ],
  });
  const [deleteTableInfoDtl] = useMutation(CREATE_TABLE_DELETED_MUTATION);

  const onChange = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          setTimeout(() => {
            node.data = {
              ...node.data,
              label: evt.target.value,
            };
          }, 500);
          updateTableInfoDtl({
            variables: {
              tableDescription: evt.target.value,
              newTableName: evt.target.value,
              oldTableName: node.data.label,
              tableType: "General",
            },
          });
        }
        return node;
      })
    );
    setAdminALert(true);
    setAlertStatus("Successfully change table name");
    setOpen(false);
  };

  const editItem = (index, newValue) => {
    const updatedItems = [...items];
    updatedItems[index] = newValue;
    setItems(updatedItems);
    const { nodes } = store.getState();
    nodes.map((node) => {
      if (node.id === id) {
        const label = node.data.label;
        const datalist = node.data.collist;

        console.log("check", label, datalist);
        const listValue = datalist
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

        listValue.map((item, i) => {
          console.log("item", item, i, index, newValue);
          if (i === index) {
            updateTableColInfo({
              variables: {
                colClassi: "internal",
                colDataType: "char",
                oldColumnName: item,
                newColumnName: newValue,
                colDesc: item,
                tableColId: i + 1,
                tableName: label,
              },
            });
            setAdminALert(true);
            setAlertStatus("Successfully change column name");
          }
        });
      }
    });
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const onChangeList = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            collist: evt.target.value,
          };

          if (flag === true) {
            setTimeout(() => {
              const datalist = evt.target.value;
              const listValue = datalist.split(",");
              setItems(listValue);
              const commonItems = listValue.filter((item) =>
                skipItem.includes(item)
              );

              const filteredArrayA = listValue.filter(
                (item) => !commonItems.includes(item)
              );

              console.log("data balacne", filteredArrayA);
              filteredArrayA.map((item, i) => {
                createTableColInfo({
                  variables: {
                    colClassi: "internal",
                    colDataType: "char",
                    colDesc: item,
                    columnName: item,
                    tableColId: i + 1,
                    tableName: data.label,
                  },
                });
              });
            }, 2000);
            setAdminALert(true);
            setAlertStatus("Successfully add new column");
          }
        }
        return node;
      })
    );
    setOpen1(false);
    setFlag(false);
  };

  const datalist = data.collist;
  const arrayFromInput = datalist
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const updateNodeInternals = useUpdateNodeInternals();

  const addRow = () => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            rows: node.data.rows + 1,
          };
        }
        return node;
      })
    );
    updateNodeInternals(id);
  };

  const addRowDeleted = () => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            rows: node.data.rows - 1,
          };
        }
        return node;
      })
    );
    updateNodeInternals(id);
  };

  // const addRow = () => {
  //   setNodes((nds) =>
  //     nds.map((n) => {
  //       if (n.id === id) {
  //         n.data = {
  //           rows: n.data.rows + 1,
  //         };

  //         return { ...n };
  //       }

  //       return n;
  //     })
  //   );
  //   updateNodeInternals(id);
  // };

  // const deleteNode = useCallback(() => {}, [id, setNodes, setEdges]);

  const handleClickOpenName = () => {
    setOpenName(true);
  };

  const onChangeName = (evt) => {
    const { nodes } = store.getState();

    setNodes(
      nodes?.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: evt.target.value,
          };
        }
        return node;
      })
    );
    setOpenName(false);
  };


  const deleteNode = () => {
    setTimeout(() => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, 2000);
  };

  const onDataDeleted = () => {
    const { nodes } = store.getState();
    nodes.map((node) => {
      if (node.id === id) {
        setTimeout(() => {
          deleteTableInfoDtl({
            variables: {
              tableName: node.data.label,
            },
          });
        }, 2000);
        const datalist = node.data.collist;
        const label = node.data.label;
        const listValue = datalist
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        console.log("list", listValue, label);

        listValue.map((item, i) => {
          deleteTableColInfo({
            variables: {
              columnName: item,
              tableName: label,
            },
          });
        });
        setAdminALert(true);
        setAlertStatus("Successfully deleted table name");
      }
      return node;
    });
  };

  // Table Data Create Mutation

  const [createTableInfoDtl] = useMutation(CREATE_TABLE_MUTATION, {
    refetchQueries: [
      // {
      //   query: TABLE_DATA_DETAIL,
      //   variables: { tableId: 37, tableColId: 0, tabRelId: "" },
      // },
    ],
  });

  const createTableData = () => {
    createTableInfoDtl({
      variables: {
        tableName: "TableA",
        tableDescription: "TableA Description",
        tableType: "general",
      },
    });
  };

  const onFlowDataListDelete = (index) => {
    const { nodes } = store.getState();
    nodes.map((node) => {
      if (node.id === id) {
        const label = node.data.label;
        const datalist = node.data.collist;

        console.log("check", label, datalist);
        const listValue = datalist
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        listValue.map((item, i) => {
          console.log("item", item, i, index);
          if (i === index) {
            deleteTableColInfo({
              variables: {
                columnName: label,
                tableName: item,
              },
            });
            setAdminALert(true);
            setAlertStatus("Successfully deleted column");
          } else {
            setSkipItem(...item);
          }
        });
      }
    });
  };

  const onFlowDataListEdit = (index) => {
    const { nodes } = store.getState();
    nodes.map((node) => {
      if (node.id === id) {
        const label = node.data.label;
        const datalist = node.data.collist;

        console.log("check", label, datalist);
        const listValue = datalist
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        listValue.map((item, i) => {
          console.log("item", item, i, index);
          if (i === index) {
            updateTableColInfo({
              variables: {
                colClassi: "internal",
                colDataType: "char",
                oldColumnName: item,
                newColumnName: "pre",
                colDesc: item,
                tableColId: i + 1,
                tableName: label,
              },
            });
          }
        });
      }
    });
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
            {name}
          </Text>
          <Tooltip title="Table Name Edit" placement="top">
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
              // onClick={() => {
              //   setCheckApienv(true);
              //   const filapiData = apiCreateData?.filter(
              //     (node) => node.node_id === id
              //   );
              //   // console.log("197 filapiData", filapiData)
              //   if (filapiData.length !== 0) {
              //     filapiData?.map((item, index) => {
              //       // console.log("199 filapiData item", item);
              //       setApiParameterDataList(
              //         JSON.parse(item?.api_parameter.replace(/'/g, '"'))
              //       );
              //       var sectionDataList = [];
              //       var sectionData = {};
              //       for (const [key, value] of Object.entries(
              //         JSON.parse(item?.api_parameter.replace(/'/g, '"'))
              //       )) {
              //         sectionData[key] = value;
              //         if (sectionData.length !== 0) {
              //           sectionDataList.push(sectionData);
              //           sectionData = {};
              //         }
              //       }
              //       setApiParameterData(sectionDataList);
              //     });
              //   }
              // }}
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

              // onClick={() => onSaveApiData()}
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
            // onClick={() => {
            //   const filapiData = apiCreateData?.filter(
            //     (node) => node.node_id === id
            //   );
            //   // console.log("197 filapiData", filapiData)
            //   if (filapiData.length !== 0) {
            //     setPipeLineShow(true);
            //     {
            //       filapiData?.map((item, index) => {
            //         // console.log("199 filapiData item", item);
            //         setPipeLineCode(item?.custom_code);
            //         // setPipeLineCodeParams(JSON.parse(item?.api_parameter.replace(/'/g, '"')))
            //         setPipeLineCodeParams(item?.api_parameter);
            //         setApiRouterG(BaseURL + item?.api_url);
            //       });
            //     }
            //   } else {
            //     setPipeLineShow(true);
            //     setPipeLineCode("");
            //   }
            // }}
            // variant="text"
            // size="sm"
            // endIcon={
            //   <ArrowOutwardIcon
            //     sx={{
            //       fontSize: "12px",
            //       marginLeft: "-8px",
            //       "&:hover": {
            //         color: "green",
            //       },
            //     }}
            //   />
            // }
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
        <Tooltip title="Column Add" placement="top">
          <IconButton
            sx={{ marginLeft: "1px", marginRight: "1px" }}
            aria-label="delete"
            size="small"
            // onClick={() => {
            //   handleClickOpenDetails();
            // }}
            onClick={() => {
              handleClickOpen1();
              handleDataChange();
            }}
          >
            <AddOutlinedIcon
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
            Cancel
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
          <div className="w-[350px]">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-white"
            >
              Table Name
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

      {/* <Dialog
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
      </Dialog> */}

      {/* <Dialog
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
      </Dialog> */}

      {/* <Dialog
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
      </Dialog> */}

      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{}}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-1.5 mr-1 pl-1"
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              addItem();
              addRow();
            }}
            startIcon={<AddOutlinedIcon />}
          >
            Add
          </Button>

          <Box sx={{ marginTop: 1 }}>
            {items.map((item, index) => (
              <Box key={index} sx={{ padding: 0.5 }}>
                <ArrowRightAltIcon />
                {item}
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => editItem(index, prompt("Edit item:", item))}
                >
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    deleteItem(index);
                    onFlowDataListDelete(index);
                    addRowDeleted();
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={handleClose1}
            sx={{
              marginRight: -4,
              padding: 0,
              color: "black",
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
            value={items}
            nodeId={id}
            autoFocus
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

export default memo(CustomNode);
