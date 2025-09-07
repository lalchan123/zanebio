import React, { useState, useContext } from "react";

function AutoSuggestResultJoin(props) {
  const [select, setSelect] = useState([]);
  const { joinData, setAddCode, addCode } = props;

  const onAddFullCode = (value) => {
    setAddCode([...addCode, value]);
    setSelect(...select, value);
  };

  return (
    // <div className="w-[100%] h-[220px] p-2 overflow-auto scroll-smooth">
    <div className="w-[100%] h-[100%] p-2 overflow-auto scroll-smooth">
      {joinData.length != 0 && (
        <div className="grid grid-cols-1 divide-y ">
          {/* {joinData.slice(0, 15).map((value, key) => { */}
          {joinData?.map((value, key) => {
            return (
              <div
                key={key}
                className={`p-1 text-sm font-mono cursor-pointer hover:text-green-600 hover:bg-slate-100 ${
                  "selects" === value ? "text-green-600 bg-slate-100" : ""
                }`}
                onClick={() => onAddFullCode(value)}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AutoSuggestResultJoin;
