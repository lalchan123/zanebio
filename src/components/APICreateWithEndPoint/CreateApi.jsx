import React, { useState, useContext, useEffect } from "react";
import {
  DataGrid,
  // GridRowsProp,
  // GridColDef,
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
import CodeEditor from "./CodeEditor";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import useMutationRel from "../../GraphQLApiCall/useMutationRel";
import axios from "axios";
import CodeView from "./CodeView";
import { AppContext } from "../../AppContext";
import ParameterEditor from "./ParameterEditor";
import GetQueryRef from "../../GraphQLApiCall/GetQueryRef";
import GetQueryRel from "../../UseContext/GetQueryRel";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef";
import useRestAPIGet from "../../GraphQLApiCall/useRestAPIGet";
import { localStorageAvailable } from "@mui/x-data-grid/internals";

import toast, { Toaster } from 'react-hot-toast';

// import { BaseURL1, ConfKey } from "../../../Constants";

// import "../../../assets/css/Admin/admin.css";

// import DeveloperConfData from "../../../DeveloperConf.json";

const developerConfData = {
  data: [
    {
      ConfKey: "BaseURL",
    },
  ],
};

const CreateApi = () => {
  let apiDataList = [];
  let apiConfDataList = [];
  const {
    singIn,
    setSignIn,
    setAdminALert,
    setAlertStatus,
    userId,
    setUserId,
    userName,
    setUserName,
    BaseURL,
    setBaseURL,
  } = useContext(AppContext);
  const getUniqueId = () => `${+new Date()}`.slice(-9);
  // const [userId, setUserId] = useState("null");
  // const [userName, setUserName] = useState("null");
  const [open, setOpen] = React.useState(false);
  const [apiCustomCode, setApiCustomCode] = useState("");
  const [apiName, setApiName] = useState("");
  const [apiMethod, setApiMethod] = useState("");
  const [apiRouter, setApiRouter] = useState("");
  const [apiRouter1, setApiRouter1] = useState("");
  const [apiDataType, setApiDataType] = useState("");
  const [apiList, setApiList] = useState("");
  const [fetchData, setFetchData] = useState("");
  const [confKey, setConfKey] = useState("");
  const [customConfKey, setCustomConfKey] = useState("");
  const [confValue, setConfValue] = useState("");
  const [confTableRefId, setConfTableRefId] = useState("");
  // const [BaseURL, setBaseURL] = useState("");
  const [checkApi, setCheckApi] = useState(false);
  const [checkApienv, setCheckApienv] = useState(false);
  const [checkApiadd, setCheckApiAdd] = useState(false);
  const [checExistConfCreateApi, setChecExistConfCreateApi] = useState(false);
  const [checkApiEdit, setCheckApiEdit] = useState(false);
  const [checkConfApiEdit, setCheckConfApiEdit] = useState(false);
  const [checkConfBaseURL, setCheckConfBaseURL] = useState(false);
  const [checkApiCodeValid, setCheckApiCodeValid] = useState("");
  const [parameterCodeEditorValue, setParameterCodeEditorValue] = useState("");
  const [customApiLineCode, setCustomApiLineCode] = useState([]);

  console.log("48 BaseURL", BaseURL);
  // console.log("48 fetchData confKey confValue", fetchData, confKey, confValue);
  // console.log("48 apiCustomCode", apiCustomCode);
  // console.log("49 customApiLineCode", customApiLineCode);
  // console.log("50 parameterCodeEditorValue", parameterCodeEditorValue);
  // console.log("51 apiRouter", apiRouter, userName, apiName, apiMethod, apiDataType);

  const user = GetAllTableData(1);

  const allApi = GetAllTableData(579);

  const confApi = GetAllTableData(620);

  const apiNameForCheck = GetQueryRel(579, 1, "");

  const { setTableDeletedId, setTableDeletedRefId } =
    useMutationDeletedSetByRef();

  const { setTableData, setTableId, setTableRel, setTableCol } =
    useMutationRel();

  const userDetails = eval(
    user?.all_table_data?.getDynamicTableField?.jsonData
  );

  const allApiData = eval(
    allApi?.all_table_data?.getDynamicTableField?.jsonData
  );

  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );

  const adminUserData = JSON.parse(
    localStorage.getItem("admin_user") || `{"demo":"1"}`
  );

  useEffect(() => {
    if (adminUserData.user_flag === true) {
      userDetails?.map((item, i) => {
        if (adminUserData.user_email === item.email) {
          setUserId(item.user_id);
          setUserName(item.last_name);
        }
      });
    }
  }, [userId, userDetails, adminUserData]);

  useEffect(() => {
    {
      confApiData?.map((item, index) => {
        console.log("114 confApiData", item, item.ConfValue);
        if (item.user === userName && item.ConfKey === "BaseURL") {
          setBaseURL(item.ConfValue);
          setCheckConfBaseURL(true);
        }
      });
    }
  });

  const onCheckUserLogin = () => {
    // if (adminUserData.user_flag === true) {
    if (userName) {
      setOpen(true);
    } else {
      setSignIn(true);
    }
    // setOpen(true);
  };

  const selectApiDataList = (name) => {
    allApiData?.map((item, index) => {
      if (item.api_name === name) {
        apiDataList.push({
          api_name: item.api_name,
          api_url: BaseURL + item.api_url,
          api_file: item.api_file,
          api_data_fetch_type: item.api_data_fetch_type,
          custom_code: item.custom_code,
        });
        setApiRouter(BaseURL + item.api_url);
        setApiRouter1(BaseURL + item.api_url);
        setApiMethod(item.api_file);
        setApiDataType(item.api_data_fetch_type);
        setApiCustomCode(item.custom_code);
        setParameterCodeEditorValue(item.api_parameter);
        setCheckApi(false);
        setCheckApiEdit(false);
      }
    });
  };

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

  const onApiDataUpdate = (name) => {
    allApiData?.map((item, index) => {
      if (item.api_name === name) {
        apiDataList.push({
          api_name: item.api_name,
          api_url: BaseURL + item.api_url,
          api_file: item.api_file,
          api_data_fetch_type: item.api_data_fetch_type,
          custom_code: item.custom_code,
        });
        setApiName(item.api_name);
        setApiRouter(BaseURL + item.api_url);
        setApiRouter1(item.api_url);
        setApiMethod(item.api_file);
        setApiDataType(item.api_data_fetch_type);
        setApiCustomCode(item.custom_code);
        setParameterCodeEditorValue(item.api_parameter);
        setCheckApi(false);
        setCheckApiEdit(true);
      }
    });
  };

  // const onCheckUserUpdateData = (name) => {
  //   apiNameForCheck?.getTableDataRelIdInfo?.map((item, i) => {
  //     if (item.columnData === name) {
  //       setTableDeletedId(579);
  //       setTableDeletedRefId(item.tableRefId);
  //       setCheckApiEdit(true);
  //     }
  //   });
  // };

  const onCheckUserApiDataDeleted = (name) => {
    apiNameForCheck?.getTableDataRelIdInfo?.map((item, i) => {
      if (item.columnData === name) {
        setTableDeletedId(579);
        setTableDeletedRefId(item.tableRefId);
        axios
          .delete(BaseURL + `/account/pipe-line-delete/${name}/${userName}/`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("response.data", response.data);
          })
          .catch((error) => {
            console.log("check data error 67", error.response.data.message);
          });

        setAdminALert(true);
        setAlertStatus("Successfully deleted api data");
      }
    });
  };

  const onConfUserApiDataDeleted = (table_ref_id) => {
    setTableDeletedId(620);
    setTableDeletedRefId(table_ref_id);
    setAdminALert(true);
    setAlertStatus("Successfully deleted api data");
  };

  const onSelectRouterByMethod = (value) => {
    if (value === "get") {
      setApiRouter(BaseURL + "/account/dynamic-get-api1");
      setApiRouter1("/account/dynamic-get-api1");
    } else if (value === "post") {
      setApiRouter(BaseURL + "/account/dynamic-post-api");
    } else if (value === "update") {
      setApiRouter(BaseURL + "/account/dynamic-update-api");
    } else if (value === "deleted") {
      setApiRouter(BaseURL + "/account/dynamic-deleted-api");
    } else if (value === "query") {
      setApiRouter(BaseURL + "/graphql");
    } else if (value === "mutation") {
      setApiRouter(BaseURL + "/graphql");
    }
  };

  const checkApiData = async () => {
    if (apiDataType === "restapi") {
      try {
        //   const response = await fetch(apiRouter);
        //   console.log("response", response);
        //   if (!response.ok) {
        //     setFetchData("Network response was not ok.")
        //     throw new Error("Network response was not ok.");
        //   }
        //   const data = await response.json();
        //   setFetchData(data);
        //   console.log("check data value item 100", data);
        // } catch (error) {
        //   console.log("183", error);
        //   setFetchData(error);
        // }

        console.log(
          "212 parameterCodeEditorValue, apiRouter",
          parameterCodeEditorValue,
          apiRouter
        );

        await axios
          // .get(
          .post(
            apiRouter,
            {
              paramList: parameterCodeEditorValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response.data", response.data);
            setFetchData(JSON.stringify(response.data.data, null, 4));
            // setFetchData(response.data.data);
          })
          .catch((error) => {
            console.log("check data error 67", error.response.data);
            // console.log("check data error 67", error.response.data.message);
            // setFetchData(error.response);
            setAdminALert(true);
            setAlertStatus(error.response.data.message);
            setFetchData(error.response.data.message);
          });
      } catch (error) {
        console.log("183", error);
        setAdminALert(true);
        setAlertStatus(error.response.data.message);
        setFetchData(error.response.data.message);
      }
    } else if (apiDataType === "graphql") {
      console.log("graphql api col data");
    }
  };

  const onCheckValidCode = () => {
    axios
      .post(
        BaseURL + "/account/pipeline-code-write/",
        // "https://itb-usa.a2hosted.com/account/custom-code-validate/",
        // "https://itb-usa.a2hosted.com/account/custom-code-validate/",
        {
          // custom_code: apiCustomCode,
          code: apiCustomCode,
          api_name: "apiName",
          // api_file: apiMethod,
          // api_file: apiMethod,
          user: "lalchan",
          paramList: parameterCodeEditorValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // setRestApiPostData(response.data.data);
        // console.log("check response 66", response.data.data);
        // setDataRestApiPostValue({ custom_code: code });
        console.log("response.data", response.data);
        setCheckApiCodeValid(response.data.message);
      })
      .catch((error) => {
        // setRestApiPostError({ responseData: null, error: error.message });
        console.log("check data error 67", error.message);
        setCheckApiCodeValid(error.message);
      });
  };

  const onSaveApiData = () => {
    let uniqueId = getUniqueId();
    if (apiDataType === "restapi") {
      let apiJson = [
        {
          tableId: 579,
          tableColId: 1,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiName,
          columnName: "api_name",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 2,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiRouter1 + "/" + apiName + "/" + userName + "/",
          columnName: "api_url",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 3,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiMethod,
          columnName: "api_file",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 4,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: userName,
          columnName: "user",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 5,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiDataType,
          columnName: "api_data_fetch_type",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 6,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiCustomCode,
          columnName: "custom_code",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 7,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: parameterCodeEditorValue,
          columnName: "api_parameter",
          userId: userId,
        },
      ];
      setTableData(apiJson);
      setTableId(579);
      setTableRel("");
      setTableCol(0);

      axios
        .post(
          BaseURL + "/account/pipeline-api-create-code-write/",
          // "https://itb-usa.a2hosted.com/account/custom-api-code/",
          // "http://localhost:8000/account/pipeline-code-write/",
          {
            user: userName,
            api_name: apiName,
            api_url: apiRouter1 + "/" + apiName + "/" + userName + "/",
            api_method: apiMethod,
            api_data_fetch_type: apiDataType,
            code: apiCustomCode,
            paramList: parameterCodeEditorValue,

            // code_object: customApiLineCode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // setRestApiPostData(response.data.data);
          console.log("check response 66", response.data);
          // setDataRestApiPostValue({ custom_code: code });
        })
        .catch((error) => {
          // setRestApiPostError({ responseData: null, error: error.message });
          console.log("check data error 67", error);
          // console.log("check data error 67", error.message);
        });
      setOpen(false);
      setAdminALert(true);
      setAlertStatus("Successfully create api");
      setApiRouter("");
      setApiMethod("");
      setApiDataType("");
      setApiCustomCode("");
      setParameterCodeEditorValue("");
    } else if (apiDataType === "graphql") {
      let apiJson = [
        {
          tableId: 579,
          tableColId: 1,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiName,
          columnName: "api_name",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 2,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiRouter,
          // columnData: apiRouter + "/" + apiName + "/" + userName + "/",
          columnName: "api_url",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 3,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiMethod,
          columnName: "api_file",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 4,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: userName,
          columnName: "user",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 5,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiDataType,
          columnName: "api_data_fetch_type",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 6,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: apiCustomCode,
          columnName: "custom_code",
          userId: userId,
        },
        {
          tableId: 579,
          tableColId: 7,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: parameterCodeEditorValue,
          columnName: "api_parameter",
          userId: userId,
        },
      ];
      setTableData(apiJson);
      setTableId(579);
      setTableRel("");
      setTableCol(0);

      axios
        .post(
          BaseURL + "/account/pipeline-api-create-code-write/",
          // "https://itb-usa.a2hosted.com/account/custom-api-code/",
          // "http://localhost:8000/account/pipeline-code-write/",
          {
            user: userName,
            api_name: apiName,
            api_url: apiRouter,
            // api_url: apiRouter + "/" + apiName + "/" + userName + "/",
            api_method: apiMethod,
            api_data_fetch_type: apiDataType,
            code: apiCustomCode,
            paramList: parameterCodeEditorValue,

            // code_object: customApiLineCode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // setRestApiPostData(response.data.data);
          console.log("check response 66", response.data);
          // setDataRestApiPostValue({ custom_code: code });
        })
        .catch((error) => {
          // setRestApiPostError({ responseData: null, error: error.message });
          console.log("check data error 67", error);
          // console.log("check data error 67", error.message);
        });
      setOpen(false);
      setAdminALert(true);
      setAlertStatus("Successfully create api");
      setApiRouter("");
      setApiMethod("");
      setApiDataType("");
      setApiCustomCode("");
      setParameterCodeEditorValue("");
    }
  };

  const OnConfDataCreateApiData = () => {
    // const validateApiData = useRestAPIGet(BaseURL+`/account/validate-api/${confKey}/`)
    console.log("565 confKey", confKey);
    console.log("598 userId", userId, userName);
    // console.log("598 userId", localStorage.getItem("userId"), localStorage.getItem("userName"));
    // console.log("598 userId", localStorage.getItem("userId"), localStorage.getItem("userName"));
    // const userId= localStorage.getItem("userId")
    // const userName= localStorage.getItem("userName") 
    // const objType = "ConfKey";
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
    console.log("656 apiJson", apiJson)
    setTableData(apiJson);
    setTableId(620);
    setTableRel("");
    setTableCol(0);

    localStorage.removeItem("BaseUrl")
    localStorage.setItem("BaseUrl", confValue)
    setCheckApiAdd(false);
    setAdminALert(true);
    setAlertStatus("Successfully create api");
    setConfKey("");
    setConfValue("");
    // axios
    //   .get(BaseURL + `/account/validate-api/${objType}/${confKey}/`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log("check response 66", response.data);
    //     // setDataRestApiPostValue({ custom_code: code });
    //     // setChecExistConfCreateApi(response.data.result)
    //     if (response.data.result === true) {
    //       setCheckApiAdd(false);
    //       setAdminALert(true);
    //       setAlertStatus(response.data.message);
    //       setConfKey("");
    //       setConfValue("");
    //     } else {
    //       let uniqueId = getUniqueId();
    //       let apiJson = [
    //         {
    //           tableId: 620,
    //           tableColId: 1,
    //           tabRelId: "",
    //           tableRefId: uniqueId,
    //           columnData: "UI",
    //           columnName: "ConfType",
    //           userId: userId,
    //         },
    //         {
    //           tableId: 620,
    //           tableColId: 2,
    //           tabRelId: "",
    //           tableRefId: uniqueId,
    //           columnData: confKey,
    //           columnName: "ConfKey",
    //           userId: userId,
    //         },
    //         {
    //           tableId: 620,
    //           tableColId: 3,
    //           tabRelId: "",
    //           tableRefId: uniqueId,
    //           columnData: confValue,
    //           columnName: "ConfValue",
    //           userId: userId,
    //         },
    //         {
    //           tableId: 620,
    //           tableColId: 4,
    //           tabRelId: "",
    //           tableRefId: uniqueId,
    //           columnData: userName,
    //           columnName: "user",
    //           userId: userId,
    //         },
    //       ];
    //       console.log("656 apiJson", apiJson)
    //       setTableData(apiJson);
    //       setTableId(620);
    //       setTableRel("");
    //       setTableCol(0);

    //       localStorage.removeItem("BaseUrl")
    //       localStorage.setItem("BaseUrl", confValue)
    //       setCheckApiAdd(false);
    //       setAdminALert(true);
    //       setAlertStatus("Successfully create api");
    //       setConfKey("");
    //       setConfValue("");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("check data error 67", error);
    //     // console.log("check data error 68", error.response.data.message);
    //     setCheckApiAdd(false);
    //     setAdminALert(true);
    //     setAlertStatus("Url is not Valid or other problem");
    //     toast.success("Url is not Valid or other problem")
    //     localStorage.removeItem("BaseUrl")
    //     localStorage.setItem("BaseUrl", confValue)
    //     setConfKey("");
    //     setConfValue("");
    //   });
  };

  const onConfDataUpdateApiData = () => {
    setTableDeletedId(620);
    setTableDeletedRefId(confTableRefId);

    console.log("693 update userId", userId)

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
    console.log("724 apiJson", apiJson)
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

  const onApiUpdateData = () => {
    apiNameForCheck?.getTableDataRelIdInfo?.map((item, i) => {
      console.log("390 apiName", apiName);
      // console.log("391 item", item);
      if (item?.columnData === apiName) {
        console.log("393 apiName", item?.columnData, apiName);
        setTableDeletedId(579);
        setTableDeletedRefId(item?.tableRefId);
        // setCheckApiEdit(true);

        let uniqueId = getUniqueId();
        let apiJson = [
          {
            tableId: 579,
            tableColId: 1,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: apiName,
            columnName: "api_name",
            userId: userId,
          },
          {
            tableId: 579,
            tableColId: 2,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: apiRouter1,
            // columnData: apiRouter + "/" + apiName + "/" + userName + "/",
            columnName: "api_url",
            userId: userId,
          },
          {
            tableId: 579,
            tableColId: 3,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: apiMethod,
            columnName: "api_file",
            userId: userId,
          },
          {
            tableId: 579,
            tableColId: 4,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: userName,
            columnName: "user",
            userId: userId,
          },
          {
            tableId: 579,
            tableColId: 5,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: apiDataType,
            columnName: "api_data_fetch_type",
            userId: userId,
          },
          {
            tableId: 579,
            tableColId: 6,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: apiCustomCode,
            columnName: "custom_code",
            userId: userId,
          },
          {
            tableId: 579,
            tableColId: 7,
            tabRelId: "",
            tableRefId: uniqueId,
            columnData: parameterCodeEditorValue,
            columnName: "api_parameter",
            userId: userId,
          },
        ];
        setTableData(apiJson);
        setTableId(579);
        setTableRel("");
        setTableCol(0);

        axios
          .post(
            BaseURL + "/account/pipeline-api-create-code-write/",
            {
              user: userName,
              api_name: apiName,
              api_url: apiRouter1,
              // api_url: apiRouter + "/" + apiName + "/" + userName + "/",
              api_method: apiMethod,
              api_data_fetch_type: apiDataType,
              code: apiCustomCode,
              paramList: parameterCodeEditorValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // setRestApiPostData(response.data.data);
            console.log("check response 66", response.data);
            // setDataRestApiPostValue({ custom_code: code });
          })
          .catch((error) => {
            // setRestApiPostError({ responseData: null, error: error.message });
            console.log("check data error 67", error);
            // console.log("check data error 67", error.message);
          });

        // axios
        //   .post(
        //     "https://itb-usa.a2hosted.com/account/custom-api-code/",
        //     {
        //       code: apiCustomCode,
        //       api_name: apiName,
        //       api_file: apiMethod,
        //       user: userName,
        //       code_object: customApiLineCode,
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     // setRestApiPostData(response.data.data);
        //     // console.log("check response 66", response.data.data);
        //     // setDataRestApiPostValue({ custom_code: code });
        //   })
        //   .catch((error) => {
        //     // setRestApiPostError({ responseData: null, error: error.message });
        //     console.log("check data error 67", error.message);
        //   });
        setOpen(false);
        setAdminALert(true);
        setAlertStatus("Successfully edit api data");
        setApiName("");
        setApiRouter("");
        setApiMethod("");
        setApiDataType("");
        setApiCustomCode("");
        setParameterCodeEditorValue("");
        setCheckApiEdit(false);
      }
    });
    // let uniqueId = getUniqueId();
    // let apiJson = [
    //   {
    //     tableId: 579,
    //     tableColId: 1,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: apiName,
    //     columnName: "api_name",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 579,
    //     tableColId: 2,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: apiRouter,
    //     // columnData: apiRouter + "/" + apiName + "/" + userName + "/",
    //     columnName: "api_url",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 579,
    //     tableColId: 3,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: apiMethod,
    //     columnName: "api_file",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 579,
    //     tableColId: 4,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: userName,
    //     columnName: "user",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 579,
    //     tableColId: 5,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: apiDataType,
    //     columnName: "api_data_fetch_type",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 579,
    //     tableColId: 6,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: apiCustomCode,
    //     columnName: "custom_code",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 579,
    //     tableColId: 7,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: parameterCodeEditorValue,
    //     columnName: "api_parameter",
    //     userId: userId,
    //   },
    // ];
    // setTableData(apiJson);
    // setTableId(579);
    // setTableRel("");
    // setTableCol(0);

    // axios
    //   .post(
    //     "https://itb-usa.a2hosted.com/account/pipeline-api-create-code-write/",
    //     {
    //       user: userName,
    //       api_name: apiName,
    //       api_url: apiRouter,
    //       // api_url: apiRouter + "/" + apiName + "/" + userName + "/",
    //       api_method: apiMethod,
    //       api_data_fetch_type: apiDataType,
    //       code: apiCustomCode,
    //       paramList: parameterCodeEditorValue,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     // setRestApiPostData(response.data.data);
    //     console.log("check response 66", response.data);
    //     // setDataRestApiPostValue({ custom_code: code });
    //   })
    //   .catch((error) => {
    //     // setRestApiPostError({ responseData: null, error: error.message });
    //     console.log("check data error 67", error);
    //     // console.log("check data error 67", error.message);
    //   });

    // // axios
    // //   .post(
    // //     "https://itb-usa.a2hosted.com/account/custom-api-code/",
    // //     {
    // //       code: apiCustomCode,
    // //       api_name: apiName,
    // //       api_file: apiMethod,
    // //       user: userName,
    // //       code_object: customApiLineCode,
    // //     },
    // //     {
    // //       headers: {
    // //         "Content-Type": "application/json",
    // //       },
    // //     }
    // //   )
    // //   .then((response) => {
    // //     // setRestApiPostData(response.data.data);
    // //     // console.log("check response 66", response.data.data);
    // //     // setDataRestApiPostValue({ custom_code: code });
    // //   })
    // //   .catch((error) => {
    // //     // setRestApiPostError({ responseData: null, error: error.message });
    // //     console.log("check data error 67", error.message);
    // //   });
    // setOpen(false);
    // setAdminALert(true);
    // setAlertStatus("Successfully edit api data");
    // setApiRouter("");
    // setApiMethod("");
    // setApiDataType("");
    // setApiCustomCode("");
    // setParameterCodeEditorValue("");
    // setCheckApiEdit(false);
  };

  return (
    <>
      <Container maxWidth="2xl">
        <Grid container spacing={0.5} sx={{ marginTop: 1, marginBottom: 5 }}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="max-w-full h-[40px] bg-slate-100 flex justify-between items-center p-1 dark:bg-slate-800">
              <div className="p-0.5 flex items-center gap-2">
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[560px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="url"
                  required
                  value={apiRouter}
                  onChange={(e) => setApiRouter(e.target.value)}
                />
                <select
                  className="bg-gray-100 text-black text-[12px] border rounded-md block w-[100px] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  value={apiMethod}
                  onChange={(e) => setApiMethod(e.target.value)}
                >
                  <option selected class="text-[12px]" value="">
                    Method
                  </option>
                  <option
                    class="text-[12px]"
                    value="UIGETAPI1"
                    onClick={() => onSelectRouterByMethod("get")}
                  >
                    Get
                  </option>
                  <option
                    class="text-[12px]"
                    value="UIPOSTAPI"
                    onClick={() => onSelectRouterByMethod("post")}
                  >
                    Post
                  </option>
                  <option
                    class="text-[12px]"
                    value="UIUPDATEAPI"
                    onClick={() => onSelectRouterByMethod("update")}
                  >
                    Update
                  </option>
                  <option
                    class="text-[12px]"
                    value="UIDELETEDPI"
                    onClick={() => onSelectRouterByMethod("deleted")}
                  >
                    Deleted
                  </option>
                  <option
                    class="text-[12px]"
                    value="UIQUERYPI"
                    onClick={() => onSelectRouterByMethod("query")}
                  >
                    Query
                  </option>
                  <option
                    class="text-[12px]"
                    value="UIMUTATIONPI"
                    onClick={() => onSelectRouterByMethod("mutation")}
                  >
                    Mutation
                  </option>
                </select>
                <select
                  className="bg-gray-100 text-black text-[12px] border rounded-md block w-[100px] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  value={apiDataType}
                  onChange={(e) => setApiDataType(e.target.value)}
                >
                  <option selected class="text-[12px]" value="">
                    Type
                  </option>
                  <option class="text-[12px]" value="graphql">
                    GraphQL
                  </option>
                  <option class="text-[12px]" value="restapi">
                    Rest Api
                  </option>
                </select>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setCheckApi(true)}
                >
                  <VisibilityIcon />
                </button>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => checkApiData()}
                >
                  <PlayArrowIcon />
                </button>
                {/* <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setCheckApienv(true)}
                >
                  <SettingsIcon />
                </button> */}
              </div>
              <div>
                {checkApiEdit === true ? (
                  <Tooltip title="Update" placement="bottom">
                    <div className="cursor-pointer" onClick={onApiUpdateData}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-white hover:text-green-700 dark:hover:text-green-700 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip title="Submit" placement="bottom">
                    <div
                      className="cursor-pointer"
                      onClick={() => onCheckUserLogin()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <TextField
                  id="outlined-basic"
                  label="api Name"
                  variant="outlined"
                  color="success"
                  size="small"
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpen(false)}
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
                  onClick={onSaveApiData}
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={checkApi}
              onClose={() => setCheckApi(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xl"
            >
              <DialogContent>
                <div class="relative overflow-y-scroll shadow-md sm:rounded-lg h-[500px]">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-blue-700 dark:text-blue-400">
                      <tr>
                        <th scope="col" class="px-6 py-2">
                          Api Name
                        </th>
                        <th scope="col" class="px-6 py-2">
                          Api Type
                        </th>
                        <th scope="col" class="px-6 py-2">
                          Method
                        </th>
                        <th scope="col" class="px-6 py-2">
                          User
                        </th>
                        <th scope="col" class="px-6 py-2">
                          Url
                        </th>
                        <th scope="col" class="px-6 py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allApiData?.map((item, index) => {
                        if (item.user === userName) {
                          return (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td class="px-6 py-2">{item.api_name}</td>
                              <td class="px-6 py-2">
                                {item.api_data_fetch_type}
                              </td>
                              <td class="px-6 py-2">{item.api_file}</td>
                              <td class="px-6 py-2">{item.user}</td>
                              <td class="px-6 py-2">
                                {BaseURL + item.api_url}
                              </td>
                              <td class="px-6 py-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      selectApiDataList(item.api_name)
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
                                        d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      onApiDataUpdate(item.api_name)
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
                                      onCheckUserApiDataDeleted(item.api_name)
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
                              </td>
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
                  onClick={() => setCheckApi(false)}
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
                  onClick={onSaveApiData}
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={checkApienv}
              onClose={() => setCheckApienv(false)}
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
                        <th scope="col" class="px-14 py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {confApiData?.map((item, index) => {
                        console.log("confApiData", item);
                        if (item.user === userName) {
                          return (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td class="px-14 py-2 ">{item.ConfKey}</td>
                              <td class="px-14 py-2 ">{item.ConfValue}</td>
                              <td class="px-14 py-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      selectConfApiUpdateDataList(
                                        item.table_ref_id
                                      )
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
                                      onConfUserApiDataDeleted(
                                        item.table_ref_id
                                      )
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
                              </td>
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
                {/* <div class="relative overflow-y-scroll shadow-md sm:rounded-lg h-[500px]">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-blue-700 uppercase bg-blue-50 dark:bg-blue-700 dark:text-blue-400">
                      <tr>
                        <th scope="col" class="px-6 py-2">
                          Key
                        </th>
                        <th scope="col" class="px-6 py-2">
                          Value
                        </th>
                        <th scope="col" class="px-6 py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allApiData?.map((item, index) => {
                        if (item.user === userName) {
                          return (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td class="px-6 py-2">{item.api_name}</td>
                              <td class="px-6 py-2">{BaseURL+item.api_url}</td>
                              <td class="px-6 py-2">
                                <div className="flex items-center gap-2">
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      selectApiDataList(item.api_name)
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
                                        d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    class="font-medium text-black hover:text-green-600 cursor-pointer"
                                    onClick={() =>
                                      onApiDataUpdate(item.api_name)
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
                                      onCheckUserApiDataDeleted(item.api_name)
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
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div> */}

                <div>
                  <div class="w-screen md:mt-0 sm:max-w-md xl:p-0 ">
                    <div class="p-8 space-y-2 md:space-y-4 sm:p-8">
                      <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Configuration Set Up
                      </h1>
                      {/* <div>
                        <label
                          for="ConfKey"
                          class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Conf Key
                        </label>
                        <input
                          type="text"
                          name="ConfKey"
                          id="ConfKey"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Conf Key"
                          required=""
                          value={confKey}
                          onChange={(e)=> setConfKey(e.target.value)}
                        />
                      </div> */}

                      {/* <select
                        className="bg-gray-100 text-black text-[12px] border rounded-md block w-[380px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                        value={confKey}
                        onChange={(e) =>  setConfKey(e.target.value)}
                      >
                        <option selected class="text-[12px]" value="">
                          Conf Key
                        </option>
          
                        {confApiData?.map((item, index) => {
                          console.log("confApiData", item);
                          if (item.user === userName) {
                            return (
                              <option class="text-[12px]" value={item.ConfKey}>
                                {item.ConfKey}
                              </option>
                            );
                          }
                        })}     
                        
                      </select> */}

                      <div>
                        <input
                          list="browsers"
                          name="browser"
                          className="bg-gray-100 text-black text-[12px] border rounded-md block w-[380px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                          placeholder="Conf Key"
                          value={confKey}
                          onChange={(e) => setConfKey(e.target.value)}
                        />
                        <datalist id="browsers">
                          {developerConfData?.data?.map((item, index) => {
                            // console.log("DeveloperConfData", item);
                            return (
                              <option class="text-[12px]" value={item.ConfKey}>
                                {item.ConfKey}
                              </option>
                            );
                          })}
                        </datalist>
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
                          placeholder="http://itbusa.com"
                          required=""
                          value={confValue}
                          onChange={(e) => {
                            if (checkConfBaseURL === false) {
                              setBaseURL(e.target.value);
                              setConfValue(e.target.value);
                            } else {
                              setConfValue(e.target.value);
                            }
                          }}
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
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Box
              sx={{
                maxWidth: "100%",
                height: "600px",
                display: "flex",
                border: ".5px solid green",
                bgcolor: "#F3EEEA",
              }}
            >
              <div className="h-[60px]">
                <Box>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2"
                    onClick={() => onCheckValidCode()}
                  >
                    Code Test
                  </button>
                  <span className="ml-5 italic font-mono">
                    {checkApiCodeValid === "Request failed with status code 400"
                      ? "your code is invalid"
                      : checkApiCodeValid === "custom code validated"
                      ? "your code is validated"
                      : ""}
                  </span>
                  <CodeEditor
                    apiCustomCode={apiCustomCode}
                    setApiCustomCode={setApiCustomCode}
                    setCustomApiLineCode={setCustomApiLineCode}
                  />
                  <span className="ml-8 italic font-mono h-[10px w-full">
                    api parameters
                  </span>
                  <ParameterEditor
                    parameterCodeEditorValue={parameterCodeEditorValue}
                    setParameterCodeEditorValue={setParameterCodeEditorValue}
                  />
                </Box>
              </div>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Box
              sx={{
                maxWidth: "100%",
                display: "flex",
                height: "600px",
                border: ".5px solid green",
              }}
            >
              <div className="h-[60px]">
                <div className="h-[590px] overflow-y-scroll p-2 font-normal text-sm max-w-[860px]">
                  <CodeView
                    apiData={fetchData}
                    // apiData={JSON.stringify(fetchData?.data, null, 2)}
                  />
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateApi;
