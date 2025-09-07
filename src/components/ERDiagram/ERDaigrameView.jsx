import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
// import Flow from "./Flow";
// import NewFlow from "../../../../Flow/NewFlow";
import MainFlow from "./MainFlow";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import MainFlow2 from "./MainFlow2";
import { AppContext } from "../../AppContext";

const ERDaigrameView = () => {
  const {
      adminAlert,
      setAdminALert,
      alertStatus,
      setAlertStatus,
      alertStatusFixed,
      setAlertStatusFixed,
      singIn,
      tableColRelData,
      setTableColRelData,
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
                height: "650px",
                border: "1px solid blue",
              }}
            >
              {
                parseInt(db) == 1 ?
                  <MainFlow />
               :parseInt(db) == 2 ?
                    <MainFlow2 />
                : ""
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ERDaigrameView;
