import React, { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { AppContext } from "../../AppContext";
import CloseIcon from "@mui/icons-material/Close";
export function SortableItem(props) {
  const {
    logicEditor,
    setLogicEditor,
    logicCode,
    setLogicCode,
    filterEditor,
    setFilterEditor,
    filterCode,
    setFilterCode,
    sourceData,
    setSourceData,
    chartDataShow,
    setChartDataShow,
    itemShow,
    setItemShow,
    cardItems,
    setCardItems,
  } = useContext(AppContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const addItemDeleted = (id) => {
    const removeItem = cardItems.filter((item, i) => item.id !== id);
    setCardItems(removeItem);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <p>
        hi, props.key = {props.key}, props.id = {props.id}, value {props.value}
      </p> */}
      {props.value === "button" ? (
        <Button
          variant="outlined"
          size="small"
          sx={{ textTransform: "capitalize", width: 250 }}
        >
          Button
        </Button>
      ) : props.value === "input" ? (
        <>
          <TextField
            id="outlined-basic"
            label="input"
            variant="outlined"
            size="small"
            sx={{ width: 250 }}
          />
          <IconButton onClick={() => addItemDeleted(props.id)} size="small">
            <CloseIcon size="small" />
          </IconButton>
        </>
      ) : props.value === "checkbox" ? (
        <FormControlLabel
          control={<Checkbox />}
          label="Label"
          size="small"
          sx={{ width: 250 }}
        />
      ) : props.value === "search" ? (
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 250,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "4px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      ) : props.value === "image" ? (
        <Button
          variant="outlined"
          size="small"
          sx={{ textTransform: "capitalize", width: 250 }}
          disabled
        >
          Image
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
