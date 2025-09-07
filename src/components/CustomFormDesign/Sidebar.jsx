import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";
import formicon from "../../assets/formicon/form.png";
import buttonicon from "../../assets/formicon/button.png";
import buttoniconwhite from "../../assets/formicon/buttonwhite.png";
import texticon from "../../assets/formicon/text.png";
import inputicon from "../../assets/formicon/input.png";
import textareaicon from "../../assets/formicon/textarea.png";
import boxicon from "../../assets/formicon/diamond.png";
import imageicon from "../../assets/formicon/image.png";
import tableicon from "../../assets/formicon/table.png";
import linecharticon from "../../assets/formicon/linechart.png";
import listicon from "../../assets/formicon/list.png";
import cardicon from "../../assets/formicon/card.png";
import minimizecon from "../../assets/formicon/minimize.png";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";

import React from "react";

import { fields } from "./Fields";
import useTheme from "../../UseContext/useTheme";
// import { dark } from "@mui/material/styles/createPalette";

export function SidebarField(props) {
  // const { darkMode, toggleTheme } = useTheme();
  const { field, overlay } = props;
  const { title, type } = field;

  const [open, setOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const toggleOpen  = () => setOpen((cur) => !cur);
 
  // const handleOpen = (value) => setOpen(open === value ? 0 : value);

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  const button = "";

  return (
    <div className={className}>
      
      {type === "input" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
        <div className="ml-3">
          <img
            style={{
              maxWidth: 30, // Customize the width as desired
              height: "auto", // Customize the height as desired
              opacity: "60%",
            }}
            src={inputicon}
          />
        </div>

        <div className="ml-5 opacity-80 text-black font-mono">
        {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
          {title}{" "}
        </div>
      </div>
      ) : type === "input1" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
        <div className="ml-3">
          <img
            style={{
              maxWidth: 25, // Customize the width as desired
              height: "auto", // Customize the height as desired
              opacity: "60%",
            }}
            src={inputicon}
          />
          <img
            style={{
              maxWidth: 25, // Customize the width as desired
              height: "auto", // Customize the height as desired
              opacity: "60%",
            }}
            className="-mt-[25px] ml-[29px] "    
            src={inputicon}
          />
        </div>

        <div className="ml-2 opacity-80 text-black font-mono">
        {/* <div className="ml-2 opacity-80 dark:text-white font-mono"> */}
          {title}{" "}
        </div>
      </div>
      ) : type === "textarea" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={textareaicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}{" "}
          </div>
        </div>
      ) : type === "button" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2 w-[225px]">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2 w-[225px]"> */}
          <div className="ml-3">
            {/* <img
              style={{
                width: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={button}
            /> */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-black p-2 opacity-70"
                // className="w-12 h-12 dark:text-white p-2 opacity-70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>
            </div>
          </div>

          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
          <div className="ml-5 opacity-80 text-black font-mono">
            {title}{" "}
          </div>
        </div>
      ) : type === "button1" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2 w-[225px]">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2 w-[225px]"> */}
          <div className="ml-3">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                // className="w-6 h-6 dark:text-white p-2 opacity-70"
                className="w-6 h-6 text-black p-2 opacity-70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                // className="w-6 h-6 dark:text-white p-2 opacity-70"
                className="w-6 h-6 text-black p-2 opacity-70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>
            </div>
          </div>

          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
          <div className="ml-5 opacity-80 text-black font-mono">
            {title}{" "}
          </div>
        </div>
      ) : type === "text" ? (
        // <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2">
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={texticon}
            />
          </div>

          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
          <div className="ml-5 opacity-80 text-black font-mono">
            {title}{" "}
          </div>
        </div>
      ): type === "richtext" ? (
        // <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2">
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={texticon}
            />
          </div>

          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
          <div className="ml-5 opacity-80 text-black font-mono">
            {title}{" "}
          </div>
        </div>
      ) : type === "box" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2 ">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2 "> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={boxicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}{" "}
          </div>
        </div>
      ) : type === "contactform" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={formicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            Tabular Form
          </div>
        </div>
      ) : type === "image" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={imageicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}{" "}
          </div>
        </div>
      ) : type === "table" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={tableicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}
          </div>
        </div>
      ) : type === "editable" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={tableicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}
          </div>
        </div>
      ) : type === "linechart" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={linecharticon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}
          </div>
        </div>
      ) : type === "menulist" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={listicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}
          </div>
        </div>
      ) : type === "card" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={cardicon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}
          </div>
        </div>
      ) : type === "masterdlt" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={minimizecon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}
          </div>
        </div>
      ) : type === "text1" ? (
        <div className="flex items-center p-2 m-1 border border-r-2 bg-white border-r-2">
        {/* <div className="flex items-center p-2 m-1 border border-r-2 dark:bg-slate-800 dark:border-r-2"> */}
          <div className="ml-3">
            <img
              style={{
                maxWidth: 70, // Customize the width as desired
                height: "auto", // Customize the height as desired
                opacity: "60%",
              }}
              src={texticon}
            />
          </div>

          <div className="ml-5 opacity-80 text-black font-mono">
          {/* <div className="ml-5 opacity-80 dark:text-white font-mono"> */}
            {title}{" "}
          </div>
        </div>
      ): (
        ""
      )}
    </div>
  );
}

function DraggableSidebarField(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="sidebar-field"
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  const { fieldsRegKey } = props;
  console.log("290 fieldsRegKey", fieldsRegKey)
  return (
    <div
      key={fieldsRegKey}
      className="border p-0 h-[650px] max-w-[280px] mr-1 shadow-md overflow-y-scroll"
    >
     
      {fields.map((f) => {
        if (f.type === "input") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField field={f} />
            </div>
          );
        }  else if (f.type === "input1") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField field={f} />
            </div>
          );
        } else if (f.type === "textarea") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "button") {
          return (
            <div className="flex justify-center items-center m-1">
              <div className="">
                <DraggableSidebarField key={f.type} field={f} />
              </div>
            </div>
          );
        } else if (f.type === "button1") {
          return (
            <div className="flex justify-center items-center m-1">
              <div className="">
                <DraggableSidebarField key={f.type} field={f} />
              </div>
            </div>
          );
        } else if (f.type === "text") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "richtext") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "richtext") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "box") {
          return (
            <div className="flex justify-center items-center m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "contactform") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "image") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "table") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "editable") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "linechart") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } else if (f.type === "menulist") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        } 
        // else if (f.type === "card") {
        //   return (
        //     <div className="flex justify-center items-cente m-1">
        //       <DraggableSidebarField key={f.type} field={f} />
        //     </div>
        //   );
        // } 
        else if (f.type === "masterdlt") {
          return (
            <div className="flex justify-center items-cente m-1">
              <DraggableSidebarField key={f.type} field={f} />
            </div>
          );
        }
      })}
    </div>
  );
}
