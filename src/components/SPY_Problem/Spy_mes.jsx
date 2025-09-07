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
import Left_Sight_Table from "./Left_Sight_Table";
import Right_Sight_Table from "./Right_Sight_Table";
import Summary_Table2 from "./Summary_Table2";
import PointValue_Table from "./PointValue_Table";

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
    setD2_Point2,
    dynamicGraphRowData,
    setDynamicGraphRowData,
    detailButton,
    setDetailButton,
    point_id,
    Pv0,
    setPv0,
    Pv1,
    setPv1,
    Pv2,
    setPv2,
    setPoint_Id,
    summaryUpdate,
    setSummaryUpdate,
    detialsValueShow1,
    setDetialsValueShow1,
  } = useContext(AppContext);

  const [starting_point, setstarting_point] = useState();
  const [starting_pointr, setstarting_pointr] = useState();
  const [starting_pointl, setstarting_pointl] = useState();
  const [starting_value, setstarting_value] = useState();
  const [starting_valuer, setstarting_valuer] = useState();
  const [starting_valuel, setstarting_valuel] = useState();
  const [daygap, setdaygap] = useState();
  const [daygapr, setdaygapr] = useState();
  const [daygapl, setdaygapl] = useState();
  const [first_run, setfirst_run] = useState("");
  const [value_range_list2, setvalue_range_list2] = useState([]);
  const [value_range_list2r, setvalue_range_list2r] = useState([]);
  const [value_range_list2l, setvalue_range_list2l] = useState([]);
  const [starting_range, setstarting_range] = useState();
  const [ending_range, setending_range] = useState();
  const [point_add, setpoint_add] = useState("");
  const [new_point, setnew_point] = useState(0);
  const [new_pointr, setnew_pointr] = useState();
  const [new_point_valuer, setnew_point_valuer] = useState("");
  const [new_pointl, setnew_pointl] = useState();
  const [new_point_valuel, setnew_point_valuel] = useState("");
  const [input_p, setinput_p] = useState("");
  const [d1_point0, setd1_point0] = useState(0);
  const [d1_point1, setd1_point1] = useState(0);
  const [d2_point2, setd2_point2] = useState(0);
  const [which_dayr, setwhich_dayr] = useState();
  const [which_dayl, setwhich_dayl] = useState();
  const [which_point_add, setwhich_point_add] = useState("");
  const [minp_value, setminp_value] = useState([]);
  const [minp, setminp] = useState(0);
  const [center, setCenter] = useState();
  const [centervalue, setCentervalue] = useState();
  const [rechartData, setRechartData] = useState([]);
  const [NewPointValue, setNewPointValue] = useState([]);
  const [dynamicColumn, setDynamicColumn] = useState([]);
  const [mainValue, setMainValue] = useState({
    "main_data":[]
  });
  const [summaryValue, setSummaryValue] = useState({
    "summary_data":[]
  });
  const [summary2Value, setSummary2Value] = useState({
    "summary_data2":[]
  });
  const [pointValue, setPointValue] = useState({
    "point_value":[]
  });
  const [summaryNewPointValue, setSummaryNewPointValue] = useState([]);


 
  console.log("starting_point", starting_point);
  console.log("daygap", daygap);
  console.log("value_range_list2", value_range_list2);
  console.log("minp_value", minp_value);
  console.log("minp", minp, typeof (minp));
  console.log("159 two pointer summaryValue", summaryValue);
  console.log("159 dynamicColumn", dynamicColumn);
  console.log("159 summary2Value", summary2Value);
  


 
  const ValueRangeAssign = (value, index) => {
    let value_range_list = [...value_range_list2]
    value_range_list[index] = parseInt(value)
    setvalue_range_list2(value_range_list)
  }  
  const ValueRangeAssignRight = (value, index) => {
    let value_range_list = [...value_range_list2r]
    value_range_list[index] = parseInt(value)
    setvalue_range_list2r(value_range_list)
  }  
  const ValueRangeAssignLeft = (value, index) => {
    let value_range_list = [...value_range_list2l]
    value_range_list[index] = parseInt(value)
    setvalue_range_list2l(value_range_list)
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

  // useEffect(() => {
  //   if (confAllValue.key === "TwoPointer") {
  //     MinpfuncTwoPointer()
  //   }
  //   else if (confAllValue.key === "ThreePointer") {
  //     // MinpfuncThreePointer()
  //     console.log("ncncnc");
      
  //   }
  // }, [first_run, starting_point, starting_value, daygap, value_range_list2]);

  useEffect(() => {
    if (detailButton == true) {
      SummaryDataButton()
    }
    if (summaryUpdate == true) {
      PointerSummaryDataUpdateFunc()
    }
    
  }, [MinP, detailButton, summaryUpdate, summaryValue]);
  
  // useEffect(() => {
  //   MinpfuncTwoPointer()
  //   // localStorage.removeItem("MinP");
  //   // localStorage.removeItem("MaxP");
  // }, []);

  useEffect(() => {
    NewPointFetchData()
  }, []);
  // }, [NewPointValue, summaryValue, summary2Value, mainValue]);

  // useEffect(() => {
  //   setMinP(localStorage.getItem("MinP"))
  //   setMaxP(localStorage.getItem("MaxP"))
  // });
  // }, [MinP, MaxP]);
  
  const NewPointFetchData = () => {
    axios
      .get(
        `${BaseURL1}/account/fetch-new-point-data/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        )
        .then((response) => {
          // console.log("202 response.data", response.data);
          setNewPointValue(response.data)
          setSummaryValue(response.data)
          setSummary2Value(response.data)
          setMainValue(response.data)
          setPointValue(response.data)
        })
        .catch((error) => {
          console.log("check data error 67", error.response.data.message);
        });         
  }

  // const MinpfuncTwoPointer = () => {
  //   if (first_run === "YES" || first_run === "Yes" || first_run === "yes") {
  //     // if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && point_add.length != 0 && new_point.toString().length != 0 && input_p.length != 0 && d1_point0.toString().length != 0 && d2_point2.toString().length != 0) {
  //     if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 ) {
  //       axios
  //           .post(
  //             `${BaseURL1}/account/two-pointer-minp-calculation/`,
  //             {
  //               "starting_point": starting_point,
  //               "starting_value": starting_value,
  //               "daygap": daygap,
  //               "first_run": first_run,
  //               "value_range_list2": value_range_list2,
  //           },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //           )
  //           .then((response) => {
  //             console.log("202 response.data", response.data);
  //             setminp_value(response.data.minp_data)
  //           })
  //           .catch((error) => {
  //             console.log("check data error 67", error.response.data.message);
  //           });
  //     }     
  //   }      
  // }

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
                  // "minp_value": parseFloat(minp)
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              )
              .then((response) => {
                // console.log("256 two pointer response.data", response.data);
                setMainValue(response.data)
                setSummaryValue(response.data)
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
                NewPointFetchData()
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
                // `${BaseURL1}/account/two-pointer-calculation/`,
                `${BaseURL1}/account/main-pointer-calculation/`,
                {
                  "starting_point": starting_point,
                  "starting_value": starting_value,
                  "daygap": daygap,
                  "value_range_list2": value_range_list2,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              )
              .then((response) => {
                // console.log("256 two pointer response.data", response.data);
                setMainValue(response.data)
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
                NewPointFetchData()
                // console.log("394 GraphRowValue", GraphRowValue);
                

              })
              .catch((error) => {
                console.log("check data error 67", error.response.data.message);
              });
        }     
      }      
    }
    else if (confAllValue.key === "ThreePointer") {
      if (first_run === "YES" || first_run === "Yes" || first_run === "yes") {
        // if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && point_add.length != 0 && new_point.toString().length != 0 && input_p.length != 0 && d1_point0.toString().length != 0 && d2_point2.toString().length != 0 && minp.toString().length != 0) {
        if (starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2 && minp.toString().length != 0) {
          // DynamicColumnGenerate()
          axios
              .post(
                `${BaseURL1}/account/three-pointer-left-right-calculation/`,
                {
                  "starting_point": starting_point,
                  "starting_value": starting_value,
                  "daygap": daygap,
                  "first_run": first_run,
                  "value_range_list2": value_range_list2,
                  // "minp_value": parseFloat(minp)
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              )
              .then((response) => {
                // console.log("256 two pointer response.data", response.data);
                setMainValue(response.data)
                setSummaryValue(response.data)
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
                NewPointFetchData()
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
                // `${BaseURL1}/account/two-pointer-calculation/`,
                `${BaseURL1}/account/main-pointer-calculation/`,
                {
                  "starting_point": starting_point,
                  "starting_value": starting_value,
                  "daygap": daygap,
                  "value_range_list2": value_range_list2,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              )
              .then((response) => {
                // console.log("256 two pointer response.data", response.data);
                setMainValue(response.data)
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
                NewPointFetchData()
                // console.log("394 GraphRowValue", GraphRowValue);
                

              })
              .catch((error) => {
                console.log("check data error 67", error.response.data.message);
              });
        }     
      } 
    }
  }

  const PointerSubmitRight = () => {       
    if (which_dayr.toString().length != 0 && new_pointr.toString().length != 0 ) {
      axios
        .post(
          `${BaseURL1}/account/one-pointer-calculation/`,
            {
              "which_day": which_dayr,
              "which_point_add": "Right",
              "new_point": new_pointr,
              "new_point_value": new_point_valuer
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setSummaryNewPointValue(response.data) 
            NewPointFetchData()
          })
          .catch((error) => {
            console.log("check data error 67", error.response.data.message);
          });  
    }     
  }

  const PointerSubmitLeft = () => {       
    // if (starting_pointl.toString().length != 0 && starting_valuel.toString().length != 0 && daygapl.toString().length != 0 && value_range_list2l.length === 2 && which_dayl.toString().length != 0 && new_pointl.toString().length != 0 ) {
    if (which_dayl.toString().length != 0 && new_pointl.toString().length != 0 ) {
      axios
        .post(
          `${BaseURL1}/account/one-pointer-calculation/`,
            {
              "which_day": which_dayl,
              "which_point_add": "Left",
              "new_point": new_pointl,
              "new_point_value": new_point_valuel
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setSummaryNewPointValue(response.data) 
            NewPointFetchData()
          })
          .catch((error) => {
            console.log("check data error 67", error.response.data.message);
          });  
    }     
  }


  const SummaryDataButton = () => {       
    if (point_id.toString().length != 0 && detailButton == true ) {
      axios
        .post(
          `${BaseURL1}/account/two-pointer-summary-calculation/`,
            {
              "starting_point": starting_point,
              "starting_value": starting_value,
              "daygap": daygap,
              "first_run": first_run,
              "value_range_list2": value_range_list2,
              "minp_value": MinP,
              "point_id": point_id
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setSummaryValue(response.data) 
            setDetailButton(false)
            NewPointFetchData()
          })
          .catch((error) => {
            console.log("check data error 67", error.response.data.message);
            setDetailButton(false)
          });  
    }     

  }


  const PointerSummaryDataUpdateFunc = () => {       
    axios
      .post(
        `${BaseURL1}/account/pointer-summary-data-update-api/`,
          {
            "d1_point0": D1_Point0,
            "d1_point1": D1_Point1,
            "d2_point2": D2_Point2,
            "pv0": Pv0,
            "pv1": Pv1,
            "pv2": Pv2,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("sucess data", response.data);
          NewPointFetchData()
          setSummaryUpdate(false)
        })
        .catch((error) => {
          console.log("check data error 67", error.response.data.message);
        });       
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


  const generateArray = (start, end, step = 5) => {
    let result = [];

    if (start <= end) {
      // Case where start is less than or equal to end, step forward by step
      for (let i = start; i <= end; i += step) {
        result.push(i);
      }
    } else {
      // Case where start is greater than end, step backward by step
      for (let i = start; i >= end; i -= step) {
        result.push(i);
      }
    }

    return result;
  };

  let scaleList = generateArray(value_range_list2[0], value_range_list2[1]);

  console.log("872 scaleList", scaleList);
  console.log("872 detialsValueShow1", detialsValueShow1);
  console.log("872 detialsValueShow1", detialsValueShow1);
  console.log("872 point_id", point_id);
  
  let resultList = [8415, 8420, 8425];

  let resultList0 = mainValue?.main_data
    ?.map((item, index) => {
      if (
        // detialsValueShow1[0]?.flag === true &&
        // detialsValueShow1[0]?.index === item.point_id
        detialsValueShow1 === true &&
        point_id === item.point_id
      ) {
        return [item.d1_point0, item.d1_point1, item.d2_point2];
      } else {
        return null; // Or any other value you want when the condition doesn't match
      }
    })
    .filter((result) => result !== null); // This removes the null values from the final result

  let resultList1 = [];
  let resultList2 = [];

  console.log("check table flag", resultList0[0]);

 

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
                <option value="LeftSideNewPointAdd">Left Side New Point Add</option>
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
                  
                  {/* {
                    first_run === "YES" || first_run === "Yes" || first_run === "yes" && starting_point.toString().length != 0 && starting_value.toString().length != 0 && daygap.toString().length != 0 && value_range_list2.length === 2  ? <>
                      
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
                              <option key={index} value={value.MinP}>
                                MinP={value.MinP}, d1_point0={value.d1_point0}, d1_point1={value.d1_point1}, d2_point2={value.d2_point2}, RangeSum={value.RangeSum}, MaxP=={value.MaxP}
                              </option>
                            );
                            }
                          )
                        }
                      </select>
                    </> : ""
                  } */}

                  {/* {
                    first_run === "NO" || first_run === "No" || first_run === "no"? <>
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
                  } */}
                  
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
            
              
            </Box>
          </Grid>
          
          <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "200px",
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
              

                  {/* <input
                    placeholder="starting point"
                    type="text"
                    onChange={(e) => setstarting_pointl(parseInt(e.target.value))}
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
                    onChange={(e) => setstarting_valuel(parseInt(e.target.value))}
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
                    onChange={(e) => setdaygapl(parseFloat(e.target.value))}
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
                    onChange={(e) => ValueRangeAssignLeft(e.target.value, 0)}
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
                    onChange={(e) => ValueRangeAssignLeft(e.target.value, 1)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  /> */}
                  <input
                    placeholder="which_day"
                    type="text"
                    onChange={(e) => setwhich_dayl(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="new_point"
                    type="text"
                    onChange={(e) => setnew_pointl(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="new_point_value"
                    type="text"
                    onChange={(e) => setnew_point_valuel(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <Button
                    sx={{ marginTop: "10px" }}
                      variant="outlined"
                      className="button add ml-30"
                      type="button"
                      onClick={() => PointerSubmitLeft()}
                      size="small"
                      style={{
                        marginLeft: "35px",
                        marginTop: "-5px",
                      }}
                    >
                      Submit
              </Button>
              
              <Left_Sight_Table leftValues={NewPointValue} ref={deleteLeft} />
            </Box>
          </Grid>

          <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "200px",
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
              
                  {/* <input
                    placeholder="starting point"
                    type="text"
                    onChange={(e) => setstarting_pointr(parseInt(e.target.value))}
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
                    onChange={(e) => setstarting_valuer(parseInt(e.target.value))}
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
                    onChange={(e) => setdaygapr(parseFloat(e.target.value))}
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
                    onChange={(e) => ValueRangeAssignRight(e.target.value, 0)}
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
                    onChange={(e) => ValueRangeAssignRight(e.target.value, 1)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  /> */}
              
                  <input
                    placeholder="which_day"
                    type="text"
                    onChange={(e) => setwhich_dayr(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="new_point"
                    type="text"
                    onChange={(e) => setnew_pointr(parseInt(e.target.value))}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <input
                    placeholder="new_point_value"
                    type="text"
                    onChange={(e) => setnew_point_valuer(e.target.value)}
                    style={{
                      width: "100px",
                      marginLeft: "35px",
                      marginTop: "25px",
                      display: "inline",
                    }}
                    name="value"
                  />
                  <Button
                    sx={{ marginTop: "10px" }}
                      variant="outlined"
                      className="button add ml-30"
                      type="button"
                      onClick={() => PointerSubmitRight()}
                      size="small"
                      style={{
                        marginLeft: "35px",
                        marginTop: "-5px",
                      }}
                    >
                      Submit
                  </Button>
                  
                  <Right_Sight_Table RightValues={NewPointValue} ref={deleteLeft} />
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}></Grid> */}
          {/* <Grid item xs={12} md={12} sx={{ marginTop: "20px" }}>
            <Box sx={{ textAlign: "center" }}> Table Summery</Box>
          </Grid> */}

          <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "600px",
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
                    marginLeft: "300px",
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
          <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "600px",
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
                    marginLeft: "50px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Details Data
                </p>
  
              </Box>
              <Spp_Table_Right rightValues={mainValue} ref={deleteRight} />
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={12} sx={{ marginTop: "5px" }}>
            <Box
              sx={{ width: "100", fontSize: "30px", textAlign: "center" }}
            ></Box>
          </Grid> */}
          
          <Grid item xs={12} md={12} sx={{ marginTop: "0px" }}>
            <Box
              sx={{ width: "100", fontSize: "30px", textAlign: "center" }}
            ></Box>
          </Grid>
         
          {/* <Grid item xs={1.2} md={1.2} sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "225px",
                border: "1px dashed grey",
              }}
            >
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
                      Day1
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
                      Day3
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
             
              <Graph_Table_Left dynamicColumn={dynamicColumn}  ref={deleteLeft} />
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
          </Grid> */}

          <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "600px",
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
                    marginLeft: "300px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Summary Data2
                </p>
               
              </Box>

              <Summary_Table2 leftValues={summary2Value} ref={deleteLeft} />
            </Box>
          </Grid>
          <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
            <Box
              sx={{
                margin: "5px 5px 5px 5px ",
                p: "0px 0px 0px 0px",
                minHeight: "600px",
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
                    marginLeft: "300px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Point Value
                </p>
               
              </Box>

              <PointValue_Table leftValues={pointValue} ref={deleteLeft} />
            </Box>
          </Grid>
         
        </Grid>
        <>
        {detialsValueShow1 === true ? (
            <div className="overflow-x-auto my-10">
              <table className="min-w-full bg-white border border-gray-200">
                <tbody>
                  {resultList0[0]?.map((result, idx) => (
                    <tr key={idx}>
                      {scaleList.map((scale) => (
                        <td
                          key={scale}
                          className={`px-4 py-2 border border-gray-300 text-center ${
                            result === scale
                              ? "bg-yellow-500 text-white"
                              : "text-white"
                          }`}
                        >
                          {result === scale ? scale : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <thead className="bg-green-300">
                  <tr>
                    {scaleList.map((scale) => (
                      <th
                        key={scale}
                        className={`px-4 py-2 border border-gray-300  text-sm ${
                          starting_point === scale
                            ? "text-red-600"
                            : "text-gray-800"
                        }`}
                      >
                        {scale}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          ) : (
            ""
        )}
        </>
      </Container>
      
    </div>
  );
};

export default Spy_mes;
