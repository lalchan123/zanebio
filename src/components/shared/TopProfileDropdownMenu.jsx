import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import toast, { Toaster } from 'react-hot-toast';
//Redux

import { userLogout, initializeUser } from "../../features/User/loginLogout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GetAllTableData from "../../GraphQLApiCall/GetAllTableData";
import { AppContext } from "../../AppContext";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef";
import useMutationRel from "../../GraphQLApiCall/useMutationRel";


const developerConfData = {
  data: [
    {
      ConfKey: "BaseURL",
    },
  ],
};

const TopProfileDropdownMenu = ({
  handleClick,
  handleClose,
  open,
  anchorEl,
  setAnchorEl,
}) => {


  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo); // Access the user info from the store

  useEffect(() => {
    dispatch(initializeUser()); // Call initializeUser when the component mounts
  }, [dispatch]);

  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    dispatch(userLogout());
    handleClose();
    navigate("/login");
  };

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
  const [checkConfBaseURL, setCheckConfBaseURL] = useState(false);
  const [confKey, setConfKey] = useState("");
  const [customConfKey, setCustomConfKey] = useState("");
  const [confValue, setConfValue] = useState("");
  const [confTableRefId, setConfTableRefId] = useState("");
  const [checkApi, setCheckApi] = useState(false);
  const [checkApienv, setCheckApienv] = useState(false);
  const [checkApiadd, setCheckApiAdd] = useState(false);
  const [checExistConfCreateApi, setChecExistConfCreateApi] = useState(false);
  const [checkApiEdit, setCheckApiEdit] = useState(false);
  const [checkConfApiEdit, setCheckConfApiEdit] = useState(false);

  const [db, setDb] = useState(1);

  const confApi = GetAllTableData(620, userId);
  const confApiData = eval(
    confApi?.all_table_data?.getDynamicTableField?.jsonData
  );

  const { setTableDeletedId, setTableDeletedRefId, setUserDeletedId } =
    useMutationDeletedSetByRef();
  
  const { setTableData, setTableId, setTableRel, setTableCol, setUserDataId } =
      useMutationRel();

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
    setUserDeletedId(userId);
    setAdminALert(true);
    setAlertStatus("Successfully deleted api data");
    toast.success("Successfully deleted api data") 
  };
  
  const onConfDataUpdateApiData = () => {
    setTableDeletedId(620);
    setTableDeletedRefId(confTableRefId);
    setUserDeletedId(userId);

    setTimeout(() => {
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
          db: parseInt(db),
        },
        {
          tableId: 620,
          tableColId: 2,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: confKey,
          columnName: "ConfKey",
          userId: userId,
          db: parseInt(db),
        },
        {
          tableId: 620,
          tableColId: 3,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: confValue,
          columnName: "ConfValue",
          userId: userId,
          db: parseInt(db),
        },
        {
          tableId: 620,
          tableColId: 4,
          tabRelId: "",
          tableRefId: uniqueId,
          columnData: userName,
          columnName: "user",
          userId: userId,
          db: parseInt(db),
        },
      ];
      console.log("724 apiJson", apiJson)
      setTableData(apiJson);
      setTableId(620);
      setTableRel("");
      setTableCol(0);
      setUserDataId(userId);

      setCheckApiAdd(false);
      setCheckConfApiEdit(false);
      setAdminALert(true);
      setAlertStatus("Successfully api updated");
      toast.success("Successfully api updated");
      setConfKey("");
      setConfValue("");
    }, 500);


    // let uniqueId = getUniqueId();
    // let apiJson = [
    //   {
    //     tableId: 620,
    //     tableColId: 1,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: "UI",
    //     columnName: "ConfType",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 620,
    //     tableColId: 2,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: confKey,
    //     columnName: "ConfKey",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 620,
    //     tableColId: 3,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: confValue,
    //     columnName: "ConfValue",
    //     userId: userId,
    //   },
    //   {
    //     tableId: 620,
    //     tableColId: 4,
    //     tabRelId: "",
    //     tableRefId: uniqueId,
    //     columnData: userName,
    //     columnName: "user",
    //     userId: userId,
    //   },
    // ];
    // console.log("724 apiJson", apiJson)
    // setTableData(apiJson);
    // setTableId(620);
    // setTableRel("");
    // setTableCol(0);
    // setUserDataId(userId);

    // setCheckApiAdd(false);
    // setCheckConfApiEdit(false);
    // setAdminALert(true);
    // setAlertStatus("Successfully api updated");
    // toast.success("Successfully api updated");
    // setConfKey("");
    // setConfValue("");
  };


   const OnConfDataCreateApiData = () => {
    console.log("565 confKey", confKey);
    console.log("598 userId", userId, userName);
   
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
        db: parseInt(db),
      },
      {
        tableId: 620,
        tableColId: 2,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: confKey,
        columnName: "ConfKey",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 620,
        tableColId: 3,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: confValue,
        columnName: "ConfValue",
        userId: userId,
        db: parseInt(db),
      },
      {
        tableId: 620,
        tableColId: 4,
        tabRelId: "",
        tableRefId: uniqueId,
        columnData: userName,
        columnName: "user",
        userId: userId,
        db: parseInt(db),
      },
    ];
    console.log("656 apiJson", apiJson)
    setTableData(apiJson);
    setTableId(620);
    setTableRel("");
    setTableCol(0);
    setUserDataId(userId);

    localStorage.removeItem("BaseUrl")
    localStorage.setItem("BaseUrl", confValue)
    setCheckApiAdd(false);
    setAdminALert(true);
    setAlertStatus("Successfully create api");
    toast.success("Successfully create api") 
    setConfKey("");
    setConfValue("");
   
  };

  return (
    <div>
      <button
        className="flex items-center justify-center bg-slate-100 rounded-full !cursor-pointer border-2 !border-green-200 w-10 h-10 cus"
        onClick={handleClick}
      >
        <svg
          class="absolute w-7 h-7 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {userInfo.status ? (
          <>
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <Link>
              <MenuItem onClick={() => setCheckApienv(true)}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <Link to="/login">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Signin
              </MenuItem>
            </Link>
          </>
        )}
      </Menu>

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
                  Configuration Set Up
                </h1>
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

    </div>
  );
};

export default TopProfileDropdownMenu;
