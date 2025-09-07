import React, { createContext, useEffect, useState } from "react";
import GetAllTableData from "./GraphQLApiCall/GetAllTableData";

const AppContext = createContext();

// const storedBaseUrl = localStorage.getItem("baseUrl");
// const storedBaseUrl = "http://38.107.232.191/api";

// const baseUrl = JSON.parse(storedBaseUrl);
// const baseUrl = "http://38.107.232.191/api";

const AppProvider = ({ children }) => {
  
  
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  // const [userName, setUserName] = useState(localStorage.getItem("userId") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [bheight, setBheight] = useState();
  const [bwidth, setBwidth] = useState();
  const [bcolor, setBcolor] = useState();
  const [bid, setBid] = useState();
  const [bqwidth, setBqwidth] = useState();
  const [bqheight, setBqheight] = useState();
  const [bqcolor, setBqcolor] = useState();
  const [bqid, setBqid] = useState();
  const [tagTableDataId, setTagTableDataId] = useState();
  const [pageid, setPageid] = useState("17097");
  const [uniquevalu, setUniquevalu] = useState();
  const [alert, setAlert] = useState(false);
  const [courseid, setCourseid] = useState();
  const [coursetitle, setCoursetitle] = useState();
  const [courseDuration, setCourseDuration] = useState();
  const [courseprice, setCourseprice] = useState();
  const [coursewebid, setCourswebeid] = useState();
  const [relwebid, setRelwebid] = useState();
  const [module, setModule] = useState();
  const [chapterList, setChapterList] = useState();
  const [chapterTitle, setChapterTitle] = useState();
  const [jsonData, setJsonData] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [colorMode, setColorMode] = useState(
    localStorage.getItem("darkMode") || "white"
  );
  const [rightBox, setRightBox] = useState([]);
  const [colidvalue, setColidvalue] = useState(1);
  const [size, setSize] = useState();
  const [fontsize, setfontsize] = useState();
  const [color, setColor] = useState();
  const [padding, setPadding] = useState();
  const [margin, setMargin] = useState();
  const [align, setAlign] = useState();
  const [label, setLabel] = useState();
  const [bodyContent, setBodyContent] = useState([]);
  const [searchData, setSearchData] = useState(false);
  const [courseNev, setCourseNav] = useState(true);
  const [nodeId, setNodeId] = useState();
  const [chartDataShow, setChartDataShow] = useState(false);
  const [logicEditor, setLogicEditor] = useState(false);
  const [filterEditor, setFilterEditor] = useState(false);
  const [sourceData, setSourceData] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [logicCode, setLogicCode] = useState("");
  const [cardTemplated, setCardTemplated] = useState("");
  const [filterCondition, setFilterCondition] = useState();
  const [filterArg, setFilterArg] = useState();
  const [itemShow, setItemShow] = useState(false);
  const [sqlShow, setSqlShow] = useState(false);
  const [itemId, setItemId] = useState("");
  const [cardItems, setCardItems] = useState([]);
  const [cardStyle, setCardStyle] = useState([]);
  const [sqlData, setSqlData] = useState("");
  const [processShow, setProcessShow] = useState(false);
  const [processAllShow, setProcessAllShow] = useState(false);
  const [pyShow, setPyShow] = useState(false);
  const [pythonCode, setPythonCode] = useState("");
  const [menuShow, setMenuShow] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [processNameCheck, setProcessNameCheck] = useState("");
  const [formFieldId, setFormFieldId] = useState("");
  const [adminAlert, setAdminALert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertStatusFixed, setAlertStatusFixed] = useState("");
  const [formulaShow, setFormulaShow] = useState(false);
  const [formulaCode, setFormulaCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [formulaAllData, setFormulaAllData] = useState([]);
  const [joinAllData, setJoinAllData] = useState([]);
  const [fileNameJoin, setFileNameJoin] = useState([]);
  const [joinShow, setJoinShow] = useState(false);
  const [customFormShow, setCustomFormShow] = useState(false);
  const [customFormDesgin, setCustomFormDesgin] = useState(false);
  const [formulaTestShow, setFormulaTestShow] = useState(false);
  const [cardEditMode, setCardEditMode] = useState(false);
  const [cardPreviewMode, setCardPreviewMode] = useState(false);
  const [valueName, setValueName] = useState("");
  const [singIn, setSignIn] = useState(false);
  const [formulaName, setFormulaName] = useState([]);
  const [joinName, setJoinName] = useState([]);
  const [formulaNameDic, setFormulaNameDic] = useState([]);
  const [joinNameDic, setJoinNameDic] = useState([]);
  const [processSaveAlert, setProcessSaveAlert] = useState(false);
  const [pipeLineShow, setPipeLineShow] = useState(false);
  const [pipeLineCode, setPipeLineCode] = useState("");
  const [pipeLineCodeParams, setPipeLineCodeParams] = useState("");
  const [processFlow, setProcessFlow] = useState("");
  const [apiParameterDataList, setApiParameterDataList] = useState({});
  const [openSetting, setOpenSetting] = useState(false);
  // const [BaseURL, setBaseURL] = useState(baseUrl?.value);
  // const [BaseURL, setBaseURL] = useState(baseUrl);
  const [BaseURL, setBaseURL] = useState(localStorage.getItem("BaseUrl"));
  const [apiRouterG, setApiRouterG] = useState("");
  const [pipeLineNodeValue, setPipeLineNodeValue] = useState([]);
  const [detialsValueShow1, setDetialsValueShow1] = useState([]);
  const [ProcessFlowDataShowBool, setProcessFlowDataShowBool] = useState(false);
  const [tableColRelData, setTableColRelData] = useState([]);
  

  return (
    <AppContext.Provider
      value={{
        ProcessFlowDataShowBool,
        setProcessFlowDataShowBool,
        fileNameJoin,
        setFileNameJoin,
        joinName,
        setJoinName,
        joinAllData,
        setJoinAllData,
        joinNameDic,
        setJoinNameDic,
        token,
        setToken,
        bheight,
        setBheight,
        bwidth,
        setBwidth,
        tagTableDataId,
        setTagTableDataId,
        pageid,
        setPageid,
        bcolor,
        setBcolor,
        bid,
        setBid,
        uniquevalu,
        setUniquevalu,
        bqwidth,
        setBqwidth,
        bqheight,
        setBqheight,
        bqcolor,
        setBqcolor,
        bqid,
        setBqid,
        alert,
        setAlert,
        courseid,
        setCourseid,
        coursewebid,
        setCourswebeid,
        relwebid,
        setRelwebid,
        module,
        setModule,
        jsonData,
        setJsonData,
        userId,
        setUserId,
        userName,
        setUserName,
        coursetitle,
        setCoursetitle,
        chapterList,
        setChapterList,
        userEmail,
        setUserEmail,
        courseprice,
        setCourseprice,
        colorMode,
        setColorMode,
        rightBox,
        setRightBox,
        colidvalue,
        setColidvalue,
        size,
        setSize,
        fontsize,
        setfontsize,
        color,
        setColor,
        padding,
        setPadding,
        margin,
        setMargin,
        align,
        setAlign,
        label,
        setLabel,
        bodyContent,
        setBodyContent,
        searchData,
        setSearchData,
        courseNev,
        setCourseNav,
        nodeId,
        setNodeId,
        courseDuration,
        setCourseDuration,
        chapterTitle,
        setChapterTitle,
        chartDataShow,
        setChartDataShow,
        filterEditor,
        setFilterEditor,
        sourceData,
        setSourceData,
        logicEditor,
        setLogicEditor,
        filterCode,
        setFilterCode,
        logicCode,
        setLogicCode,
        cardTemplated,
        setCardTemplated,
        filterCondition,
        setFilterCondition,
        filterArg,
        setFilterArg,
        itemShow,
        setItemShow,
        cardItems,
        setCardItems,
        cardStyle,
        setCardStyle,
        itemId,
        setItemId,
        sqlShow,
        setSqlShow,
        sqlData,
        setSqlData,
        processShow,
        setProcessShow,
        pyShow,
        setPyShow,
        pythonCode,
        setPythonCode,
        menuShow,
        setMenuShow,
        menuItems,
        setMenuItems,
        processNameCheck,
        setProcessNameCheck,
        formFieldId,
        setFormFieldId,
        adminAlert,
        setAdminALert,
        alertStatus,
        setAlertStatus,
        alertStatusFixed,
        setAlertStatusFixed,
        formulaShow,
        setFormulaShow,
        formulaCode,
        setFormulaCode,
        joinCode,
        setJoinCode,
        formulaAllData,
        setFormulaAllData,
        processAllShow,
        setProcessAllShow,
        customFormShow,
        setCustomFormShow,
        customFormDesgin,
        setCustomFormDesgin,
        formulaTestShow,
        setFormulaTestShow,
        cardEditMode,
        setCardEditMode,
        cardPreviewMode,
        setCardPreviewMode,
        valueName,
        setValueName,
        singIn,
        setSignIn,
        formulaName,
        setFormulaName,
        formulaNameDic,
        setFormulaNameDic,
        joinNameDic,
        setJoinNameDic,
        processSaveAlert,
        setProcessSaveAlert,
        pipeLineShow,
        setPipeLineShow,
        pipeLineCode,
        setPipeLineCode,
        pipeLineCodeParams,
        setPipeLineCodeParams,
        processFlow,
        setProcessFlow,
        apiParameterDataList,
        setApiParameterDataList,
        openSetting,
        setOpenSetting,
        BaseURL,
        setBaseURL,
        apiRouterG,
        setApiRouterG,
        pipeLineNodeValue,
        setPipeLineNodeValue,
        detialsValueShow1,
        setDetialsValueShow1,
        joinShow,
        setJoinShow,
        tableColRelData,
        setTableColRelData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
