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
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { AppContext } from "../../AppContext";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import {
  SimpleTreeItemWrapper,
  SortableTree,
  // TreeItemComponentProps,
  // TreeItems,
} from "dnd-kit-sortable-tree";
const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function MenuDesignFormShow() {
  const { menuShow, setMenuShow, menuItems, setMenuItems } =
    useContext(AppContext);

  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const [count, setCount] = useState(1);
  const [addName, setAddName] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [input, setInput] = useState("");
  const [itemId, setItemId] = useState("");

  const onClickShowHide = () => {
    setAddName(!addName);
  };

  const onClickId = (id) => {
    setItemId(id);
  };

  const addNewMenuItem = (value) => {
    setCount(count + 1);
    setMenuItems([
      ...menuItems,
      { id: uniqueId + count, name: value || "New Item" },
    ]);
  };

  const menuItemDeleted = (id) => {
    const removeItem = menuItems.filter((item, i) => item.id !== id);
    setMenuItems(removeItem);
  };

  const onEditMenuItem = (value) => {
    setMenuItems((prevArray) =>
      prevArray.map((item, i) => {
        if (item.id === itemId) {
          return {
            ...item,
            name: value, // Add the new key and value
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          bgcolor: "#F5F5F5",
          height: 597,
          borderLeft: "1px solid green",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            height: "40px",
            p: 1,
            bgcolor: "#F1F6F9",
          }}
        >
          <Box sx={{ fontSize: "12px", display: "inline" }}>Menu Design</Box>
          <IconButton
            // variant="outlined"
            onClick={() => setAddItem(true)}
            color="success"
            size="md"
            sx={{
              marginLeft: 2,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            <AddOutlinedIcon sx={{ fontSize: "20px" }} />
          </IconButton>

          {addItem && (
            <Box sx={{ display: "inline" }}>
              <input
                type="text"
                name="price"
                id="price"
                class="inline w-[150px] rounded-md border-0 py-1 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-2"
                onChange={(e) => setInput(e.target.value)}
              />
              <IconButton
                // variant="outlined"
                onClick={() => {
                  addNewMenuItem(input);
                  setAddItem(false);
                  setInput("");
                }}
                color="success"
                size="md"
                sx={{
                  marginLeft: 1,
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
              >
                <CheckOutlinedIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
          )}

          {addName && (
            <Box sx={{ display: "inline" }}>
              <input
                type="text"
                name="price"
                id="price"
                class="inline w-[150px] rounded-md border-0 py-1 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-2"
                onChange={(e) => setInput(e.target.value)}
              />
              <IconButton
                // variant="outlined"
                onClick={() => {
                  onEditMenuItem(input);
                  onClickShowHide(false);
                  setInput("");
                }}
                color="success"
                size="md"
                sx={{
                  marginLeft: 1,
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
              >
                <CheckOutlinedIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
          )}

          <Button
            onClick={() => {
              setMenuShow(false);
            }}
            color="success"
            size="small"
            sx={{
              float: "right",
              margin: 0,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            Close
          </Button>
        </Box>

        <Box
          sx={{
            maxWidth: "100%",
            minWidth: "400px",
            height: "35px",
            p: 1,
            // bgcolor: "#F1F6F9",
            fontSize: "12px",
          }}
        >
          <SortableTree
            items={menuItems}
            onItemsChanged={setMenuItems}
            TreeItemComponent={TreeItem}
            menuItemDeleted={menuItemDeleted}
            onEditMenuItem={onEditMenuItem}
            onClickShowHide={onClickShowHide}
            addName={addName}
            onClickId={onClickId}
          />
        </Box>
      </Box>{" "}
    </>
  );
}

const TreeItem = React.forwardRef((props, ref) => {
  const [sample, setSample] = useState(props.item.name);

  return (
    <div>
      <SimpleTreeItemWrapper {...props} ref={ref}>
        <div>{props.item.name}</div>
      </SimpleTreeItemWrapper>
      <div className="flex justify-end">
        <IconButton
          onClick={() => {
            props.onClickShowHide(props.item.id);
            props.onClickId(props.item.id);
          }}
          color="success"
          size="small"
          sx={{
            marginTop: -5,
            padding: 0,
            marginRight: 1.5,
            textTransform: "capitalize",
            fontSize: "12px",
          }}
        >
          <ModeEditOutlinedIcon sx={{ fontSize: "15px" }} />
        </IconButton>

        <IconButton
          onClick={() => {
            props.menuItemDeleted(props.item.id);
          }}
          color="success"
          size="small"
          sx={{
            marginTop: -5,
            marginRight: 1.5,
            padding: 0,
            textTransform: "capitalize",
            fontSize: "12px",
          }}
        >
          <CloseIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </div>
    </div>
  );
});

export default memo(MenuDesignFormShow);
