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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

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

import Spp_mesGraphChart from "./Spp_mesGraphChart";
import Spp_Table_Left from "./Spp_Table_Left";
import Spp_Table_Right from "./Spp_Table_Right";

const Qqq_mes = (props) => {
  const {
    loading: page_loading,
    error: page_error,
    data: table_info,
  } = useQuery(TABLE_DATA_DETAIL, {
    variables: { tableId: 29, tableColId: "", tabRelId: "" },
  });

  const [createTableDataInfo] = useMutation(CREATE_TABLE_DATA_INFO_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 29, tableColId: 0, tableRefId: "" },
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

  const [center, setCenter] = useState();

  const [centervalue, setCentervalue] = useState();

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
          tableId: 29,
          columnData: item.ref_point_left,
          tableColId: 1,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.date_left,
          tableColId: 2,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.buy_point_left,
          tableColId: 3,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.bpt_left,
          tableColId: 4,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.num_of_point_left,
          tableColId: 5,
          tabRelId: date + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
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
          tableId: 29,
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
          tableId: 29,
          columnData: item.ref_point_right,
          tableColId: 8,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.date_right,
          tableColId: 9,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.buy_point_right,
          tableColId: 10,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.bpt_right,
          tableColId: 11,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
          columnData: item.num_of_point_right,
          tableColId: 12,
          tabRelId: date1 + i,
        },
      });
      createTableDataInfo({
        variables: {
          tableId: 29,
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
          tableId: 29,
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
      <Container maxWidth="1300px">
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
                  display: "inline",
                }}
                name="dp_left"
              />
              <input
                placeholder="value"
                type="text"
                onChange={(e) => setCentervalue(e.target.value)}
                style={{
                  width: "100px",
                  marginLeft: "35px",
                  marginTop: "25px",
                  display: "inline",
                }}
                name="value"
              />
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
                        onClick={() => deleteLeft.current.onSoftDeleteLeftq()}
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
                        onClick={() => deleteRight.current.onSoftDeleteRightq()}
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
                    marginLeft: "5px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Left Side
                </p>
                <Button
                  sx={{ color: "white", marginLeft: "475px" }}
                  onClick={() => deleteLeft.current.onDeleteLeftq()}
                >
                  Confirm
                </Button>
              </Box>

              <Spp_Table_Left leftValues={leftValues} ref={deleteLeft} />
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
                    marginLeft: "5px",
                    display: "inline",
                  }}
                >
                  {" "}
                  Right Side
                </p>
                <Button
                  sx={{ color: "white", marginLeft: "475px" }}
                  onClick={() => deleteRight.current.onDeleteRight()}
                >
                  Confirm
                </Button>
              </Box>
              <Spp_Table_Right rightValues={rightValues} ref={deleteRight} />
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
              <Spp_mesGraphChart center={center} centervalue={centervalue} />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: "50px" }}>
            <Box
              sx={{ width: "100", fontSize: "30px", textAlign: "center" }}
            ></Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Qqq_mes;
