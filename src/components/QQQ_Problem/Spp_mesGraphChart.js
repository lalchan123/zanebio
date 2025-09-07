import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  TABLE_DATA_BOX_DETAIL_REF,
} from "../GraphQL/Queries";

const Spp_mesGraphChart = ({ center, centervalue }) => {

  
  let dataDic = [];
  let allData = [];
  let dataRelId = [];

  let ref_point = "";
  let date_point = "";
  let buy_point = "";
  let bpt_point = "";
  let num_of_point = "";
  let point_def = "";
  let color_point = "";

  const {
    loading: box_data_loading,
    error: box_data_error,
    data: box_data,
  } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
    variables: { tableId: 29, tableColId: 0, tableRefId: "" },
  });

  let myItemsleft = [];
  let myItemsright = [];
  let myItemTableDataLeftId = [];
  let myItemTableDataRightId = [];
  let vwidthright = "";
  let vheightright = "";
  let vcolorright = "";
  let vserialright = "";

  box_data?.getTableDataRefIdInfo?.forEach((sub) => {
    if (sub.tableColId === 1) {
      myItemTableDataLeftId.push(sub.tabRelId);
    }
  });

  myItemTableDataLeftId.map((val, i) => {
    box_data?.getTableDataRefIdInfo?.forEach((sub) => {
      if (sub.tableColId === 1 && sub.tabRelId === val) {
        ref_point = sub.columnData;

        if (date_point !== "") {
          myItemsleft.push({
            ref_p_l: sub.columnData,
            date_p_l: date_point,
            buy_p_l: buy_point,
            bpt_p_l: bpt_point,
            num_p_l: num_of_point,
            point_def_p_l: point_def,
            color_p_l: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }

      if (sub.tableColId === 2 && sub.tabRelId === val) {
        date_point = sub.columnData;
        if (ref_point !== "") {
          myItemsleft.push({
            ref_p_l: ref_point,
            date_p_l: sub.columnData,
            buy_p_l: buy_point,
            bpt_p_l: bpt_point,
            num_p_l: num_of_point,
            point_def_p_l: point_def,
            color_p_l: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }

      if (sub.tableColId === 3 && sub.tabRelId === val) {
        buy_point = sub.columnData;

        if (date_point !== "") {
          myItemsleft.push({
            ref_p_l: ref_point,
            date_p_l: date_point,
            buy_p_l: sub.columnData,
            bpt_p_l: bpt_point,
            num_p_l: num_of_point,
            point_def_p_l: point_def,
            color_p_l: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 4 && sub.tabRelId === val) {
        bpt_point = sub.columnData;
        if (ref_point !== "") {
          myItemsleft.push({
            ref_p_l: ref_point,
            date_p_l: date_point,
            buy_p_l: buy_point,
            bpt_p_l: sub.columnData,
            num_p_l: num_of_point,
            point_def_p_l: point_def,
            color_p_l: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 5 && sub.tabRelId === val) {
        num_of_point = sub.columnData;
        if (date_point !== "") {
          myItemsleft.push({
            ref_p_l: ref_point,
            date_p_l: date_point,
            buy_p_l: buy_point,
            bpt_p_l: bpt_point,
            num_p_l: sub.columnData,
            point_def_p_l: point_def,
            color_p_l: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 6 && sub.tabRelId === val) {
        point_def = sub.columnData;
        if (ref_point !== "") {
          myItemsleft.push({
            ref_p_l: ref_point,
            date_p_l: date_point,
            buy_p_l: buy_point,
            bpt_p_l: bpt_point,
            num_p_l: num_of_point,
            point_def_p_l: sub.columnData,
            color_p_l: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 7 && sub.tabRelId === val) {
        color_point = sub.columnData;
        if (date_point !== "") {
          myItemsleft.push({
            ref_p_l: ref_point,
            date_p_l: date_point,
            buy_p_l: buy_point,
            bpt_p_l: bpt_point,
            num_p_l: num_of_point,
            point_def_p_l: point_def,
            color_p_l: sub.columnData,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
    });
  });

  box_data?.getTableDataRefIdInfo?.forEach((sub) => {
    if (sub.tableColId === 8) {
      myItemTableDataRightId.push(sub.tabRelId);
    }
  });

  myItemTableDataRightId.map((val, i) => {
    box_data?.getTableDataRefIdInfo?.forEach((sub) => {
      if (sub.tableColId === 8 && sub.tabRelId === val) {
        ref_point = sub.columnData;

        if (date_point !== "") {
          myItemsright.push({
            ref_p_r: sub.columnData,
            date_p_r: date_point,
            buy_p_r: buy_point,
            bpt_p_r: bpt_point,
            num_p_r: num_of_point,
            point_def_p_r: point_def,
            color_p_r: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }

      if (sub.tableColId === 9 && sub.tabRelId === val) {
        console.log("121", val);
        date_point = sub.columnData;
        if (ref_point !== "") {
          myItemsright.push({
            ref_p_r: ref_point,
            date_p_r: sub.columnData,
            buy_p_r: buy_point,
            bpt_p_r: bpt_point,
            num_p_r: num_of_point,
            point_def_p_r: point_def,
            color_p_r: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }

      if (sub.tableColId === 10 && sub.tabRelId === val) {
        buy_point = sub.columnData;

        if (date_point !== "") {
          myItemsright.push({
            ref_p_r: ref_point,
            date_p_r: date_point,
            buy_p_r: sub.columnData,
            bpt_p_r: bpt_point,
            num_p_r: num_of_point,
            point_def_p_r: point_def,
            color_p_r: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 11 && sub.tabRelId === val) {
        bpt_point = sub.columnData;
        if (ref_point !== "") {
          myItemsright.push({
            ref_p_r: ref_point,
            date_p_r: date_point,
            buy_p_r: buy_point,
            bpt_p_r: sub.columnData,
            num_p_r: num_of_point,
            point_def_p_r: point_def,
            color_p_r: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 12 && sub.tabRelId === val) {
        num_of_point = sub.columnData;
        if (date_point !== "") {
          myItemsright.push({
            ref_p_r: ref_point,
            date_p_r: date_point,
            buy_p_r: buy_point,
            bpt_p_r: bpt_point,
            num_p_r: sub.columnData,
            point_def_p_r: point_def,
            color_p_r: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 13 && sub.tabRelId === val) {
        point_def = sub.columnData;
        if (ref_point !== "") {
          myItemsright.push({
            ref_p_r: ref_point,
            date_p_r: date_point,
            buy_p_r: buy_point,
            bpt_p_r: bpt_point,
            num_p_r: num_of_point,
            point_def_p_r: sub.columnData,
            color_p_r: color_point,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
      if (sub.tableColId === 14 && sub.tabRelId === val) {
        color_point = sub.columnData;
        if (date_point !== "") {
          myItemsright.push({
            ref_p: ref_point,
            date_p_r: date_point,
            buy_p_r: buy_point,
            bpt_p_r: bpt_point,
            num_p_r: num_of_point,
            point_def_p_r: point_def,
            color_p_r: sub.columnData,
          });
          ref_point = "";
          date_point = "";
          buy_point = "";
          bpt_point = "";
          num_of_point = "";
          point_def = "";
          color_point = "";
        }
      }
    });
  });

  let graphDic = [];

  const uniqueArrayLeft = myItemsleft.reduce((accumulator, currentObject) => {
    const number = currentObject.buy_p_l;
    const existingObject = accumulator.find((obj) => obj.buy_p_l === number);

    if (!existingObject) {
      accumulator.push(currentObject);
    }

    return accumulator;
  }, []);

  const uniqueArrayRight = myItemsright.reduce((accumulator, currentObject) => {
    const number = currentObject.buy_p_r;
    const existingObject = accumulator.find((obj) => obj.buy_p_r === number);

    if (!existingObject) {
      accumulator.push(currentObject);
    }

    return accumulator;
  }, []);

  console.log("391", uniqueArrayLeft, uniqueArrayRight);

  const reChartTableData = uniqueArrayLeft.concat(uniqueArrayRight);

  const ref_array = [
    { node: 310 },
    { node: 311 },
    { node: 312 },
    { node: 313 },
    { node: 314 },
    { node: 315 },
    { node: 316 },
    { node: 317 },
    { node: 318 },
    { node: 319 },
    { node: 320 },
    { node: 321 },
    { node: 322 },
    { node: 323 },
    { node: 324 },
    { node: 325 },
    { node: 326 },
    { node: 327 },
    { node: 328 },
    { node: 329 },
    { node: 330 },
    { node: 331 },
    { node: 332 },
    { node: 333 },
    { node: 334 },
    { node: 335 },
    { node: 336 },
    { node: 337 },
    { node: 338 },
    { node: 339 },
    { node: 340 },
  ];

  let rechartNewDic = [];
  let value1 = "";
  let value2 = "";
  let value3 = "";
  let value4 = "";
  let value = "";

  ref_array.map((item1, i) => {
    reChartTableData.map((item2, i) => {
      if (item1.node === eval(item2.buy_p_l || item2.buy_p_r)) {
        rechartNewDic.push({
          buy_p: item2.buy_p_l || item2.buy_p_r,
          ref_P: item2.buy_p_l || item2.buy_p_r,
          uv:
            item2.color_p_l === "red" || item2.color_p_r === "red"
              ? item2.point_def_p_l || item2.point_def_p_r
              : 0,
          pv:
            item2.color_p_l === "blue" || item2.color_p_r === "blue"
              ? item2.point_def_p_l || item2.point_def_p_r
              : 0,
          qv: item1.node,
        });
      }
      value = eval(item2.buy_p_l || item2.buy_p_r);
    });
    if (item1.node !== value) {
      rechartNewDic.push({
        buy_p: 0,
        ref_P: 0,
        uv: 0,
        pv: 0,
        qv: item1.node,
      });
    }
    value = "";
  });

  console.log("476", rechartNewDic);

  const reChartData = rechartNewDic.map((item, i) => {
    return {
      buy_point: item.buy_point,
      ref_point: item.buy_point,
      red: item.uv,
      blue: item.pv,
      qv: item.qv,
    };
  });

  console.log("center value", center);

  // Example JSON array

  const sortedData = reChartData.sort((a, b) => a.buy_point - b.buy_point);

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          width={500}
          height={300}
          data={reChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="qv" style={{ fontSize: "16px" }} />
          <YAxis style={{ fontSize: "16px" }} />
          <Tooltip />
          <Legend />
          <ReferenceLine
            x={center - 309 || 15}
            stroke="red"
            label={centervalue || "0"}
          />
          <Line
            type="monotone"
            dataKey="red"
            stroke="#F45050"
            activeDot={{ r: 8 }}
            style={{ fontSize: "16px" }}
          >
            <LabelList
              dataKey="ref_point"
              color="#3C486B"
              position="top"
              style={{ fontSize: "16px" }}
            />
          </Line>
          <Line
            type="monotone"
            dataKey="blue"
            stroke="#8884d8"
            style={{ fontSize: "16px" }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              dataKey="ref_point"
              color="red"
              position="top"
              style={{ fontSize: "16px" }}
            />
          </Line>

          {/* <Line
            type="monotone"
            dataKey="qv"
            stroke="#3C486B"
            activeDot={{ r: 8 }}
          >
            <LabelList
              dataKey="point"
              color="#3C486B"
              position="top"
              style={{ fontSize: "16px" }}
            />
          </Line> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Spp_mesGraphChart;
