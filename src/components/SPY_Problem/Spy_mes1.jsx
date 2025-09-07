import React, { useState, useEffect, useRef, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_BOX_DETAIL_REF,
  TABLE_DATA_DETAIL,
} from "../../GraphQL/Queries";

import {
  TABLE_COLUMN_DATA_DELETE,
  TABLE_COLUMN_DATA_UPDATE,
  CREATE_TABLE_DATA_INFO_MUTATION,
  APP_LOG_MUTATION,
} from "../../GraphQL/Mutations";

import Spp_mesGraphChart from "./Spp_mesGraphChart";
import Spp_Table_Left from "./Spp_Table_Left";
import Spp_Table_Right from "./Spp_Table_Right";
import { BaseURL1 } from "./Contants";
import { ItemDescription } from "semantic-ui-react";
import Graph_Table_Left from "./Graph_Table_Left";
import { AppContext } from "../../AppContext";

const Spy_mes = (props) => {
  const {
    loading: page_loading,
    error: page_error,
    data: table_info,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: { tableId: 28, tableColId: "", tabRelId: "" },
  });

  const [createTableDataInfo] = useMutation(CREATE_TABLE_DATA_INFO_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 28, tableColId: 0, tableRefId: "" },
      },
    ],
  });

  const deleteLeft = useRef();
  const deleteRight = useRef();

  const [date, setDate] = useState(Math.floor(Date.now() / 1000));
  const [date1, setDate1] = useState(Math.floor(Date.now() / 1000));
  const [incapl, setIncapl] = useState();
  const [incapr, setIncapr] = useState();
  const [open, setOpen] = useState();
  const [graph, setGraph] = useState();

  // Left side

  const [leftValues, setLeftValues] = useState([
    {
      ref_point_left: "",
      date_left: "",
      buy_point_left: "",
      bpt_left: "",
      num_of_point_left: "",
      color_left: "",
    },
  ]);

  let handleChangeLeft = (i, e) => {
    let newLeftValues = [...leftValues];
    newLeftValues[i][e.target.name] = e.target.value;
    setLeftValues(newLeftValues);
  };

  let addLeftFields = () => {
    setLeftValues([
      ...leftValues,
      {
        ref_point_left: "",
        date_left: "",
        buy_point_left: "",
        bpt_left: "",
        num_of_point_left: "",
        color_left: "",
      },
    ]);
  };

  let removeLeftFields = (id) => {
    let newLeftValues = [...leftValues];
    leftValues.map((item, i) => {
      if (i === id) {
        newLeftValues.splice(i, 1);
        setLeftValues(newLeftValues);
      }
    });
  };

  const [oncolor, setOncolor] = useState("white");

  let onTimeDeleteValueLeft = (id) => {
    leftValues.map((item, i) => {
      if (i === id) {
        setOncolor("red");
      }
    });
  };

  const left = leftValues.map((item, i) => {
    return {
      id: i,
      ref_p: item.ref_point_left,
      date: item.date_left,
      buy_p: item.buy_point_left,
      bpt: item.bpt_left,
      num_of_p: item.num_of_point_left,
      point_def: item.point_def_left,
      color: item.color_left,
    };
  });

  const [rowleft, setRowleft] = useState([]);

  const handleSubmitLeft = () => {
    setRowleft([...left]);
  };

  // Center Point

  const {
    MinP,
    setMinP,
    MaxP,
    setMaxP,
    D1_Point0,
    setD1_Point0,
    D1_Point1,
    setD1_Point1,
    D2_Point2,
    setD2_Point2, } =
    useContext(AppContext);

  const [starting_point, setstarting_point] = useState();
  const [starting_value, setstarting_value] = useState();
  const [daygap, setdaygap] = useState();
  const [first_run, setfirst_run] = useState("");
  const [value_range_list2, setvalue_range_list2] = useState([]);
  const [starting_range, setstarting_range] = useState();
  const [ending_range, setending_range] = useState();
  const [point_add, setpoint_add] = useState("");
  const [new_point, setnew_point] = useState(0);
  const [input_p, setinput_p] = useState("");
  const [d1_point0, setd1_point0] = useState(0);
  const [d1_point1, setd1_point1] = useState(0);
  const [d2_point2, setd2_point2] = useState(0);
  const [minp_value, setminp_value] = useState([]);
  const [minp, setminp] = useState(0);
  const [center, setCenter] = useState();
  const [centervalue, setCentervalue] = useState();
  const [rechartData, setRechartData] = useState([]);
  const [dynamicColumn, setDynamicColumn] = useState([]);
  const [dynamicGraphRowData, setDynamicGraphRowData] = useState([]);
  const [summaryValue, setSummaryValue] = useState({
    "status": 0,
    "main_data":[],
    "summary_data":[]
  });


 
  console.log("starting_point", starting_point);
  console.log("daygap", daygap);
  console.log("value_range_list2", value_range_list2);
  console.log("minp_value", minp_value);
  console.log("minp", minp, typeof (minp));
  console.log("159 two pointer summaryValue", summaryValue);
  console.log("159 dynamicColumn", dynamicColumn);
  


 
  const ValueRangeAssign = (value, index) => {
    let value_range_list = [...value_range_list2]
    value_range_list[index] = parseInt(value)
    setvalue_range_list2(value_range_list)
  }  

  const [confAllValue, setConfAllValue] = useState({
    type: "",
    key: "",
    value: "",
  });

  const confInputChange = (event) => {
    const { name, value } = event.target;
    setConfAllValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("confAllValue", confAllValue);

  useEffect(() => {
    if (confAllValue.key === "TwoPointer") {
      MinpfuncTwoPointer()
    }
    else if (confAllValue.key === "ThreePointer") {
      // MinpfuncThreePointer()
      console.log("ncncnc");
      
    }
  }, [first_run, starting_point, starting_value, daygap, value_range_list2, point_add, new_point, input_p, d1_point0, d2_point2]);
  
  useEffect(() => {
    MinpfuncTwoPointer()
    // localStorage.removeItem("MinP");
    // localStorage.removeItem("MaxP");
  }, []);

  // useEffect(() => {
  //   setMinP(localStorage.getItem("MinP"))
  //   setMaxP(localStorage.getItem("MaxP"))
  // });
  // }, [MinP, MaxP]);
  
  const MinpfuncTwoPointer = () => {
    if (first_run === "YES" || first_run === "Yes" || first_run === "yes") {
      // if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && point_add.length != 0 && new_point.toString().length != 0 && input_p.length != 0 && d1_point0.toString().length != 0 && d2_point2.toString().length != 0) {
      if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 ) {
        axios
            .post(
              `${BaseURL1}/account/two-pointer-minp-calculation/`,
              {
                "starting_point": starting_point,
                "starting_value": starting_value,
                "daygap": daygap,
                "first_run": first_run,
                "value_range_list2": value_range_list2,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
            )
            .then((response) => {
              console.log("202 response.data", response.data);
              setminp_value(response.data.minp_data)
            })
            .catch((error) => {
              console.log("check data error 67", error.response.data.message);
            });
      }     
    }      
  }

  // const DynamicColumnGenerate = () => {
  //   if (value_range_list2.length === 2) {
  //     console.log("250 value_range_list2[1]", value_range_list2[1], typeof(parseInt(value_range_list2[1])));
  //     console.log("250 value_range_list2[0]", value_range_list2[0], typeof(parseInt(value_range_list2[0])));
      
  //     const ColumnItemList = []
  //     // for (let i = value_range_list2[1]; i < value_range_list2[0]; i+5) {
  //     // for (let i = 5850; i < 5950; i+5) {
  //     for (let i = 0; i < 20; i++) {
  //       console.log("250 i", i);

  //       // ColumnItemList.push({ title: `${i}`, field: `${i}`,  width: 80 })
  //     }
  //     // // ColumnItemList.splice(0, 0, { title: "id", field: "id", hide: true, width: 80 });
  //     // console.log("ColumnItemList", ColumnItemList);
      
  //     // setDynamicColumn(ColumnItemList)
  //   }
  // }
 

  


  const PointerSubmit = () => {
    if (confAllValue.key === "TwoPointer") {
      if (first_run === "YES" || first_run === "Yes" || first_run === "yes") {
        // if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && point_add.length != 0 && new_point.toString().length != 0 && input_p.length != 0 && d1_point0.toString().length != 0 && d2_point2.toString().length != 0 && minp.toString().length != 0) {
        if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && minp.toString().length != 0) {
          // DynamicColumnGenerate()
          axios
              .post(
                `${BaseURL1}/account/two-pointer-calculation/`,
                {
                  "starting_point": starting_point,
                  "starting_value": starting_value,
                  "daygap": daygap,
                  "first_run": first_run,
                  "value_range_list2": value_range_list2,
                  "minp_value": parseFloat(minp)
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              )
              .then((response) => {
                // console.log("256 two pointer response.data", response.data);
                setSummaryValue(response.data)
                // setSummaryValue(response.data.summary_data)
                const ReChartDataList = []
                response.data.main_data.map((item) => {
                  // ReChartDataList.push({
                  //   red: item.d1_point0,
                  //   blue: item.d2_point2,
                  //   qv: 5920,
                  //   // qv: item.d1_point1,
                  // })
                  ReChartDataList.push({
                    red: item.MaxP,
                    blue: item.MinP,
                    qv: item.d1_point0,
                  })
                })
                setRechartData(ReChartDataList)
                const ColumnItemList = []
                response.data.range_point.map((item) => {
                  ColumnItemList.push({ title: `${item}`, field: `${item}`,  width: 60 })
                })

                setDynamicColumn(ColumnItemList)

                const Section = {}
                response.data.range_point.map((item) => {
                  Section[item] = item 
                })
                const GraphRowValue = []
                if (Section != 0) {
                  for (let i = 0; i < 3; i++){
                    GraphRowValue.push(Section)
                  }
                }
                setDynamicGraphRowData(GraphRowValue)
                // console.log("394 GraphRowValue", GraphRowValue);
      
              })
              .catch((error) => {
                console.log("check data error 67", error.response.data.message);
              });
          
        }     
      }      
      else if (first_run === "NO" || first_run === "No" || first_run === "no") {
        if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && minp.toString().length != 0) {
          // DynamicColumnGenerate()
          axios
              .post(
                `${BaseURL1}/account/two-pointer-calculation/`,
                {
                  "starting_point": starting_point,
                  "starting_value": starting_value,
                  "daygap": daygap,
                  "first_run": first_run,
                  "value_range_list2": value_range_list2,
                  "minp_value": parseFloat(minp)
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              )
              .then((response) => {
                // console.log("256 two pointer response.data", response.data);
                setSummaryValue(response.data)
                // setSummaryValue(response.data.summary_data)
                const ReChartDataList = []
                response.data.main_data.map((item) => {
                  ReChartDataList.push({
                    red: item.d1_point0,
                    blue: item.d2_point2,
                    qv: item.d1_point1,
                  })
                  // ReChartDataList.push({
                  //   red: item.MaxP,
                  //   blue: item.MinP,
                  //   qv: item.d1_point0,
                  // })
                })
                setRechartData(ReChartDataList)

                const ColumnItemList = []
                response.data.range_point.map((item) => {
                  ColumnItemList.push({ title: `${item}`, field: `${item}`,  width: 60 })
                })

                setDynamicColumn(ColumnItemList)

                const Section = {}
                response.data.range_point.map((item) => {
                  Section[item] = item 
                })
                const GraphRowValue = []
                if (Section != 0) {
                  for (let i = 0; i < 3; i++){
                    GraphRowValue.push(Section)
                  }
                }
                setDynamicGraphRowData(GraphRowValue)

                // console.log("394 GraphRowValue", GraphRowValue);
                

              })
              .catch((error) => {
                console.log("check data error 67", error.response.data.message);
              });
        }     
      }      
    }
    else if (confAllValue.key === "ThreePointer") {
      console.log("ncncnc");
      
    }
  }
  const itemElementsd1 = [];
  const startpointd1=0
  const endpointd1=50
  const itemElementsd2 = [];
  const startpointd2=100
  const endpointd2=150
  const itemElementsd3 = [];
  const startpointd3=200
  const endpointd3=250
  const itemElementsd4 = [];
  const startpointd4=200
  const endpointd4=225
  
  for (let i = startpointd1; i < endpointd1; i++) {
    itemElementsd1.push(<input
      placeholder={i+1}
      type="text"
      // onChange={(e) => setstarting_value(parseInt(e.target.value))}
      // value={""}
      style={{
      width: "20px",
      // marginLeft: "5px",
      marginTop: "25px",
      display: "inline",
      border: '1px solid black',
      }}
      name="value"
    />)
  }
  
  for (let i = startpointd2; i < endpointd2; i++) {
    itemElementsd2.push(<input
      placeholder={i+1}
      type="text"
      // onChange={(e) => setstarting_value(parseInt(e.target.value))}
      // value={""}
      style={{
      width: "40px",
      // marginLeft: "5px",
      // marginTop: "25px",
      display: "inline",
      border: '1px solid black',
      }}
      name="value"
    />)
  }

  for (let i = startpointd3; i < endpointd3; i++) {
    itemElementsd3.push(<input
      placeholder={i+1}
      type="text"
      // onChange={(e) => setstarting_value(parseInt(e.target.value))}
      // value={""}
      style={{
      width: "40px",
      // marginLeft: "5px",
      // marginTop: "25px",
      display: "inline",
      border: '1px solid black',
      }}
      name="value"
    />)
  }
  for (let i = startpointd4; i < endpointd4; i++) {
    itemElementsd4.push(<input
      placeholder={i+1}
      type="text"
      // onChange={(e) => setstarting_value(parseInt(e.target.value))}
      // value={""}
      style={{
      width: "40px",
      // marginLeft: "5px",
      // marginTop: "25px",
      display: "inline",
      border: '1px solid black',
      }}
      name="value"
    />)
  }
  
  
  

 
  const lineStyle = {
      width: '1px',            // Thickness of the line
      height: '20px',         // Height of the line
      border: '1px solid grey', // Color of the line
      margin: '0 10px',        // Optional: space around the line
  };
  

  // Right side

  const [rightValues, setRightValues] = useState([
    {
      ref_point_right: "",
      date_right: "",
      buy_point_right: "",
      bpt_right: "",
      num_of_point_right: "",
      color_right: "",
    },
  ]);

  let handleChangeRight = (i, e) => {
    let newRightValues = [...rightValues];
    newRightValues[i][e.target.name] = e.target.value;
    setRightValues(newRightValues);
  };

  let addRightFields = () => {
    setRightValues([
      ...rightValues,
      {
        ref_point_right: "",
        date_right: "",
        buy_point_right: "",
        bpt_right: "",
        num_of_point_right: "",
        color_right: "",
      },
    ]);
  };

  let removeRightFields = (i) => {
    let newRightValues = [...rightValues];
    newRightValues.splice(i, 1);
    setRightValues(newRightValues);
  };

  const right = rightValues.map((item, i) => {
    return {
      id: i,
      ref_p: item.ref_point_right,
      date: item.date_right,
      buy_p: item.buy_point_right,
      bpt: item.bpt_right,
      num_of_p: item.num_of_point_right,
      point_def: item.point_def_right,
      color: item.color_right,
    };
  });

  const [rowright, setRowright] = useState([]);

  let handleSubmitRight = () => {
    setRowright([...right]);
  };

  // Mutation

  const addLeftSideValue = () => {
    leftValues?.map((item, i) => {
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.ref_point_left,
          tableColId: 1,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.date_left,
          tableColId: 2,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.buy_point_left,
          tableColId: 3,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.bpt_left,
          tableColId: 4,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.num_of_point_left,
          tableColId: 5,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData:
            item.color_left === "red"
              ? eval(item.buy_point_left) - eval(item.ref_point_left)
              : eval(item.ref_point_left) - eval(item.buy_point_left),
          tableColId: 6,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.color_left,
          tableColId: 7,
          tabRelId: date + i,
        },
      });
    });

    setOpen(false);
  };

  const addRightSideValue = () => {
    rightValues?.map((item, i) => {
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.ref_point_right,
          tableColId: 8,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.date_right,
          tableColId: 9,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.buy_point_right,
          tableColId: 10,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.bpt_right,
          tableColId: 11,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.num_of_point_right,
          tableColId: 12,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData:
            item.color_right === "red"
              ? eval(item.buy_point_right) - eval(item.ref_point_right)
              : eval(item.ref_point_right) - eval(item.buy_point_right),
          tableColId: 13,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 28,
          columnData: item.color_right,
          tableColId: 14,
          tabRelId: date1 + i,
        },
      });
    });

    setOpen(false);
  };

  return (
    <div>
      <Container maxWidth="xl">
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

        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "120px",
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
                Input Point
              </Box>
              
              <select
                id="key"
                name="key"
                value={confAllValue.key}
                onChange={confInputChange}
                className="ml-2"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose Pointer</option>
                <option value="TwoPointer">Two Pointer</option>
                <option value="ThreePointer">Three Pointer</option>
                <option value="ThreePointerD3">Three Pointer D3</option>
                {/* Add other options as needed */}
              </select>

              {
                confAllValue.key === "TwoPointer" ? <>
                  <input
                    placeholder="starting point"
                    type="text"
                    onChange={(e) => setstarting_point(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="dp_left"
                  />
                  <input
                    placeholder="starting value"
                    type="text"
                    onChange={(e) => setstarting_value(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="daygap"
                    type="text"
                    onChange={(e) => setdaygap(parseFloat(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="first_run"
                    type="text"
                    onChange={(e) => setfirst_run(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="starting range"
                    type="text"
                    onChange={(e) => ValueRangeAssign(e.target.value, 0)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="ending range"
                    type="text"
                    onChange={(e) => ValueRangeAssign(e.target.value, 1)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="point_add"
                    type="text"
                    onChange={(e) => setpoint_add(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  {
                    point_add === "YES" || point_add === "Yes" || point_add === "yes" ? <input
                    placeholder="new_point"
                    type="text"
                    onChange={(e) => setnew_point(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  /> : ""
                      
                  }
                  
                  <input
                    placeholder="input_p"
                    type="text"
                    onChange={(e) => setinput_p(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  {
                    input_p === "YES" || input_p === "Yes" || input_p === "yes" ? <><input
                      placeholder="d1_point0"
                      type="text"
                      onChange={(e) => setd1_point0(e.target.value)}
                      style={{
                        width: "100px",
                        marginLeft: "35px",
                        marginTop: "25px",
                        display: "inline",
                      }}
                      name="value"
                    />
                    <input
                      placeholder="d2_point2"
                      type="text"
                      onChange={(e) => setd2_point2(e.target.value)}
                      style={{
                        width: "100px",
                        marginLeft: "35px",
                        marginTop: "25px",
                        display: "inline",
                      }}
                      name="value"
                    /> </>: ""  
                  }
                  {
                    first_run === "YES" || first_run === "Yes" || first_run === "yes" && starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && point_add.length != 0 && new_point.toString().length != 0 && input_p.length != 0 && d1_point0.toString().length != 0 && d2_point2.toString().length != 0 ? <>
                      
                      <select
                        id="key"
                        name="key"
                        value={minp}
                        onChange={(e)=> setminp(e.target.value)}
                        className="ml-2"
                      >
                        <option value="">Choose Minp</option>
                        {
                          minp_value?.map((value, index) => {
                            // console.log("637 index value", index, value);
                                 
                            return (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            );
                            }
                          )
                        }
                      </select>
                    </> : ""
                  }
                  {
                    minp != 0 && minp.toString().length != 0 || first_run === "NO" || first_run === "No" || first_run === "no"? <>
                      <Button
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
                        className="button add ml-5"
                        type="button"
                        onClick={() => PointerSubmit()}
                        size="small"
                      >
                        Submit
                      </Button>
                    </> : ""
                  }
                  
                </> : confAllValue.key === "ThreePointer" ? <>
                  <input
                    placeholder="starting point"
                    type="text"
                    onChange={(e) => setstarting_point(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="dp_left"
                  />
                  <input
                    placeholder="starting value"
                    type="text"
                    onChange={(e) => setstarting_value(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="daygap"
                    type="text"
                    onChange={(e) => setdaygap(parseFloat(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="first_run"
                    type="text"
                    onChange={(e) => setfirst_run(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="starting range"
                    type="text"
                    onChange={(e) => ValueRangeAssign(e.target.value, 0)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="ending range"
                    type="text"
                    onChange={(e) => ValueRangeAssign(e.target.value, 1)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="input_p"
                    type="text"
                    onChange={(e) => setinput_p(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  {
                    input_p === "YES" || input_p === "Yes" || input_p === "yes" ? <><input
                      placeholder="d1_point0"
                      type="text"
                      onChange={(e) => setd1_point0(e.target.value)}
                      style={{
                        width: "100px",
                        marginLeft: "35px",
                        marginTop: "25px",
                        display: "inline",
                      }}
                      name="value"
                    />
                    <input
                      placeholder="d1_point1"
                      type="text"
                      onChange={(e) => setd1_point1(e.target.value)}
                      style={{
                        width: "100px",
                        marginLeft: "35px",
                        marginTop: "25px",
                        display: "inline",
                      }}
                      name="value"
                    />
                    <input
                      placeholder="d2_point2"
                      type="text"
                      onChange={(e) => setd2_point2(e.target.value)}
                      style={{
                        width: "100px",
                        marginLeft: "35px",
                        marginTop: "25px",
                        display: "inline",
                      }}
                      name="value"
                    /> </>: ""  
                  }
                  {
                    first_run === "YES" || first_run === "Yes" || first_run === "yes" && starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && point_add.length != 0 && new_point.toString().length != 0 && input_p.length != 0 && d1_point0.toString().length != 0 && d2_point2.toString().length != 0 ? <>
                      <select
                        id="key"
                        name="key"
                        value={minp}
                        onChange={(e)=> setminp(parseFloat(e.target.value))}
                        className="ml-2"
                      >
                        <option value="">Choose Minp</option>
                        {
                          minp_value?.map((value, index) => {
                            // console.log("637 index value", index, value);
                                 
                            return (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            );
                            }
                          )
                        }
                      </select>
                    </> : ""
                  }
                  {
                      minp.toString().length != 0 ? <>
                        <Button
                          sx={{ marginTop: "10px" }}
                          variant="outlined"
                          className="button add"
                          type="button"
                          onClick={() => addLeftFields()}
                          size="small"
                        >
                          Submit
                      </Button>
                      </> : ""
                  }
                  
                </> : ""
              }
            
              
            </Box>
          </Grid>
          <Grid item xs={6} md={6} sx={{ marginTop: "20px" }}>
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
              <Stack
                direction="row"
                spacing={9}
                sx={{ textAlign: "center", marginBottom: "3px" }}
              >
                <Box sx={{ textAlign: "center" }}>Ref P.</Box>
                <Box sx={{ textAlign: "center" }}>Date</Box>
                <Box sx={{ textAlign: "center" }}>Buy P</Box>
                <Box sx={{ textAlign: "center" }}>BPT</Box>
                <Box sx={{ textAlign: "center" }}>Num of P</Box>
                <Box sx={{ textAlign: "center" }}>Color</Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <form onSubmit={handleSubmitLeft}>
                    {leftValues.map((element, index) => (
                      <div className="form-inline" key={index}>
                        <Stack direction="row" spacing={0}>
                          <input
                            style={{
                              width: "100px",
                              marginRight: "2px",
                            }}
                            placeholder="ref point"
                            type="number"
                            name="ref_point_left"
                            value={element.ref_point_left || ""}
                            onChange={(e) => handleChangeLeft(index, e)}
                          />
                          <input
                            placeholder="date "
                            style={{ width: "100px", marginRight: "2px" }}
                            type="date"
                            name="date_left"
                            value={element.date_left || ""}
                            onChange={(e) => handleChangeLeft(index, e)}
                          />

                          <input
                            placeholder="bpt "
                            style={{ width: "100px", marginRight: "2px" }}
                            type="number"
                            name="buy_point_left"
                            value={element.buy_point_left || ""}
                            onChange={(e) => handleChangeLeft(index, e)}
                          />
                          <input
                            placeholder="bpt "
                            style={{ width: "100px", marginRight: "2px" }}
                            type="number"
                            name="bpt_left"
                            value={element.bpt_left || ""}
                            onChange={(e) => handleChangeLeft(index, e)}
                          />
                          <input
                            placeholder="nummer of point"
                            style={{ width: "100px", marginRight: "2px" }}
                            type="number"
                            name="num_of_point_left"
                            value={element.num_of_point_left || ""}
                            onChange={(e) => handleChangeLeft(index, e)}
                          />
                          <input
                            placeholder="color"
                            style={{ width: "100px" }}
                            type="text"
                            name="color_left"
                            value={element.color_left || ""}
                            onChange={(e) => handleChangeLeft(index, e)}
                          />
                          <Box>
                            {index ? (
                              <IconButton
                                size="small"
                                type="button"
                                className="button remove"
                                onClick={() => removeLeftFields(index)}
                              >
                                <DeleteOutlineIcon size="small" />{" "}
                              </IconButton>
                            ) : null}
                          </Box>
                        </Stack>
                      </div>
                    ))}
                    <div className="button-section">
                      <Button
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
                        className="button add"
                        type="button"
                        onClick={() => addLeftFields()}
                        size="small"
                      >
                        Add
                      </Button>
                      <Button
                        sx={{ marginLeft: "5px", marginTop: "10px" }}
                        size="small"
                        variant="outlined"
                        onClick={addLeftSideValue}
                      >
                        Submit
                      </Button>
                      <Button
                        sx={{ marginLeft: "5px", marginTop: "10px" }}
                        size="small"
                        variant="outlined"
                        onClick={() => deleteLeft.current.onSoftDeleteLeft()}
                      >
                        Soft Delete
                      </Button>
                    </div>
                  </form>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={6} md={6} sx={{ marginTop: "20px" }}>
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
              <Stack
                direction="row"
                spacing={9}
                sx={{ margin: "auto", marginBottom: "3px" }}
              >
                <Box sx={{ textAlign: "center" }}>Ref P.</Box>
                <Box sx={{ textAlign: "center" }}>Date</Box>
                <Box sx={{ textAlign: "center" }}>Buy P</Box>
                <Box sx={{ textAlign: "center" }}>BPT</Box>
                <Box sx={{ textAlign: "center" }}>Num of P</Box>
                <Box sx={{ textAlign: "center" }}>Color</Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <form onSubmit={handleSubmitRight}>
                    {rightValues.map((element, index) => (
                      <div className="form-inline" key={index}>
                        <Stack direction="row" spacing={0}>
                          <input
                            placeholder="ref point"
                            style={{ width: "100px", marginRight: "2px" }}
                            type="number"
                            name="ref_point_right"
                            value={element.ref_point_right || ""}
                            onChange={(e) => handleChangeRight(index, e)}
                          />
                          <input
                            placeholder="date "
                            style={{ width: "100px", marginRight: "2px" }}
                            type="date"
                            name="date_right"
                            value={element.date_right || ""}
                            onChange={(e) => handleChangeRight(index, e)}
                          />
                          <input
                            placeholder="bpt "
                            style={{ width: "105px", marginRight: "2px" }}
                            type="number"
                            name="buy_point_right"
                            value={element.buy_point_right || ""}
                            onChange={(e) => handleChangeRight(index, e)}
                          />

                          <input
                            placeholder="bpt "
                            style={{ width: "100px", marginRight: "2px" }}
                            type="number"
                            name="bpt_right"
                            value={element.bpt_right || ""}
                            onChange={(e) => handleChangeRight(index, e)}
                          />
                          <input
                            placeholder="nummer of point"
                            style={{ width: "100px", marginRight: "2px" }}
                            type="number"
                            name="num_of_point_right"
                            value={element.num_of_point_right || ""}
                            onChange={(e) => handleChangeRight(index, e)}
                          />

                          <input
                            placeholder="color"
                            style={{ width: "100px" }}
                            type="text"
                            name="color_right"
                            value={element.color_right || ""}
                            onChange={(e) => handleChangeRight(index, e)}
                          />
                          <Box>
                            {index ? (
                              <IconButton
                                size="small"
                                type="button"
                                className="button remove"
                                onClick={() => removeRightFields(index)}
                              >
                                <DeleteOutlineIcon size="small" />{" "}
                              </IconButton>
                            ) : null}
                          </Box>
                        </Stack>
                      </div>
                    ))}
                    <div className="button-section">
                      <Button
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
                        className="button add"
                        type="button"
                        onClick={() => addRightFields()}
                        size="small"
                      >
                        Add
                      </Button>
                      <Button
                        sx={{ marginLeft: "5px", marginTop: "10px" }}
                        size="small"
                        variant="outlined"
                        onClick={addRightSideValue}
                      >
                        Submit
                      </Button>
                      <Button
                        sx={{ marginLeft: "5px", marginTop: "10px" }}
                        size="small"
                        variant="outlined"
                        onClick={() => deleteRight.current.onSoftDeleteRight()}
                      >
                        Soft Delete
                      </Button>
                    </div>
                  </form>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}></Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box sx={{ textAlign: "center" }}> Table Summery</Box>
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

                  color: "white",
                  padding: "8px 0px",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    marginLeft: "475px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Summary Data
                </p>
                {/* <Button
                  sx={{ color: "white", marginLeft: "475px" }}
                  onClick={() => deleteLeft.current.onDeleteLeft()}
                >
                  Confirm
                </Button> */}
              </Box>

              <Spp_Table_Left leftValues={summaryValue} ref={deleteLeft} />
              {/* <Spp_Table_Left leftValues={leftValues} ref={deleteLeft} /> */}
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
                <p
                  style={{
                    textAlign: "center",
                    marginLeft: "110px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Details Data
                </p>
                {/* <Button
                  sx={{ color: "white", marginLeft: "475px" }}
                  onClick={() => deleteRight.current.onDeleteRight()}
                >
                  Confirm
                </Button> */}
              </Box>
              <Spp_Table_Right rightValues={summaryValue} ref={deleteRight} />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box
              sx={{ width: "100", fontSize: "30px", textAlign: "center" }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "50px" }}>
            <Box
              sx={{
                width: "100",
                fontSize: "30px",
                textAlign: "center",
                marginRight: "20px",
              }}
            >
              <Spp_mesGraphChart center={center} centervalue={centervalue} rechartData={ rechartData } />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "50px" }}>
            <Box
              sx={{ width: "100", fontSize: "30px", textAlign: "center" }}
            ></Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "50px" }}>
            <Box
               sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "120px",
                border: "1px dashed grey",
              }}
            >
              {
                itemElementsd1
              }
              <br />
              {/* <Box
                sx={{
                  margin: "5px 5px 5px 5px ",
                  p: "0px 0px 0px 0px",
                  // minHeight: "120px",
                  border: "1px solid grey",
                }}
              ></Box> */}
              {
                itemElementsd2
              }
              <br/>
              {
                itemElementsd3
              }
              <br/>
              {
                itemElementsd4
              }
               
            </Box>
          </Grid>
          <Grid item xs={1.2} md={1.2} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "225px",
                border: "1px dashed grey",
              }}
            >
              {/* <div style={lineStyle}></div> */}
              <>
                <Box
                  sx={{
                    margin: "0px 0px 0px 90px",
                    p: "0px 0px 0px 0px",
                    width: "1px",
                    height: "30px",
                    border: "1px solid grey",
                  }}
                >
                </Box>
                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "55px",
                      marginLeft: "50px",
                      marginTop: "-30px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "55px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      MinP
                    </p>
                  </Box>
                </>
                
              
                {/* <Box
                  sx={{
                    margin: "-30px 0px 0px 180px",
                    p: "0px 0px 0px 0px",
                    width: "1px",
                    height: "30px",
                    border: "3px solid green",
                  }}
                >
                </Box> */}
                <Box
                  sx={{
                    margin: "0px 0px 0px 0px ",
                    p: "0px 0px 0px 0px",
                    // minHeight: "150px",
                    border: "1px solid grey",
                  }}
                >
                </Box>
                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "30px",
                      marginLeft: "-40px",
                      marginTop: "15px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "55px",
                        // marginTop: "100px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      Day3
                    </p>
                  </Box>
                </>
                <Box
                  sx={{
                    margin: "5px 0px 0px 0px ",
                    p: "0px 0px 0px 0px",
                    width: "90px",
                    // minHeight: "150px",
                    border: "3px solid blue",
                  }}
                >
                </Box>
                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "30px",
                      marginLeft: "-40px",
                      marginTop: "10px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "55px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      Day2
                    </p>
                  </Box>
                </>
                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "30px",
                      marginLeft: "42px",
                      marginTop: "-30px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "55px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      {/* MinP */}
                      {MinP}
                    </p>
                  </Box>
                </>
                <Box
                  sx={{
                    margin: "5px 0px 0px 0px",
                    p: "0px 0px 0px 0px",
                    width: "90px",
                    // minHeight: "150px",
                    border: "3px solid darkblue",
                  }}
                >
                </Box>
                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "30px",
                      marginLeft: "-40px",
                      marginTop: "10px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "55px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      Day1
                    </p>
                  </Box>
                </>
                <Box
                  sx={{
                    margin: "5px 0px 0px 0px",
                    p: "0px 0px 0px 0px",
                    width: "180px",
                    // minHeight: "150px",
                    border: "1px solid grey",
                  }}
                >
                </Box>
                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "10px",
                      marginLeft: "-40px",
                      marginTop: "10px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                  </Box>
                </>
               
                
                

                <Box
                  sx={{
                    margin: "-204px 0px 0px 90px",
                    p: "0px 0px 0px 0px",
                    width: "1px",
                    height: "200px",
                    border: "1px solid grey",
                  }}
                >
                </Box>
                <Box
                  sx={{
                    margin: "-225px 0px 0px 180px",
                    p: "0px 0px 0px 0px",
                    width: "1px",
                    height: "225px",
                    border: "3px solid green",
                  }}
                >
                </Box>
              </> 

            </Box>  
          </Grid>
          <Grid item xs={9.6} md={9.6} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px -10px -15px ",
                p: "0px 0px 0px 0px",
                minHeight: "225px",
                border: "1px dashed grey",
              }}
            >
             
              <Graph_Table_Left leftValues={dynamicGraphRowData} dynamicColumn={dynamicColumn}  ref={deleteLeft} />
            </Box>  
          </Grid>
          <Grid item xs={1.2} md={1.2} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px -10px -15px  ",
                p: "0px 0px 0px 0px",
                minHeight: "225px",
                border: "1px dashed grey",
              }}
            >
              <>
               
                <>
                  <Box
                    sx={{
                      margin: "0px 0px 0px 0px",
                      p: "0px 0px 0px 0px",
                      width: "1px",
                      height: "225px",
                      border: "3px solid green",
                    }}
                  >
                  </Box>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "30px",
                      marginLeft: "60px",
                      marginTop: "-200px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "0px",
                        // marginTop: "-60px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      MaxP
                    </p>
                  </Box>
                </>
               
                <Box
                  sx={{
                    margin: "0px 0px 0px 0px ",
                    p: "0px 0px 0px 0px",
                    // minHeight: "150px",
                    border: "1px solid grey",
                  }}
                >
                </Box>

                <>
                  <Box
                    sx={{
                      // bgcolor: "#FC4F00",
                      width: "91px",
                      height: "30px",
                      marginLeft: "60px",
                      marginTop: "50px",
                      color: "black",
                      // padding: "2px 0px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: "0px",
                        display: "inline",
                        fontSize: "12px"
                      }}
                    >
                      {/* MaxP */}
                      {MaxP}
                    </p>
                  </Box>
                </>
               
              
                <Box
                  sx={{
                    margin: "70px 0px 0px 0px ",
                    p: "0px 0px 0px 0px",
                    // minHeight: "150px",
                    border: "1px solid grey",
                  }}
                >
                </Box>

                
              </> 

            </Box>  
          </Grid>
         
        </Grid>
      </Container>
    </div>
  );
};

export default Spy_mes;
