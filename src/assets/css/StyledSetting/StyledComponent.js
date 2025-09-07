import styled from "styled-components";
import { Resizable } from "re-resizable";

export const Rightside = styled.div`
  display: ${(props) =>
    props.rs1
      ? " flex"
      : "flex" && props.rs2
      ? "inline"
      : "inline" && props.rs3
      ? "inline-block"
      : "inline-block"};
  flex-flow: ${(props) =>
    props.rsf1
      ? " row wrap"
      : "flex" && props.rsf2
      ? "inline"
      : "inline" && props.rsf3
      ? "inline-block"
      : "inline-block"};
  &:hover {
    border: ${(props) =>
      props.bhcolor1
        ? " 1px solid rgb(0, 0, 139)"
        : "dodgerblue" && props.bhcolor2
        ? "white"
        : "white" && props.bhcolor3
        ? "blue"
        : "green"};
  }
`;

export const Boxhover = styled.div`
  color: ${(props) =>
    props.tcolor1
      ? "red"
      : "red" && props.tcolor2
      ? "white"
      : "white" && props.tcolor3
      ? "green"
      : "green"};
  text-align: center;
  border: ${(props) =>
    props.bbcolor1
      ? " 1px solid red"
      : "1px solid red" && props.bbcolor2
      ? "2px solid green"
      : "2px solid green" && props.bbcolor3
      ? "3px solid blue"
      : "3px solid blue"};
  font-size: ${(props) =>
    props.fsize1
      ? "20px"
      : "20px" && props.fsize2
      ? "30px"
      : "30px" && props.fsize3
      ? "40px"
      : "40px"};
  font-weight: ${(props) =>
    props.fw1
      ? "20px"
      : "20px" && props.fw2
      ? "30px"
      : "30px" && props.fw3
      ? "40px"
      : "40px"};
`;

export const ResizeBox = styled(Resizable)`
  color: ${(props) =>
    props.recolor1
      ? "dodgerblue"
      : "dodgerblue" && props.recolor2
      ? "white"
      : "white" && props.recolor3
      ? "blue"
      : "green"};
  text-align: center;
  border: ${(props) =>
    props.rbcolor1
      ? " 1px solid red"
      : "dodgerblue" && props.rbcolor2
      ? "white"
      : "white" && props.rbcolor3
      ? "blue"
      : "green"};
  font-size: ${(props) =>
    props.fontsize1
      ? " 20px"
      : "20px" && props.fontsize2
      ? "30px"
      : "30px" && props.fontsize3
      ? "40px"
      : "40px"};
  font-weight: ${(props) =>
    props.fontsize1
      ? " 20px"
      : "20px" && props.fontsize2
      ? "30px"
      : "30px" && props.fontsize3
      ? "40px"
      : "40px"};
`;

export const Buttonsection = styled.div`
  display: inline;
  float: left;
  margin-left: 0px;
  padding: 0px;
`;

export const AButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #006a4e;
  color: white;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #006a4e;
  color: white;
  cursor: pointer;
`;

export const Buttombox = styled.div`
  display: ${(props) =>
    props.bd1
      ? "inline"
      : "inline" && props.bd2
      ? "inline"
      : "inline" && props.bd3
      ? "inline"
      : "inline"};
  flex-direction: column;
`;

export const Boxtwohover = styled.div`
  &:hover {
    border: ${(props) =>
      props.bcolor1
        ? " 1px solid rgb(0, 0, 139)"
        : "dodgerblue" && props.bcolor2
        ? "white"
        : "white" && props.bcolor3
        ? "blue"
        : "green"};
  }
`;
