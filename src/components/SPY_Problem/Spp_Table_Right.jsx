import React from "react";
import { useState, forwardRef, useImperativeHandle, useContext } from "react";
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
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

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

import { JoinRightTwoTone } from "@mui/icons-material";
import { AppContext } from "../../AppContext";

const options = ["Character", "Integer ", "Floating"];

function Spp_Table_Right({ rightValues }, ref) {
  // const {
  //   loading: ata_loading,
  //   error: data_error,
  //   data: table_data,
  // } = useQuery(TABLE_DATA_BOX_DETAIL_REF, {
  //   variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  // });

  // const deleteUser = React.useCallback(
  //   (id) => () => {
  //     setTimeout(() => {
  //       setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  //     });
  //   },
  //   []
  // );
  // const [createTableDataInfo] = useMutation(CREATE_TABLE_DATA_INFO_MUTATION, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_BOX_DETAIL_REF,
  //       variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  //     },
  //   ],
  // });

  // useImperativeHandle(ref, () => ({
  //   onSoftDeleteRight,
  //   onDeleteRight,
  // }));
  // const [open, setOpen] = useState(false);
  // const [date1, setDate1] = useState(Math.floor(Date.now() / 1000));
  // const [value, setValue] = React.useState(options[0]);
  // const [inputValue, setInputValue] = React.useState("");
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
    setPoint_Id,
    Pv0,
    setPv0,
    Pv1,
    setPv1,
    Pv2,
    setPv2,
    detialsValueShow1,
    setDetialsValueShow1,
  } = useContext(AppContext);
  
  const [columns, setColumns] = useState([
     { title: "actual_value", field: "actual_value", width: 80 },
     { title: "maxv", field: "maxv", width: 80 },
     { title: "minv", field: "minv", width: 80 },
     { title: "maxv_value", field: "maxv_value", width: 80 },
     { title: "minv_value", field: "minv_value", width: 80 },
     { title: "RangeSum", field: "RangeSum", width: 80 },
     { title: "ActualP", field: "ActualP", width: 80 },
     { title: "MaxP", field: "MaxP", width: 80 },
     { title: "MinP", field: "MinP", width: 80 },
     { title: "d1_point0", field: "d1_point0", width: 80 },
     { title: "d1_point1", field: "d1_point1", width: 80 },
     { title: "d2_point2", field: "d2_point2", width: 80 },
     { title: "point_id", field: "point_id", width: 80 },
     { title: "pv0", field: "pv0", width: 80 },
     { title: "pv1", field: "pv1", width: 80 },
     { title: "pv2", field: "pv2", width: 80 },
     { title: "id", field: "id", hide: true, width: 50 },
     {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          // onClick={deleteUser(params.id)}
          onClick={() => {
            // console.log("params", params)
            // console.log("params d1_point0", params?.row?.d1_point0)
            // console.log("params MaxP", params?.row?.MaxP)
            // console.log("params MinP", params?.row?.MinP)
            setD1_Point0(params?.row?.d1_point0)
            setD1_Point1(params?.row?.d1_point1)
            setD2_Point2(params?.row?.d2_point2)
            setMaxP(params?.row?.MaxP)
            setMinP(params?.row?.MinP)
            setPoint_Id(params?.row?.point_id)
            setDetailButton(true)
            setDetialsValueShow1(true);
            // setDetialsValueShow1([{ index: params?.row?.point_id, flag: true }]);
            // setDetialsValueShow1(params?.row?.point_id);

            // console.log("dynamicGraphRowData", dynamicGraphRowData);
            
            // const DataList = []
            // dynamicGraphRowData?.map((item, i) => {
            //   if (i === 0) {
            //     {
            //       Object.keys(item).map((key, index) => {
            //         if (key === params?.row?.d1_point0) {
            //            item[key] = params?.row?.d1_point0
            //         } else {
            //           item[key] = 0
            //          }
            //       })
            //     }
            //     DataList.push(item)
               
            //   }
            //   if (i === 1) {
            //     {
            //       Object.keys(item).map((key, index) => {
            //         if (key === params?.row?.d1_point0) {
            //            item[key] = params?.row?.d1_point0
            //         } else {
            //           item[key] = 0
            //          }
            //       })
            //     }
            //     DataList.push(item)
                
            //   }
            //   if (i === 2) {
            //     {
            //       Object.keys(item).map((key, index) => {
            //         if (key === params?.row?.d1_point0) {
            //            item[key] = params?.row?.d1_point0
            //         } else {
            //           item[key] = 0
            //          }
            //       })
            //     }
            //     DataList.push(item)
            //   }


            // })

            // console.log("DataList", DataList);


          }
          }
          icon={<VisibilityIcon />}
          label="show"
        />,
      ],
    },
  ]);

  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     ref_p: 45,
  //     date_p: "  23",
  //     buy_p: 74,
  //     bpt_p: 453,
  //     num_p: 41,
  //     point_def_p: 43,
  //     color_p: "red",
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

  // console.log("82", box_data);

  // let myItemsright = [];
  // let myItemTableDataRightId = [];
  // let vwidthright = "";
  // let vheightright = "";
  // let vcolorright = "";
  // let vserialright = "";
  // let v_relid = "";

  // // box_data?.getTableDataRefIdInfo?.forEach((sub) => {
  // //   if (sub.tableColId === 8) {
  // //     myItemTableDataRightId.push(sub.tabRelId);
  // //   }
  // // });

  // const rows = box_data?.getTableDataRefIdInfo?.map((item) => {
  //   return {
  //     tablecolid: item.tableColId,
  //     columndata: item.columnData,
  //     relid: item.tabRelId,
  //   };
  // });

  // console.log("124", rows);

  // // const strDescending = [...rows].sort((a, b) => (a.relid > b.relid ? 1 : -1));

  // // console.log("111", strDescending);
  // v_relid = 1;

  // rows
  //   ?.sort((a, b) => (a.relid > b.relid ? 1 : -1))
  //   .map((sub, i) => {
  //     if (i / v_relid === 6) {
  //       console.log("111", i);
  //       console.log("117", sub.relid);
  //       myItemsright.push({
  //         ref_p: ref_point,
  //         date_p: date_point,
  //         buy_p: buy_point,
  //         bpt_p: bpt_point,
  //         num_p: num_of_point,
  //         point_def_p: point_def,
  //         color_p: color_point,
  //       });
  //       console.log("127", myItemsright);
  //       ref_point = "";
  //       date_point = "";
  //       buy_point = "";
  //       bpt_point = "";
  //       num_of_point = "";
  //       point_def = "";
  //       color_point = "";
  //       v_relid += 1;
  //     }

  //     if (sub.tablecolid === 1) {
  //       ref_point = sub.columndata;
  //     }
  //     if (sub.tablecolid === 2) {
  //       date_point = sub.columndata;
  //     }
  //     if (sub.tablecolid === 3) {
  //       buy_point = sub.columndata;
  //     }
  //     if (sub.tablecolid === 4) {
  //       bpt_point = sub.columndata;
  //     }
  //     if (sub.tablecolid === 5) {
  //       num_of_point = sub.columndata;
  //     }
  //     if (sub.tablecolid === 6) {
  //       point_def = sub.columndata;
  //     }
  //     if (sub.tablecolid === 7) {
  //       color_point = sub.columndata;
  //     }
  //   });

  // console.log("169", myItemsright);

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
  //   if (sub.tableColId === 8) {
  //     myItemTableDataRightId.push(sub.tabRelId);
  //   }
  // });

  // myItemTableDataRightId.map((val, i) => {
  //   box_data?.getTableDataRefIdInfo?.forEach((sub) => {
  //     if (sub.tableColId === 8 && sub.tabRelId === val) {
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

  //     if (sub.tableColId === 9 && sub.tabRelId === val) {
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

  //     if (sub.tableColId === 10 && sub.tabRelId === val) {
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
  //     if (sub.tableColId === 11 && sub.tabRelId === val) {
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
  //     if (sub.tableColId === 12 && sub.tabRelId === val) {
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
  //     if (sub.tableColId === 13 && sub.tabRelId === val) {
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
  //     if (sub.tableColId === 14 && sub.tabRelId === val) {
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

  // const onSoftDeleteRight = () => {
  //   rightValues.map((item, i) => {
  //     myItemsright.map((item2, j) => {
  //       if (item.buy_point_right === item2.buy_p) {
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.ref_point_right,
  //             tableColId: 8,
  //             tabRelId: date1 + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.date_right,
  //             tableColId: 9,
  //             tabRelId: date1 + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.buy_point_right,
  //             tableColId: 10,
  //             tabRelId: date1 + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.bpt_right,
  //             tableColId: 11,
  //             tabRelId: date1 + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: item.num_of_point_right,
  //             tableColId: 12,
  //             tabRelId: date1 + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData:
  //               item.color_right === "red"
  //                 ? eval(item.buy_point_right) - eval(item.ref_point_right)
  //                 : eval(item.ref_point_right) - eval(item.buy_point_right),
  //             tableColId: 13,
  //             tabRelId: date1 + i,
  //           },
  //         });
  //         createTableDataInfo({
  //           variables: {
  //             tableId: 28,
  //             columnData: "black",
  //             tableColId: 14,
  //             tabRelId: date1 + i,
  //           },
  //         });

  //         setOpen(false);
  //       }
  //     });
  //   });
  // };

  // const [dataid, setDataid] = useState();

  // const deleteUser = React.useCallback((id) => () => {
  //   setDataid(id);
  // });

  // console.log("468", dataid);

  // const [columnDataDelete] = useMutation(TABLE_COLUMN_DATA_DELETE, {
  //   refetchQueries: [
  //     {
  //       query: TABLE_DATA_BOX_DETAIL_REF,
  //       variables: { tableId: 28, tableColId: 0, tableRefId: "" },
  //     },
  //   ],
  // });

  // const onDeleteRight = () => {
  //   myItemTableDataRightId.map((item1, index) => {
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        hideFooter={false}
        rows={rightValues?.main_data?.map((item, i) => {
          return {
            actual_value: item.actual_value,
            maxv: item.maxv,
            minv: item.minv,
            maxv_value: item.maxv_value,
            minv_value: item.minv_value,
            RangeSum: item.RangeSum,
            ActualP: item.ActualP,
            MaxP: item.MaxP,
            MinP: item.MinP,
            d1_point0: item.d1_point0,
            d1_point1: item.d1_point1,
            d2_point2: item.d2_point2,
            point_id: item.point_id,
            pv0: item.pv0,
            pv1: item.pv1,
            pv2: item.pv2,
            id: i,
          };
        })}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,
        }}
        rowHeight={25}
      />

      
    </div>
  );
}

export default forwardRef(Spp_Table_Right);
