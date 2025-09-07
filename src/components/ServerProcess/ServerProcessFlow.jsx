import React, { useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, IconButton } from "@mui/material";
import { AppContext } from "../../AppContext";

import ServerFlowChart from "./ServerFlowChart";
import ProcessLogDataShow from "./ProcessLogDataShow";
import ProcessPythonCodeRun from "./ProcessPythonCodeRun";
import ProcessAllLogDataShow from "./ProcessAllLogDataShow";

const ServerProcessFlow = () => {
  const { processShow, setProcessShow, pyShow, processAllShow } =
    useContext(AppContext);

  return (
    <>
      <Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{
              maxWidth: "1700px",
              height: "750px",
              border: "1px solid green",
              display: "flex",
            }}
          >
            <ServerFlowChart />

            {processShow === true ? (
              <Box
                sx={{
                  width: 450,
                  height: 600,
                }}
              >
                <ProcessLogDataShow />
              </Box>
            ) : (
              ""
            )}
            {pyShow === true ? (
              <Box
                sx={{
                  width: 450,
                  height: 600,
                }}
              >
                <ProcessPythonCodeRun />
              </Box>
            ) : processAllShow === true ? (
              <Box
                sx={{
                  width: 450,
                  height: 600,
                }}
              >
                <ProcessAllLogDataShow />
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

export default ServerProcessFlow;
