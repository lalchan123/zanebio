import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";

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

import SortestPointSolutation from "./SortestPointSolutation";
import GraphTable from "../";
import RechartGraph from "./RechartGraph";
import TenPointCaluation from "./TenPointCaluation";
import RechartGraphCalculate from "./RechartGraphCalculate";
import { IconButton } from "@mui/material";

const ScaleProblem = () => {
  const myScale = [
    {
      node: 4095,
      ratio: 100,
    },
    {
      node: 4100,
      ratio: 100,
    },
    {
      node: 4105,
      ratio: 90,
    },
    {
      node: 4110,
      ratio: 83,
    },
    {
      node: 4115,
      ratio: 72,
    },
    {
      node: 4120,
      ratio: 54,
    },
    {
      node: 4125,
      ratio: 37,
    },
    {
      node: 4130,
      ratio: 33,
    },
    {
      node: 4135,
      ratio: 0,
    },
    {
      node: 4140,
      ratio: 33,
    },

    {
      node: 4145,
      ratio: 37,
    },
    {
      node: 4150,
      ratio: 54,
    },
    {
      node: 4155,
      ratio: 72,
    },
    {
      node: 4160,
      ratio: 83,
    },
    {
      node: 4165,
      ratio: 90,
    },
    {
      node: 4170,
      ratio: 100,
    },
    {
      node: 4175,
      ratio: 100,
    },
    {
      node: 4180,
      ratio: 100,
    },
    {
      node: 4185,
      ratio: 100,
    },
    {
      node: 4190,
      ratio: 100,
    },
    {
      node: 4195,
      ratio: 100,
    },
    {
      node: 4200,
      ratio: 100,
    },
  ];

  const {
    loading: page_loading,
    error: page_error,
    data: table_info,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: { tableId: 24, tableColId: "", tabRelId: "" },
  });

  const [createTableDataInfo] = useMutation(CREATE_TABLE_DATA_INFO_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 24, tableColId: 0, tableRefId: "" },
      },
    ],
  });

  const [date1, setDate1] = useState(Math.floor(Date.now() / 1000));
  const [date2, setDate2] = useState(Math.floor(Date.now() / 1000));
  const [date, setDate] = useState();
  const [incapl, setIncapl] = useState();
  const [incapr, setIncapr] = useState();
  const [open, setOpen] = useState();
  const [graph, setGraph] = useState();

  const demoRef = useRef();

  // Left side
  const [formValues, setFormValues] = useState([
    {
      bp_left: "",
      buyp_left: "",
      p_left: "",
    },
  ]);

  console.log("15", formValues);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        bp_left: "",
        buyp_left: "",
        p_left: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  const handleSubmitLeft = () => {};

  // Center Point

  const [center, setCenter] = useState(4135);

  const [value, setValue] = useState(2.2);

  console.log("62", center);

  // Right side

  const [formValues1, setFormValues1] = useState([
    {
      bp_right: "",
      buyp_right: "",
      p_right: "",
    },
  ]);

  let handleChange1 = (i, e) => {
    let newFormValues1 = [...formValues1];
    newFormValues1[i][e.target.name] = e.target.value;
    setFormValues1(newFormValues1);
  };

  let addFormFields1 = () => {
    setFormValues1([
      ...formValues1,
      {
        bp_right: "",
        buyp_right: "",
        p_right: "",
      },
    ]);
  };

  let removeFormFields1 = (i) => {
    let newFormValues1 = [...formValues1];
    newFormValues1.splice(i, 1);
    setFormValues1(newFormValues1);
  };

  let buy_point = "";
  let point = "";
  let b_point = "";
  let bpt_point = "";
  let d_point = "";
  let a_point = "";

  const {
    loading: box_data_loading,
    error: box_data_error,
    data: box_data,
  } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
    variables: { tableId: 24, tableColId: 0, tableRefId: "" },
  });

  let myItemsleft = [];
  let myItemsright = [];
  let myItemTableDataLeftId = [];
  let myItemTableDataRightId = [];

  box_data?.getTableDataRefIdInfo?.forEach((sub) => {
    if (sub.tableColId === 1) {
      myItemTableDataLeftId.push(sub.tabRelId);
    }
  });

  myItemTableDataLeftId.map((val, i) => {
    box_data?.getTableDataRefIdInfo?.forEach((sub) => {
      if (sub.tableColId === 1 && sub.tabRelId === val) {
        buy_point = sub.columnData;

        if (point !== "") {
          myItemsleft.push({
            buy_p_l: sub.columnData,
            point_l: point,
            b_p_l: b_point,
            bpt_p_l: bpt_point,
            d_p_l: d_point,
            a_p_l: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }

      if (sub.tableColId === 2 && sub.tabRelId === val) {
        point = sub.columnData;
        if (buy_point !== "") {
          myItemsleft.push({
            buy_p_l: buy_point,
            point_l: sub.columnData,
            b_p_l: b_point,
            bpt_p_l: bpt_point,
            d_p_l: d_point,
            a_p_l: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }

      if (sub.tableColId === 3 && sub.tabRelId === val) {
        b_point = sub.columnData;

        if (point !== "") {
          myItemsleft.push({
            buy_p_l: buy_point,
            point_l: point,
            b_p_l: sub.columnData,
            bpt_p_l: bpt_point,
            d_p_l: d_point,
            a_p_l: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
      if (sub.tableColId === 4 && sub.tabRelId === val) {
        bpt_point = sub.columnData;
        if (buy_point !== "") {
          myItemsleft.push({
            buy_p_l: buy_point,
            point_l: point,
            b_p_l: b_point,
            bpt_p_l: sub.columnData,
            d_p_l: d_point,
            a_p_l: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
      if (sub.tableColId === 5 && sub.tabRelId === val) {
        d_point = sub.columnData;
        if (point !== "") {
          myItemsleft.push({
            buy_p_l: buy_point,
            point_l: point,
            b_p_l: b_point,
            bpt_p_l: bpt_point,
            d_p_l: sub.columnData,
            a_p_l: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
      if (sub.tableColId === 6 && sub.tabRelId === val) {
        a_point = sub.columnData;
        if (buy_point !== "") {
          myItemsleft.push({
            buy_p_l: buy_point,
            point_l: point,
            b_p_l: b_point,
            bpt_p_l: bpt_point,
            d_p_l: d_point,
            a_p_l: sub.columnData,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
    });
  });

  box_data?.getTableDataRefIdInfo?.forEach((sub) => {
    if (sub.tableColId === 7) {
      myItemTableDataRightId.push(sub.tabRelId);
    }
  });

  myItemTableDataRightId.map((val, i) => {
    box_data?.getTableDataRefIdInfo?.forEach((sub) => {
      if (sub.tableColId === 7 && sub.tabRelId === val) {
        buy_point = sub.columnData;

        if (point !== "") {
          myItemsright.push({
            buy_p_r: sub.columnData,
            point_r: point,
            b_p_r: b_point,
            bpt_p_r: bpt_point,
            d_p_r: d_point,
            a_p_r: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }

      if (sub.tableColId === 8 && sub.tabRelId === val) {
        point = sub.columnData;
        if (buy_point !== "") {
          myItemsright.push({
            buy_p_r: buy_point,
            point_r: sub.columnData,
            b_p_r: b_point,
            bpt_p_r: bpt_point,
            d_p_r: d_point,
            a_p_r: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }

      if (sub.tableColId === 9 && sub.tabRelId === val) {
        b_point = sub.columnData;

        if (point !== "") {
          myItemsright.push({
            buy_p_r: buy_point,
            point_r: point,
            b_p_r: sub.columnData,
            bpt_p_r: bpt_point,
            d_p_r: d_point,
            a_p_r: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
      if (sub.tableColId === 10 && sub.tabRelId === val) {
        bpt_point = sub.columnData;
        if (buy_point !== "") {
          myItemsright.push({
            buy_p_r: buy_point,
            point_r: point,
            b_p_r: b_point,
            bpt_p_r: sub.columnData,
            d_p_r: d_point,
            a_p_r: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
      if (sub.tableColId === 11 && sub.tabRelId === val) {
        d_point = sub.columnData;
        if (point !== "") {
          myItemsright.push({
            buy_p_r: buy_point,
            point_r: point,
            b_p_r: b_point,
            bpt_p_r: bpt_point,
            d_p_r: sub.columnData,
            a_p_r: a_point,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
      if (sub.tableColId === 12 && sub.tabRelId === val) {
        a_point = sub.columnData;
        if (buy_point !== "") {
          myItemsright.push({
            buy_p_r: buy_point,
            point_r: point,
            b_p_r: b_point,
            bpt_p_r: bpt_point,
            d_p_r: d_point,
            a_p_r: sub.columnData,
          });
          buy_point = "";
          point = "";
          b_point = "";
          bpt_point = "";
          d_point = "";
          a_point = "";
        }
      }
    });
  });

  const [leftid, setLeftid] = useState("");

  const deleteLeftId = React.useCallback((id) => () => {
    setLeftid(id);
  });

  const [rightid, setRightid] = useState("");

  const deleteRightId = React.useCallback((id) => () => {
    setRightid(id);
  });

  const [columnDataDelete] = useMutation(TABLE_COLUMN_DATA_DELETE, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 24, tableColId: 0, tableRefId: "" },
      },
    ],
  });

  const [columnDataUpdate] = useMutation(TABLE_COLUMN_DATA_UPDATE, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 24, tableColId: 0, tableRefId: "" },
      },
    ],
  });

  const onDeleteLeft = () => {
    myItemTableDataLeftId.map((item1, index) => {
      if (index === leftid) {
        box_data?.getTableDataRefIdInfo?.map((item2, i) => {
          if (item1 === item2.tabRelId) {
            console.log("deleted", item2.tabRelId);
            columnDataDelete({
              variables: {
                id: item2.tableDataId,
              },
            });
          }
        });
      }
    });
  };

  const onDeleteRight = () => {
    myItemTableDataRightId.map((item1, index) => {
      if (index === rightid) {
        box_data?.getTableDataRefIdInfo?.map((item2, i) => {
          if (item1 === item2.tabRelId) {
            console.log("deleted", item2.tabRelId);
            columnDataDelete({
              variables: {
                id: item2.tableDataId,
              },
            });
          }
        });
      }
    });
  };

  // summerry for right

  const arraySum = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
    }
    return total;
  };

  const bpt_r = myItemsright.map((item, i) => {
    return eval(item.b_p_r * item.point_r);
  });

  const bptr = arraySum(bpt_r);

  let ap_r = myItemsright.map((item, i) => {
    if (center <= eval(item.buy_p_r)) {
      return eval(item.buy_p_r - center) * eval(item.point_r);
    } else {
      return 0;
    }
  });

  let apr = arraySum(ap_r);

  const bpt_l = myItemsleft.map((item, i) => {
    return eval(item.b_p_l * item.point_l);
  });

  const bptl = arraySum(bpt_l);

  let ap_l = myItemsleft.map((item, i) => {
    if (center >= eval(item.buy_p_l)) {
      return eval(center - item.buy_p_l) * eval(item.point_l);
    } else {
      return 0;
    }
  });

  let apl = arraySum(ap_l);

  const totalLeft = apl + bptl;
  const totalRight = apr + bptr;

  const distance_value = Math.abs(totalLeft - totalRight);

  const addLeftTableValue = () => {
    formValues.map((item, i) => {
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.buyp_left,
          tableColId: 1,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.p_left,
          tableColId: 2,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.bp_left,
          tableColId: 3,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: eval(item.bp_left) * eval(item.p_left),
          tableColId: 4,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: center - eval(item.buyp_left),
          tableColId: 5,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData:
            center >= eval(item.buyp_left) ? center - eval(item.buyp_left) : 0,
          tableColId: 6,
          tabRelId: date1 + i,
        },
      });
      //   console.log("2", item.p_left);
      //   myItemsleft.map((val) => {
      //     console.log("1", val.buyp_left);
      //     if (val.buy_p_l === item.buyp_left) {
      //       console.log("same data");
      //       box_data?.getTableDataRefIdInfo?.map((item2) => {
      //         myItemTableDataLeftId.map((item3) => {
      //           console.log("valid data 4", item2.tableColId);
      //           if (item2.tabRelId === item3 && item2.tableColId === 2) {
      //             console.log("valid datartyrtyh", item.p_left);
      //             columnDataUpdate({
      //               variables: {
      //                 id: item2.tableDataId,
      //                 columnData: eval(item.p_left) + item2.columnData,
      //               },
      //             });
      //           }
      //           if (item2.tabRelId === item3 && item2.tableColId === 3) {
      //             columnDataUpdate({
      //               variables: {
      //                 id: item2.tableDataId,
      //                 columnData: eval(item.bp_left) + item2.columnData,
      //               },
      //             });
      //           }
      //           if (item2.tabRelId === item3 && item2.tableColId === 4) {
      //             columnDataUpdate({
      //               variables: {
      //                 id: item2.tableDataId,
      //                 columnData:
      //                   (eval(item.p_left) + eval(val.point_l)) *
      //                   (eval(item.bp_left) + eval(val.b_p_l)),
      //               },
      //             });
      //           }
      //         });
      //       });
      //     } else {
      //       console.log("not same data");
      //       createTableDataInfo({
      //         variables: {
      //           tableId: 24,
      //           columnData: item.buyp_left,
      //           tableColId: 1,
      //           tabRelId: date1 + i,
      //         },
      //       });
      //       createTableDataInfo({
      //         variables: {
      //           tableId: 24,
      //           columnData: item.p_left,
      //           tableColId: 2,
      //           tabRelId: date1 + i,
      //         },
      //       });
      //       createTableDataInfo({
      //         variables: {
      //           tableId: 24,
      //           columnData: item.bp_left,
      //           tableColId: 3,
      //           tabRelId: date1 + i,
      //         },
      //       });
      //       createTableDataInfo({
      //         variables: {
      //           tableId: 24,
      //           columnData: eval(item.bp_left) * eval(item.p_left),
      //           tableColId: 4,
      //           tabRelId: date1 + i,
      //         },
      //       });
      //       createTableDataInfo({
      //         variables: {
      //           tableId: 24,
      //           columnData: center - eval(item.buyp_left),
      //           tableColId: 5,
      //           tabRelId: date1 + i,
      //         },
      //       });
      //       createTableDataInfo({
      //         variables: {
      //           tableId: 24,
      //           columnData:
      //             center >= eval(item.buyp_left)
      //               ? center - eval(item.buyp_left)
      //               : 0,
      //           tableColId: 6,
      //           tabRelId: date1 + i,
      //         },
      //       });
      //     }
      //   });
      // });
      // summery
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: apl,
      //     tableColId: 13,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: bpl,
      //     tableColId: 14,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: totalLeft,
      //     tableColId: 15,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: apr,
      //     tableColId: 16,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: bpr,
      //     tableColId: 17,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: totalRight,
      //     tableColId: 18,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: date,
      //     tableColId: 19,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: center,
      //     tableColId: 20,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: value,
      //     tableColId: 21,
      //     tabRelId: "1",
      //   },
      // });
      // createTableDataInfo({
      //   variables: {
      //     tableId: 24,
      //     columnData: totalLeft + totalRight,
      //     tableColId: 22,
      //     tabRelId: "1",
      //   },
    });
    setOpen(false);
  };

  const addRightTableValue = () => {
    formValues1.map((item, i) => {
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.buyp_right,
          tableColId: 7,
          tabRelId: date2 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.p_right,
          tableColId: 8,
          tabRelId: date2 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: item.bp_right,
          tableColId: 9,
          tabRelId: date2 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: eval(item.bp_right) * eval(item.p_right),
          tableColId: 10,
          tabRelId: date2 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData: eval(item.buyp_right) - center,
          tableColId: 11,
          tabRelId: date2 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 24,
          columnData:
            center <= eval(item.buyp_right)
              ? eval(item.buyp_right) - center
              : 0,
          tableColId: 12,
          tabRelId: date2 + i,
        },
      });
    });

    setOpen(false);
  };

  return (
    <div>
      <Container>
        <Box
          sx={{
            bgcolor: "#F6F1F1",
            textAlign: "center",
            padding: "16px 0px",
            marginTop: "20px",
          }}
        >
          Scale Problem
          <TextField
            value={date}
            onChange={(event) => setDate(event.target.value)}
            variant="standard"
            id="date"
            type="date"
            defaultValue="2023-03-05"
            sx={{ width: 150, float: "right" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        {formValues.map((item) => {
          return <p>{item.bpt_left}</p>;
        })}
        <Grid container spacing={1}>
          <Grid item xs={5} md={5} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "300px",
                border: "1px dashed grey",
              }}
            >
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    bgcolor: "#FC4F00",
                    textAlign: "center",
                    color: "white",
                    padding: "8px 0px",
                  }}
                >
                  Left Side
                </Box>
              </Grid>
              <Stack direction="row" spacing={14} sx={{ textAlign: "center" }}>
                <Box sx={{ textAlign: "center" }}>B Point</Box>
                <Box sx={{ textAlign: "center" }}>Buying Point</Box>
                <Box sx={{ textAlign: "center" }}>Point</Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <form onSubmit={handleSubmitLeft}>
                    {formValues.map((element, index) => (
                      <div className="form-inline" key={index}>
                        <Stack direction="row" spacing={0}>
                          <input
                            placeholder="b p "
                            style={{
                              width: "140px",
                              marginLeft: "3px",
                              marginTop: "3px",
                            }}
                            type="text"
                            name="bp_left"
                            value={element.bp_left || ""}
                            onChange={(e) => handleChange(index, e)}
                          />

                          <input
                            placeholder="Buy Point "
                            style={{
                              width: "140px",
                              marginLeft: "3px",
                              marginTop: "3px",
                            }}
                            type="text"
                            name="buyp_left"
                            value={element.buyp_left || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                          <input
                            placeholder="Point"
                            style={{
                              width: "140px",
                              marginLeft: "3px",
                              marginTop: "3px",
                            }}
                            type="text"
                            name="p_left"
                            value={element.p_left || ""}
                            onChange={(e) => handleChange(index, e)}
                          />
                          {index ? (
                            <IconButton
                              type="button"
                              className="button remove"
                              onClick={() => removeFormFields(index)}
                              size="small"
                            >
                              <ClearIcon />
                            </IconButton>
                          ) : null}
                        </Stack>
                      </div>
                    ))}
                    <div className="button-section">
                      <Button
                        variant="outlined"
                        className="button add"
                        type="button"
                        onClick={() => addFormFields()}
                        size="small"
                        sx={{ marginTop: "5px", marginLeft: "3px" }}
                      >
                        Add
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ marginTop: "5px", marginLeft: "3px" }}
                        onClick={addLeftTableValue}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={2} md={2} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "300px",
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
                Center Point
              </Box>
              <input
                placeholder="center point"
                type="text"
                onChange={(e) => setCenter(e.target.value)}
                style={{
                  width: "100px",
                  marginLeft: "35px",
                  marginTop: "25px",
                }}
                name="dp_left"
              />
              <input
                placeholder="value"
                type="text"
                onChange={(e) => setValue(e.target.value)}
                style={{
                  width: "100px",
                  marginLeft: "35px",
                  marginTop: "25px",
                }}
                name="value"
              />
            </Box>
          </Grid>
          <Grid item xs={5} md={5} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "300px",
                border: "1px dashed grey",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#19A7CE",
                  textAlign: "center",
                  color: "white",
                  padding: "8px 0px",
                }}
              >
                Right Side
              </Box>
              <Stack direction="row" spacing={14} sx={{ margin: "auto" }}>
                <Box sx={{}}>B Point</Box>
                <Box sx={{}}>Buying Point</Box>
                <Box sx={{}}>Point</Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <form>
                    {formValues1.map((element, index) => (
                      <div className="form-inline" key={index}>
                        <Stack direction="row" spacing={0}>
                          <input
                            placeholder="b p "
                            style={{
                              width: "140px",
                              marginLeft: "3px",
                              marginTop: "3px",
                            }}
                            type="text"
                            name="bp_right"
                            value={element.bp_right || ""}
                            onChange={(e) => handleChange1(index, e)}
                          />

                          <input
                            placeholder="Buy Point "
                            style={{
                              width: "140px",
                              marginLeft: "3px",
                              marginTop: "3px",
                            }}
                            type="text"
                            name="buyp_right"
                            value={element.buyp_right || ""}
                            onChange={(e) => handleChange1(index, e)}
                          />
                          <input
                            placeholder="Point"
                            style={{
                              width: "140px",
                              marginLeft: "3px",
                              marginTop: "3px",
                            }}
                            type="text"
                            name="p_right"
                            value={element.p_right || ""}
                            onChange={(e) => handleChange1(index, e)}
                          />
                          <Box>
                            {index ? (
                              <IconButton
                                type="button"
                                className="button remove"
                                onClick={() => removeFormFields1(index)}
                                size="small"
                              >
                                <ClearIcon />
                              </IconButton>
                            ) : null}
                          </Box>
                        </Stack>
                      </div>
                    ))}
                    <div className="button-section">
                      <Button
                        variant="outlined"
                        className="button add"
                        type="button"
                        onClick={() => addFormFields1()}
                        size="small"
                        sx={{ marginTop: "5px", marginLeft: "3px" }}
                      >
                        Add
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ marginTop: "5px", marginLeft: "3px" }}
                        onClick={addRightTableValue}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box sx={{}}>
              {/* <Button
                variant="contained"
                onClick={() => demoRef.current.onClickValue()}
              >
                Submit
              </Button> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box sx={{}}>
              {/* <Button variant="contained" onClick={onValueSummery}>
                Submit
              </Button> */}
              {/* <GraphTable formValues={formValues} formValues1={formValues1} /> */}
              <RechartGraph
                myItemsleft={myItemsleft}
                myItemsright={myItemsright}
                ref={demoRef}
                center={center}
              />
            </Box>
          </Grid>
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
                  bgcolor: "#FC4F00",
                  textAlign: "center",
                  color: "white",
                  padding: "8px 0px",
                }}
              >
                Left Side
                <Button onClick={onDeleteLeft}>Confirm</Button>
              </Box>

              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  hideFooter={true}
                  rows={myItemsleft.map((item, i) => {
                    return {
                      id: i,
                      buyp_left: item.buy_p_l,
                      point_left: item.point_l,
                      bp_left: item.b_p_l,
                      btp_left: item.bpt_p_l,
                      dp_left: item.d_p_l,
                      ap_left: item.a_p_l,
                    };
                  })}
                  columns={[
                    { field: "id", headerName: "id", hide: true, width: 80 },
                    { field: "buyp_left", headerName: "Buying P", width: 80 },
                    { field: "point_left", headerName: "Point", width: 80 },
                    { field: "bp_left", headerName: "B Point", width: 80 },
                    { field: "btp_left", headerName: "BPT", width: 80 },
                    { field: "dp_left", headerName: "D Point", width: 80 },
                    { field: "ap_left", headerName: "A Point", width: 80 },
                    {
                      field: "actions",
                      type: "actions",
                      width: 60,
                      getActions: (params) => [
                        <GridActionsCellItem
                          icon={<DeleteIcon />}
                          label="Delete"
                          onClick={deleteLeftId(params.id)}
                        ></GridActionsCellItem>,
                      ],
                    },
                  ]}
                />
              </div>
              <Box
                sx={{
                  bgcolor: "#FFDEB9",
                  textAlign: "center",
                  padding: "8px 0px",
                }}
              >
                <Stack direction="row" spacing={7} sx={{ textAlign: "center" }}>
                  <Box sx={{ marginLeft: "20px", fontSize: "20px" }}>
                    {" "}
                    AP: {apl || 0}
                  </Box>
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    {" "}
                    BPT: {bptl || 0}
                  </Box>
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    Total: {Math.abs(totalLeft) || 0}
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Grid>
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
                  bgcolor: "#19A7CE",
                  textAlign: "center",
                  color: "white",
                  padding: "8px 0px",
                }}
              >
                Right Side
                <Button onClick={onDeleteRight}>Confirm</Button>
              </Box>

              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  hideFooter={true}
                  rows={myItemsright.map((item, i) => {
                    return {
                      id: i,
                      buyp_right: item.buy_p_r,
                      point_right: item.point_r,
                      bp_right: item.b_p_r,
                      btp_right: item.bpt_p_r,
                      dp_right: item.d_p_r,
                      ap_right: item.a_p_r,
                    };
                  })}
                  columns={[
                    { field: "id", headerName: "id", hide: true, width: 80 },
                    { field: "buyp_right", headerName: "Buying P", width: 80 },
                    { field: "point_right", headerName: "Point", width: 80 },
                    { field: "bp_right", headerName: "B Point", width: 80 },
                    { field: "btp_right", headerName: "B P T", width: 80 },
                    { field: "dp_right", headerName: "D Point", width: 80 },
                    { field: "ap_right", headerName: "A Point", width: 80 },
                    {
                      field: "actions",
                      type: "actions",
                      width: 60,
                      getActions: (params) => [
                        <GridActionsCellItem
                          icon={<DeleteIcon />}
                          label="Delete"
                          onClick={deleteRightId(params.id)}
                        ></GridActionsCellItem>,
                      ],
                    },
                  ]}
                />
              </div>

              <Box
                sx={{
                  bgcolor: "#FFDEB9",
                  textAlign: "center",
                  padding: "8px 0px",
                }}
              >
                <Stack direction="row" spacing={7} sx={{ textAlign: "center" }}>
                  <Box sx={{ marginLeft: "20px", fontSize: "20px" }}>
                    {" "}
                    AP: {apr || 0}
                  </Box>
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    {" "}
                    BPT: {bptr || 0}
                  </Box>
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    {" "}
                    Total: {Math.abs(totalRight) || 0}
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box sx={{ width: "100", fontSize: "30px", textAlign: "center" }}>
              Total Value : {Math.abs(totalLeft - totalRight) || 0}
            </Box>
          </Grid>
          {/* <Grid
            item
            xs={2}
            md={2}
            sx={{ marginTop: "20px", marginBottom: "200px" }}
          >
            <Box sx={{}}>
              <Button
                variant="contained"
                color="success"
                onClick={addCalculationDataInfo}
              >
                Calculate Value{" "}
              </Button>
            </Box>
          </Grid> */}
          <Grid
            item
            xs={12}
            md={12}
            sx={{ marginTop: "20px", marginBottom: "200px" }}
          >
            <TenPointCaluation
              formValues={formValues}
              formValues1={formValues1}
              myItemsleft={myItemsleft}
              myItemsright={myItemsright}
              center={center}
              value={value}
              apl={apl}
              apr={apr}
              myScale={myScale}
              distance_value={distance_value}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ marginTop: "20px", marginBottom: "200px" }}
          ></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ScaleProblem;
