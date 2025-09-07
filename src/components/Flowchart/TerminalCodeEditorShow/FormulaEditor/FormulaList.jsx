import React, { useState, useContext } from "react";

function FormulaList(props) {
  const { formulaListDic } = props;

  return (
    <div className="w-[100%] h-[220px] p-2 overflow-auto scroll-smooth">
      {formulaListDic.length != 0 && (
        <div className="grid grid-cols-1 divide-y ">
          {formulaListDic?.map((value, key) => {
            return (
              <div
                key={key}
                className={`p-1 text-sm font-mono cursor-pointer hover:text-green-600 hover:bg-slate-100`}
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

export default FormulaList;
