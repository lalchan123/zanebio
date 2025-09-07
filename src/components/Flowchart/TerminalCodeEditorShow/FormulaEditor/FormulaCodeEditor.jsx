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

import toast, { Toaster } from 'react-hot-toast';

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
import AutoSuggestResult from "./AutoSuggestResult";
import useRestAPIPost from "../../../../GraphQLApiCall/useRestAPIPost";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import useMutationJsonData from "../../../../GraphQLApiCall/useMutationJsonData";
import GetQueryRel from "../../../../UseContext/GetQueryRel";
import FormulaList from "./FormulaList";
import useMutationRel from "../../../../GraphQLApiCall/useMutationRel";
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
];

function FormulaCodeEditor() {
  const {
    formulaShow,
    setFormulaShow,
    formulaCode,
    setFormulaCode,
    formulaAllData,
    setFormulaAllData,
    valueName,
    setValueName,
    formulaName,
    setFormulaName,
    formulaNameDic,
    setFormulaNameDic,
    joinAllData,
    setJoinAllData,
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
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  const [code, setCode] = useState();
  const [addCode, setAddCode] = useState([]);
  const [arg, setArg] = useState("");
  const [formulaProShow, setFormulaProShow] = useState(false);
  const [formulaPro, setFormulaPro] = useState([]);
  const [value, setValue] = useState("");
  const [v1Suggest, setV1Suggest] = useState(false);
  const [v2Suggest, setV2Suggest] = useState(false);
  const [formulaEdit, setFormulaEdit] = useState(false);
  const [formulaSuggest, setFormulaSuggest] = useState(false);
  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  // const keyName = Object.keys(formulaAllData[0])?.map((key) => key);
  // const [key, setKey] = useState(keyName[0]);

  let formulaListD = [];

  console.log("filteredData", filteredData)

  // const onShowFormulaName = () => {
  //   formulaList?.getTableDataRelIdInfo?.map((item, i) => {
  //     let itemValue = JSON.parse(item.columnData);
  //     if (itemValue.flowName === flowName) {
  //       formulaListD.push(itemValue.formulaName);
  //       setFormulaNameDic(formulaListD);
  //     }
  //   });
  // };

  const onAddArg = (value) => {
    setAddCode([...addCode, value]);
    setValue("");
  };

  console.log("formulaAllData[0]", formulaAllData[0])

  const filterDataList = Object.keys(formulaAllData[0] || [{ "": "" }])?.map(
    (key) => key
  );

  console.log(filterDataList)

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setFormulaCode(value);
    const searchWord = value;
    setWordEntered(value);
    const newFilter = filterDataList?.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      // setFilteredData(filterDataList);
      setFilteredData(joinAllData);
    }
  }, []);

  const onSuggestValueShow = (value) => {
    setCode(value);
    setFormulaCode(value);
    const searchWord = value;
    setWordEntered(value);
    const newFilter = filterDataList?.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      // setFilteredData(filterDataList);
      setFilteredData(joinAllData);
    }
    setV1Suggest(true);
  };

  const clearInput = () => {
    setAddCode([]);
    setFilteredData([]);
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
      a_op1: "",
      a_colB1: "",
      a_result1: "",
    },
  ]);

  console.log("formValues", formValues)
  console.log("formulaNameDic", formulaNameDic)

  const onChangeFormulaName = () => {
    formValues["formulaName"] = formulaName;
    setFormulaEdit(false);
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
    formulaName: formulaName,
    flowName: flowName,
    fileName: valueName,
    formulaKey: { ...combinedObject },
  };

  const onSubmitFormulaData = () => {
    setFormulaNameDic({ ...combinedObject })
    let jsondata = [
      {
        tableId: 555,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: JSON.stringify(finalJsonData),
        columnName: "Formula_Data",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 555,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: formulaName,
        columnName: "Formula_Name",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 555,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: "createMultipleDynamicTableData and getTableDataRelIdInfo",
        columnName: "Formula_API",
        userId: userId,
        db: parseInt(db),
      },
    ];

    setTableData(jsondata);
    setTableId(555);
    setTableRel("");
    setTableCol(0);
    setUserDataId(userId);
    setV1Suggest(false);
    setFormValues([
      {
        colA1: "",
        op1: "",
        colB1: "",
        result1: "",
      },
    ]);
    toast.success("Formula Parameter Node Data Save Successfully.")
  };

  const onCheckFormulaData = () => {
    const url = `${BaseURL}/account/formula-calculation-api/`;
    const data = {
      formula: formulaName,
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
          {formulaEdit === true ? (
            <>
              <input
                type="text"
                id="price"
                class="inline w-[100px] rounded-md border-0 py-0.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm xs:leading-2"
                value={formulaName}
                onChange={(e) => setFormulaName(e.target.value)}
              />
              <IconButton
                onClick={onChangeFormulaName}
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
              {formulaName || "Formula"}
              <IconButton
                onClick={() => setFormulaEdit(true)}
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
              setFormulaShow(false);
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
              onShowFormulaName();
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
                // <div className="w=[120px]">
                //   <div class="flex border rounded-md">
                //     <span class="inline-flex items-center px-1 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 hover:bg-green-600">
                //       <div
                //         className="cursor-pointer "
                //         onClick={() => setFormulaSuggest(!formulaSuggest)}
                //       >
                //         <svg
                //           xmlns="http://www.w3.org/2000/svg"
                //           fill="none"
                //           viewBox="0 0 24 24"
                //           strokeWidth={1.5}
                //           stroke="currentColor"
                //           class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-white"
                //         >
                //           <path
                //             strokeLinecap="round"
                //             strokeLinejoin="round"
                //             d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                //           />
                //         </svg>
                //       </div>
                //     </span>
                //     <input
                //       type="text"
                //       id="website-admin"
                //       class=" bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 flex-1 min-w-0  text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline w-[80px] rounded-md border-0 py-0.5 pl-1"
                //       placeholder=""
                //       name={`a_colA${index + 1}`}
                //       value={formValue[`a_colA${index + 1}`]}
                //       onChange={(e) =>
                //         handleChange(
                //           index,
                //           `a_colA${index + 1}`,
                //           e.target.value
                //         )
                //       }
                //       onClick={() => onSuggestValueShow("l")}
                //     />
                //   </div>
                //   {formulaSuggest ? (
                //     <div className="">
                //       <ul class="list-none list-inside  text-sm font-mono gap-0.5">
                //         {formulaListDic?.map((item, i) => {
                //           return (
                //             <li
                //               key={i}
                //               className="border border-md hover:text-green-600 text-sm font-mono cursor-pointer p-0.5"
                //             >
                //               {item}
                //             </li>
                //           );
                //         })}
                //       </ul>
                //     </div>
                //   ) : (
                //     ""
                //   )}
                // </div>
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
        <Box sx={{ p: 1, height: 100 }}>
          {v1Suggest === true ? (
            <AutoSuggestResult
              filteredData={filteredData}
              setAddCode={setAddCode}
              addCode={addCode}
            />
          ) : (
            ""
          )}
          {/* <FormulaList formulaListDic={formulaNameDic || []} /> */}
        </Box>
      </Box>
    </>
  );
}

export default memo(FormulaCodeEditor);
