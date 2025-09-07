import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers, renderers1 } from "./Fields.jsx";
import { useState, useContext, useEffect } from "react";
// import { use } from "i18next";
import { AppContext } from "../../AppContext";
import PreviewFormDesgin from "./PreviewFormDesgin";
import FormDesignDataShow from "./TypeOFDataShow/FormDesignDataShow.jsx";
// import TableShowSqlData from "../StyledSettings/CardTemplate/ChartData.js/TableShowSqlData";
import axios from "axios";
import Papa from "papaparse";
// import TableDataShowSqlData from "../StyledSettings/CardTemplate/ChartData.js/TableDataShowSqlData.js";
import useChartRunData from "../../UseContext/useChartRunData.js";
// import LineChartShow from "../StyledSettings/CardTemplate/ChartData.js/LineChartShow.js";
import CardPreview from "./CardPreview.jsx";

function getRenderer(type) {
  if (type === "spacer") {
    return () => {
      return <div className="spacer">spacer</div>;
    };
  }

  return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props) {
  const { field, overlay, ...rest } = props;
  const { type } = field;
  // console.log("32 field", field)
  // console.log("32 type, value", type, value)
  // const value = JSON.parse(style);
  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
}

function SortableField(props) {
  const { formFieldId, setFormFieldId } = useContext(AppContext);
  const [fieldId, setFildId] = useState("");
  const [select, setSelect] = useState("");
  const { id, index, field, updateData } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteValue = (id) => {
    updateData((draft) => {
      const index = draft.fields.findIndex((item) => item.id === id);
      if (index !== -1) {
        draft.fields.splice(index, 1);
      }
    });
  };

  const onEditIdCheck = (id) => {
    setFormFieldId(id);
    setFormFieldId(id);
    setSelect(id);
  };

  return (
    <div className="group">
      <div
        ref={setNodeRef}
        style={style}
        className={`group-hover:border-dotted group-hover:border-2 group-hover:border-blue-600 m-1 ${
          select === formFieldId
            ? "border-dotted border-2 border-green-500"
            : ""
        }`}
      >
        <div className={`group-hover:bg-sky-600 w-32 flex gap-2 `}>
          <div
            className="m-2 cursor-pointe text-black"
            // className="m-2 cursor-pointe text-white dark:text-black"
            onClick={() => onEditIdCheck(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div
            // className="m-2 cursor-pointer text-white dark:text-black"
            className="m-2 cursor-pointer text-black"
            onClick={() => deleteValue(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <div
            className="m-2  cursor-pointer text-black"
            // className="m-2  cursor-pointer text-white dark:text-black"
            {...attributes}
            {...listeners}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
          </div>
        </div>
        <Field field={field} />
      </div>
    </div>
  );
}

export default function Canvas(props) {
  const {
    fields,
    updateData,
    open,
    formSize,
    dataSource,
    setComponentShow,
    handleClose,
    previewData,
    setCardId,
    cardId,
    setDataSource,
  } = props;
  const { cardEditMode, setCardEditMode, cardPreviewMode, setCardPreviewMode } =
    useContext(AppContext);
  const [fieldId, setFildId] = useState("");
  const [data, setData] = useState([]);
  const [sqlData, setSqlData] = useState([]);

  const { listeners, setNodeRef, transform, transition } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const checkFieldId = (id) => {
    setFildId(id);
  };

  props.onCheckFieldId(fieldId);

  return (
    <div
      ref={setNodeRef}
      // className="flex flex-1 flex-col w-[500px] h-[650px] shadow-md border-2 overflow-y-scroll"
      className="flex flex-1 flex-col max-w-[100%] h-[650px] shadow-md border-2 overflow-y-scroll"
      style={style}
      {...listeners}
    >
      {cardPreviewMode === true ? (
        <>
          <CardPreview
            dataSource={dataSource}
            setComponentShow={setComponentShow}
            handleClose={handleClose}
            updateData={updateData}
            previewData={previewData}
            setCardId={setCardId}
            cardId={cardId}
            setDataSource={setDataSource}
          />
        </>
      ) : open === true ? (
        <PreviewFormDesgin
          handleClose={handleClose}
          fields={fields}
          formSize={formSize}
          previewData={previewData}
          cardId={cardId}
        />
      ) : (
        <div className="">
          {fields?.map((f, i) => (
            <div>
              <SortableField
                key={f.id}
                id={f.id}
                field={f}
                index={i}
                updateData={updateData}
                checkFieldId={checkFieldId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
