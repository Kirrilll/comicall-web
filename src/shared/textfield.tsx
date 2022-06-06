import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

interface ITextFieldProps {
    label: String,
    mb: Number,
    changeHandler: (value: string) => void,
    value: string,
    type: React.HTMLInputTypeAttribute,
    isTextarea: boolean
};

const TextField: React.FC<ITextFieldProps> = (props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.changeHandler(e.currentTarget.value);
    }

    return (
        <FormGroup style={{ marginBottom: `${props?.mb}px` }}>
            <Label>{props.label}</Label>
            {
                props.isTextarea
                    ? <FormTextArea rows={8} value={props.value} onChange = {handleChange}></FormTextArea>
                    : <FormControl type={props.type} value={props.value} onChange={handleChange}></FormControl>
            }
        </FormGroup>
    )
}

export default TextField;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Label = styled.label`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #363636;
    
`

const FormTextArea = styled.textarea`
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