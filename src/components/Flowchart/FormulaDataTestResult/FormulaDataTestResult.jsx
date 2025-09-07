import React, { useContext } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { AppContext } from "../../../AppContext";

const FormulaDataTestResult = () => {
  const { setFormulaTestShow } = useContext(AppContext);
  return (
    <>
      <Box sx={{ maxWidth: "100%", height: 250 }}>
        <Box
          sx={{
            maxWidth: "100%",
            height: "35px",
            p: 1,
            bgcolor: "#F1F6F9",
            fontSize: "12px",
          }}
        >
          Result
          <Button
            onClick={() => {
              setFormulaTestShow(false);
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
            width: "250px",
            p: 1,
            bgcolor: "#F1F6F9",
            fontSize: "18px",
            bgcolor: "white",
            height: 250,
            // borderLeft: ".5px solid green",
            // borderBottom: ".5px solid green",
            boxShadow: 1,
            paddingTop: 4,
          }}
        >
          Formula logic data is valid!
        </Box>
      </Box>
    </>
  );
};

export default FormulaDataTestResult;
