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

export default function BoxWidthSize({ setWidth, width }) {
  const defualtWidth = width;
  
  function valuetext(value) {
    setWidth(value + "%");
  }
  return (
    <Box sx={{ width: "100%", fontSize: "10px" }}>
      <Slider
        size="small"
        aria-label="Always visible"
        // defaultValue={80}
        defaultValue={parseInt(defualtWidth.split("%")[0])}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
