import React, { useContext, useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router-dom";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import toast, { Toaster } from 'react-hot-toast';

import Announcements from "./Announcements";
import Canvas, { Field } from "./Canvas";
import Sidebar, { SidebarField } from "./Sidebar";

import { AppContext } from "../../AppContext";

import "./styles.css";
import StyleBar from "./StyleBar";
import PreviewFormDesgin from "./PreviewFormDesgin";
import useMutationRel from "../../GraphQLApiCall/useMutationRel";
import useLazyQueryDynamic from "../../GraphQLApiCall/useLazyQueryDynamic";
import AddCardBar from "./AddCardBar";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef";
import useTheme from "../../UseContext/useTheme";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";

function getData(prop) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
  };
}

export default function CustomForm() {
  const navigate = useNavigate();
  const {
    setItemShow,
    customFormShow,
    setCustomFormShow,
    customFormDesgin,
    setCustomFormDesgin,
    cardEditMode,
    setCardEditMode,
    cardPreviewMode,
    setCardPreviewMode,
    userId,
    setUserId,
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
  
  // const { darkMode, toggleTheme } = useTheme();
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const { setTableData, setTableId, setTableRel, setTableCol, setUserDataId } =
    useMutationRel();

  const { setTableDeletedId, setTableDeletedRefId } =
    useMutationDeletedSetByRef();

  const user = GetAllTableData(1);

  const userDetails = eval(
    user?.all_table_data?.getDynamicTableField?.jsonData
  );

  const adminUserData = JSON.parse(
    localStorage.getItem("userInfo") || `{"demo":"1"}`
  );

  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now()
  );
  const { singIn, setSignIn } = useContext(AppContext);
  const [formSize, setFormSize] = useState("small");
  const [cardId, setCardId] = useState("");
  const [componentShow, setComponentShow] = useState(false);
  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();
  const [activeSidebarField, setActiveSidebarField] = useState();
  const [activeField, setActiveField] = useState();
  const [flowName, setFlowName] = useState("");
  const getUniqueId = () => `${+new Date()}`.slice(-9);
  const [fieldId, setFildId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [cardName, setCardName] = useState("");
  const [previewData, setPreViewData] = useState([]);
  const [processData, setProcessData] = useState([]);
  // const [userId, setUserId] = useState("null");

  useEffect(() => {
    if (adminUserData.status === true) {
      userDetails?.map((item, i) => {
        if (adminUserData.email === item.email) {
          setUserId(item.user_id);
        }
      });
    }
  }, [userId, userDetails, adminUserData, singIn]);

  const [data, updateData] = useImmer({
    fields: customFormDesgin || [],
  });


  const onHandleAddCard = async () => {
    const userResp = await onDataFire({
      variables: {
        tableId: 471,
      },
      updateQuery() {},
    });
    console.log("121 onHandleAddCard", { userResp });
  };

  const onFormSizeValue = (value) => {
    setFormSize(value);
  };

  const onCheckFieldId = (id) => {
    setFildId(id);
  };

  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const handleDragStart = (e) => {
    // console.log("140 e", e)
    const { active } = e;
    const activeData = getData(active);
    console.log("140 activeData", activeData)
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveSidebarField(field);
      currentDragFieldRef.current = {
        id: active.id,
        uniqueID: "",
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
        style: `{"item": "item"}`,
      };
      return;
    }
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData((draft) => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getData(active);
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        updateData((draft) => {
          const spacerIndex = draft.fields.findIndex(
            (f) => f.id === active.id + "-spacer"
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = (e) => {
    const { over } = e;
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);

      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0
        );
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const { fields } = data;

  console.log("114 fields", fields)

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (adminUserData.status === true) {
      userDetails?.map((item, i) => {
        if (adminUserData.email === item.email) {
          setUserId(item.user_id);
        }
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onHandleComponent = () => {
    setComponentShow(!componentShow);
    if (adminUserData.status === true) {
      userDetails?.map((item, i) => {
        if (adminUserData.email === item.email) {
          setUserId(item.user_id);
        }
      });
    }
  };

  let flowChartNameList = get_data?.getDynamicTableField?.jsonData;

  const onSaveCustomDesgin = () => {
    setCustomFormDesgin(fields);
    navigate("/flowchart");
    setCustomFormShow(false);
  };

  const onCardDataSave = () => {
    // if (adminUserData.status === true) {
    //   setFormOpen(true);
    // } else {
    //   setSignIn(true);
    // }
    setFormOpen(true);
  };

  const onSaveCardDataInfomation = () => {
    console.log("120 onSaveCardDataInfomation")
    let uniqueId = getUniqueId();
    let flowName1 = "";
    let processName1 = "";

    var Item = []

    fields?.map((item, i) => {
      // if (item.type === "card") {
      //   flowName1 = item?.style.flowchart_name;
      //   processName1 = "process";
      // }
      // item['uniqueID'] = "hello"
      // item.DyID = uniqueId
      let newObj = { ...item, uniqueID: uniqueId };
      console.log("fields newObj", newObj)
      Item.push(newObj)
    });

    console.log("Item", Item)

    const cardInfoJson = [
      {
        tableId: 534,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: cardEditMode === true ? dataSource?.Card_Name : cardName,
        columnName: "Card_Name",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        // columnData: JSON.stringify(fields),
        columnData: flowName1,
        columnName: "Card_Top",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: processName1,
        columnName: "Card_Bottom",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 4,
        tabRelId: "",
        tableRefId: uniqueId,
        // columnData: JSON.stringify(fields),
        columnData: JSON.stringify(Item),
        columnName: "Card_Item",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 5,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: formSize,
        columnName: "Card_Size",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 6,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: false,
        columnName: "Card_Flag",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 7,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: uniqueId,
        columnName: "Card_Id",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 8,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: "Home",
        columnName: "Card_Menu",
        userId: userId,
        db: parseInt(db),
      },
    ];

    console.log("cardInfoJson", cardInfoJson)

    setTableData(cardInfoJson);
    setTableId(534);
    setTableRel("");
    setTableCol(1);
    setUserDataId(userId);
    setFormOpen(false);
    setCardEditMode(false);
    updateData((draft) => {
      draft.fields = [];
    });
    setCardName("");
    setDataSource([]);
    toast.success("Custom Form Data Save Successfully.")
  };

  const onUpdateCardData = () => {
    let uniqueId = getUniqueId();
    let flowName1 = "";
    let processName1 = "";

    // fields?.map((item, i) => {
    //   if (item.type === "card") {
    //     flowName1 = item?.style.flowchart_name;
    //     processName1 = "process";
    //   }
    // });

    var Item = []
    fields?.map((item, i) => {
      let newObj = { ...item, uniqueID: uniqueId };
      console.log("fields newObj", newObj)
      Item.push(newObj)
    });

    const cardInfoJson = [
      {
        tableId: 534,
        tableColId: 1,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: cardEditMode === true ? dataSource?.Card_Name : cardName,
        columnName: "Card_Name",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        // columnData: JSON.stringify(fields),
        columnData: flowName1,
        columnName: "Card_Flowname",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: processName1,
        columnName: "Card_Processname",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 4,
        tabRelId: "",
        tableRefId: uniqueId,
        // columnData: JSON.stringify(fields),
        columnData: JSON.stringify(Item),
        columnName: "Card_Item",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 5,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: formSize,
        columnName: "Card_Size",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 6,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: false,
        columnName: "Card_Flag",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 7,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: uniqueId,
        columnName: "Card_Id",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 534,
        tableColId: 8,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: "Home",
        columnName: "Card_Menu",
        userId: userId,
        db: parseInt(db),
      },
    ];

    setTableDeletedId(534);
    setTableDeletedRefId(parseInt(cardId));
    setTableData(cardInfoJson);
    setTableId(534);
    setTableRel("");
    setTableCol(1);
    setUserDataId(userId);
    setFormOpen(false);
    setCardEditMode(false);
    updateData((draft) => {
      draft.fields = [];
    });
    setDataSource([]);
    toast.success("Custom Form Data Updated Successfully.")
  };

  console.log("check data vlaue 489", fields);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <Container maxWidth="2xl" className="dark:bg-slate-950"> */}
      <Container maxWidth="2xl">
        <Grid
          container
          spacing={0.5}
          sx={{ marginTop: 2, marginBottom: 10, paddingBottom: 10 }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginBottom: 2 }}
          >
            {/* <div className="max-w-full h-[40px] bg-slate-100 flex justify-between items-center px-4 dark:bg-slate-800"> */}
            <div className="max-w-full h-[40px] bg-slate-100 flex justify-between items-center px-4">
              {/* <div className="text-sm font-medium dark:text-gray-200"> */}
              {/* <div className="text-sm font-medium text-black-200">
                Form Design
              </div> */}
              <a
                // href="https://it-bangla-aifin-5mfm.vercel.app/"
                href="http://38.107.232.191:3005/"
                target="_blank"
                // className="text-sm font-medium dark:text-gray-200 border-2 px-3 py-1 rounded-3xl hover:bg-green-700 hover:text-white cursor-pointer"
                className="text-sm font-medium text-black-200 border-2 px-3 py-1 rounded-3xl hover:bg-green-700 hover:text-white cursor-pointer"
              >
                Live
              </a>
              <div className=" flex items-center gap-10">
                {/* <label class="relative inline-flex items-left cursor-pointer ">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    onClick={toggleTheme}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                    {darkMode === true ? "Dark Mode" : "Light Mode"}
                  </span>
                </label> */}

                <div>
                  <div className="">
                    {/* <div class="inline-flex rounded shadow-sm dark:bg-slate-700 px-2 py-1 items-center mt-1 gap-3"> */}
                    <div class="inline-flex rounded shadow-sm px-2 py-1 items-center mt-1 gap-3">
                      <Tooltip title="25%" placement="bottom">
                        <div
                          onClick={() => onFormSizeValue("extrasmall")}
                          type="button"
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            // className="w-4 h-4 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                          </svg>
                        </div>
                      </Tooltip>
                      <Tooltip title="50%" placement="bottom">
                        <div
                          onClick={() => onFormSizeValue("small")}
                          type="button"
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            // className="w-5 h-5 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                            className="w-5 h-5 text-black hover:text-green-700 hover:text-black-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                          </svg>
                        </div>
                      </Tooltip>

                      <Tooltip title="75%" placement="bottom">
                        <div
                          onClick={() => onFormSizeValue("medium")}
                          type="button"
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            // className="w-6 h-6 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                            className="w-6 h-6 text-black hover:text-green-700 hover:text-green-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                          </svg>
                        </div>
                      </Tooltip>

                      <Tooltip title="100%" placement="bottom">
                        <div
                          onClick={() => onFormSizeValue("big")}
                          type="button"
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            // className="w-7 h-7 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                            className="w-7 h-7 text-black hover:text-green-700 hover:text-green-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                          </svg>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div>
                  <Tooltip title="Refresh" placement="top">
                    <div
                      onClick={() => window.location.reload()}
                      type="button"
                      className="cursor-pointer"
                      >
                         <RefreshIcon />
                      </div>
                  </Tooltip>
                </div>
                <div>
                  {cardEditMode === true ? (
                    <Tooltip title="Update" placement="bottom">
                      <div
                        onClick={onUpdateCardData}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          // className="w-6 h-6 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                          className="w-6 h-6 text-black hover:text-green-700 hover:text-green-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Submit" placement="bottom">
                      <div
                        onClick={() =>
                          customFormShow === true
                            ? onSaveCustomDesgin()
                            : onCardDataSave()
                        }
                        // onClick={() =>
                        //   customFormShow === true
                        //     ? onSaveCardDataInfomation()
                        //     : onSaveCardDataInfomation()
                        // }
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          // className="w-6 h-6 dark:text-white hover:text-green-700 dark:hover:text-green-700"
                          className="w-6 h-6 text-black hover:text-green-700 hover:text-green-700"
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
            </div>
            <Dialog
              open={formOpen}
              onClose={() => setFormOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                {cardEditMode === true ? (
                  "Are your confrim for update card!"
                ) : (
                  <TextField
                    id="outlined-basic"
                    label="Card Name"
                    variant="outlined"
                    color="success"
                    size="small"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                )}

                {/* <div className="mb-2">
                  <label
                    for="countries"
                    class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
                  >
                    Data Source
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                    value={dataSource}
                    onChange={(e) => setDataSource(e.target.value)}
                    onClick={onFlowChartList}
                  >
                    <option selected className="text-xs">
                      Choose Data Source
                    </option>
                    {eval(flowChartNameList)?.map((item, i) => {
                      return (
                        <option className="text-xs" value="h1">
                          {eval(flowChartNameList)?.length === 0
                            ? "Data Loading"
                            : item.Flowchart_Name}
                        </option>
                      );
                    })}
                  </select>
                </div> */}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setFormOpen(false)}
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
                  onClick={onSaveCardDataInfomation}
                  autoFocus
                  sx={{ textTransform: "capitalize", color: "green" }}
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
          </Grid>
          <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5} sx={{}}>
            <div className="border flex items-center w-[100px] min-h-[650px] flex-col overflow-hidden -ml-10">
              <div
                className="mt-3 cursor-pointer"
                onClick={() => {
                  onHandleComponent();
                  setCardPreviewMode(false);
                  onHandleAddCard();
                }}
              >
                <Tooltip title="Add Component" placement="right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    // className="w-7 h-7 hover:text-green-600 dark:text-white dark:hover:text-green-600"
                    className="w-7 h-7 hover:text-green-600 text-black hover:text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Tooltip>
              </div>
              <div
                className="mt-3 cursor-pointer"
                onClick={() => {
                  // onHandleAddCard();
                  setComponentShow(false);
                  setCardPreviewMode(!cardPreviewMode);
                }}
              >
                <Tooltip title="Add Card" placement="right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    // className="w-7 h-7 hover:text-green-600 dark:text-white dark:hover:text-green-600"
                    className="w-7 h-7 hover:text-green-600 text-black hover:text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                </Tooltip>
              </div>
              <div className="mt-3 cursor-pointer">
                <Tooltip title="Code" placement="right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    // className="w-7 h-7 hover:text-green-600 dark:text-white dark:hover:text-green-600"
                    className="w-7 h-7 hover:text-green-600 text-black hover:text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    />
                  </svg>
                </Tooltip>
              </div>
              <div className="mt-3 cursor-pointer">
                <Tooltip title="Search" placement="right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    // className="w-7 h-7 hover:text-green-600 dark:text-white dark:hover:text-green-600"
                    className="w-7 h-7 hover:text-green-600 text-black hover:text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </Tooltip>
              </div>
            </div>
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={9} xl={9} sx={{}}>
            <div className="flex flex-1 overflow-hidden w-[1170px] -ml-10">
              <div className="flex flex-1 ">
                <DndContext
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  autoScroll
                >
                  <Announcements />
                  {componentShow && (
                    <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
                  )}
                  {cardPreviewMode && (
                    <AddCardBar
                      flowChartNameList={flowChartNameList}
                      dataSource={dataSource}
                      setDataSource={setDataSource}
                      setPreViewData={setPreViewData}
                      setFormSize={setFormSize}
                      setCardId={setCardId}
                      cardId={cardId}
                      userId={userId}
                    />
                  )}
                  <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={fields?.map((f) => f.id)}
                  >
                    <Canvas
                      fields={fields}
                      updateData={updateData}
                      onCheckFieldId={onCheckFieldId}
                      handleClose={handleClose}
                      open={open}
                      formSize={formSize}
                      dataSource={dataSource}
                      setDataSource={setDataSource}
                      processData={processData}
                      setProcessData={setProcessData}
                      setComponentShow={setComponentShow}
                      previewData={previewData}
                      setCardId={setCardId}
                      cardId={cardId}
                    />
                    
                  </SortableContext>
                  <DragOverlay dropAnimation={false}>
                    {activeSidebarField ? (
                      <SidebarField overlay field={activeSidebarField} />
                    ) : null}
                    {activeField ? <Field overlay field={activeField} /> : null}
                  </DragOverlay>
                </DndContext>
              </div>
            </div>
          </Grid>
          <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
            <StyleBar
              fields={fields}
              updateData={updateData}
              fieldId={fieldId}
              handleClickOpen={handleClickOpen}
              flowChartNameList={flowChartNameList}
              dataSource={dataSource}
              setDataSource={setDataSource}
              processData={processData}
              setProcessData={setProcessData}
              flowName={flowName}
              setFlowName={setFlowName}
              formSize={formSize}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
