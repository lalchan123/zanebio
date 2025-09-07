import React, { memo, useState, useMemo, useCallback, useEffect, useContext } from "react";
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
import { Divider, Tooltip } from "@mui/material";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";
import Papa from "papaparse";
import { AppContext } from "../../../AppContext";
import TestDataJsonDataTable from "../TestDataShowTable/TestDataJsonDataTable";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function CustomNodeAction({
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
    processFlow,
    setProcessFlow,
    ProcessFlowDataShowBool,
    setProcessFlowDataShowBool,
    BaseURL,
    setBaseURL,
  } =
    useContext(AppContext);

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

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

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


  // Load data from local storage when the component mounts

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

  const saveActionNodeData = (evt) => {
    const { nodes } = store.getState();
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            action: { action: processType },
          };
        }
        return node;
      })
    );
  };

  console.log("check 2021", processType);

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
          bgcolor: "#ffffff",
          padding: 1,
          borderRadius: 5,
          color: "black",
          border: "1px solid #DA0C81",
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
        <Tooltip title="Name" placement="top">
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
            onClick={saveActionNodeData}
            onChange={saveActionNodeData}
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
              fontSize: "8px",
              padding: 0,
              margin: 0,
              display: "inline",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            {data.body}
          </Text>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleClickOpen1();
            }}
          >
            <ModeEditOutlineOutlinedIcon
              sx={{ fontSize: "12px", color: "white" }}
              size="small"
            />
          </IconButton>
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
          <Box sx={{ minWidth: 200 }}>
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
                value={processType}
                label="Type"
                onChange={(e) => setProcessType(e.target.value)}
                size="small"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"mutation"}
                >
                  Mutation
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"callcard"}
                >
                  Card Call
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"popup"}
                >
                  Pop Up
                </MenuItem>
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
                  value={"rectangular"}
                >
                  Rectangular
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"rombus"}
                >
                  Rombus
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "14px" }}
                  size="small"
                  value={"circle"}
                >
                  Circle
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
          <Button onClick={handleClose2}>Cancle</Button>
          <Button onClick={handleClose2} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(CustomNodeAction);
