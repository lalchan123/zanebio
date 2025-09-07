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
import AddIcon from "@mui/icons-material/Add";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import { list, tab } from "@material-tailwind/react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import FormControl from "@mui/material/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  GET_TABLE_DATA_QUERY,
  GET_TABLE_COL_DATA_QUERY,
} from "../../GraphQL/Queries";

import {
  CREATE_TABLE_MUTATION,
  CREATE_TABLE_UPDATE_MUTATION,
  CREATE_TABLE_DELETED_MUTATION,
  CREATE_TABLE_MUTATION2,
  CREATE_TABLE_UPDATE_MUTATION2,
  CREATE_TABLE_DELETED_MUTATION2,
  CREATE_TABLE_COL_MUTATION,
  CREATE_TABLE_COL_UPDATE_MUTATION,
  CREATE_TABLE_COL_DELETED_MUTATION,
  CREATE_TABLE_COL_MUTATION2,
  CREATE_TABLE_COL_UPDATE_MUTATION2,
  CREATE_TABLE_COL_DELETED_MUTATION2,
} from "../../GraphQL/Mutations";
import { AppContext } from "../../AppContext";
import useLazyQueryAllTableCol from "../../GraphQLApiCall/useLazyQueryAllTableCol";
import TestDataShowTable from "../Flowchart/TestDataShowTable/TestDataShowTable";
import { BaseURL } from "../../Constants";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";

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
    fileNameJoin,
    setFileNameJoin,
    userId,
    setUserId
  } = useContext(AppContext);

  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [input, setInput] = useState(data.name);
  const [tableName, setTableName] = useState("Node Name");
  const [openName, setOpenName] = React.useState(false);
  const [flag, setFlag] = useState(false);
  const [skipItem, setSkipItem] = useState([]);
  const [name, setName] = useState(data.name);
  const [name1, setName1] = useState(name);
  const [tableDesc, setTableDesc] = useState(data.tableDesc);
  const [tableType, setTableType] = useState(data.tableType);
  console.log("name, tableDesc, tableType", name, tableDesc, tableType)

  const [localData, setLocalData] = useState("");
   
  const [createTableColInfo] = useMutation(CREATE_TABLE_COL_MUTATION);
  const [updateTableColInfo] = useMutation(CREATE_TABLE_COL_UPDATE_MUTATION);
  const [deleteTableColInfo] = useMutation(CREATE_TABLE_COL_DELETED_MUTATION);

  // const [createTableColInfo2] = useMutation(CREATE_TABLE_COL_MUTATION2);
  // const [updateTableColInfo2] = useMutation(CREATE_TABLE_COL_UPDATE_MUTATION2);
  // const [deleteTableColInfo2] = useMutation(CREATE_TABLE_COL_DELETED_MUTATION2);

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
  

  // Load data from local storage when the component mounts

  const savedData = localStorage.getItem("example-flow");

  const jsonDataMy = JSON.parse(savedData);

  console.log("100 data.collist", data.collist)
  const datalist1 = data.collist;
  const arrayFromInput1 = datalist1
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const handleCount2 = arrayFromInput1.colhandleCount || 0;

  // const [items, setItems] = useState([]);
  const [items, setItems] = useState(data.column);
  const [inputValue, setInputValue] = useState("");

  console.log("112 items", items)

  // Functions for handling actions
  const addItem = () => {
    if (inputValue.trim() !== "") {
      // setItems([...items, inputValue]);
      // setItems([...items, inputValue1]);
      const column_id = Object.keys(items).length;
      console.log("1191 column_id", column_id + 1)
      setItems((prevState) => ({
        ...prevState,
        [column_id + 1]: inputValue,
      }));
      setInputValue("");
    }

    setFlag(true);
  };

  useEffect(() => {
    addRow();
  }, [items, name, tableDesc, tableType])

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeDataSource = (event) => {
    setDataSource(event.target.value);
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
      // console.log("248", id, data.label, eedData, nodeInternals, nodeId);
    });
  };

  const SaveTableName = () => {
    console.log("146 SaveTableName")
    console.log("202 tableType", tableType)
    if (tableType == 'table data') {
      createTableInfoDtl({
        variables: {
          tableName: name,
          tableDescription: tableDesc ? tableDesc : `${name} Desc`,
          tableType: tableType ? tableType : `general`,
          userId: userId,
          db: parseInt(db),
        },
      });
      toast.success("Table Name Created Successfully")
    } else if (tableType == 'json data') {
      console.log("212 tableType", tableType)
      axios
        .post(`${BaseURL}/account/table-info-dtl-create-api/`, {
          data: {
            table_name: name,
            table_description: tableDesc ? tableDesc : `${name} Desc`,
            table_type: tableType ? tableType : `general`,
            user_id: userId,
            db: parseInt(db),
        } }, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // setRestApiPostData(response.data.data);
          console.log("response.data", response)
          // setFormValues({});
          toast.success(response.data.message)
        })
        .catch((error) => {
          // setRestApiPostError({ responseData: null, error: error.message });
          console.log("error.message", error.response.data.message)
          // setFormValues({});
          toast.error(error.response.data.message)
        });
    }
   
    
  };
  const SaveColumnName = () => {
    // console.log("149 SaveColumnName")
    // items.map((item, i) => {
    //   createTableColInfo({
    //     variables: {
    //       colClassi: "internal",
    //       colDataType: "char",
    //       colDesc: item,
    //       columnName: item,
    //       tableColId: i + 1,
    //       tableName: name,
    //       // tableName: data.label,
    //     },
    //   });
    // });
    // console.log("217 items", items)
    // console.log("218 name", name)
    if (tableType == 'table data') {
      setTimeout(() => {
        Object.entries(items).map(([key, value]) => {
          createTableColInfo({
            variables: {
              colClassi: "internal",
              colDataType: "char",
              colDesc: value,
              columnName: value,
              tableColId: key,
              tableName: name,
              userId: userId,
              // tableName: data.label,
              db: parseInt(db)
            },
          });
        });
      }, 500);
      toast.success("Table Column Name Created Successfully")
    } else if (tableType == 'json data') {
      console.log("212 tableType", tableType)
      axios
        .post(`${BaseURL}/account/table-col-info-create-api/`, {
          data: {
            items: items,
            table_name: name,
            user_id: userId,
            db: parseInt(db),
          }
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // setRestApiPostData(response.data.data);
          console.log("response.data", response)
          // setFormValues({});
          toast.success(response.data.message)
        })
        .catch((error) => {
          // setRestApiPostError({ responseData: null, error: error.message });
          console.log("error.message", error.response.data.message)
          // setFormValues({});
          toast.error( error.response.data.message)
        });
    }
   
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

  const [detailShow, setDetailShow] = useState(false)
  const handleDetailShowClose = () => {
    setDetailShow(false);
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
              userId: userId,
              db: parseInt(db)
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

  const editItem = (key, newValue) => {
    setItems((prevData) => ({
      ...prevData,
      [key]: newValue,
    }));
    // const { nodes } = store.getState();
    // nodes.map((node) => {
    //   if (node.id === id) {
    //     const label = node.data.label;
    //     const datalist = node.data.collist;

    //     console.log("check", label, datalist);
    //     const listValue = datalist
    //       .split(",")
    //       .map((item) => item.trim())
    //       .filter(Boolean);

    //     listValue.map((item, i) => {
    //       console.log("item", item, i, index, newValue);
    //       if (i === index) {
    //         updateTableColInfo({
    //           variables: {
    //             colClassi: "internal",
    //             colDataType: "char",
    //             oldColumnName: item,
    //             newColumnName: newValue,
    //             colDesc: item,
    //             tableColId: i + 1,
    //             tableName: label,
    //           },
    //         });
    //         setAdminALert(true);
    //         setAlertStatus("Successfully change column name");
    //       }
    //     });
    //   }
    // });
  };

  const deleteItem = (excludedKey) => {
    // const updatedItems = items.filter((_, i) => i !== index);
    const updatedItems = Object.fromEntries(
      Object.entries(items).filter(([key]) => key !== excludedKey)
    );
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

          // if (flag === true) {
          //   setTimeout(() => {
          //     const datalist = evt.target.value;
          //     const listValue = datalist.split(",");
          //     setItems(listValue);
          //     const commonItems = listValue.filter((item) =>
          //       skipItem.includes(item)
          //     );

          //     const filteredArrayA = listValue.filter(
          //       (item) => !commonItems.includes(item)
          //     );

          //     console.log("data balacne", filteredArrayA);
          //     filteredArrayA.map((item, i) => {
          //       createTableColInfo({
          //         variables: {
          //           colClassi: "internal",
          //           colDataType: "char",
          //           colDesc: item,
          //           columnName: item,
          //           tableColId: i + 1,
          //           tableName: name,
          //           // tableName: data.label,
          //         },
          //       });
          //     });
          //   }, 2000);
          //   setAdminALert(true);
          //   setAlertStatus("Successfully add new column");
          // }
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
    console.log("480 nodes", nodes)
    console.log("481 items", items)
    console.log("481 name", name)
    console.log("481 tableDesc", tableDesc)
    console.log("481 tableType", tableType)
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            rows: node.data.rows + 1,
            name: name,
            tableDesc: tableDesc,
            tableType: tableType,
            column: items,
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
    setName(name1);
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
              userId: userId,
              db: parseInt(db)
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
        toast.success("Successfully deleted table name")
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
        db: parseInt(db)
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
        // onClick={alert("hello")}
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
          <Tooltip title={Object.keys(items).length !==0 ? "Edit or Add Column": "Add Column"} placement="top">
            <IconButton
              sx={{ marginLeft: "1px", marginRight: "1px" }}
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpen1();
                // handleDataChange();
              }}
            >
              {
                Object.keys(items).length !==0 ? 
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
                :
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
              }
             
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                deleteNode();
                onDataDeleted();
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
              onClick={() => {
                SaveTableName();
                SaveColumnName();
              }}
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
              setDetailShow(true);
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
        
        <Box sx={{ marginTop: 1 }}>
          {/* {items.map((item, index) => ( */}
          {Object.entries(items).map(([key, value]) => (
            <Box key={key} sx={{
              fontSize: "8px",
              color: "black",
              "&:hover": {
                color: "green",
              },}}>
              <ArrowRightAltIcon
                sx={{
                  fontSize: "8px",
                  color: "black",
                 }}
              />
              {value}
            </Box>
          ))}
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
            bgcolor: "#ffffff",
            borderTop: "1px solid white",
            borderRight: "1px solid white",
            borderLeft: "1px solid white",
            borderRadius: 1,
          }}
        >
          <div className="w-[350px]">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-black"
            >
              Table Name
            </label>
            <input
              type="text"
              id="first_name"
              // class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="type..."
              required
              onChange={(e) => setName1(e.target.value)}
              value={name1}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#ffffff",
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
            <CloseIcon sx={{ color: "black", fontSize: "20px" }} />
          </IconButton>
          <Button
            onChange={onChangeName}
            onClick={onChangeName}
            value={name}
            nodeId={id}
            autoFocus
            size="small"
            sx={{ fontSize: "20px", color: "black", margin: 0, padding: 0 }}
          >
            ⮕
          </Button>
        </DialogActions>
      </Dialog>

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
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            placeholder="Enter Column Name"
            className="bg-gray-200 border border-red-200 text-gray-900 text-sm rounded-lg py-1.5 mr-1 pl-1"
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              addItem();
              // addRow();
            }}
            startIcon={<AddOutlinedIcon />}
          >
            Add
          </Button>

          <Box sx={{ marginTop: 1 }}>
            {/* {items.map((item, index) => ( */}
            {Object.entries(items).map(([key, value]) => (
              <Box key={key} sx={{ padding: 0.5 }}>
                <ArrowRightAltIcon />
                {value}
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => editItem(key, prompt("Edit item:", value))}
                >
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    deleteItem(key);
                    onFlowDataListDelete(key);
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

      {/* <Dialog
        maxWidth="lg"
        open={detailShow}
        onClose={handleDetailShowClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogTitle>Table Detail</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 300, minHeight: 250 }}>
            <FormControl fullWidth size="small">
              <TextField
                style={{marginTop: '10px'}}
                id="outlined-basic"
                label="Table Name"
                variant="outlined"
                value={tableName1}
                onChange={(e)=> setTableName1(e.target.value)}
              />
              <TextField
                style={{marginTop: '10px'}}
                id="outlined-multiline-static"
                label="Table Description"
                multiline
                rows={3}
                value={tableDesc}
                onChange={(e)=> setTableDesc(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth size="small"  sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
              <Select
                // style={{marginTop: '1px'}}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={type}
                label="Type"
                onChange={handleChangeType}
                // onClick={}
              >
                <MenuItem value={"model"}>model</MenuItem>
                <MenuItem value={"json"}>json</MenuItem>
                <MenuItem value={"mysql"}>mysql</MenuItem>
              </Select>
            </FormControl>
            {
              type ?
              <FormControl fullWidth size="small"  sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-standard1-label">Data Source</InputLabel>
                <Select
                  // style={{marginTop: '1px'}}
                  labelId="demo-simple-select-standard1-label"
                  id="demo-simple-select-standard1"
                  value={dataSource}
                  label="Data Source"
                  onChange={handleChangeDataSource}
                >
                  <MenuItem value={"model"}>model</MenuItem>
                  <MenuItem value={"json"}>json</MenuItem>
                  <MenuItem value={"mysql"}>mysql</MenuItem>
                </Select>
              </FormControl>
              :""  
            }
            
          </Box>
        </DialogContent>
        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Tooltip title="Close" placement="top">
            <Button
              onClick={handleDetailShowClose}
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
          </Tooltip> 
          <Tooltip title="Submit" placement="top">
            <Button
              // onClick={PageCreateSave}
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
          </Tooltip>  
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={detailShow}
        onClose={handleDetailShowClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        PaperProps={{ sx: { borderRadius: "50px", marginLeft: "1300px" } }}
      >
        <DialogTitle>Table Detail</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Box sx={{ minWidth: 450 }}>
              <FormControl fullWidth size="small">
                <TextField
                  style={{marginTop: '10px'}}
                  id="outlined-basic"
                  label="Table Name"
                  variant="outlined"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
                <TextField
                  style={{marginTop: '10px'}}
                  id="outlined-multiline-static"
                  label="Table Description"
                  multiline
                  rows={3}
                  value={tableDesc}
                  onChange={(e)=> setTableDesc(e.target.value)}
                />
              </FormControl>
              <FormControl
                color="success"
                fullWidth
                size="small"
                sx={{ fontSize: "14px", mt: 2 }}
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
                  value={tableType}
                  label="Type"
                  onChange={(e) => setTableType(e.target.value)}
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
                    value={"external file creation"}
                  >
                    External file creation
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "14px" }}
                    size="small"
                    value={"table data"}
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
          </Box>
          
        </DialogContent>

        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={handleDetailShowClose}
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
            onClick={handleDetailShowClose}
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

export default memo(CustomNode);
