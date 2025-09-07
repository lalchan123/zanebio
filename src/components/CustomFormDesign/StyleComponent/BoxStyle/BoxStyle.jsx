import React, { useState, useEffect, useContext } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import ColorPicker from "./ColorPicker";
import IconButton from "@mui/material/IconButton";
import BoxWidthSize from "./BoxWidthSize";
import BoxHeightSize from "./BoxHeightSize";
import { AppContext } from "../../../../AppContext";
import { colors } from "@mui/material";

const BoxStyle = (props) => {
  console.log("11 props", props)
  const { item } = props;
  console.log("13 item", item)
  const {
    BaseURL,
    setBaseURL,
   } = useContext(AppContext);
  const [name, setName] = useState("image");
  const [upload_file_name, SetUpload] = useState("");
  const [file_name, SetUploadfile] = useState("");
  const [unique_id, setUniqueid] = useState(new Date().getUTCMilliseconds());
  const [text, setText] = useState(item?.text || "");
  const [width, setWidth] = useState(item?.width || "300px");
  // const [height, setHeight] = useState(item?.height || "100px");
  const [height, setHeight] = useState(item?.height || "50px");
  // const [color, setColor] = useState(item?.color || "black");
  const [color, setColor] = useState(item?.color || "#37d67a");
  const [image, setImage] = useState(item?.image || "");

  const onColor = (value) => {
    setColor(value);
  };

  const boxStyle = {
    text: text,
    width: width,
    height: height,
    color: color,
    image: image,
  };

  props.onBoxStyle(JSON.stringify(boxStyle));

  const onImageSave = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("file_name", file_name);
    data.append("date", unique_id);
    axios
      .post(`${BaseURL}/course/upload_file_apiview/`, data)
      .then((response) => console.log("49", response.data))
      .catch((err) => console.log(err));
    setImage(data);
    setName("");
    SetUploadfile("");
  };

  return (
    <div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Add Text
        </label>
        <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Width
        </label>
        <BoxWidthSize setWidth={setWidth} width={ width } />
        {/* <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        /> */}
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Height
        </label>
        {/* <input
          type="text"
          name="input"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        /> */}
        <BoxHeightSize setHeight={setHeight} height={ height } />
      </div>
      <div className="mb-2">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 text-black"
          // className="block text-xs mb-0.5 font-mono leading-2 text-gray-900 dark:text-white"
        >
          Color
        </label>
        {/* <ColorPicker onColor={onColor}  /> */}
        <ColorPicker setColor={setColor} color={color} />
      </div>
    </div>
  );
};

export default BoxStyle;
