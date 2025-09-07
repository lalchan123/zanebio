import React, { useEffect, useState } from "react";
import axios from "axios";
import FormDesignDataShow from "./FormDesignDataShow";
import TableDataShow from "./TableDataShow";
import { LinechartDataShow } from "./LinechartDataShow";

const ProcessDataFormServer = (props) => {
  const { flowName } = props;
  const [sourceData, setSourceData] = useState("");
  const [processType, setProcessType] = useState("");

  useEffect(() => {
    // const url = `https://itb-usa.a2hosted.com/account/get-table-dynamic-field-flow/544/${flowchart_name}/`

    const url = `https://itb-usa.a2hosted.com/account/flow-chart-data/${flowName}/`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // setData(response.data.data);
        setSourceData(response.data.sourceData);
        setProcessType(response.data.processType);
        // setFinalData({ prices: response.data.data });
        // setProcessType(response.data.processType);
        // setFlowChartData(response.data.data)
      })
      .catch((error) => {
        // setData({ responseData: null, error: error.message });
        console.log("error 132", error);
      });
  }, [flowName]);

  console.log("demo value 3999", sourceData, processType);

  return (
    <div>
      {processType === "formtable" ? (
        <FormDesignDataShow sourceData={sourceData} />
      ) : processType === "sqlquery" ? (
        <TableDataShow sourceData={sourceData} />
      ) : processType === "linebarchart" ? (
        <LinechartDataShow sourceData={sourceData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProcessDataFormServer;
