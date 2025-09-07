import React, {
  PureComponent,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  BarChart,
  Bar,
  Line,
  Cell,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ReferenceLine,
  ReferenceBar,
  ResponsiveContainer,
} from "recharts";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  TABLE_DATA_BOX_DETAIL_REF,
} from "../GraphQL/Queries";

const RechartGraph = ({ myItemsleft, myItemsright, center }, ref) => {
  const left = myItemsleft.map((item) => {
    return {
      id: eval(item.buy_p_l),
      point_left: eval(item.point_l),
      b_left: eval(item.b_p_l),
      bpt_left: eval(item.bpt_p_l),
    };
  });

  const right = myItemsright.map((item) => {
    return {
      id: eval(item.buy_p_r),
      point_right: eval(item.point_r),
      b_right: eval(item.b_p_r),
      bpt_right: eval(item.bpt_p_r),
    };
  });

  const myTableData = left.concat(right);

  function mergeDuplicates(jsonArray) {
    const map = new Map();

    // Iterate over each element in the JSON array
    jsonArray.forEach((item) => {
      const id = item.id;

      // Check if the ID already exists in the map
      if (map.has(id)) {
        // If it exists, merge the current item with the existing item
        const existingItem = map.get(id);
        Object.assign(existingItem, item);
      } else {
        // If it doesn't exist, add the item to the map
        map.set(id, item);
      }
    });

    // Return the unique items as an array
    return Array.from(map.values());
  }

  // Example usage:

  const mergedArray = mergeDuplicates(myTableData);
  console.log(mergedArray);

  const data = mergedArray.map((item) => {
    return {
      id: item.id,
      point_left: item.point_left || "",
      point_right: item.point_right || "",
      b_left: item.b_left || "",
      b_right: item.b_right || "",
      bpt_left: item.bpt_left || "",
      bpt_right: item.bpt_right || "",
    };
  });

  console.log("26", data);

  const defaultValue = [
    {
      id: center || 4135,
      point_left: 5,
      point_right: 5,
      b_left: 6,
      b_right: 7,
      bpt_left: 5,
      bpt_right: 4,
      reference: 5,
    },
  ];

  const allDataTable = data.concat(defaultValue);

  const sortedData = allDataTable.sort((a, b) => a.id - b.id);

  // useImperativeHandle(ref, () => ({
  //   onClickValue,
  // }));

  // const [dataTable, setDataTable] = useState([...defaultValue]);

  // const onClickValue = () => {
  //   setDataTable([...allDataTable]);
  // };

  // console.log("73", dataTable);

  // console.log("74", dataTable);

  // Output: [1, 3]

  // dataTable.map((item) => {
  // nodeadd = item.node;
  // dataTable1.push({
  //   name: item.node,
  //   pv: item.buy_point_left,
  //   uv: item.buy_point_right,
  //   amt: item.buy_point_left + item.buy_point_right,
  // });

  // dataTable1.map((item2) => {
  //   console.log("test if condition 1", item2.node);
  //   if (item.node === item2.node) {
  //     console.log("test if condition", item2.node);
  //     dataTable1["pv"] = item.buy_point_left;
  //     dataTable1["uv"] = item.buy_point_right;
  //     dataTable1["amt"] =
  //       item2.amt + item.buy_point_left + item.buy_point_right;
  //   }
  // });

  //   const keys = Object.keys(dataTable1);
  //   console.log("key 91", keys.length);
  //   if (keys.length > 0) {
  //     console.log("key 92", keys);
  //     for (let i = 0; i < keys.length; i++) {
  //       console.log("key point 89 ", item.node);

  //       if (dataTable1[keys[i]].name === item.node) {
  //         console.log("datatable 99 ", dataTable1[keys[i]].name);
  //         dataTable1["pv"] = item.point_left;
  //         console.log("1022", dataTable1[keys[i]].pv);
  //         dataTable1[keys[i]].pv = item.point_left;
  //         console.log("103", item.point_right);
  //         dataTable1[keys[i]].uv = item.point_right;
  //         console.log("105", item.point_right);
  //         dataTable1[keys[i]].amt =
  //           dataTable1[keys[i]].amt +
  //           item.buy_point_left +
  //           item.buy_point_right;

  //         console.log("datatable0 ", item.buy_point_right);
  //       } else {
  //         dataTable1.push({
  //           name: item.node,
  //           pv: item.buy_point_left,
  //           uv: item.buy_point_right,
  //           amt: item.buy_point_left + item.buy_point_right,
  //         });
  //       }
  //       console.log("datatable1 ", dataTable1);
  //     }
  //   } else {
  //     dataTable1.push({
  //       name: item.node,
  //       pv: item.buy_point_left,
  //       uv: item.buy_point_right,
  //       amt: item.buy_point_left + item.buy_point_right,
  //     });
  //     console.log("datatable2 ", dataTable1);
  //   }
  // });

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return <div className="custom-tooltip"></div>;
  //   }

  //   return null;
  // };
  const renderLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x} y={y} dy={12} fill="white" textAnchor="top" fontSize="12px">
        {value}
      </text>
    );
  };

  return (
    <div>
      {/* <ComposedChart width={1150} height={350} data={dataTable}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis
          dataKey="node"
          axisLine={{ stroke: "#ccc", strokeWidth: 2 }}
          tick={{ fill: "#777" }}
          style={{ backgroundColor: "red" }}
        />
        <YAxis dataKey="point" />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="point_left"
          fill="#1D267D"
          color="white"
          label={{ position: "top" }}
        >
          <LabelList dataKey="buy_point_left" color="white" />
          {dataTable.map((entry, index) => (
            <Cell
              fill={entry.color_left === "blue" ? "#1D267D" : "#E21818"}
              width={25}
            />
          ))}
          <Line type="monotone" dataKey="point_left" stroke="red" />
        </Bar>

        <Bar
          dataKey="point_right"
          color="white"
          label={{ position: "top" }}
          fill="#4C4B16"
        >
          <LabelList dataKey="buy_point_right" color="white" />
          {dataTable.map((entry, index) => (
            <Cell
              fill={entry.color_right === "orange" ? "#4C4B16" : "#E21818"}
              width={25}
            />
          ))}
          <Line type="monotone" dataKey="point_right" stroke="green" />
        </Bar>
      </ComposedChart> */}

      <ComposedChart
        width={1150}
        height={350}
        data={allDataTable}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey={"id"} scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <ReferenceLine
          segment={[
            {
              x: "4135",
              y: 5,
            },
          ]}
          stroke="#A7C6F7"
          strokeDasharray="3 3"
          strokeWidth={2}
          ifOverflow="extendDomain"
          isFront
        /> */}
        <Bar
          dataKey="point_left"
          stackId="a"
          color="black"
          label={{ position: "top", fill: "black" }}
        >
          <LabelList dataKey="b_left" color="black" content={renderLabel} />
          {allDataTable.map((entry, index) => (
            <Cell fill="#FC4F00" width={25} color="black" />
          ))}
        </Bar>
        <Bar
          dataKey="point_right"
          stackId="a"
          color="white"
          label={{ position: "top", fill: "black" }}
        >
          <LabelList dataKey="b_right" color="black" content={renderLabel} />
          {allDataTable.map((entry, index) => (
            <Cell fill="#19A7CE" width={25} opacity={10} />
          ))}
        </Bar>

        {/* <Bar
          dataKey="reference"
          stackId="a"
          fill="red"
          color="white"
          label={{ position: "top" }}
        >
          <LabelList dataKey="point_right" color="white" />
          {allDataTable.map((entry, index) => (
            <Cell fill="yellow" width={25} />
          ))}
        </Bar> */}

        {/* <Bar
          dataKey="point_left"
          fill="#1D267D"
          color="white"
          label={{ position: "top" }}
        >
          <LabelList dataKey="buy_point_left" color="white" />
          {mergedArray.map((entry, index) => (
            <Cell
              fill={entry.color_left === "blue" ? "#1D267D" : "#E21818"}
              width={25}
            />
          ))}
        </Bar>
        <Line type="monotone" dataKey="point_left" stroke="#1D267D" />

        <Bar
          dataKey="point_left"
          color="white"
          label={{ position: "top" }}
          fill="#4C4B16"
        >
          <LabelList dataKey="buy_point_right" color="white" />
          {mergedArray.map((entry, index) => (
            <Cell
              fill={entry.color_right === "orange" ? "#4C4B16" : "#E21818"}
              width={25}
            />
          ))}
        </Bar>
        <Line type="monotone" dataKey="point_right" stroke="#4C4B16" /> */}
      </ComposedChart>
    </div>
  );
};

export default forwardRef(RechartGraph);
