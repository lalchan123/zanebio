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
  const [flag, setFlag] = useState(false);
  const [skipItem, setSkipItem] = useState([]);

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
      <div className="custom-node__header">
        <Box
          sx={{
            bgcolor: "#1565C0",
            borderRadius: 1,
            padding: "0px 1px 0px 5px",
          }}
        >
          <span style={{ color: "white", fontSize: "9px" }}>
            {data.label.split("_")[0]}
          </span>
          {/* <input
            onChange={(e) => setTableName(e.target.value)}
            value={tableName}
          /> */}
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpen();
              onTableDataMutation();
            }}
            sx={{
              color: "white",
              "&:hover": {
                color: "green",
              },
            }}
          >
            <ModeEditOutlineOutlinedIcon
              sx={{ fontSize: "9px" }}
              size="small"
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpen1();
              handleDataChange();
            }}
            sx={{
              color: "white",
              "&:hover": {
                color: "green",
              },
              marginLeft: -1,
            }}
          >
            <AddOutlinedIcon sx={{ fontSize: "10px" }} size="small" />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              "&:hover": {
                color: "green",
              },
              marginLeft: -1,
            }}
            aria-label="delete"
            size="small"
            onClick={() => {
              deleteNode();
              onDataDeleted();
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: "10px" }} size="small" />
          </IconButton>

          {/* <Handle
            type="source"
            position={Position.Left}
            id="b"
            style={{ bottom: 10, top: "auto", background: "#555" }}
            isConnectable={isConnectable}
          /> */}
          {/* <Handle
            type="source"
            position={Position.Right}
            id="b"
            style={{ bottom: 10, top: "auto", background: "#555" }}
            isConnectable={isConnectable}
          /> */}
        </Box>
        <Divider variant="outside" component="div" sx={{ marginBottom: 1 }} />
        {arrayFromInput.map((item, index) => (
          <Box key={index}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: "8px",
                padding: 0,
                margin: 0,
              }}
            >
              {item}
            </Text>

            {/* <button
                onClick={() => editItem(index, prompt("Edit item:", item))}
              >
                Edit
              </button>
              <button onClick={() => deleteItem(index)}>Delete</button> */}
          </Box>
        ))}
        {Array.from(Array(data.rows).keys()).map((row) => (
          <div key={row}>
            <Handle
              type="target"
              position={Position.Left}
              id={`target-${row}`}
              style={{ top: 12 * row, marginTop: 44 }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id={`source-${row}`}
              style={{ top: 12 * row, marginTop: 44 }}
            />
          </div>
        ))}
      </div>
      {/* <input value={value} onChange={onChange} nodeId />
      <button onClick={handleClickOpen}>Click</button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            class="bg-gray-50 border border-blue-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex"
          />
        </DialogContent>
        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Button
            onClick={() => {
              handleClose();
            }}
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
            onChange={onChange}
            onClick={onChange}
            value={input}
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
