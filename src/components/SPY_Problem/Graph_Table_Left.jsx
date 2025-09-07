import React from "react";
import { useState, forwardRef, useImperativeHandle, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_BOX_DETAIL_REF,
  TABLE_DATA_DETAIL,
} from "../../GraphQL/Queries";

import {
  CREATE_CRUD_INFO_MUTATION,
  CREATE_TABLE_DATA_INFO_MUTATION,
  TABLE_COLUMN_DATA_DELETE,
  TABLE_COLUMN_DATA_UPDATE,
} from "../../GraphQL/Mutations";
import { AppContext } from "../../AppContext";

const options = ["Character", "Integer ", "Floating"];

function Graph_Table_Left({ tableDataLeft, dynamicColumn }, ref) {
  // const {
  //   loading: ata_loading,
  //   error: data_error,
  //   data: table_data,
  // } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
  //   variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  // });
  // useImperativeHandle(ref, () => ({
  //   onSoftDeleteLeft,
  //   onDeleteLeft,
  // }));

  // const [createTableDataInfo] = useMutation(CREATE_TABLE_DATA_INFO_MUTATION, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_BOX_DETAIL_REF,
  //       variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  //     },
  //   ],
  // });
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
    setDynamicGraphRowData
  } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(Math.floor(Date.now() / 1000));
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  console.log("58 nvncncxcn dynamicColumn", dynamicColumn);
  
  const [columns, setColumns] = useState([])
 
  console.log("10 columns", columns)
  console.log("10 D1_Point0", D1_Point0)
  console.log("10 D1_Point1", D1_Point1)
  console.log("10 D2_Point2", D2_Point2)


  useEffect(() => {
    if (dynamicColumn.length != 0) {
      setColumns(dynamicColumn)
    }
  }, [dynamicColumn]);
  // const [columns, setColumns] = useState([
  //   { title: "id", field: "id", hide: true, width: 80 },
  //   { title: "starting_point", field: "starting_point",hide: true, width: 100 },
  //   { title: "starting_value", field: "starting_value", hide: true, width: 110 },
  //   { title: "daygap", field: "daygap", hide: true, width: 80 },
  //   { title: "value_range_0", field: "value_range_0", hide: true, width: 80 },
  //   { title: "value_range_1", field: "value_range_1", hide: true, width: 80 },
  //   { title: "created_time", field: "created_time", hide: true, width: 100 },
  //   { title: "d1_point0", field: "d1_point0", hide: true, width: 80 },
  //   { title: "d1_point1", field: "d1_point1",hide: true, width: 80 },
  //   { title: "d2_point2", field: "d2_point2", width: 80 },
  //   { title: "pv0", field: "pv0", hide: true, width: 80 },
  //   { title: "pv1", field: "pv1", hide: true, width: 80 },
  //   { title: "pv2", field: "pv2", hide: true, width: 80 },
  //   { title: "actual_value", field: "actual_value", hide: true, width: 80 },
  //   { title: "maxv", field: "maxv", hide: true, width: 80 },
  //   { title: "minv", field: "minv", hide: true, width: 80 },
  //   { title: "maxv_value", field: "maxv_value", hide: true, width: 80 },
  //   { title: "minv_value", field: "minv_value", hide: true, width: 80 },
  //   { title: "first_run", field: "first_run", hide: true, width: 80 },
  //   { title: "RangeSum", field: "RangeSum", hide: true, width: 80 },
  //   { title: "ActualP", field: "ActualP", hide: true, width: 80 },
  //   { title: "MaxP", field: "MaxP", hide: true, width: 80 },
  //   { title: "MinP", field: "MinP", hide: true, width: 80 },
  //   // {
  //   //   field: "actions",
  //   //   type: "actions",
  //   //   width: 60,
  //   //   getActions: (params) => [
  //   //     <GridActionsCellItem
  //   //       icon={<DeleteIcon />}
  //   //       label="Delete"
  //   //       onClick={deleteUser(params.id)}
  //   //     ></GridActionsCellItem>,
  //   //   ],
  //   // },
  // ]);
  // const [columns, setColumns] = useState([
  //   { title: "ID", field: "id", hide: true, width: 80 },
  //   { title: "Ref P.", field: "ref_p", width: 80 },
  //   { title: "Date", field: "date_p", width: 80 },
  //   { title: "Buy P.", field: "buy_p", width: 80 },
  //   { title: "B P", field: "bpt_p", width: 80 },
  //   { title: "Num P", field: "num_p", width: 80 },
  //   { title: "P. Def.", field: "point_def_p", width: 100 },
  //   { title: "Color", field: "color_p", width: 80 },
  //   {
  //     field: "actions",
  //     type: "actions",
  //     width: 60,
  //     getActions: (params) => [
  //       <GridActionsCellItem
  //         icon={<DeleteIcon />}
  //         label="Delete"
  //         onClick={deleteUser(params.id)}
  //       ></GridActionsCellItem>,
  //     ],
  //   },
  // ]);

  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     ref_point: 45,
  //     date: "  23",
  //     buy_point: 74,
  //     bpt: 453,
  //     num_p: 41,
  //     p_def: 43,
  //     color: "red",
  //   },
  // ]);

  // let dataDic = [];
  // let allData = [];
  // let dataRelId = [];

  // let ref_point = "";
  // let date_point = "";
  // let buy_point = "";
  // let bpt_point = "";
  // let num_of_point = "";
  // let point_def = "";
  // let color_point = "";

  // const {
  //   loading: box_data_loading,
  //   error: box_data_error,
  //   data: box_data,
  // } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
  //   variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  // });

  // let myItemsright = [];
  // let myItemTableDataRightId = [];
  // let vwidthright = "";
  // let vheightright = "";
  // let vcolorright = "";
  // let vserialright = "";

  // box_data?.getTableDataRefIdInfo?.forEach((sub) => {
  //   if (sub.tableColId === 1) {
  //     myItemTableDataRightId.push(sub.tabRelId);
  //   }
  // });

  // myItemTableDataRightId.map((val, i) => {
  //   box_data?.getTableDataRefIdInfo?.forEach((sub) => {
  //     if (sub.tableColId === 1 && sub.tabRelId === val) {
  //       ref_point = sub.columnData;

  //       if (date_point !== "") {
  //         myItemsright.push({
  //           ref_p: sub.columnData,
  //           date_p: date_point,
  //           buy_p: buy_point,
  //           bpt_p: bpt_point,
  //           num_p: num_of_point,
  //           point_def_p: point_def,
  //           color_p: color_point,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }

  //     if (sub.tableColId === 2 && sub.tabRelId === val) {
  //       date_point = sub.columnData;
  //       if (ref_point !== "") {
  //         myItemsright.push({
  //           ref_p: ref_point,
  //           date_p: sub.columnData,
  //           buy_p: buy_point,
  //           bpt_p: bpt_point,
  //           num_p: num_of_point,
  //           point_def_p: point_def,
  //           color_p: color_point,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }

  //     if (sub.tableColId === 3 && sub.tabRelId === val) {
  //       buy_point = sub.columnData;

  //       if (date_point !== "") {
  //         myItemsright.push({
  //           ref_p: ref_point,
  //           date_p: date_point,
  //           buy_p: sub.columnData,
  //           bpt_p: bpt_point,
  //           num_p: num_of_point,
  //           point_def_p: point_def,
  //           color_p: color_point,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }
  //     if (sub.tableColId === 4 && sub.tabRelId === val) {
  //       bpt_point = sub.columnData;
  //       if (ref_point !== "") {
  //         myItemsright.push({
  //           ref_p: ref_point,
  //           date_p: date_point,
  //           buy_p: buy_point,
  //           bpt_p: sub.columnData,
  //           num_p: num_of_point,
  //           point_def_p: point_def,
  //           color_p: color_point,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }
  //     if (sub.tableColId === 5 && sub.tabRelId === val) {
  //       num_of_point = sub.columnData;
  //       if (date_point !== "") {
  //         myItemsright.push({
  //           ref_p: ref_point,
  //           date_p: date_point,
  //           buy_p: buy_point,
  //           bpt_p: bpt_point,
  //           num_p: sub.columnData,
  //           point_def_p: point_def,
  //           color_p: color_point,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }
  //     if (sub.tableColId === 6 && sub.tabRelId === val) {
  //       point_def = sub.columnData;
  //       if (ref_point !== "") {
  //         myItemsright.push({
  //           ref_p: ref_point,
  //           date_p: date_point,
  //           buy_p: buy_point,
  //           bpt_p: bpt_point,
  //           num_p: num_of_point,
  //           point_def_p: sub.columnData,
  //           color_p: color_point,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }
  //     if (sub.tableColId === 7 && sub.tabRelId === val) {
  //       color_point = sub.columnData;
  //       if (date_point !== "") {
  //         myItemsright.push({
  //           ref_p: ref_point,
  //           date_p: date_point,
  //           buy_p: buy_point,
  //           bpt_p: bpt_point,
  //           num_p: num_of_point,
  //           point_def_p: point_def,
  //           color_p: sub.columnData,
  //         });
  //         ref_point = "";
  //         date_point = "";
  //         buy_point = "";
  //         bpt_point = "";
  //         num_of_point = "";
  //         point_def = "";
  //         color_point = "";
  //       }
  //     }
  //   });
  // });

  // const arraySum = (arr) => {
  //   let total = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     total += arr[i];
  //   }
  //   return total;
  // };

  // const red_b = myItemsright.map((item, i) => {
  //   return item.color_p === "red" ? eval(item.bpt_p) * eval(item.num_p) : 0;
  // });

  // const red_bpt = arraySum(red_b);

  // const red_d = myItemsright.map((item, i) => {
  //   return item.color_p === "red" ? eval(item.point_def_p) : 0;
  // });

  // const red_def = arraySum(red_d);

  // const blue_b = myItemsright.map((item, i) => {
  //   return item.color_p === "blue" ? eval(item.bpt_p) * eval(item.num_p) : 0;
  // });

  // const blue_bpt = arraySum(blue_b);

  // const blue_d = myItemsright.map((item, i) => {
  //   return item.color_p === "blue" ? eval(item.point_def_p) : 0;
  // });

  // const blue_def = arraySum(blue_d);

  // const [columnDataUpdate] = useMutation(TABLE_COLUMN_DATA_UPDATE, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_BOX_DETAIL_REF,
  //       variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  //     },
  //   ],
  // });

  // const onSoftDeleteLeft = () => {
  //   leftValues.map((item, i) => {
  //     myItemsright.map((item2, j) => {
  //       if (item.buy_point_left === item2.buy_p) {
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.ref_point_left,
  //             tableColId: 1,
  //             tabRelId: date + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.date_left,
  //             tableColId: 2,
  //             tabRelId: date + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.buy_point_left,
  //             tableColId: 3,
  //             tabRelId: date + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.bpt_left,
  //             tableColId: 4,
  //             tabRelId: date + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.num_of_point_left,
  //             tableColId: 5,
  //             tabRelId: date + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData:
  //               item.color_left === "red"
  //                 ? eval(item.buy_point_left) - eval(item.ref_point_left)
  //                 : eval(item.ref_point_left) - eval(item.buy_point_left),
  //             tableColId: 6,
  //             tabRelId: date + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: "black",
  //             tableColId: 7,
  //             tabRelId: date + i,
  //           },
  //         });

  //         setOpen(false);
  //       }
  //     });
  //   });
  // };

  // const [dataid, setDataid] = useState("");

  // const deleteUser = React.useCallback((id) => () => {
  //   setDataid(id);
  // });

  // const [columnDataDelete] = useMutation(TABLE_COLUMN_DATA_DELETE, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_BOX_DETAIL_REF,
  //       variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  //     },
  //   ],
  // });

  // console.log("361", dataid);

  // const onDeleteLeft = () => {
  //   myItemTableDataRightId.map((item1, index) => {
  //     console.log("370", dataid);
  //     if (index === dataid) {
  //       box_data?.getTableDataRefIdInfo?.map((item2, i) => {
  //         if (item1 === item2.tabRelId) {
  //           columnDataDelete({
  //             variables: {
  //               id: item2.tableDataId,
  //             },
  //           });
  //         }
  //       });
  //     }
  //   });
  // };

  return (
    <div style={{ height: 225, width: "100%" }}>
      {/* <Button onClick={onDelete}>onClick</Button> */}
      {/* <Button onClick={onSoftDelete}>soft delete</Button> */}
      <DataGrid
        hideFooter={true}
        rows={dynamicGraphRowData?.map((item, i) => {
          console.log("483 i, item", i, item);
          item.id = i
          // if (i === 0 && item["5850"] === 5850) {
          //   console.log("501 Yes");
          //   return(item)
          // }
          const Section = {}
          // if (i === 5) {
          //   // if (D1_Point0.toString().length != 0) {
          //     {
          //       Object.keys(item).map((key, index) => {
          //         console.log("key, index", key, index, typeof (parseInt(key)), typeof (parseInt(D1_Point0)))
          //         if (parseInt(key) === parseInt(D1_Point0)) {
          //           Section[key] = D1_Point0
          //           console.log("501 Yes");
          //         } else {
          //           Section[key] = 0
          //           console.log("501 No");
          //         }
          //       })
          //     }
          //   // }
          //   // return(item)
          // }
          // else if (i === 1) {
          if (i === 1) {
            // if (D1_Point1.toString().length != 0) {
              // {
              //   Object.keys(item).map((key, index) => {
              //     if (parseInt(key) === parseInt(D1_Point1)) {
              //       item[key] =
              //     } else {
              //       item[key] = 0
              //     }
              //   })
              // }
            // }
            // return(item)
            if (item['5850'] === 5850) {
              item['5850']=0
            }
          }
          // else if (i === 2) {
          //   // if (D2_Point2.toString().length != 0) {
          //     {
          //       Object.keys(item).map((key, index) => {
          //         if (parseInt(key) === parseInt(D2_Point2)) {
          //           Section[key] = D2_Point2
          //         } else {
          //           Section[key] = 0
          //         }
          //       })
          //     }
          //   // }
          //   // return(item)
          // }

          return(item)

          // return(item)
          
          // return {
          //   id: i,
          //   starting_point: item.starting_point,
          //   starting_value: item.starting_value,
          //   daygap: item.daygap,
          //   value_range_0: item.value_range_0,
          //   value_range_1: item.value_range_1,
          //   created_time: item.created_time,
          //   d1_point0: item.d1_point0,
          //   d1_point1: item.d1_point1,
          //   d2_point2: item.d2_point2,
          //   pv0: item.pv0,
          //   pv1: item.pv1,
          //   pv2: item.pv2,
          //   actual_value: item.actual_value,
          //   maxv: item.maxv,
          //   minv: item.minv,
          //   maxv_value: item.maxv_value,
          //   minv_value: item.minv_value,
          //   first_run: item.first_run,
          //   RangeSum: item.RangeSum,
          //   MaxP: item.MaxP,
          //   MinP: item.MinP,
          // };
        })}
        // rows={""}
        columns={columns}
        rowHeight={25}
      />
       
      {/* <Box
        sx={{
          backgroundColor: "#FFDEB9",
          textAlign: "center",
          padding: "8px 0px",
        }}
      >
        <Stack
          direction="row"
          spacing={7}
          sx={{ textAlign: "center", marginLeft: "20px", marginTop: "10px" }}
        >
          <Box sx={{ marginLeft: "20px", fontSize: "20px" }}>
            Red Def Point: {red_def || 0}
          </Box>
          <Box sx={{ textAlign: "center", fontSize: "20px" }}>
            {" "}
            Red BPT: {red_bpt || 0}
          </Box>
          <Box sx={{ marginLeft: "20px", fontSize: "20px" }}>
            Blue Def Point: {blue_bpt || 0}
          </Box>
          <Box sx={{ textAlign: "center", fontSize: "20px" }}>
            {" "}
            Blue BPT: {blue_bpt || 0}
          </Box>
        </Stack>
      </Box> */}
    </div>
  );
}

export default forwardRef(Graph_Table_Left);
