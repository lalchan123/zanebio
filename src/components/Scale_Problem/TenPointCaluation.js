import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import RechartGraphCalculate from "./RechartGraphCalculate";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_BOX_DETAIL_REF,
  TABLE_DATA_DETAIL,
} from "../GraphQL/Queries";

import {
  TABLE_COLUMN_DATA_DELETE,
  TABLE_COLUMN_DATA_UPDATE,
  CREATE_TABLE_DATA_INFO_MUTATION,
  APP_LOG_MUTATION,
} from "../GraphQL/Mutations";
import GraphCalculateright from "./GraphCalculateright";

const TenPointCaluation = ({
  formValues,
  formValues1,
  center,
  value,
  apl,
  apr,
  myScale,
  distance_value,
  myItemsleft,
  myItemsright,
}) => {
  const [date, setDate] = useState(Math.floor(Date.now() / 1000));
  const [open, setOpen] = useState(false);

  const [createTableDataInfo] = useMutation(CREATE_TABLE_DATA_INFO_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 24, tableColId: 0, tableRefId: "" },
      },
    ],
  });

  const {
    loading: table_data_loading,
    error: table_data_error,
    data: table_data,
  } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
    variables: { tableId: 24, tableColId: 0, tableRefId: "" },
  });

  const scale = [
    {
      factor: -16,
      ratio: -100,
    },
    {
      factor: -15,
      ratio: -100,
    },
    {
      factor: -14,
      ratio: -100,
    },
    {
      factor: -13,
      ratio: -100,
    },
    {
      factor: -12,
      ratio: -100,
    },
    {
      factor: -11,
      ratio: -100,
    },
    {
      factor: -10,
      ratio: -100,
    },
    {
      factor: -9,
      ratio: -100,
    },
    {
      factor: -8,
      ratio: -100,
    },
    {
      factor: -7,
      ratio: -100,
    },
    {
      factor: -6,
      ratio: -100,
    },
    {
      factor: -5,
      ratio: -90,
    },
    {
      factor: -4,
      ratio: -83,
    },
    {
      factor: -3,
      ratio: -72,
    },
    {
      factor: -2,
      ratio: -54,
    },
    {
      factor: -1,
      ratio: -33,
    },
    {
      factor: 0,
      ratio: 0,
    },
    {
      factor: 1,
      ratio: 33,
    },
    {
      factor: 2,
      ratio: 54,
    },
    {
      factor: 3,
      ratio: 72,
    },
    {
      factor: 4,
      ratio: 83,
    },
    {
      factor: 5,
      ratio: 90,
    },
    {
      factor: 6,
      ratio: 100,
    },
    {
      factor: 7,
      ratio: 100,
    },
    {
      factor: 8,
      ratio: 100,
    },
    {
      factor: 9,
      ratio: 100,
    },
    {
      factor: 10,
      ratio: 100,
    },
    {
      factor: 11,
      ratio: 100,
    },
    {
      factor: 12,
      ratio: 100,
    },
    {
      factor: 13,
      ratio: 100,
    },
  ];

  // factor = (referance point - terget point ) / 5

  const def_point = [
    4100, 4105, 4110, 4115, 4120, 4125, 4130, 4135, 4140, 4145, 4150, 4155,
    4160, 4165, 4170, 4175, 4180, 4185, 4190, 4195, 4200,
  ];

  const CalculateGraphRef = useRef();

  const ab_left = Math.abs(apl);
  const ab_right = Math.abs(apr);

  let tentargetPointFactorright = "";

  const [row, setRow] = useState([]);

  //left part

  let refPointleft = "";
  let refValueleft = "";
  let targetPointFactorleft = "";
  let buypointvalueleft = "";
  let alldataleft = [];

  let tenPointleft = myItemsleft.map((item) => {
    return {
      buy_point: item.buy_p_l,
      point: item.point_l,
    };
  });

  // right part

  let refPointright = "";
  let refValueright = "";
  let targetPointFactorright = "";
  let buypointvalueright = "";
  let alldataright = [];

  let tenPointright = myItemsright.map((item) => {
    return {
      buy_point: item.buy_p_r,
      point: item.point_r,
    };
  });

  let value_point_left = "";
  let target_value_left = "";
  let ratio_point_left = "";
  let center_value_left = "";
  let start_point_left = "";
  let end_point_left = "";
  let calculate_point_left = [];
  let cal_buy_point_left = "";
  let cal_point_left = "";

  let value_point_right = "";
  let target_value_right = "";
  let ratio_point_right = "";
  let center_value_right = "";
  let start_point_right = "";
  let end_point_right = "";
  let calculate_point_right = [];
  let cal_buy_point_right = "";
  let cal_point_right = "";

  const [dataleft, setDataleft] = useState();
  const [dataright, setDataright] = useState();
  const [myalldata, setMyalldata] = useState();

  // const onTenPoinMoveCalculate = () => {
  //   if (ab_left > ab_right) {
  //     tenPointleft.map((item) => {
  //       refPointleft = center;
  //       refValueleft = value;
  //       scale.map((val) => {
  //         targetPointFactorleft = (center - eval(item.buy_point) - 10) / 5;

  //         if (targetPointFactorleft === val.factor) {
  //           console.log("124", ab_left > ab_right);
  //           buypointvalueleft = (refValueleft * 100) / 100;

  //           alldataleft.push({
  //             ten_buy_point: eval(item.buy_point) + 10,
  //             ten_point: eval(item.point) * buypointvalueleft,
  //           });
  //         }
  //       });
  //     });
  //     console.log("10 point ", alldataright);
  //     center_value_right = center;
  //     value_point_right = value;

  //     def_point.map((item1) => {
  //       alldataleft.map((item2) => {
  //         console.log("148 buy point", item2.ten_buy_point);
  //         start_point_left = item1;
  //         console.log("start point 148", start_point_left);
  //         if (start_point_left === item1) {
  //           console.log("start point 150", item1);
  //           scale.map((item3) => {
  //             target_value_left = (center - item1) / 5;
  //             console.log("target value 153", target_value_left);
  //             if (Math.abs(target_value_left) === item3.factor) {
  //               console.log("155", item3.ratio);
  //               ratio_point_left = (value_point_left * item3.ratio) / 100;
  //               console.log("ratio 156", ratio_point_left);
  //               cal_buy_point_left = ((8.2 + 8.2) * ratio_point_left) / 100;
  //               cal_point_left =
  //                 (distance_value + item2.ten_point) / cal_buy_point_left;

  //               calculate_point_left.push({
  //                 node_point: start_point_left,
  //                 calculate_buy_point: cal_buy_point_left,
  //                 calculate_point: cal_point_left,
  //               });
  //             }
  //           });
  //         }
  //       });
  //     });

  //     setMyalldata([...calculate_point_left]);

  //     console.log("test value left", calculate_point_left);
  //     // setRow(
  //     //   calculate_point_left.map((item, i) => {
  //     //     return {
  //     //       id: i,
  //     //       buy_point: item.node_point,
  //     //       b_point: item.calculate_buy_point,
  //     //       point: item.calculate_point,
  //     //     };
  //     //   })
  //     // );
  //   }

  //   // right part
  //   if (ab_left < ab_right) {
  //     tenPointright.map((item) => {
  //       refPointright = center;
  //       refValueright = value;
  //       scale.map((val) => {
  //         targetPointFactorright = (eval(item.buy_point) + 10 - center) / 5;

  //         if (targetPointFactorright === val.factor) {
  //           buypointvalueright = (refValueright * val.ratio) / 100;

  //           alldataright.push({
  //             ten_buy_point: eval(item.buy_point) + 10,
  //             ten_point: eval(item.point) * buypointvalueright,
  //           });
  //         }
  //       });
  //     });
  //     center_value_right = center;
  //     value_point_right = value;

  //     def_point.map((item1) => {
  //       alldataright.map((item2) => {
  //         console.log("148 buy point", item2.ten_buy_point);
  //         start_point_right = item1;
  //         console.log("start point 148", start_point_right);
  //         if (start_point_right === item1) {
  //           console.log("start point 150", item1);
  //           scale.map((item3) => {
  //             target_value_right = (center - item1) / 5;
  //             console.log("target value 153", target_value_right);
  //             if (Math.abs(target_value_right) === item3.factor) {
  //               console.log("155", item3.ratio);
  //               ratio_point_right = (value_point_right * item3.ratio) / 100;
  //               console.log("ratio 156", ratio_point_right);
  //               cal_buy_point_right = ((8.2 + 8.2) * ratio_point_right) / 100;
  //               console.log("calcualte buy point", cal_buy_point_right);
  //               cal_point_right =
  //                 (distance_value + item2.ten_point) / cal_buy_point_right;
  //               // factor = (referance point - terget point ) / 5
  //               calculate_point_right.push({
  //                 node_point: start_point_right,
  //                 calculate_buy_point: cal_buy_point_right,
  //                 calculate_point: Math.round(cal_point_right),
  //               });
  //             }
  //           });
  //         }
  //       });
  //     });

  //     console.log("test value right", calculate_point_right);
  //   }
  // };

  // if (ab_left < ab_right) {
  //   def_point.map((item, i) => {
  //     if (item) {
  //       ab_left++ === ab_right;
  //       console.log("ab", ab_left);
  //     }
  //   });
  // }

  // factor = (referance point - terget point ) / 5

  let valueDic = [];
  let factorValue = [];
  let side = "";
  let len_value = "";
  let len_cal_arr = [];

  if (ab_left < ab_right) {
    side = "l";
  } else {
    side = "r";
  }

  const Node1 = myItemsleft.map((item) => {
    return item.buy_p_l;
  });

  const Node2 = myItemsright.map((item) => {
    return item.buy_p_r;
  });

  const minNode = Math.min(...Node1);
  console.log("367", minNode);

  const maxNode = Math.min(...Node2);
  console.log("368", maxNode);

  def_point.map((item1) => {
    const factor = (center - item1) / 5;
    factorValue.push(factor);

    scale.map((item2) => {
      if (item2.factor === factor) {
        valueDic.push({
          node: item1,
          factor: factor,
          ratio: item2.ratio,
          side: side,
          ref_value: value,
          c_point: center,
        });
        // console.log("339", valueDic);
      }
    });
  });

  valueDic.map((item3) => {
    if (item3.node > center) {
      len_value = item3.ref_value + item3.ref_value * (item3.ratio / 100);
    } else {
      len_value = item3.ref_value + item3.ref_value * (item3.ratio / 100);
    }
    len_cal_arr.push({
      node_left: item3.node,
      side_left: "left",
      len_value_left: len_value.toFixed(2),
      num_of_point_left:
        distance_value / len_value === Infinity || 0
          ? 0
          : (distance_value / len_value).toFixed(2),
    });

    if (item3.node < center) {
      len_value = item3.ref_value - item3.ref_value * (item3.ratio / 100);
    } else {
      len_value = item3.ref_value - item3.ref_value * (item3.ratio / 100);
    }
    len_cal_arr.push({
      node_right: item3.node,
      side_right: "right",
      len_value_right: len_value.toFixed(2),
      num_of_point_right:
        distance_value / len_value === Infinity
          ? 0
          : (distance_value / len_value).toFixed(2),
    });
  });

  console.log("408", len_cal_arr);

  const tableRow = len_cal_arr.map((item, i) => {
    return {
      id: i,
      node: item.node_left || item.node_right,
      len_value: item.len_value_left || item.len_value_right,
      side: item.side_left || item.side_right,
      num: item.num_of_point_left || item.num_of_point_right,
    };
  });

  // Calculation Value
  const len_cal_arr_left = [];
  const len_cal_arr_right = [];

  len_cal_arr.map((item) => {
    if (item.side_left === "left") {
      len_cal_arr_left.push({
        node: item.node_left,
        len_value: item.len_value_left,
        side: item.side_left,
        num: item.num_of_point_left,
      });
    }
  });

  len_cal_arr.map((item) => {
    if (item.side_right === "right") {
      len_cal_arr_right.push({
        node: item.node_right,
        len_value: item.len_value_right,
        side: item.side_right,
        num: item.num_of_point_right,
      });
    }
  });

  const lencomDic = [];

  len_cal_arr_left.map((item1) => {
    len_cal_arr_right.map((item2) => {
      lencomDic.push({
        com_dir: "l_to_r",
        com_l: item1.len_value,
        com_r: item2.len_value,
        com_t: distance_value,
        com_value:
          eval(item1.len_value) - eval(distance_value) + eval(item2.len_value),
      });
    });
  });

  len_cal_arr_left.map((item1) => {
    len_cal_arr_left.map((item2) => {
      lencomDic.push({
        com_dir: "l_to_l",
        com_l: item1.len_value,
        com_r: item2.len_value,
        com_t: distance_value,
        com_value:
          eval(item1.len_value) - eval(distance_value) + eval(item2.len_value),
      });
    });
  });

  len_cal_arr_right.map((item1) => {
    len_cal_arr_left.map((item2) => {
      lencomDic.push({
        com_dir: "r_to_l",
        com_l: item1.len_value,
        com_r: item2.len_value,
        com_t: distance_value,
        com_value:
          eval(item1.len_value) - eval(distance_value) + eval(item2.len_value),
      });
    });
  });

  len_cal_arr_right.map((item1) => {
    len_cal_arr_right.map((item2) => {
      lencomDic.push({
        com_dir: "r_to_r",
        com_l: item1.len_value,
        com_r: item2.len_value,
        com_t: distance_value,
        com_value:
          eval(item1.len_value) - eval(distance_value) + eval(item2.len_value),
      });
    });
  });

  console.log("551", lencomDic);

  const lenRow = lencomDic.map((item, i) => {
    return {
      id: i,
      com_dir: item.com_dir,
      com_l: item.com_l,
      com_r: item.com_r,
      com_t: item.com_t,
      com_value: item.com_value,
    };
  });

  // Point Calculation Data Mutation

  const onSubmitCalculationdata = () => {
    len_cal_arr.map((item, i) => {
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.node,
          tableColId: 23,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.len_value,
          tableColId: 24,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.side,
          tableColId: 25,
          tabRelId: date + i,
        },
      });
    });
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6} sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              margin: "5px 5px 5px 5px ",
              p: "0px 0px 0px 0px",
              minHeight: "150px",
              border: "1px dashed grey",
            }}
          >
            <Box
              sx={{
                bgcolor: "green",
                textAlign: "center",
                color: "white",
                padding: "8px 0px",
              }}
            >
              Calculate Point
            </Box>

            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                hideFooter={true}
                rows={tableRow}
                columns={[
                  { field: "id", headerName: "id", hide: true },
                  { field: "node", headerName: "Node" },
                  { field: "len_value", headerName: "Len Value" },
                  { field: "side", headerName: "Side" },
                  { field: "num", headerName: "Num_of_porint" },
                ]}
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              onSubmitCalculationdata();
            }}
          >
            Calculate Data Save
          </Button>
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginTop: "40px" }}>
          <RechartGraphCalculate tableRow={len_cal_arr} center={center} />
          <GraphCalculateright tableRow={len_cal_arr} center={center} />
        </Grid>
        <Grid item xs={7} md={7} sx={{ marginTop: "40px" }}>
          <Box
            sx={{
              margin: "5px 5px 5px 5px ",
              p: "0px 0px 0px 0px",
              minHeight: "150px",
              border: "1px dashed grey",
            }}
          >
            <Box
              sx={{
                bgcolor: "green",
                textAlign: "center",
                color: "white",
                padding: "8px 0px",
              }}
            >
              Com Value
            </Box>
            <div style={{ height: 500, width: 650 }}>
              <DataGrid
                // hideFooter={true}
                rows={lenRow}
                columns={[
                  { field: "id", headerName: "id" },
                  { field: "com_dir", headerName: "Com_Dic" },
                  { field: "com_l", headerName: "Com_L" },
                  { field: "com_r", headerName: "Com_R" },
                  { field: "com_t", headerName: "Com_T" },
                  { field: "com_value", headerName: "Com_Value" },
                ]}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default TenPointCaluation;
