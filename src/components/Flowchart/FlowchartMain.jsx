import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, IconButton } from "@mui/material";
import { AppContext } from "../../AppContext";
import LogicCodeAndResultShow from "./LogicCodeAndResultShow";
import FilterLogicCodeShow from "./FilterLogicCodeShow";
import { DataShowOnChart } from "./DataShowOnChart";
import SqlDataShow from "./SqlDataShow";
import MenuDesignFormShow from "./MenuDesignFormShow";
import FormulaCodeEditor from "./TerminalCodeEditorShow/FormulaEditor/FormulaCodeEditor";
import FormulaDataTestResult from "./FormulaDataTestResult/FormulaDataTestResult";
import JoinCodeEditor from "./TerminalCodeEditorShow/FormulaEditor/JoinCodeEditor";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import ProcessFlow from "./ProcessFlow";
import ProcessFlow2 from "./ProcessFlow2";

const FlowchartMain = () => {
  const {
    logicEditor,
    filterEditor,
    chartDataShow,
    sqlShow,
    menuShow,
    formulaShow,
    formulaTestShow,
    joinShow,
    userId,
    setUserId
  } = useContext(AppContext);

  const [db, setDb] = useState(1);
  const confApi = GetAllTableData(620, userId);
  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );
        
     
  useEffect(() => {
    {
      confApiData?.map((item, index) => {
        if (item.ConfKey === "DB") {
          setDb(item.ConfValue);
        }
      });
    }
  }, [confApiData]);

  return (
    <>
      <Container maxWidth="2xl">
        <Grid container spacing={2} sx={{ marginTop: 3, marginBottom: 5 }}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                maxWidth: "2000px",
                height: "700px",
                border: "1px solid green",
                display: "flex",
              }}
            >
              {
                parseInt(db) == 1 ?
                  <>
                    <ProcessFlow />

                    {logicEditor === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <LogicCodeAndResultShow />
                      </Box>
                    ) : (
                      ""
                    )}
                    {filterEditor === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <FilterLogicCodeShow />
                      </Box>
                    ) : (
                      ""
                    )}
                    {chartDataShow === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <DataShowOnChart />
                      </Box>
                    ) : sqlShow === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <SqlDataShow />
                      </Box>
                    ) : menuShow === true ? (
                      <MenuDesignFormShow />
                    ) : formulaShow === true ? (
                      <FormulaCodeEditor />
                    ) : formulaTestShow === true ? (
                      <FormulaDataTestResult />
                    ) : joinShow === true ? (
                      <JoinCodeEditor />
                    ) : (
                      ""
                    )}
                  </>
               :parseInt(db) == 2 ?
                    <>
                    <ProcessFlow2 />

                    {logicEditor === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <LogicCodeAndResultShow />
                      </Box>
                    ) : (
                      ""
                    )}
                    {filterEditor === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <FilterLogicCodeShow />
                      </Box>
                    ) : (
                      ""
                    )}
                    {chartDataShow === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <DataShowOnChart />
                      </Box>
                    ) : sqlShow === true ? (
                      <Box
                        sx={{
                          width: 450,
                          height: 600,
                          // backgroundColor: "#F1F6F9",
                        }}
                      >
                        <SqlDataShow />
                      </Box>
                    ) : menuShow === true ? (
                      <MenuDesignFormShow />
                    ) : formulaShow === true ? (
                      <FormulaCodeEditor />
                    ) : formulaTestShow === true ? (
                      <FormulaDataTestResult />
                    ) : joinShow === true ? (
                      <JoinCodeEditor />
                    ) : (
                      ""
                    )}
                  </>
                : ""
              }
              
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FlowchartMain;
