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

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function CustomNode({ handleIndex, ...props }) {
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

  return (
    <>
      <div className="custom-node__header">
        <Box>
          {data.label}
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
            // onClick={() => {
            //   handleClickOpen1();
            //   handleDataChange();
            // }}
          >
            <AddOutlinedIcon sx={{ fontSize: "14px" }} size="small" />
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
          <Divider variant="outside" component="div" sx={{ marginBottom: 1 }} />
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
        <Handle
          type="source"
          position={Position.Left}
          id="a"
          style={{ bottom: 10, top: "auto", background: "#555" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="target "
          position={Position.Right}
          id="b"
          style={{ bottom: 10, top: "auto", background: "#555" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="c"
          style={{ bottom: 0, top: "auto", background: "#555" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="target "
          position={Position.Top}
          id="d"
          style={{ top: 0, background: "#555" }}
          isConnectable={isConnectable}
        />
      </div>

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
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <input onChange={(e) => setBody(e.target.value)} value={body} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
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
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseType}>Cancel</Button>
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
    </>
  );
}

export default memo(CustomNode);
