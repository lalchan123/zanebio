import React, { useEffect } from "react";

const FormulaDataProcess = (props) => {
  const { formulaAllData, addCode } = props;
  let ratioDataDic = [];

  useEffect(() => {
    addCode?.map((oparator, op) => {
      formulaAllData?.map((item, index) => {
        if (oparator === "%") {
          console.log(
            "check 10",
            item.addCode[0],
            oparator,
            addCode[addCode.length - 1]
          );
        }
      });
    });
  }, [addCode]);

  return <div>FormulaDataProcess</div>;
};

export default FormulaDataProcess;
