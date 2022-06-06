import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap"
import { FetchingState } from "../enums/fetchingState";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { UserRequest } from "../models/user/userRequest";
import { ErrorText, SamllText, SwitchButtom } from "../pages/authencticationPage"
import { Center } from "../shared/center"
import { SubmitButton } from "../shared/submit"
import TextField from "../shared/textfield"
import { Title } from "../shared/title"
import { navTo } from "../store/routing/routingSlice";
import { signIn } from "../store/user/signInThunk";
import { signUp } from "../store/user/signUpThunk";


export interface IAuthForm {
    handleForm: () => void;
}



const SignUpForm: React.FC<IAuthForm> = (props) => {

    const [formData, setFormData] = useState<UserRequest>({ username: '', password: '' });
    const handleLogin = () => (value: string) => setFormData({ ...formData, username: value });
    const handlePassword = () => (value: string) => setFormData({ ...formData, password: value });

    const dispatch = useAppDispatch();
    const {signInState, signUpState} = useAppSelector(state => state.userReducer);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signUp({
            username: formData.username,
            password: formData.password
        }));
    }

    useEffect(() => {
        if (signUpState == FetchingState.SUCCESSFUL) {
            dispatch(signIn({
                username: formData.username,
                password: formData.password
            }));
        }
    }, [signUpState])

    useEffect(() => {
        if(signInState == FetchingState.SUCCESSFUL){
            dispatch(navTo('/workplace'))
        }
    }, [signInState])

    const isLoading = () => {
        return signUpState == FetchingState.LOADING || 
                (signUpState == FetchingState.SUCCESSFUL && signInState == FetchingState.LOADING)
    }

    return (
        <>
            <Title>Зарегистрироваться</Title>
            {signUpState == FetchingState.ERROR
                ? <ErrorText className="mb-1">Такой пользователь уже существуеты</ErrorText>
                : null
            }
            <Form className="mb-3" onSubmit={submit}>
                <TextField 
                type ={'text'}
                 value={formData.username} 
                 changeHandler={handleLogin()} 
                 label={'Логин: '} 
                 mb={10} 
                 isTextarea = {false}/>
                <TextField 
                type = {'password'}
                 value={formData.password} 
                 changeHandler={handlePassword()} 
                 label={'Пароль: '} mb={32}
                 isTextarea = {false}/>
                <Center>
                    <SubmitButton type="submit">
                        {isLoading() 
                            ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            : 'Зарегистрироваться'
                        }
                    </SubmitButton>
                </Center>
            </Form>
            <Center>
                <SwitchButtom onClick={props.handleForm}>Войти</SwitchButtom>
            </Center>
        </>
    )
}

export default SignUpForm;