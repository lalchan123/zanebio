import React, {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";

import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  useNodeId,
  useUpdateNodeInternals,
} from "@xyflow/react";

import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Box from "@mui/material/Box";
import { EditorView } from "@codemirror/view";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { AppContext } from "../../../../AppContext";
import useRestAPIPost from "../../../../GraphQLApiCall/useRestAPIPost";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import useMutationJsonData from "../../../../GraphQLApiCall/useMutationJsonData";
import GetQueryRel from "../../../../UseContext/GetQueryRel";
import FormulaList from "./FormulaList";
import useMutationRel from "../../../../GraphQLApiCall/useMutationRel";
import AutoSuggestResultJoin from "./AutoSuggestResultJoin";
import GetAllTableData from "../../../../GraphQLApiCall/GetAllTableData";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

const argumentList = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "<",
  ">",
  "<=",
  ">=",
  "==",
  "null",
  "and",
  "or",
];


function JoinCodeEditor() {
  const {
    formulaShow,
    setFormulaShow,
    joinShow,
    setJoinShow,
    joinCode,
    setJoinCode,
    joinAllData,
    setJoinAllData,
    valueName,
    setValueName,
    joinName,
    setJoinName,
    joinNameDic,
    setJoinNameDic,
    fileNameJoin,
    setFileNameJoin,
    BaseURL,
    setBaseURL,
    userId,
    setUserId
  } = useContext(AppContext);

  const [db, setDb] = useState(1);
  const confApi = GetAllTableData(620, userId);
  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );
                
             
  useEffect(() => {
    {
      confApiData?.map((item, index) => {
        if (item.ConfKey === "DB") {
          setDb(item.ConfValue);
        }
      });
    }
  }, [confApiData]);

  const {
    restApiPostData,
    restApiPostLoading,
    restApiPostError,
    setDataRestApiPostValue,
  } = useRestAPIPost(
    `${BaseURL}/account/value-validate-frontend/`
  );

  const formulaList = GetQueryRel(555, 1, "", userId);

  const { setTableData, setTableId, setTableRel, setTableCol, setUserDataId } =
    useMutationRel();

  const [flowName, setFlowName] = useState(localStorage?.getItem("flowName"));
  const [joinData, setJoinData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  const [code, setCode] = useState();
  const [addCode, setAddCode] = useState([]);
  const [value, setValue] = useState("");
  const [v1Suggest, setV1Suggest] = useState(false);
  const [joinEdit, setJoinEdit] = useState(false);
  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  
  let formulaListD = [];


  const onAddArg = (value) => {
    setAddCode([...addCode, value]);
    setValue("");
  };

  console.log("joinAllData", joinAllData)
  const joinDataList = Object.keys(joinAllData[0] || [{ "": "" }])?.map(
    (key) => key
  );

  console.log("118 joinDataList", joinDataList)
  console.log("119 fileNameJoin", fileNameJoin)

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setJoinCode(value);
    const searchWord = value;
    setWordEntered(value);
    const newFilter = joinDataList?.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setJoinData([]);
    } else {
      // const joinDataList1 = fileNameJoin.concat(joinDataList);
      // const joinDataList1 = [...fileNameJoin, ...joinDataList];
      setJoinData(joinAllData);
    }
  }, []);

  const onSuggestValueShow = (value) => {
    setCode(value);
    setJoinCode(value);
    const searchWord = value;
    console.log(" searchWord value ", value)
    setWordEntered(value);
    const newFilter = joinDataList?.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setJoinData([]);
    } else {
      // const joinDataList1 = fileNameJoin.concat(joinDataList);
      setJoinData(joinAllData);
    }
    setV1Suggest(true);
  };

  const clearInput = () => {
    setAddCode([]);
    setJoinData([]);
    setWordEntered("");
  };

  const postData = [
    {
      table_name: "User",
      column_name: "email",
      operator: "is unique",
      value: "",
    },
  ];

  const [formValues, setFormValues] = useState([
    {
      a_colA1: "",
      a_colA2: "",
      a_op1: "",
      a_colB1: "",
      a_colB2: "",
      a_result1: "",
    },
  ]);

  console.log("184 formValues", formValues)
  console.log("185 joinNameDic", joinNameDic)
  console.log("186 joinData", joinData)

  const onChangeJoinName = () => {
    formValues["joinName"] = joinName;
    setJoinEdit(false);
  };

  const handleChange = (index, field, value) => {
    const newFormValues = [...formValues];
    newFormValues[index][field] = value;
    setFormValues(newFormValues);
    // console.log("newFormValues", newFormValues)
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        // ["a_colA" + parseInt(formValues.length + 1) + parseInt(formValues.length + 2)]:
        //   "result" + parseInt(formValues.length),
        // ["a_op" + parseInt(formValues.length + 1)]: "",
        // ["a_colB" + parseInt(formValues.length + 1) + parseInt(formValues.length + 1)]: "",
        // ["a_result" + parseInt(formValues.length)]: "and",
        // ["a_result" + parseInt(formValues.length + 1)]: "",

        ["a_colA" + parseInt(formValues.length + 1)]:
        "result" + parseInt(formValues.length),
        ["a_op" + parseInt(formValues.length + 1)]: "",
        ["a_colB" + parseInt(formValues.length + 1)]: "",
        ["a_result" + parseInt(formValues.length)]: "and",
        ["a_result" + parseInt(formValues.length + 1)]: "",
      },
    ]);
  };

  const combinedObject = formValues.reduce((result, currentItem) => {
    return { ...result, ...currentItem };
  }, {});

  console.log("combinedObject", combinedObject)
  let finalJsonData = {
    joinName: joinName,
    flowName: flowName,
    fileName: valueName,
    joinKey: { ...combinedObject },
  };

  const onSubmitFormulaData = () => {
    setJoinNameDic({ ...combinedObject })

    // let jsondata = [
    //   {
    //     tableId: 555,
    //     tableColId: 1,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: JSON.stringify(finalJsonData),
    //     columnName: "Formula_Data",
    //     userId: "",
    //   },
    //   {
    //     tableId: 555,
    //     tableColId: 2,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: joinName,
    //     columnName: "Formula_Name",
    //     userId: "",
    //   },
    //   {
    //     tableId: 555,
    //     tableColId: 3,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: "createMultipleDynamicTableData and getTableDataRelIdInfo",
    //     columnName: "Formula_API",
    //     userId: "",
    //   },
    // ];
    // setTableData(jsondata);
    // setTableId(555);
    // setTableRel("");
    // setTableCol(0);

    setV1Suggest(false);
    setFormValues([
      {
        colA1: "",
        colA2: "",
        op1: "",
        colB1: "",
        colB2: "",
        result1: "",
      },
    ]);
  };

  const onCheckFormulaData = () => {
    const url = `${BaseURL}/account/formula-calculation-api/`;
    const data = {
      formula: joinName,
    };

    axios
      .get(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("respose 22", response.data.data);
      })
      .catch((error) => {
        console.log("error 105", { responseData: null, error: error.message });
      });
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          bgcolor: "white",
          height: 597,
          borderLeft: ".5px solid green",
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            height: "35px",
            p: 1,
            bgcolor: "#F1F6F9",
            fontSize: "12px",
          }}
        >
          {joinEdit === true ? (
            <>
              <input
                type="text"
                id="price"
                class="inline w-[100px] rounded-md border-0 py-0.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm xs:leading-2"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
              />
              <IconButton
                onClick={onChangeJoinName}
                color="success"
                size="small"
                sx={{
                  // float: "right",
                  marginLeft: 1,
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
              >
                <CheckOutlinedIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </>
          ) : (
            <>
              {joinName || "Join"}
              <IconButton
                onClick={() => setJoinEdit(true)}
                color="success"
                size="small"
                sx={{
                  // float: "right",
                  marginLeft: 1,
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
              >
                <ModeEditOutlinedIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            </>
          )}

          <Button
            // onClick={() => {
            //   setFormulaShow(false);
            // }}
            color="success"
            size="small"
            sx={{
              float: "right",
              margin: 0,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "12px",
            }}
            // onClick={formulaDataCheck}
            onClick={() => onSubmitFormulaData()}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              setJoinShow(false);
            }}
            color="success"
            size="small"
            sx={{
              float: "right",
              margin: 0,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              clearInput();
            }}
            color="success"
            size="small"
            sx={{
              float: "right",
              margin: 0,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            Refresh
          </Button>
        </Box>
        {/* <CodeMirror
          className="CodeMirror"
          value={addCode.join("")}
          height="300px"
          width="450px"
          fontSize="6px"
          extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
          onChange={(value, viewUpdate) => {
            onChangeCode(value);
          }}
        /> */}
        <Box
          sx={{
            bgcolor: "#F5F5F5",
            display: "inline",
          }}
        >
          {formValues?.map((formValue, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-[360px]"
            >
              {index === 0 ? (
                <>
                  <input
                    type="text"
                    id="price"
                    class="inline w-[100px] rounded-md border-0 py-0.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm xs:leading-2 m-2"
                    name={`a_colA${index + 1}`}
                    value={formValue[`a_colA${index + 1}`]}
                    onChange={(e) =>
                      handleChange(index, `a_colA${index + 1}`, e.target.value)
                    }
                    onClick={() => onSuggestValueShow("l")}
                  />
                  {/* <input
                    type="text"
                    id="price"
                    class="inline w-[55px] rounded-md border-0 py-0.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm xs:leading-2 m-2"
                    name={`a_colA${index + 2}`}
                    value={formValue[`a_colA${index + 2}`]}
                    onChange={(e) =>
                      handleChange(index, `a_colA${index + 2}`, e.target.value)
                    }
                    onClick={() => onSuggestValueShow("l")}
                  /> */}
                </>
              ) : (
                ""
              )}
              <div className="m-1">
                <select
                  id="countries"
                  class="w-[100px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                  name={`a_op${index + 1}`}
                  value={formValue[`a_op${index + 1}`]}
                  onChange={(e) =>
                    handleChange(index, `a_op${index + 1}`, e.target.value)
                  }
                >
                  <option selected className="text-xs">
                    Select
                  </option>
                  {argumentList?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item}
                        onClick={() => onAddArg(item)}
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <>
                <input
                  type="text"
                  id="price"
                  class="inline w-[100px] rounded-md border-0 py-0.5 pl-1 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-2"
                  name={`a_colB${index + 1}`}
                  value={formValue[`a_colB${index + 1}`]}
                  onChange={(e) =>
                    handleChange(index, `a_colB${index + 1}`, e.target.value)
                  }
                  onClick={() => onSuggestValueShow("l")}
                />
                {/* <input
                  type="text"
                  id="price"
                  class="inline w-[55px] rounded-md border-0 py-0.5 pl-1 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-2"
                  name={`a_colB${index + 2}`}
                  value={formValue[`a_colB${index + 2}`]}
                  onChange={(e) =>
                    handleChange(index, `a_colB${index + 2}`, e.target.value)
                  }
                  onClick={() => onSuggestValueShow("l")}
                /> */}
              </>

              <IconButton
                onClick={addFormFields}
                size="md"
                sx={{
                  marginLeft: 0.5,
                  padding: 0,
                  textTransform: "capitalize",
                  fontSize: "12px",
                  "&:hover": {
                    color: "green",
                  },
                }}
              >
                <AddIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </div>
          ))}
        </Box>
        <Box sx={{ p: 1, height: 400 }}>
          {v1Suggest === true ? (
            <AutoSuggestResultJoin
              joinData={joinData}
              setAddCode={setAddCode}
              addCode={addCode}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}

export default memo(JoinCodeEditor);
