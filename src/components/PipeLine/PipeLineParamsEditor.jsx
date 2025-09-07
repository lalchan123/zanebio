"use client";
import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const PipeLineParamsEditor = (props) => {
  const { parameterCodeEditorValue, setParameterCodeEditorValue } = props;

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setParameterCodeEditorValue(value);
  }, []);

  return (
    <div>
      <CodeMirror
        className="CodeMirror"
        value={""}
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
          onChangeCode(value);
        }}
      />
    </div>
  );
};

export default PipeLineParamsEditor;
