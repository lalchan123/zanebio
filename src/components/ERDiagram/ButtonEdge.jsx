import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  // EdgeProps,
  getBezierPath,
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  useNodeId,
  useUpdateNodeInternals,
} from "@xyflow/react";

import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddAlarmOutlinedIcon from "@mui/icons-material/AddAlarmOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import FormControl from "@mui/material/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import "./buttonedge.css";
import { IconButton } from "@mui/material";
import JoinTableCodeEditor from "./JoinTableCodeEditor";
import { AppContext } from "../../AppContext";

const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  alert("Many To Many");
};

const argumentList = [
  "==",
];

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  console.log("68 id, sourceX, sourceY, targetX,targetY,", id, sourceX, sourceY, targetX, targetY)

  const {
    tableColRelData,
    setTableColRelData
   } = React.useContext(AppContext);
  
  const nodeId = useNodeId();
  const { setNodes, setEdges } = useReactFlow();
  const store = useStoreApi();


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // setOpen(true);
    setDetailShow(true);
    // setJoinTableShow(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [joinTableShow, setJoinTableShow] = React.useState(false)
  const [detailShow, setDetailShow] = React.useState(false)

 

  const handleDetailShowClose = () => {
    setDetailShow(false);
  };

  const [formValues, setFormValues] = React.useState([
    {
      a_tableA1: "",
      a_colA1: "",
      a_op1: "",
      a_tableB1: "",
      a_colB1: "",
      a_result1: "",
    },
  ]);

   React.useEffect(() => {
    const { edges } = store.getState();
    console.log("114 edges", edges)
    try {
      edges.map((edge) => {
        if (edge.id === id) {
          setFormValues(edge.data.table_col_relation);
        }
      })
     } catch (error) {
       console.log("122 error", error)
    }
   
  
  }, [id])

  const handleChange = (index, field, value) => {
    const newFormValues = [...formValues];
    // const newFormValues = [formValues];
    newFormValues[index][field] = value;
    setFormValues(newFormValues);
    // console.log("newFormValues", newFormValues)
  };
  
  console.log("128 formValues", formValues);

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

        // ["a_colA" + parseInt(formValues.length + 1)]:"",
        // ["a_colA" + parseInt(formValues.length + 2)]:"",
        // ["a_op" + parseInt(formValues.length + 1)]: "",
        // ["a_colB" + parseInt(formValues.length + 1)]: "",
        // ["a_colB" + parseInt(formValues.length + 2)]: "",
        // ["a_result" + parseInt(formValues.length + 1)]: "",

        ["a_tableA1"]:"",
        ["a_colA1"]:"",
        ["a_op1"]: "",
        ["a_tableB1"]: "",
        ["a_colB1"]: "",
        ["a_result1"]: "",
      },
    ]);
  };

  // const combinedObject = formValues.reduce((result, currentItem) => {
  //   return { ...result, ...currentItem };
  // }, {});

  // const onAddArg = (value) => {
  //   setAddCode([...addCode, value]);
  //   setValue("");
  // };

  const handleTableColRelation = () => {
    setTableColRelData([...formValues]);
    const { nodes, edges } = store.getState();
    // console.log("160 nodes", nodes);
    // console.log("161 edges", edges);
    
    setEdges(
      edges.map((edge) => {
        if (edge.id === id) {
          edge.data = {
            ...edge.data,
            table_col_relation: formValues,
          };
        }
        return edge;
      })
    );
    toast.success("Table Col Relation Data Save Successfully Temporaly Store.")
    setDetailShow(false);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            className="edgebutton"
            onClick={(event) => handleClickOpen(event, id)}
          >
            +
          </button>
          {/* {
            joinTableShow === true ? (
              <JoinTableCodeEditor />
            ) : (
              ""
            )
          } */}
          <Dialog
            open={detailShow}
            onClose={handleDetailShowClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xl"
            PaperProps={{ sx: { borderRadius: "50px", marginLeft: "1300px" } }}
          >
              <DialogTitle>Join Table Condition</DialogTitle>
              <DialogContent>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ minWidth: 450 }}>
                    <Box
                      sx={{
                        bgcolor: "#F5F5F5",
                        display: "inline",
                      }}
                    >
                    {formValues?.map((formValue, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center w-[450px]"
                      >
                          <>
                            <input
                              type="text"
                              id="price"
                              className="inline w-[100px] rounded-md border-0 py-0.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm xs:leading-2 m-2"
                              name={`a_tableA1`}
                              value={formValue[`a_tableA1`]}
                              onChange={(e) =>
                                handleChange(index, `a_tableA1`, e.target.value)
                              }
                              // onClick={() => onSuggestValueShow("l")}
                            />
                            <input
                              type="text"
                              id="price"
                              className="inline w-[55px] rounded-md border-0 py-0.5 pl-1  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm xs:leading-2 m-2"
                              name={`a_colA1`}
                              value={formValue[`a_colA1`]}
                              onChange={(e) =>
                                handleChange(index, `a_colA1`, e.target.value)
                              }
                              // onClick={() => onSuggestValueShow("l")}
                            />
                          </>
                       
                          <div className="m-1">
                            <select
                              id="countries"
                              className="w-[100px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                              name={`a_op1`}
                              value={formValue[`a_op1`]}
                              onChange={(e) =>
                              handleChange(index, `a_op1`, e.target.value)
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
                                    // onClick={() => onAddArg(item)}
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
                            className="inline w-[100px] rounded-md border-0 py-0.5 pl-1 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-2"
                            name={`a_tableB1`}
                            value={formValue[`a_tableB1`]}
                            onChange={(e) =>
                            handleChange(index, `a_tableB1`, e.target.value)}
                            // onClick={() => onSuggestValueShow("l")}
                          />
                          <input
                              type="text"
                              id="price"
                              className="inline w-[55px] rounded-md border-0 py-0.5 pl-1 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-2"
                              name={`a_colB1`}
                              value={formValue[`a_colB1`]}
                              onChange={(e) =>
                                handleChange(index, `a_colB1`, e.target.value)
                              }
                              // onClick={() => onSuggestValueShow("l")}
                            />
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
                  </Box>
                </Box>
                   
              </DialogContent>
         
              <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
                <Button
                  onClick={handleDetailShowClose}
                  size="small"
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    marginRight: -4,
                    padding: 0,
                    "&:hover": {
                      color: "green",
                    },
                    height: 0,
                    width: 0,
                  }}
                >
                  ✘
                </Button>
                <Button
                  onClick={handleTableColRelation}
                  autoFocus
                  size="small"
                  sx={{
                    fontSize: "20px",
                    color: "black",
                    margin: 0,
                    padding: 0,
                    "&:hover": {
                     color: "green",
                    },
                    height: 0,
                    width: 0,
                  }}
                >
                  ⮕
                </Button>
              </DialogActions>
          </Dialog>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
