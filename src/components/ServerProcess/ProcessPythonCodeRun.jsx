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

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function ProcessPythonCodeRun() {
  const {
    sqlData,
    setPyShow,
    pythonCode,
    setPythonCode,
    processNameCheck,
    setProcessNameCheck,
    processFlow,
    setProcessFlow,
    setAdminALert,
    setAlertStatus,
    userId,
    setUserId,
    userName,
    setUserName,
    BaseURL,
    setBaseURL,
  } = useContext(AppContext);

  // const {
  //   restApiPostData,
  //   restApiPostLoading,
  //   restApiPostError,
  //   setDataRestApiPostValue,
  // } = useRestAPIPost(BaseURL+"/account/code-json-write/");
  // } = useRestAPIPost("https://itb-usa.a2hosted.com/account/code-json-write/");

  const [sqlDataRun, setSqlDataRun] = useState([]);
  const [data, setData] = useState([]);
  const [logic, setLogic] = React.useState();
  const [tableShow, setTableShow] = useState(false);

  const handleChangeLogic = (event) => {
    setLogic(event.target.value);
  };

  const [code, setCode] = useState(sqlData);

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setPythonCode(value);
  }, []);

  const onCustomCodeSave = () => {
    console.log("check code processNameCheck 61", code, processNameCheck);
    axios
      .post(
        BaseURL + "/account/server-process-code-api/",
        // BaseURL+"/account/custom-code-validate/",
        // "https://itb-usa.a2hosted.com/account/custom-code-validate/",
        {
          User: userName,
          Process_Name: processNameCheck,
          Code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // setRestApiPostData(response.data.data);
        console.log("check response 66", response);
        // setDataRestApiPostValue({
        //   user: "sahak",
        //   job_name: processFlow,
        //   code: code,
        // });
        setAdminALert(true);
        setAlertStatus("save python code");
      })
      .catch((error) => {
        // setRestApiPostError({ responseData: null, error: error.message });
        console.log("check data error 67", error.message);
      });
  };

  // console.log("this is code value", restApiPostData);
  // console.log("check this is error value for me", restApiPostError);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
          {/* <IconButton sx={{ margin: 0, padding: 0, float: "right" }}>
              <ContentCopyOutlinedIcon sx={{ fontSize: "14px" }} />
            </IconButton> */}
          {/* <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <Button
            // variant="outlined"
            onClick={() => {
              setPyShow(false);
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
          >
            <span style={{ fontSize: "12px" }}>Run</span>
            <IconButton size="small">
              <PlayArrowOutlinedIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
        </Box>
        <CodeMirror
          className="CodeMirror"
          value={pythonCode}
          height="300px"
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
        <Box sx={{ p: 1 }}></Box>
      </Box>
    </>
  );
}

export default memo(ProcessPythonCodeRun);
