import React from "react";
import styled from "styled-components";

interface ITextFieldProps {
    label: String,
    mb: Number,
    changeHandler: (value: string) => void,
    value: string
};

const TextField: React.FC<ITextFieldProps> = (props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeHandler(e.currentTarget.value);
    }

    return (
        <FormGroup style={{marginBottom: `${props?.mb}px` }}>
            <Label>{props.label}</Label>
            <FormControl value={ props.value} onChange= {handleChange}></FormControl>
        </FormGroup>
    )
}

export default TextField;

const FormGroup = styled.div `
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #363636;
    
`

const FormControl = styled.input`
    display: block;
    width: 100%;
    max-width: 320px;
    padding: 9px 7px;
    background: #F7F7F7;
    border: 2px solid #363636;
    border-radius: 11px;
    font-weight: 600;
    font-size: 18px;
    line-height: 16px;
    color: rgba(54, 54, 54, 0.75);
`