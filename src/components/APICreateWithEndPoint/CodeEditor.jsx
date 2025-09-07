import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";

const CodeEditor = (props) => {
  const { apiCustomCode, setApiCustomCode, setCustomApiLineCode } = props;
  const [code, setCode] = useState("");

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    if (value) {
      const lines = value.split("\n");
      setApiCustomCode(value);
    }
  }, []);

  useEffect(() => {
    if (apiCustomCode) {
      const lines = apiCustomCode.split("\n");
      setCustomApiLineCode(lines);
    }
  }, [apiCustomCode]);

  return (
    <div>
      <CodeMirror
        className="CodeMirror"
        value={apiCustomCode}
        height="350px"
        width="865px"
        fontSize="30px"
        extensions={[python()]}
        onChange={(value, viewUpdate) => {
          onChangeCode(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
