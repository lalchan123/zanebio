import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TABLE_DATA_QUERY } from "../../GraphQL/Queries";
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

import inputicon from "../../assets/formicon/input.png";
import { BaseURL } from "../../Constants";


const ApiShow = () => {
  const {
    loading: data_loading,
    error: data_error,
    data: all_table_data,
  } = useQuery(GET_ALL_TABLE_DATA_QUERY, {
    variables: {
      tableId: 1,
    },
  });

  console.log(
    "check get data value 19",
    data_loading,
    data_error,
    all_table_data
  );

  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const toggleOpen  = () => setOpen((cur) => !cur);

  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fileSubmitButton = () => {
    console.log("51");
    const formData = new FormData();
    formData.append('file', file);
    console.log("53 file", file);
    fetch(`${BaseURL}/course/upload_image_react_file_pond_apiview/`, {
    // fetch(`https://tasteofindiamckinney.net/course/upload_image_react_file_pond_apiview/`, {
    // fetch(`http://38.107.232.191:8000/course/upload_image_react_file_pond_apiview/`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log("data.filePath", data.filePath);
        localStorage.setItem("MainImagePath", data.filePath)
      })
      .catch(err => {
        console.error('Upload error:', err);
        // error('Upload failed');
      });

    
  };

  return (
    <div class="w-full">
      <input name='file' type='file' onChange={handleChange} />
      <button
        onClick={fileSubmitButton}
        className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-600"
      >
        Save
      </button>
      <Accordion open={open === true}>
          <AccordionHeader onClick={() => {
            if (open == true) {
              setOpen(false)
            } else if (open == false) {
              setOpen(true)
            }
          }}>Material?</AccordionHeader>
          <AccordionBody>
            <div className="flex items-center p-2 -mt-2 border border-r-2 dark:bg-slate-800 dark:border-r-2">
              <div className="ml-3">
                <img
                  style={{
                    maxWidth: 70, // Customize the width as desired
                    height: "auto", // Customize the height as desired
                    opacity: "60%",
                  }}
                  src={inputicon}
                />
              </div>

              <div className="ml-5 opacity-80 dark:text-white font-mono">
                Hello
              </div>
            </div>
          </AccordionBody>
      </Accordion>
      
      <>
        <Button className="bg-yellow-500" onClick={toggleOpen}>Open Collapse</Button>
        <Collapse open={open}>
          <Card className="my-4 mx-auto w-8/12">
            <CardBody>
              <Typography>
                Use our Tailwind CSS collapse for your website. You can use if for
                accordion, collapsible items and much more.
              </Typography>
            </CardBody>
          </Card>
        </Collapse>
      </>
      
    </div>
  );
};

export default ApiShow;
