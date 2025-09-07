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

import { json } from "@codemirror/lang-json";

import { EditorView } from "@codemirror/view";
import IconButton from "@mui/material/IconButton";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../AppContext";
import useRestAPIPost from "../../GraphQLApiCall/useRestAPIPost";
import axios from "axios";
import PipeLineParamsEditor from "./PipeLineParamsEditor";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function PipeLineCodeEditor() {
  const {
    pipeLineShow,
    setPipeLineShow,
    pipeLineCode,
    setPipeLineCode,
    pipeLineCodeParams,
    setPipeLineCodeParams,
    setAdminALert,
    setAlertStatus,
    apiRouterG,
    setApiRouterG,
  } = useContext(AppContext);

  const [code, setCode] = useState("");
  const [codeParams, setCodeParams] = useState(pipeLineCodeParams);
  const [codeExecuteOutput, setCodeExecuteOutput] = useState("");

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
    // setPipeLineCode(value);
  }, []);

  const onChangeCodeParams = React.useCallback((value, viewUpdate) => {
    setCodeParams(value);
    setPipeLineCodeParams(value);
  }, []);

  const onCustomCodeSave = () => {
    console.log("72 onCustomCodeSave code", code);
    setPipeLineCode(code);
    setAdminALert(true);
    setAlertStatus("code Successfully Save");
  };
  const RunPipeLineCode = async () => {
    console.log(
      "72 RunPipeLineCode apiRouterG, pipeLineCodeParams",
      apiRouterG,
      pipeLineCodeParams,
      typeof pipeLineCodeParams
    );
    // setPipeLineCode(code);
    // setAdminALert(true);
    // setAlertStatus("code Successfully Save");
    await axios
      .post(
        apiRouterG,
        {
          paramList: pipeLineCodeParams,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("97 PipelineCodeEditor response.data", response.data);
        // setFetchData(JSON.stringify(response.data.data, null, 4));
        setCodeExecuteOutput(JSON.stringify(response.data.data, null, 4));
      })
      .catch((error) => {
        console.log("101 PipelineCodeEditor error", error.response.data);
        setAdminALert(true);
        setAlertStatus(error.response.data.message);
      });
  };

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
          Python Code
          <Button
            // variant="outlined"
            onClick={() => {
              setPipeLineShow(false);
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
          <Button
            // variant="outlined"
            onClick={onCustomCodeSave}
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
            Save
          </Button>
          <Box
            sx={{
              marginTop: -0.5,
              padding: 0,
              float: "right",
              textTransform: "capitalize",
              fontSize: "12px",
            }}
            onClick={() => {
              RunPipeLineCode();
            }}
          >
            <span style={{ fontSize: "12px" }}>Run</span>
            <IconButton size="small">
              <PlayArrowOutlinedIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
        </Box>
        <CodeMirror
          className="CodeMirror"
          value={pipeLineCode}
          height="320px"
          width="450px"
          fontSize="6px"
          extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
          onChange={(value, viewUpdate) => {
            onChangeCode(value);
          }}
        />
        <Box
          sx={{
            bgcolor: "#F5F5F5",
          }}
        >
          <div style={{ marginLeft: 2, fontSize: "10px" }}>Result</div>
        </Box>
        <Box>
          {/* <CodeMirror
            className="CodeMirror"
            value={codeParams}
            height="230px"
            width="435px"
            fontSize="30px"
            // extensions={[python()]}
            options={{
              mode: "python", // Use an appropriate language mode
              lineNumbers: true,
              readOnly: true,
              lineWrapping: true,
            }}
            onChange={(value, viewUpdate) => {
              onChangeCodeParams(value);
            }}
          /> */}
          <CodeMirror
            className="CodeMirror"
            value={codeExecuteOutput}
            height="320px"
            width="450px"
            fontSize="30px"
            extensions={[json({ json: true }), EditorView.lineWrapping]}
            onChange={(value, viewUpdate) => {
              onChangeCode(value);
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default memo(PipeLineCodeEditor);
