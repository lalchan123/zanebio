import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, IconButton } from "@mui/material";
import { AppContext } from "../../AppContext";
import PipeLineFlowchart from "./PipeLineFlowchart";
import PipeLineCodeEditor from "./PipeLineCodeEditor";

const PipeLineFlowchartShow = () => {
  const { pipeLineShow, setPipeLineShow } = useContext(AppContext);

  return (
    <>
      <Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{
              maxWidth: "1700px",
              height: "750px",
              display: "flex",
            }}
          >
            <PipeLineFlowchart />

            {pipeLineShow === true ? (
              <Box
                sx={{
                  width: 450,
                  height: 600,
                  // backgroundColor: "#F1F6F9",
                }}
              >
                <PipeLineCodeEditor />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PipeLineFlowchartShow;
