import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const ParameterEditor = (props) => {
  const { parameterCodeEditorValue, setParameterCodeEditorValue } = props;

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setParameterCodeEditorValue(value);
  }, []);

  const [formattedCode, setFormattedCode] = useState([]);

  useEffect(() => {
    if (parameterCodeEditorValue) {
      const lines = parameterCodeEditorValue.split("\n");
      const formattedLines = lines.map((line, index) => ({
        [index + 1]: line.trim(),
      }));
      // setFormattedCode(formattedLines);
      console.log("check format code 25", lines);
    }
  }, [parameterCodeEditorValue]);

  return (
    <div>
      <CodeMirror
        className="CodeMirror"
        value={parameterCodeEditorValue}
        height="176px"
        width="865px"
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

export default ParameterEditor;
