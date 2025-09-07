import React, { useState } from "react";
import { SketchPicker } from "react-color";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

// const ColorPicker = (props) => {
const ColorPicker = ({setColor, color}) => {
  console.log("13 color", color)
  // const [color, setColor] = useState();
  const [open, setOpen] = React.useState(false);

  // props.onColor(color);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  // destructuring rgba from state
  const { r, g, b, a } = sketchPickerColor;

  //creating state to store our color and also set color using onChange event for block picker
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Grid item xs={12} sx={{}}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            onClick={handleClickOpen}
            style={{
              // backgroundColor: props.getcolor || "#37d67a",
              backgroundColor: color || "#37d67a",
              width: 200,
              height: 20,
              border: "1px solid black",
            }}
          ></div>
          <Dialog
            sx={{}}
            open={open}
            onClose={() => {
              handleClose();
              setColor(`rgba(${r},${g},${b},${a})`);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ m: 0, p: 0 }}>
              <SketchPicker
                onChange={(color) => {
                  setSketchPickerColor(color.rgb);
                }}
                color={sketchPickerColor}
              />
            </DialogContent>
          </Dialog>
        </div>
      </Grid>
    </Grid>
  );
};

export default ColorPicker;
