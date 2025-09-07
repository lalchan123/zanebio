import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function ImageWidth({ setImageSize }) {
  return (
    <Box sx={{ width: "100%", fontSize: "10px" }}>
      <Slider
        size="md"
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
