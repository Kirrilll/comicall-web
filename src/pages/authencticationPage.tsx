import React, { useState } from "react";
import styled from "styled-components";
import { Background } from "../shared/background";
import { Center } from "../shared/center";
import SignInForm from "../components/signInForm";
import SignUpForm from "../components/signUpForm";
import { FormPanel } from "../shared/formPanel";


const AuthentictionPage: React.FC = () => {


    const [isSignIn, setIsSignIn] = useState(true)

    return (
        <Background>
            <Center>
                <FormPanel>
                    {isSignIn
                        ? <SignInForm handleForm={() => setIsSignIn(false)}/>
                        : <SignUpForm handleForm={() => setIsSignIn(true)}/>
                    }
                </FormPanel>
            </Center>
        </Background>
    )
}

export const SamllText = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: rgba(54, 54, 54, 0.75);
`;

export const ErrorText = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #D22323;
`

export const SwitchButtom = styled.button`
    cursor: pointer;
    display: inline-block;
    background: #F7F7F7;
    border: 1px solid #363636;
    min-width: 175px;
    border-radius: 14px;
    padding: 5px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #363636;
`;

export default AuthentictionPage;