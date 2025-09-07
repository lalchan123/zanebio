import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";

const CodeView = (props) => {
  const { apiData } = props;
  console.log("8 apiData", apiData);
  const [code, setCode] = useState("");

  // console.log("check code data 10", eval(apiData));

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    console.log(value);
  }, []);

 

  return (
    <div>
      <CodeMirror
        className="CodeMirror"
        value={apiData}
        height="558px"
        width="865px"
        fontSize="30px"
        // extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
        extensions={[json({ json: true }), EditorView.lineWrapping]}
        onChange={(value, viewUpdate) => {
          onChangeCode(value);
        }}
      />
    </div>
  );
};

export default CodeView;


