import React, { useState, useContext, useEffect } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box, Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import useMutationRel from "../../GraphQLApiCall/useMutationRel";
import axios from "axios";
import { UserContext } from "../../UseContext/UserContext";
import GetQueryRef from "../../GraphQLApiCall/GetQueryRef";
import GetQueryRel from "../../UseContext/GetQueryRel";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef";
import useRestAPIGet from "../../GraphQLApiCall/useRestAPIGet";
import { BaseURL1, ConfKey } from "../../../Constants";

import "../../../assets/css/Admin/admin.css";

import DeveloperConfData from "../../../DeveloperConf.json";
import { AppContext } from "../../AppContext";

const ParameterPopUp = () => {
  //   console.log("36 props", props);
  //   const { activeparameterPopUp , OpenSettingF, ApiParameterDataListF} = props;
  //   console.log("38 activeparameterPopUp, OpenSettingF, ApiParameterDataListF", OpenSettingF, activeparameterPopUp, ApiParameterDataListF);

  const {
    processShow,
    setProcessShow,
    pyShow,
    setPyShow,
    pythonCode,
    setPythonCode,
    processNameCheck,
    setProcessNameCheck,
    adminAlert,
    alertStatus,
    setAdminALert,
    setAlertStatus,
    pipeLineShow,
    setPipeLineShow,
    pipeLineCode,
    setPipeLineCode,
    pipeLineCodeParams,
    setPipeLineCodeParams,
    apiParameterDataList,
    setApiParameterDataList,
    openSetting,
    setOpenSetting,
  } = useContext(AppContext);
  const getUniqueId = () => `${+new Date()}`.slice(-9);
  const [userId, setUserId] = useState("null");
  const [userName, setUserName] = useState("null");
  const [open, setOpen] = React.useState(false);
  const [fetchData, setFetchData] = useState("");
  const [confKey, setConfKey] = useState("");
  const [customConfKey, setCustomConfKey] = useState("");
  const [confValue, setConfValue] = useState("");
  const [confTableRefId, setConfTableRefId] = useState("");
  const [BaseURL, setBaseURL] = useState("");
  const [checkApi, setCheckApi] = useState(false);
  const [checkApienv, setCheckApienv] = useState(openSetting);
  const [checkApiadd, setCheckApiAdd] = useState(false);
  const [checExistConfCreateApi, setChecExistConfCreateApi] = useState(false);
  const [checkApiEdit, setCheckApiEdit] = useState(false);
  const [checkConfApiEdit, setCheckConfApiEdit] = useState(false);
  const [checkConfBaseURL, setCheckConfBaseURL] = useState(false);
  const [checkApiCodeValid, setCheckApiCodeValid] = useState("");
  const [apiParameterData, setApiParameterData] = useState([]);

  const allApi = GetAllTableData(579);

  const confApi = GetAllTableData(620);

  const { setTableDeletedId, setTableDeletedRefId } =
    useMutationDeletedSetByRef();

  const { setTableData, setTableId, setTableRel, setTableCol } =
    useMutationRel();

  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );

  useEffect(() => {
    {
      confApiData?.map((item, index) => {
        //   console.log("114 confApiData", item);
        if (item.user === userName && item.ConfKey === "BaseURL") {
          setBaseURL(item.ConfValue);
          setCheckConfBaseURL(true);
        }
      });
    }
  }, [confApiData]);

  useEffect(() => {
    const sectionData = {};
    apiParameterData?.map((item, index) => {
      console.log("319 apiParameterData", item);
      for (const [key, value] of Object.entries(item)) {
        // console.log(`321 ${key}: ${value}`);
        sectionData[key] = value;
      }
    });
    setApiParameterDataList(sectionData);
  }, [apiParameterData]);

  const selectConfApiUpdateDataList = (table_ref_id) => {
    confApiData?.map((item, index) => {
      if (item.table_ref_id === table_ref_id) {
        setConfKey(item.ConfKey);
        setConfValue(item.ConfValue);
        setConfTableRefId(table_ref_id);
        setCheckApiAdd(true);
        setCheckConfApiEdit(true);
      }
    });
  };

  const onConfUserApiDataDeleted = (table_ref_id) => {
    setTableDeletedId(620);
    setTableDeletedRefId(table_ref_id);
    setAdminALert(true);
    setAlertStatus("Successfully deleted api data");
  };

  const OnConfDataCreateApiData = () => {
    // const validateApiData = useRestAPIGet(BaseURL+`/account/validate-api/${confKey}/`)
    console.log("565 confKey confValue", confKey, confValue);
    let objectData = {};
    objectData[confKey] = confValue;
    console.log("134 objectData", objectData);

    setApiParameterData([...apiParameterData, objectData]);
    setCheckApiAdd(false);
    setAdminALert(true);
    setAlertStatus("Configuration Parameter Created Successfully");
    setConfKey("");
    setConfValue("");
  };

  const onConfDataUpdateApiData = () => {
    setTableDeletedId(620);
    setTableDeletedRefId(confTableRefId);

    let uniqueId = getUniqueId();
    let apiJson = [
      {
        tableId: 620,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: "UI",
        columnName: "ConfType",
        userId: userId,
      },
      {
        tableId: 620,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: confKey,
        columnName: "ConfKey",
        userId: userId,
      },
      {
        tableId: 620,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: confValue,
        columnName: "ConfValue",
        userId: userId,
      },
      {
        tableId: 620,
        tableColId: 4,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: userName,
        columnName: "user",
        userId: userId,
      },
    ];
    setTableData(apiJson);
    setTableId(620);
    setTableRel("");
    setTableCol(0);

    setCheckApiAdd(false);
    setCheckConfApiEdit(false);
    setAdminALert(true);
    setAlertStatus("Successfully api updated");
    setConfKey("");
    setConfValue("");
  };

  return (
    <>
      <Container maxWidth="2xl">
        <Grid container spacing={0.5} sx={{ marginTop: 1, marginBottom: 5 }}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Dialog
              open={checkApienv}
              onClose={() => {
                setCheckApienv(false);
                setOpenSetting(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xl"
            >
              <DialogContent>
                <div class="relative overflow-y-scroll shadow-md sm:rounded-lg h-[500px]">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-blue-700 dark:text-blue-400">
                      <tr>
                        <th scope="col" class="px-14 py-2">
                          Key
                        </th>
                        <th scope="col" class="px-14 py-2">
                          Value
                        </th>
                        {/* <th scope="col" class="px-14 py-2">
                          Action
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {apiParameterData?.map((item, index) => {
                        console.log("319 apiParameterData", item);
                        for (const [key, value] of Object.entries(item)) {
                          console.log(`321 ${key}: ${value}`);
                          return (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td class="px-14 py-2 ">{key}</td>
                              <td class="px-14 py-2 ">{value}</td>
                              {/* <td class="px-14 py-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      selectConfApiUpdateDataList("")
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-black hover:text-green-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      onConfUserApiDataDeleted("")
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 text-black hover:text-green-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </td> */}
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setCheckApienv(false)}
                  sx={{
                    textTransform: "capitalize",
                    color: "green",
                    marginRight: -3,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
                <Button
                  autoFocus
                  sx={{ textTransform: "capitalize", color: "green" }}
                  onClick={() => setCheckApiAdd(true)}
                  // onClick={onSaveApiData}
                >
                  <AddCircleOutlineIcon />
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={checkApiadd}
              onClose={() => setCheckApiAdd(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xl"
            >
              <DialogContent>
                <div>
                  <div class="w-screen md:mt-0 sm:max-w-md xl:p-0 ">
                    <div class="p-8 space-y-2 md:space-y-4 sm:p-8">
                      <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Configuration Parameter
                      </h1>
                      <div>
                        <label
                          for="Conf Key"
                          class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Conf Key
                        </label>
                        <input
                          list="browsers"
                          name="browser"
                          className="bg-gray-100 text-black text-[12px] border rounded-md block w-[380px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                          placeholder="Conf Key"
                          value={confKey}
                          onChange={(e) => setConfKey(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          for="ConfValue"
                          class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Conf Value
                        </label>
                        <input
                          type="text"
                          name="ConfValue"
                          id="ConfValue"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Conf Value"
                          required=""
                          value={confValue}
                          onChange={(e) => setConfValue(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
                        onClick={() => {
                          checkConfApiEdit
                            ? onConfDataUpdateApiData()
                            : OnConfDataCreateApiData();
                        }}
                      >
                        {checkConfApiEdit ? "Update" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setCheckApiAdd(false);
                    setCheckConfApiEdit(false);
                    setConfKey("");
                    setConfValue("");
                  }}
                  sx={{
                    textTransform: "capitalize",
                    color: "green",
                    marginRight: 3,
                    marginTop: -6,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ParameterPopUp;
