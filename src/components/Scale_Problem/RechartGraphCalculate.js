import { Position } from "@react-pdf-viewer/core";
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
  LineChart,
  ComposedChart,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const RechartGraphCalculate = ({ tableRow, center }) => {
  return (
    <div>
      <LineChart
        width={1150}
        height={300}
        data={tableRow}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="node_left" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine x={center} stroke="red" />
        <Line
          type="monotone"
          dataKey="len_value_left"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          label={{ position: "top", fill: "black" }}
        />
        <Line type="monotone" dataKey="side_left" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default forwardRef(RechartGraphCalculate);
