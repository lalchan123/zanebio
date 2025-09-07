import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
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

const options = ["Character", "Integer ", "Floating"];

function Right_Sight_Table({ tableDataLeft, RightValues }, ref) {
  
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(Math.floor(Date.now() / 1000));
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [columns, setColumns] = useState([
    { title: "id", field: "id", hide: true, width: 50 },
    { title: "starting_point", field: "starting_point", width: 100 },
    { title: "starting_value", field: "starting_value", width: 110 },
    { title: "daygap", field: "daygap", width: 80 },
    { title: "value_range_0", field: "value_range_0", width: 100 },
    { title: "value_range_1", field: "value_range_1", width: 100 },
    { title: "which_day", field: "which_day", width: 80 },
    { title: "which_point_add", field: "which_point_add", width: 80 },
    { title: "new_point", field: "new_point", width: 80 },
    { title: "value", field: "value", width: 80 },
    { title: "created_time", field: "created_time", width: 80 },
   
  ]);
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
    <div style={{ height: 150, width: "100%", marginTop: "5px" }}>
     
      <DataGrid
        hideFooter={true}
        rows={RightValues?.right_data?.map((item, i) => {
          item.id = i
          return (item)
        })}
        columns={columns}
        rowHeight={25}
      />
     
    </div>
  );
}

export default forwardRef(Right_Sight_Table);
