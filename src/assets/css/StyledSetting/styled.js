import styled from "styled-components";
import Button from '@mui/material/Button';
import { Resizable } from "re-resizable";



export const Image = styled.div`
    background-image: url('../../images/hero-background.svg');
    background-size: cover;
    height: 50px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: red;
`;

export const TitleOne = styled.h1`
    font-family: sans-serif;
    text-align: center;
    color: #006A4E;
`;

export const TitleTwo = styled.h2`
    font-family: sans-serif;
    text-align: center;
    color: white;
    text-align: start;
    padding: 20px;
`;

export const Text = styled.p`
    font-family: sans-serif;
    text-align: center;
    color: 000000;
    font-size: 12px;
    text-align: center;
`;

export const ButtonTextBox = styled.button`
    border: 1px dashed 000000 ;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    width: 200px;
    height: auto;
`;

