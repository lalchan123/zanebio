import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 100,
    label: "100",
  },
];

export default function BoxHeightSize({ setHeight, height }) {
  console.log("33 height", height, typeof(height))
  // height.split("px")
  const defualtHeight = height;
  // console.log("37 defualtHeight", defualtHeight.split("px"))
  function valuetext(value) {
    // setHeight(value + "0px");
    console.log("36 value", value)
    setHeight(value+ "px");
  }

  return (
    <Box sx={{ width: "100%", fontSize: "10px" }}>
      <Slider
        size="small"
        aria-label="Always visible"
        // defaultValue={80}
        defaultValue={parseInt(defualtHeight.split("px")[0])}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
