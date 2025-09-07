import React, { memo, useState, useMemo, useCallback, useEffect } from "react";

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
import { list, tab } from "@material-tailwind/react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

const useStyles = makeStyles((theme) => ({
  diamondContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Adjust as needed
  },
  diamond: {
    width: "150px", // Adjust the size of the diamond as needed
    height: "150px", // Adjust the size of the diamond as needed
    backgroundColor: "#F0F0F0", // Change the background color as desired
    transform: "rotate(45deg)",
    position: "relative",
    overflow: "hidden",
  },
  textField: {
    position: "absolute",
    top: "14%",
    right: "6%",
    // transform: "translate(-50%, -50%)",
    marginLeft: "0px",
    transform: "rotate(-45deg)",
  },
}));

function RombusCustomNode({
  id,
  data,
  value,
  setEdges,
  edges,
  isConnectable,
  sourcePosition,
  targetPosition,
  handleIndex,
  ...props
}) {
  const nodeId = useNodeId();
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);
  const [input, setInput] = useState(data.label);
  const [body, setBody] = useState(data.body);
  const [tableName, setTableName] = useState("Node Name");
  const [flag, setFlag] = useState(false);

  const [type, setType] = React.useState("rectangular");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

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
            type: "input",
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
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  const classes = useStyles();

  const [logic, setLogic] = React.useState("");

  const handleChange = (event) => {
    setLogic(event.target.value);
  };

  // const onCrateSizeItem = () => {
  //   const value = {
  //     id: uniqueId,
  //     title: "demo",
  //     grid: 12,
  //     size: size,
  //   };
  //   setCardTemplated(value);
  //   localStorage.setItem("createSize", JSON.stringify(value));
  // };

  return (
    <>
      <div className={classes.diamondContainer}>
        <div className={classes.diamond}>
          <Handle
            id="a"
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
            style={{
              top: 2,
              left: 8,

              width: "12px",
              height: "12px",
              backgroundColor: "#3C486B",
            }}
          />
          <Handle
            id="b"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            style={{
              bottom: 1,
              left: 143,
              width: "12px",
              height: "12px",
              backgroundColor: "#3C486B",
            }}
          />
          <Box
            className={classes.textField}
            sx={{
              padding: 2,
            }}
          >
            {/* {data.label} */}
            <FormControl
              sx={{ m: 1, minWidth: 100 }}
              size="small"
              color="success"
            >
              <InputLabel color="success" id="demo-select-small-label">
                Logic
              </InputLabel>
              <Select
                color="success"
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={logic}
                label="Logic"
                onChange={handleChange}
              >
                <MenuItem color="success" value={"1"}>
                  Max and Min Value
                </MenuItem>
                <MenuItem color="success" value={"2"}>
                  5 Years Data
                </MenuItem>
                <MenuItem color="success" value={"3"}>
                  10 Years Data
                </MenuItem>
              </Select>
            </FormControl>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpen();
              }}
            >
              <ModeEditOutlineOutlinedIcon
                sx={{ fontSize: "12px" }}
                size="small"
              />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                deleteNode();
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: "14px" }} size="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleClickOpenType();
              }}
            >
              <SettingsOutlinedIcon sx={{ fontSize: "14px" }} size="small" />
            </IconButton>
            <Divider
              variant="outside"
              component="div"
              sx={{ marginBottom: 1 }}
            />
            <Box sx={{ display: "inline" }}>
              <Text
                style={{
                  fontWeight: "250",
                  fontSize: "10px",
                  padding: 0,
                  margin: 0,
                  display: "inline",
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
                  sx={{ fontSize: "12px" }}
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
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <input onChange={(e) => setBody(e.target.value)} value={body} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1}>Cancle</Button>
              <Button
                onChange={onChangeList}
                onClick={onChangeList}
                value={body}
                nodeId={id}
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openType}
            onClose={handleCloseType}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChangeType}
                    size="small"
                  >
                    <MenuItem size="small" value={"rectangular"}>
                      Rectangular
                    </MenuItem>
                    <MenuItem size="small" value={"rombus"}>
                      Rombus
                    </MenuItem>
                    <MenuItem size="small" value={"circle"}>
                      Circle
                    </MenuItem>
                    <MenuItem size="small" value={"fileupload"}>
                      File Upload
                    </MenuItem>
                    <MenuItem size="small" value={"logic"}>
                      Logic
                    </MenuItem>
                    <MenuItem size="small" value={"filter"}>
                      Filter
                    </MenuItem>
                    <MenuItem size="small" value={"form"}>
                      Form
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseType}>Cancle</Button>
              <Button
                onChange={onChangeType}
                onClick={onChangeType}
                value={type}
                nodeId={id}
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default memo(RombusCustomNode);
