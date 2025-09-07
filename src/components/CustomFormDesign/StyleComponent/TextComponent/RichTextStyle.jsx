import React, { useState, useRef, useMemo  } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ApiRounded } from "@mui/icons-material";
import JoditEditor from 'jodit-react';



const RichTextStyle = (props) => {
  const { item } = props;
  console.log("item", item)
  // console.log("7 props", props)
  const editor = useRef(null);
  const [textStyle, setTextStyle] = useState(item?.textStyle || "");
  const [textValue, setTextValue] = useState(item?.textValue || "");
  const [buttonSize, setButtonSize] = useState(item?.size || "");
  const [textColor, setTextColor] = useState(item?.textColor || "");
  const [content, setContent] = useState(item?.textValue || "");

  const config = useMemo(
		() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: content || 'Start typings...'
		}),
		[content]
	);

  const onTextColor = (value) => {
    setTextColor(value);
  };

  console.log("32 textValue", textValue)

  const textItem = {
    textStyle: textStyle,
    textValue: textValue,
    size: buttonSize,
    textColor: textColor,
  };

  props.onRichTextStyle(JSON.stringify(textItem));

  // const editorConfig = {
  //   height: 500,
  //   menubar: "edit format view",
  //   plugins: [
  //     "advlist autolink lists link image",
  //     "charmap print preview anchor help",
  //     "searchreplace visualblocks code",
  //     "insertdatetime media table paste wordcount",
  //   ],
  //   // plugins: 'powerpaste casechange searchreplace autolink directionality visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap linkchecker emoticons advtable export autosave advcode fullscreen',
  //   toolbar:
  //     "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  //   // toolbar: "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | code",
  //   fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
  //   icon_size: "24px", // Set the menu icon size
  //   content_style: "body { font-size: 16px; }", // Set the default text size
  // };

  return (
    <div>
      {/* <div className="mb-2">
        <div className="mb-2">
          <label
            for="countries"
            class="block text-xs mb-0.5 font-mono text-gray-900 dark:text-white"
          >
            Text Style
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            value={textStyle}
            onChange={(e) => setTextStyle(e.target.value)}
          >
            <option selected className="text-xs">
              Choose text style
            </option>
            <option className="text-xs" value="h1">
              H1
            </option>
            <option className="text-xs" value="h2">
              H2
            </option>
            <option className="text-xs" value="h3">
              H3
            </option>
            <option className="text-xs" value="h4">
              H4
            </option>
            <option className="text-xs" value="h5">
              H5
            </option>
            <option className="text-xs" value="h6">
              H6
            </option>
          </select>
        </div>
        <textarea
          rows="3"
          type="text"
          name="textarea"
          id="textarea"
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type..."
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </div> */}
      {/* <div>
        <label
          htmlFor="input"
          className="block text-xs mb-0.5 font-mono leading-2 text-gray-900"
        >
          Color
        </label>
        <div class="inline-flex rounded-md shadow-sm">
          <a
            href="#"
            aria-current="page"
            class="px-3 py-2 text-sm font-normal text-white bg-red-600 border border-gray-200 rounded-s-lg hover:bg-red-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            value="sm"
            onClick={() => onTextColor("red")}
            type="button"
          >
            Red
          </a>
          <a
            href="#"
            class="px-3 py-2 text-sm font-normal text-white bg-green-600 border-t border-b border-gray-200 hover:bg-green-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            type="button"
            value="md"
            onClick={() => onTextColor("green")}
          >
            Green
          </a>
          <a
            href="#"
            class="px-3 py-2 text-sm font-normal text-white bg-blue-600 border border-gray-200 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-1 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white no-underline"
            name="buttonSize"
            value="big"
            onClick={() => onTextColor("blue")}
            type="button"
          >
            Blue
          </a>
        </div>
      </div> */}
      <div>
        {/* <Editor
          initialValue={content} // or value={content}
          // apiKey="yi24dtz7dwp5hvxuqh39dkgw8ihdopvwpolo2ai55yw80u8n"
          apiKey="2jomos8gjphegspee1z129ym77399y3m09yu6l4wc0pyxbg6"
          // apiKey={import.meta.env.apiKey}
          init={{
            branding: false,
            selector: '#editor',
            height: 450,
            menubar: true,
            fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
            icon_size: "16px", // Set the menu icon size
            content_style: "body { font-size: 16px; }", // Set the default text size
            plugins:
              "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
            // plugins: '  searchreplace autolink directionality visualblocks visualchars image link media codesample table charmap pagebreak nonbreaking anchor  insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap linkchecker emoticons advtable export autosave advcode fullscreen',
            toolbar:
              "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat |undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | addshape| code",
            // toolbar: "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | code",
            image_advtab: true,
            advcode_inline: true,
            // setup: (editor) => {
            //   editor.ui.registry.addButton("addshape", {
            //     text: "Add Shape",
            //     onAction: () => {
            //       editor.insertContent(
            //         '<div class="custom-shape" style="width: 100px; height: 100px; background-color: #ffcc00; clip-path: polygon(50% 0%, 100% 100%, 0% 100%);"></div>'
            //       );
            //     },
            //   });
            // },
          }}
          onEditorChange={(newContent) => {
            setTextValue(newContent);
          }}
        /> */}

        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {
            setTextValue(newContent);
          }}
        />

      </div>
    </div>
  );
};

export default RichTextStyle;
