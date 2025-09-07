import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Padding } from "@mui/icons-material";

const myScale = [
  {
    node: 4095,
    ratio: 50,
  },
  {
    node: 4100,
    ratio: 50,
  },
  {
    node: 4105,
    ratio: 50,
  },
  {
    node: 4110,
    ratio: 50,
  },
  {
    node: 4115,
    ratio: 50,
  },
  {
    node: 4120,
    ratio: 47,
  },
  {
    node: 4125,
    ratio: 40,
  },
  {
    node: 4130,
    ratio: 37,
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
    ratio: 40,
  },
  {
    node: 4155,
    ratio: 427,
  },
  {
    node: 4160,
    ratio: 46,
  },
  {
    node: 4165,
    ratio: 50,
  },
  {
    node: 4170,
    ratio: 50,
  },
  {
    node: 4175,
    ratio: 50,
  },
  {
    node: 4180,
    ratio: 50,
  },
  {
    node: 4185,
    ratio: 50,
  },
  {
    node: 4190,
    ratio: 50,
  },
  {
    node: 4195,
    ratio: 50,
  },
  {
    node: 4200,
    ratio: 50,
  },
];

const columns = [
  {
    field: "value",
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },

  {
    field: "4095",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4100",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4105",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4110",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4115",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4120",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4125",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4130",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4135",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4140",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    textAlign: "center",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4145",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4150",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4155",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4160",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4165",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4170",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4175",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },

  {
    field: "4180",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4185",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4190",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "4195",
    type: "number",
    valueFormatter: ({ value }) => `${value} `,
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
];

const rows = [{ id: 1, value: "1 Point", 4095: 2, 4100: 4, 4105: 12, 4110: 4 }];

export default function GraphTable({ formValues, formValues1 }) {
  let indexValueleft = [];
  let indexValueright = [];

  // formValues.map((val, i) => {
  //   indexValue.push(indexValue.length === 152;);
  // });

  let abc = 0;

  formValues.map((item) => {
    abc = eval(item.p_left);
    for (let i = 0; i < abc; i++) {
      indexValueleft.push({
        node: item.buyp_left,
        buyp: item.bp_left,
      });
    }
  });

  let def = 0;
  formValues1.map((item) => {
    def = eval(item.p_right);
    for (let i = 0; i < def; i++) {
      indexValueright.push({
        node: item.buyp_right,
        buyp: item.bp_right,
      });
    }
  });

  const myTableData = indexValueleft.concat(indexValueright);

  console.log("mydata 331", myTableData);

  const rowData = myTableData.map((item, i) => {
    console.log("index", i);
    return {
      id: i,
      value: i + 1,
      [item.node]: item.buyp,
    };
  });

  console.log("300", rowData);

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        rowHeight: "50px",
        "& .super-app-theme--header": {
          backgroundColor: "#7149C6",
          color: "white",
          height: 10,
        },
        "& .left": {
          backgroundColor: "#19376D",
          color: "white",
        },
        "& .right": {
          backgroundColor: "#F97B22",
          color: "white",
        },
        "& .no": {
          backgroundColor: "white",
          color: "white",
        },
      }}
    >
      <DataGrid
        hideFooter={true}
        rows={rowData}
        columns={columns}
        getCellClassName={(params) => {
          if (params.value == null) {
            return "no";
          } else if (params.field <= 4135) {
            return "left";
          } else if (params.field <= 4200) {
            return "right";
          }
          //   return params.value <= 15 ? "hot" : "cold";
        }}
      />
    </Box>
  );
}
