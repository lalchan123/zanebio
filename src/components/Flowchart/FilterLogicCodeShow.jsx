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
import IconButton from "@mui/material/IconButton";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { AppContext } from "../../AppContext";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function FilterLogicCodeShow() {
  const { setFilterEditor, filterCode, setFilterCode } = useContext(AppContext);

  const [logic, setLogic] = React.useState();

  const handleChangeLogic = (event) => {
    setLogic(event.target.value);
  };

  const [code, setCode] = useState("");

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setFilterCode(value);
  }, []);

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          height: "35px",
          p: 1,
          bgcolor: "#F1F6F9",
          fontSize: "14px",
        }}
      >
        Javascript
        {/* <IconButton sx={{ margin: 0, padding: 0, float: "right" }}>
            <ContentCopyOutlinedIcon sx={{ fontSize: "14px" }} />
          </IconButton> */}
        <Button
          // variant="outlined"
          onClick={() => setFilterEditor(false)}
          color="success"
          size="small"
          sx={{
            float: "right",
            margin: 0,
            padding: 0,
            textTransform: "capitalize",
          }}
        >
          Close
        </Button>
        <Button
          color="success"
          size="small"
          sx={{
            float: "right",
            margin: 0,
            padding: 0,
            textTransform: "capitalize",
          }}
        >
          Submit
        </Button>
        <IconButton
          sx={{
            margin: 0,
            padding: 0,
            float: "right",
            textTransform: "capitalize",
            fontSize: "14px",
          }}
        >
          Run
          <PlayArrowOutlinedIcon />
        </IconButton>
      </Box>
      <CodeMirror
        className="CodeMirror"
        value={filterCode}
        height="560px"
        width="450px"
        fontSize="6px"
        extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
        onChange={(value, viewUpdate) => {
          onChangeCode(value);
        }}
      />
    </>
  );
}

export default memo(FilterLogicCodeShow);
