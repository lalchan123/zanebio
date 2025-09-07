import React, { useState, useEffect } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useLazyQueryAllTableCol from "../../../../GraphQLApiCall/useLazyQueryAllTableCol";
import useLazyQueryDynamic from "../../../../GraphQLApiCall/useLazyQueryDynamic";

const Tabularform = (props) => {
  const { all_table_col, onTableDataFire } = useLazyQueryAllTableCol();
  const { get_data, onDataFire } = useLazyQueryDynamic();
  const [checkData, setCheckData] = useState("");
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState("");
  const [col, setCol] = useState([]);
  const [dataSource, setDataSource] = useState("");
  const [tableSize, setTableSize] = useState({
    width: "",
    height: "",
  });
  const [size, setSize] = useState("");
  const [labelOne, setLabelOne] = useState("");
  const [labelTwo, setLabelTwo] = useState("");
  const [tableId, setTableId] = useState("");
  const [columName, setColumnName] = useState("");
  const [colno, setColno] = useState("");

  const [mastarTable, setMasterTable] = useState("");
  const [masterCol, setMasterCol] = useState([]);
  const [masterTableId, setMasterTableId] = useState("");
  const [detailsTable, setDetailsTable] = useState("");
  const [detailsTableId, setDetailsTableId] = useState("");
  const [detailsCol, setDetailsCol] = useState([]);
  const [selectMasterCol, setSelectMasterCol] = useState("");
  const [selectDetailsCol, setSelectDetailsCol] = useState("");
  const [selectMasterColId, setSelectMasterColId] = useState("");
  const [selectDetailsColId, setSelectDetailsColId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataSource("");
  };

  const onTableSize = (value) => {
    setSize({ size: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableSize({ ...tableSize, [name]: value });
  };

  // Function to add an item to the array

  const colNoValue = (value) => {
    setColno(value);
  };

  const addCol = () => {
    if (selectDetailsCol && selectMasterCol) {
      setCol([
        ...col,
        {
          masterTableId: masterTableId,
          mastarTable: mastarTable,
          masterColId: selectMasterColId,
          masterCol: selectMasterCol,
          detailsTableId: detailsTableId,
          detailsTable: detailsTable,
          detailsCol: selectDetailsCol,
          detailsColId: selectDetailsColId,
        },
      ]);
    }
  };

  // Function to delete an item from the array
  const deleteCol = (index) => {
    const newItems = [...col];
    newItems.splice(index, 1);
    setCol(newItems);
  };

  props.onTabularform(
    JSON.stringify({ labelOne: labelOne, labelTwo, labelTwo, colInfo: col })
  );

  const onFlowChartList = async (value) => {
    const userResp = await onTableDataFire({
      updateQuery() {},
    });
    console.log({ userResp });
  };

  let flowChartNameList = eval(all_table_col?.getAllTableColumn?.jsonData);

  const onTableDataMaster = (value) => {
    eval(flowChartNameList)?.map((item, i) => {
      if (item.table === mastarTable) {
        setMasterCol(item.column);
        setMasterTableId(item.id);
      }
    });
    setOpen(true);
  };

  const onTableDataDetails = (value) => {
    eval(flowChartNameList)?.map((item, i) => {
      if (item.table === detailsTable) {
        setDetailsCol(item.column);
        setDetailsTableId(item.id);
      }
    });
    setOpen(true);
  };

  return (
    <div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          source one
        </label>
        <input
          type="text"
          name="width"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={labelOne}
          onChange={(e) => setLabelOne(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          source two
        </label>
        <input
          type="text"
          name="height"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={labelTwo}
          onChange={(e) => setLabelTwo(e.target.value)}
        />
      </div>
      {/* <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Add Column
        </label>
        <div className=" flex">
          <input
            type="text"
            name="price"
            id="price"
            class="inline w-[140px] rounded-md border-0 py-1 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300  sm:text-sm xs:leading-2 ml-0 pl-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            // variant="outlined"
            onClick={() => {
              addCol();
            }}
            size="md"
            sx={{
              marginLeft: 0.5,
              padding: 0,
              textTransform: "capitalize",
              fontSize: "10px",
            }}
          >
            <AddOutlinedIcon
              sx={{
                fontSize: "20px",
                "&:hover": {
                  color: "green",
                },
              }}
            />
          </IconButton>
        </div>
        {col.length >= 1 ? (
          <div className="mt-2 border p-1">
            {col.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border gap-0.5 p-1"
              >
                <label className=" text-xs font-normal leading-2 text-gray-900">
                  {item}
                </label>
                <IconButton
                  // variant="outlined"
                  onClick={() => deleteCol(index)}
                  size="md"
                  sx={{
                    marginLeft: 0.5,
                    padding: 0,
                    textTransform: "capitalize",
                    fontSize: "8px",
                  }}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "16px",
                      "&:hover": {
                        color: "green",
                      },
                    }}
                  />
                </IconButton>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div> */}

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
                  onClick={() => {
                    onFlowChartList();
                    // onDataClickValue();
                  }}
                >
                  <option selected className="text-xs">
                    Choose Data Source
                  </option>
                  {eval(flowChartNameList)?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item.table}
                        onClick={() => onDataClickValue()}
                      >
                        {item.table}
                      </option>
                    );
                  })}
                </select>
              </div */}

      <div className="mb-2">
        <button
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs hover:bg-green-700 "
          // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs hover:bg-green-700 "
          onClick={handleClickOpen}
        >
          Select
        </button>
      </div>

      {/* <div className="mb-2">
        <label
          for="countries"
          class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
        >
          SourceOne
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
          value={sourceOne}
          onChange={(e) => setSouceOne(e.target.value)}
          onClick={onFlowChartList}
        >
          <option selected className="text-xs">
            Select Source
          </option>
          {eval(flowChartNameList)?.map((item, i) => {
            return (
              <option className="text-xs" value={item.table}>
                {item.table}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-2">
        <label
          for="countries"
          class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
        >
          SourceTwo
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
          value={sourceTwo}
          onChange={(e) => setSouceTwo(e.target.value)}
          onClick={onFlowChartList}
        >
          <option selected className="text-xs">
            Select Source
          </option>
          {eval(flowChartNameList)?.map((item, i) => {
            return (
              <option className="text-xs" value={item.table}>
                {item.table}
              </option>
            );
          })}
        </select>
      </div> */}

      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex items-center ">
            <div className="flex items-center">
              <div className="mb-2 mr-2 w-60">
                <label
                  for="countries"
                  class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
                >
                  Master Table
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                  // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                  value={mastarTable}
                  onChange={(e) => setMasterTable(e.target.value)}
                  onClick={() => {
                    onFlowChartList();
                    // onDataClickValue();
                  }}
                >
                  <option selected className="text-xs">
                    Choose Table
                  </option>
                  {eval(flowChartNameList)?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item.table}
                        onClick={() => onTableDataMaster()}
                      >
                        {item.table}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mb-2 mr-2 w-60">
                <label
                  for="countries"
                  class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
                >
                  Details Table
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                  // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                  value={detailsTable}
                  onChange={(e) => setDetailsTable(e.target.value)}
                  onClick={() => {
                    onFlowChartList();
                    // onDataClickValue();
                  }}
                >
                  <option selected className="text-xs">
                    Choose Table
                  </option>
                  {eval(flowChartNameList)?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item.table}
                        onClick={() => onTableDataDetails()}
                      >
                        {item.table}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* This is another seccopn*/}

          <div className="flex items-center ">
            <div className="flex items-center">
              <div className="mb-2 mr-2 w-60">
                <label
                  for="countries"
                  class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
                >
                  Master Column
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                  // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                  value={selectMasterCol}
                  onChange={(e) => setSelectMasterCol(e.target.value)}
                  // onClick={onFlowChartList}
                >
                  <option selected className="text-xs">
                    Choose Master
                  </option>
                  {masterCol?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item.name}
                        onClick={() => setSelectMasterColId(item.no)}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mb-2 mr-2 w-60">
                <label
                  for="countries"
                  class="block text-xs mb-0.5 font-mono text-gray-900 text-black"
                  // class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
                >
                  Details Column
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500 text-xs"
                  // class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
                  value={selectDetailsCol}
                  onChange={(e) => setSelectDetailsCol(e.target.value)}
                  // onClick={onFlowChartList}
                >
                  <option selected className="text-xs">
                    Choose Column
                  </option>
                  {detailsCol?.map((item, i) => {
                    return (
                      <option
                        className="text-xs"
                        value={item.name}
                        onClick={() => setSelectDetailsColId(item.no)}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <IconButton
            // variant="outlined"
            onClick={addCol}
            size="md"
            sx={{
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            <AddOutlinedIcon
              sx={{
                fontSize: "16px",
                "&:hover": {
                  color: "green",
                },
              }}
            />
          </IconButton>
          {col.length >= 1 ? (
            <div className="mt-2 border p-1">
              {col.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border gap-0.5 p-1"
                >
                  <label className=" text-xs font-normal leading-2 text-gray-900">
                    {item.masterCol}
                  </label>
                  <label className=" text-xs font-normal leading-2 text-gray-900">
                    {item.detailsCol}
                  </label>
                  <IconButton
                    // variant="outlined"
                    onClick={() => deleteCol(index)}
                    size="md"
                    sx={{
                      marginLeft: 0.5,
                      padding: 0,
                      textTransform: "capitalize",
                      fontSize: "8px",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: "16px",
                        "&:hover": {
                          color: "green",
                        },
                      }}
                    />
                  </IconButton>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "capitalize", marginRight: -4 }}
            color="success"
          >
            <CloseOutlinedIcon />
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color="success"
            sx={{ textTransform: "capitalize" }}
          >
            <ArrowForwardIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tabularform;
