import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import TextStyle from "./StyleComponent/TextComponent/TextStyle";
import InputField from "./StyleComponent/InputField/InputField";
import ButtonLabel from "./StyleComponent/ButtonLabel/ButtonLabel";
import TextAreaLabel from "./StyleComponent/TextAreaLabel.js/TextAreaLabel";
import BoxStyle from "./StyleComponent/BoxStyle/BoxStyle";
import ContactForm from "./StyleComponent/ContactForm/ContactForm";
import ImageStyle from "./StyleComponent/Image/ImageStyle";
import TableStyle from "./StyleComponent/Table/TableStyle";
import LinechartStyle from "./StyleComponent/Linechart/LinechartStyle";
import CardSourceComponent from "./StyleComponent/CardComponent/CardSourceComponent";
import Tabularform from "./StyleComponent/Tabularform/Tabularform";
import InputField1 from "./StyleComponent/InputField/InputField1";
import ButtonLabel1 from "./StyleComponent/ButtonLabel/ButtonLabel1";
import EdiTableStyle from "./StyleComponent/Table/EdiTableStyle";
import RichTextStyle from "./StyleComponent/TextComponent/RichTextStyle";

const StyleBar = (props) => {
  const { formFieldId, setFormFieldId } = useContext(AppContext);
  const {
    fields,
    updateData,
    fieldId,
    handleClickOpen,
    flowChartNameList,
    processData,
    setProcessData,
    flowName,
    setFlowName,
    formSize,
  } = props;
  const [buttonLabel, setButtonLabel] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [textAreaLabel, setTextAreaLabel] = useState("");
  const [textStyle, setTextStyle] = useState("");
  const [richTextStyle, setRichTextStyle] = useState("");
  const [boxStyle, setBoxStyle] = useState("");
  const [contactForm, setContactForm] = useState("");
  const [imageStyle, setImageStyle] = useState("");
  const [tableStyle, setTableStyle] = useState("");
  const [editableStyle, setEdiTableStyle] = useState("");
  const [linechartStyle, setLinechartStyle] = useState("");
  const [tabularform, setTabularform] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onButtonLabel = (value) => {
    setButtonLabel(value);
  };

  const onInputLabel = (value) => {
    setInputLabel(value);
  };

  const onTextAreaLabel = (value) => {
    setTextAreaLabel(value);
  };
  const onTextStyle = (value) => {
    setTextStyle(value);
  };
  const onRichTextStyle = (value) => {
    setRichTextStyle(value);
  };

  const onBoxStyle = (value) => {
    setBoxStyle(value);
  };

  const onContactForm = (value) => {
    setContactForm(value);
  };

  const onImageStyle = (value) => {
    setImageStyle(value);
  };

  const onTableStyle = (value) => {
    setTableStyle(value);
  };
  const onEdiTableStyle = (value) => {
    setEdiTableStyle(value);
  };

  const onLinechart = (value) => {
    setLinechartStyle(value);
  };

  const onTabularform = (value) => {
    setTabularform(value);
  };

  const editValueById = (newValue) => {
    setIsLoading(true);
    updateData((draft) => {
      const index = draft.fields.findIndex((item) => item.id === formFieldId);
      draft.fields.map((item, i) => {
        if (item.id === formFieldId && item.type === "input") {
          draft.fields[index].style = inputLabel;
        }
        if (item.id === formFieldId && item.type === "input1") {
          draft.fields[index].style = inputLabel;
        }
        if (item.id === formFieldId && item.type === "button") {
          draft.fields[index].style = buttonLabel;
        }
        if (item.id === formFieldId && item.type === "button1") {
          draft.fields[index].style = buttonLabel;
        }
        if (item.id === formFieldId && item.type === "textarea") {
          draft.fields[index].style = textAreaLabel;
        }
        if (item.id === formFieldId && item.type === "text") {
          draft.fields[index].style = textStyle;
        }
        if (item.id === formFieldId && item.type === "richtext") {
          draft.fields[index].style = richTextStyle;
        }
        if (item.id === formFieldId && item.type === "box") {
          draft.fields[index].style = boxStyle;
        }
        if (item.id === formFieldId && item.type === "contactform") {
          draft.fields[index].style = contactForm;
        }
        if (item.id === formFieldId && item.type === "image") {
          draft.fields[index].style = imageStyle;
        }
        if (item.id === formFieldId && item.type === "table") {
          draft.fields[index].style = tableStyle;
        }
        if (item.id === formFieldId && item.type === "editable") {
          draft.fields[index].style = editableStyle;
        }
        if (item.id === formFieldId && item.type === "linechart") {
          draft.fields[index].style = linechartStyle;
        }
        if (item.id === formFieldId && item.type === "card") {
          draft.fields[index].style = processData;
        }
        if (item.id === formFieldId && item.type === "masterdlt") {
          draft.fields[index].style = tabularform;
        }
      });
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      handleClickOpen();
      setFormFieldId("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  console.log("check value 133", fields);

  return (
    <div className="border p-2 max-w-[500px] min-h-[650px] shadow-md overflow-y-scroll -ml-10">
      {/* <p className="flex text-center text-sm font-mono text-black">
        Style*
      </p> */}
      <div className="">
        {fields?.map((item, i) => {
          if (item.id === formFieldId && item.type === "text") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <TextStyle onTextStyle={onTextStyle} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "richtext") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <RichTextStyle onRichTextStyle={onRichTextStyle} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "input") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <InputField onInputLabel={onInputLabel} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "input1") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <InputField1 onInputLabel={onInputLabel} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "button") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <ButtonLabel onButtonLabel={onButtonLabel} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "button1") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <ButtonLabel1 onButtonLabel={onButtonLabel}  item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "textarea") {
            return (
              <div>
                <TextAreaLabel onTextAreaLabel={onTextAreaLabel} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "box") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <BoxStyle onBoxStyle={onBoxStyle} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "contactform") {
            return (
              <div>
                <ContactForm onContactForm={onContactForm} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "image") {
            return (
              <div>
                <ImageStyle
                  onImageStyle={onImageStyle}
                  style={item.style}
                  formSize={formSize}
                />
              </div>
            );
          }

          if (item.id === formFieldId && item.type === "table") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <TableStyle onTableStyle={onTableStyle} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "editable") {
            var value = JSON.parse(item.style);
            console.log("256 editable", value)
            return (
              <div>
                <EdiTableStyle onEdiTableStyle={onEdiTableStyle} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "linechart") {
            var value = JSON.parse(item.style);
            return (
              <div>
                <LinechartStyle onLinechart={onLinechart} item={value} />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "card") {
            console.log('')
            return (
              <div>
                <CardSourceComponent
                  flowChartNameList={flowChartNameList}
                  processData={processData}
                  setProcessData={setProcessData}
                  flowName={flowName}
                  setFlowName={setFlowName}
                />
              </div>
            );
          }
          if (item.id === formFieldId && item.type === "masterdlt") {
            return (
              <div>
                <Tabularform onTabularform={onTabularform} />
              </div>
            );
          }
        })}
      </div>

      <div className="flex items-end justify-end">
        <button
          onClick={() => editValueById()}
          class="bg-blue-500 hover:bg-blue-700 text-white font-normal text-sm py-1.5 px-4 rounded mt-10 w-full block"
        >
          {isLoading ? <span>Saving...</span> : <span>Update</span>}
        </button>
      </div>
    </div>
  );
};

export default StyleBar;
