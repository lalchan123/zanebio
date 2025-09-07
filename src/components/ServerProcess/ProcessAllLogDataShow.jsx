import React, {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { AppContext } from "../../AppContext";
import useLazyQueryDynamic from "../../GraphQLApiCall/useLazyQueryDynamic";
import useMutationDeletedSetByRef from "../../GraphQLApiCall/useMutationDeletedSetByRef";

const Text = styled.p`
  font-family: "DM Sans", sans-serif;
`;

function ProcessAllLogDataShow() {
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const { setTableDeletedId, setTableDeletedRefId } =
    useMutationDeletedSetByRef();
  const {
    processShow,
    setProcessShow,
    processNameCheck,
    setProcessNameCheck,
    adminAlert,
    setAdminALert,
    alertStatus,
    setAlertStatus,
    setProcessAllShow,
    Base,
  } = useContext(AppContext);
  const [processLogData, setProcessLogData] = useState([]);
  const [processStatusData, setProcessStatusData] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "time",
      headerName: "Time",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    { field: "processid", headerName: "Id", width: 90 },
    { field: "processname", headerName: "Name", width: 90 },
    { field: "processtype", headerName: "Type", width: 90 },
    { field: "schedule", headerName: "Schedule", width: 40 },
    { field: "startdate", headerName: "Start Date", width: 90 },
    { field: "enddate", headerName: "End Date", width: 90 },
    { field: "relation", headerName: "Relation", width: 90 },
    { field: "server", headerName: "Server", width: 90 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 50,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={
              <DeleteIcon
                sx={{
                  fontSize: "12px",
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const columnsLog = [
    { field: "processid", headerName: "Process Id", width: 90 },
    { field: "logprocess", headerName: "Process", width: 90 },
    { field: "type", headerName: "Type", width: 40 },
    { field: "logdata", headerName: "Data", width: 90 },
    { field: "logfile", headerName: "File", width: 90 },
    { field: "logerror", headerName: "Error", width: 90 },
  ];

  let rows = [];

  let rowsLog = [];

  // const onProcessDataShow = async (value) => {
  //   setIsLoading(true);
  //   const userResp = await onDataFire({
  //     variables: {
  //       tableId: 542,
  //     },
  //     updateQuery() {},
  //   });
  //   console.log({ userResp });
  //   setProcessLogData(get_data?.getDynamicTableField?.jsonData);
  // };

  const onProcessDataShow = () => {
    setIsLoading(true);
    const processLogFetchData = async () => {
      try {
        const response = await fetch(
          `${BaseURL}/account/get-table-dynamic-field/542/`
          // "https://itb-usa.a2hosted.com/account/get-table-dynamic-field/542/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProcessLogData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    processLogFetchData();
  };

  const handleDeleteClick = (id) => () => {
    processLogData?.data?.map((item, i) => {
      if (item.Process_Id === id) {
        setTableDeletedId(542);
        setTableDeletedRefId(parseInt(item.Process_Id));
        setAdminALert(true);
        setAlertStatus("job_data_deleted");
      }
    });
  };

  const onProcessStatusData = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BaseURL}/media/upload_file/investing/json/process_log.json`
          // "http://ec2-18-227-49-240.us-east-2.compute.amazonaws.com:8000/media/upload_file/investing/json/process_log.json"
          // "https://itb-usa.a2hosted.com/media/upload_file/investing/json/process_log.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProcessStatusData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  processLogData?.data
    ?.slice()
    ?.sort((a, b) => a?.Process_Id - b?.Process_Id)
    .map((item, i) => {
      rows.push({
        id: item?.Process_Id,
        status: item.Process_Status,
        time: item.Time,
        processid: item.Process_Id,
        processname: item.Process_Name,
        processtype: item.Process_Type,
        schedule: item.Schedule,
        startdate: item.Start_Date,
        enddate: item.End_Date,
        relation: item.Process_Relation,
        server: item.Server_Name,
      });
    });

  processStatusData?.process_log
    ?.slice()
    ?.sort((a, b) => a?.Process_Id - b?.Process_Id)
    ?.map((item, i) => {
      rowsLog.push({
        id: item?.process_id,
        processid: item.process_id,
        logprocess: item.log_process_name,
        type: item.log_data_type,
        logdata: item.log_date,
        logfile: item.log_output_file,
        logerror: item.log_error || "null",
      });
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <Box sx={{ maxWidth: "100%", bgcolor: "F7F5F2", height: 597 }}>
        <Box
          sx={{
            maxWidth: "100%",
            height: "35px",
            p: 1,
            bgcolor: "#F1F6F9",
            fontSize: "12px",
          }}
        >
          All Process Show
          {/* <IconButton sx={{ margin: 0, padding: 0, float: "right" }}>
              <ContentCopyOutlinedIcon sx={{ fontSize: "14px" }} />
            </IconButton> */}
          <Button
            // variant="outlined"
            onClick={() => {
              setProcessAllShow(false);
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
            // variant="outlined"
            onClick={() => {
              onProcessDataShow();
              onProcessStatusData();
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
        <Box
          sx={{
            bgcolor: "#F5F5F5",
          }}
        >
          <div style={{ marginLeft: 8, fontSize: "10px" }}>Process Log</div>
        </Box>
        <Box sx={{ p: 1 }}>
          <div
            style={{
              height: 280,
              width: 442,
              marginRight: 10,
              marginTop: 0,
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 10,
                }}
              >
                <CircularProgress color="success" />
              </Box>
            ) : (
              <DataGrid
                // hideFooter={true}
                // initialState={{
                //   pagination: {
                //     paginationModel: {
                //       pageSize: 5,
                //     },
                //   },
                // }}
                // pagination {
                //   fontSize: '16px', // Adjust the font size as needed
                // }
                rows={rows}
                columns={columns}
                rowHeight={20}
                headerHeight={20}
                sx={{
                  ".MuiDataGrid-columnSeparator": {
                    fontSize: "12px",
                  },
                  "&.MuiDataGrid-root": {
                    fontSize: "12px",
                  },
                  "& .super-app-theme--header": {
                    backgroundColor: "#A6CF98",
                  },
                }}
              />
            )}
          </div>
        </Box>
        <Box
          sx={{
            bgcolor: "#F5F5F5",
          }}
        >
          <div style={{ marginLeft: 8, fontSize: "10px" }}>
            Process Status Log
          </div>
        </Box>
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              height: 220,
              width: 442,
              marginRight: 12,
              marginTop: 0,
              "& .super-app-theme--header": {
                backgroundColor: "rgba(255, 7, 0, 0.55)",
              },
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 12,
                }}
              >
                <CircularProgress color="success" />
              </Box>
            ) : (
              <DataGrid
                // hideFooter={true}
                rows={rowsLog}
                columns={columnsLog}
                rowHeight={20}
                headerHeight={20}
                sx={{
                  ".MuiDataGrid-columnSeparator": {
                    fontSize: "12px",
                  },
                  "&.MuiDataGrid-root": {
                    fontSize: "12px",
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default memo(ProcessAllLogDataShow);
