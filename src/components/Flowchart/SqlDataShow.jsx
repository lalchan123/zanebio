import React, {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";

import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  useNodeId,
  useUpdateNodeInternals,
} from "@xyflow/react";

import Box from "@mui/material/Box";
import { EditorView } from "@codemirror/view";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
// import { list, tab } from "@material-tailwind/react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InputLabel from "@mui/material/InputLabel";
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../../AppContext";
import useSQLChartRunData from "../../UseContext/useSQLChartRunData";
// import LineChartShow from "../components/AdminComponent/StyledSettings/CardTemplate/ChartData.js/LineChartShow";
// import TableData from "../components/AdminComponent/StyledSettings/CardTemplate/ChartData.js/TableData";

import axios from "axios";
import Papa from "papaparse";
// import TableDataShowSqlData from "../components/AdminComponent/StyledSettings/CardTemplate/ChartData.js/TableDataShowSqlData.js";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function SqlDataShow() {
  const {
    setSqlShow,
    sqlData,
    setSqlData,
    BaseURL,
    setBaseURL,
  } = useContext(AppContext);

  const [sqlDataRun, setSqlDataRun] = useState([]);
  const [data, setData] = useState([]);
  const [logic, setLogic] = React.useState();
  const [tableShow, setTableShow] = useState(false);

  console.log("sqlDataRun", sqlDataRun)

  const handleChangeLogic = (event) => {
    setLogic(event.target.value);
  };

  const [code, setCode] = useState(sqlData);

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setSqlData(value);
  }, []);

  console.log("code", code)
  console.log("sqlData", sqlData)

  const onSqlDataShowRun = () => {
    const url = `${BaseURL}/account/query-json-file/`;
    const data = {
      Query: code,
      json_file: [],
    };
    // const data = {
    //   Query: code,
    //   table_data_id: 49213,
    //   json_file: [],
    // };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.data);
        console.log("99 response.data.data", response.data.data)
      })
      .catch((error) => {
        console.log("error", error)
        setData({ responseData: null, error: error?.response?.data?.message });
      });

    setTableShow(true);
  };

  function convertCSVtoJSON(csvData) {
    const blob = new Blob([csvData], { type: "text/csv" });
    const reader = new FileReader();

    reader.onload = (event) => {
      const parsedData = Papa.parse(event.target.result, {
        header: true,
        dynamicTyping: true,
      });
      setSqlDataRun(parsedData?.data);
    };

    reader.readAsText(blob);
  }

  useEffect(() => {
    convertCSVtoJSON(data);
  }, [data]);

  console.log("check data 125", data);

  return (
    <>
      <Box sx={{ maxWidth: "100%", bgcolor: "F7F5F2", height: 597 }}>
        <Box
          sx={{
            maxWidth: "100%",
            height: "35px",
            p: 1,
            bgcolor: "#F1F6F9",
            fontSize: "12px",
          }}
        >
          SQL Code
          {/* <IconButton sx={{ margin: 0, padding: 0, float: "right" }}>
            <ContentCopyOutlinedIcon sx={{ fontSize: "14px" }} />
          </IconButton> */}
          <Button
            // variant="outlined"
            onClick={() => {
              setSqlShow(false);
              // setTableShow(false);
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
          <Box
            sx={{
              marginTop: -0.5,
              padding: 0,

              float: "right",
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            <span style={{ fontSize: "12px" }}>Run</span>
            {/* <IconButton size="small" onClick={onSqlDataShowRun}> */}
            <IconButton size="small">
              <PlayArrowOutlinedIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
        </Box>
        <CodeMirror
          className="CodeMirror"
          value={sqlData}
          height="300px"
          width="450px"
          fontSize="6px"
          extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
          onChange={(value, viewUpdate) => {
            onChangeCode(value);
          }}
        />

        {/* <Box
          sx={{
            bgcolor: "#F5F5F5",
          }}
        >
          <div style={{ marginLeft: 2, fontSize: "10px" }}>Result</div>
        </Box>
        <Box sx={{ p: 1 }}>
          {data?.error && (
            <div className="text-sm font-mono p-2">{data?.error}</div>
          )}

          {tableShow && <TableDataShowSqlData dataSource={[sqlDataRun]} />}
        </Box> */}
      </Box>
    </>
  );
}

export default memo(SqlDataShow);
