import React, { useState, useEffect, useContext } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { AppContext } from "../../../../AppContext";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 100,
    label: "100",
  },
];

const ImageStyle = (props) => {
  const { style, formSize } = props;

  const allStyle = JSON.parse(style);
  console.log("40 allStyle", allStyle)
  console.log("41 formSize", formSize)
  const {
    BaseURL,
    setBaseURL,
   } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("image");
  const [upload_file_name, SetUpload] = useState("");
  const [file_name, SetUploadfile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [unique_id, setUniqueid] = useState(new Date().getUTCMilliseconds());
  const [image, setImage] = useState("");
  const [imageSize, setImageSize] = useState(allStyle?.width || "50%");

  console.log("55 file_name", file_name)

  function valuetext(value) {
    setImageSize(value + "%");
  }

  const [size, setSize] = useState("");

  const onButtonSize = (value) => {
    setSize({ size: value });
    localStorage.setItem("image", image.url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImageSize({ ...imageSize, [name]: value });
    setImage({ url: localStorage?.getItem("image") });
  };

  const onImageSave = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("name", file_name?.name?.split(".")[0]);
    data.append("file_name", file_name);
    data.append("date", unique_id);
    axios
      .post(`${BaseURL}/course/upload_file_apiview/`, data)
      .then((response) => setImage({ url: response?.data?.file_name }))
      .catch((err) => console.log(err));

    setName("");
    SetUploadfile("");
  };

  props.onImageStyle(JSON.stringify({ width: imageSize, ...size, ...image, image: image }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div>
      <div className="mb-3">
        {/* <input
          type="text"
          name="width"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={imageSize.width}
          onChange={handleChange}
        /> */}
        <label
          htmlFor="input"
          className="block text-[12px] leading-mb-0.5 font-normal text-red-500 mt-1 ml-1"
        >
          {formSize === "small"
            ? parseInt(imageSize.width) >= 401
              ? "Image Size Invalid !"
              : ""
            : formSize === "medium"
            ? parseInt(imageSize.width) >= 701
              ? "Image Size Invalid !"
              : ""
            : formSize === "big"
            ? parseInt(imageSize.width) >= 1201
              ? "Image Size Invalid !"
              : ""
            : ""}
        </label>
        {/* <label
          htmlFor="input"
          className="block text-[12px] leading-mb-0.5 font-normal text-red-500 mt-1 ml-1"
        >
          {formSize === "big"
            ? imageSize.width >= "1201px"
              ? "Image Size Invalid !"
              : ""
            : ""}
        </label> */}
      </div>
      {/* <div className="mb-3">
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Height
        </label>
        <input
          type="text"
          name="height"
          id="input"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={imageSize.height}
          onChange={handleChange}
        />
      </div> */}

      <div className="mb-8">
        <label
          htmlFor="input"
          className="block text-[12px] mb-0.5 font-mono leading-2 text-gray-900"
        >
          Add Image
        </label>

        <div className="flex items-center">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            size="small"
          >
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                SetUploadfile(file);
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
            <PhotoCamera sx={{ fontSize: "18px", color: "green" }} />
          </IconButton>
          <button
            aria-label="upload picture"
            class="bg-gray-400 hover:bg-gray-500 text-black border-1 w-[90px] py-1.5 px-4 rounded inline-flex items-center text-xs"
            onClick={onImageSave}
          >
            {isLoading ? <span>Saving...</span> : <span>Upload</span>}
          </button>
          
          {
            allStyle?.url ?
            <img
              src={`${BaseURL}` + allStyle?.url}
              // srcSet="image-url-300.jpg 300w, image-url-768.jpg 768w, image-url-1280.jpg 1280w"
              style={{
                width: "50px", // Set your desired image dimensions
                height: "auto",
                marginLeft: "15px"
              }}
            />
            :
            previewUrl ?
            <img
              src={previewUrl}
              // srcSet="image-url-300.jpg 300w, image-url-768.jpg 768w, image-url-1280.jpg 1280w"
              style={{
                width: "50px", // Set your desired image dimensions
                height: "auto",
                marginLeft: "15px"
              }}
            />
            :
            ""
          }

          {/* {
            previewUrl ?
            <img
              src={previewUrl}
              // srcSet="image-url-300.jpg 300w, image-url-768.jpg 768w, image-url-1280.jpg 1280w"
              style={{
                width: "50px", // Set your desired image dimensions
                height: "auto",
                marginLeft: "15px"
              }}
            />
            :
            ""
          } */}
          
          
        </div>

        {/* <button onClick={onImageSave}>click</button> */}
      </div>

      <label
        htmlFor="input"
        className="block text-xs  leading-2 text-gray-900 mb-0.5 font-mono"
      >
        Width
      </label>
      <Box sx={{ width: "100%", fontSize: "10px" }}>
        <Slider
          size="small"
          aria-label="Always visible"
          // defaultValue={80}
          defaultValue={parseInt(imageSize.split("%")[0])}
          getAriaValueText={valuetext}
          step={5}
          marks={marks}
          valueLabelDisplay="on"
        />
      </Box>
    </div>
  );
};

export default ImageStyle;
