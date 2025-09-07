import React, { useState } from "react";

const TextAreaLabel = (props) => {
  const [textAreaLabel, setTextAreaLabel] = useState("Textarea");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [buttonSize, setButtonSize] = useState("");

  const onButtonSize = (value) => {
    setButtonSize(value);
  };

  const text = { textLabel: textAreaLabel, size: buttonSize };

  props.onTextAreaLabel(JSON.stringify(text));

  return (
    <div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Edit Label
        </label>
        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={textAreaLabel}
          onChange={(e) => setTextAreaLabel(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextAreaLabel;
