import React, { useEffect, useState } from "react"
import { Form, Spinner } from "react-bootstrap"
import { FetchingState } from "../enums/fetchingState"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { UserRequest } from "../models/user/userRequest"
import { ErrorText, SamllText, SwitchButtom } from "../pages/authencticationPage"
import { Center } from "../shared/center"
import { SubmitButton } from "../shared/submit"
import TextField from "../shared/textfield"
import { Title } from "../shared/title"
import { routingSlice } from "../store/routing/routingSlice"
import { signIn } from "../store/user/signInThunk"
import { IAuthForm } from "./signUpForm"

const SignInForm: React.FC<IAuthForm> = (props) => {

    const dispatch = useAppDispatch();
    const signInState = useAppSelector(state => state.userReducer.signInState);

    const [formData, setFormData] = useState<UserRequest>({ username: '', password: '' });
    const handleLogin = () => (value: string) => setFormData({ ...formData, username: value });
    const handlePassword = () => (value: string) => setFormData({ ...formData, password: value });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signIn({
            username: formData.username,
            password: formData.password
        }));
    }

    useEffect(() => {
        if (signInState == FetchingState.SUCCESSFUL) {
            dispatch(routingSlice.actions.navTo('/workplace'))
        }
    }, [signInState])

    return (
        <>
            <Title>Войти</Title>
            {signInState == FetchingState.ERROR
                ? <ErrorText className="mb-1">Неправильный логин или пароль. Попробуйте еще раз</ErrorText>
                : null
            }
            <Form className="mb-5" onSubmit={submit}>
                <TextField
                    isTextarea={false}
                    type={'text'}
                    value={formData.username}
                    changeHandler={handleLogin()}
                    label={'Логин: '}
                    mb={10} />
                <TextField
                    isTextarea = {false}
                    type={'password'}
                    value={formData.password}
                    changeHandler={handlePassword()}
                    label={'Пароль: '}
                    mb={32}
                />
                <Center>
                    <SubmitButton type="submit">
                        {signInState == FetchingState.LOADING
                            ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            : 'Войти'
                        }
                    </SubmitButton>
                </Center>
            </Form>
            <SamllText className="mb-5" >Если у вас нет аккаунта, но вы хотите стать автором, то просим вас зарегестрироваться</SamllText>
            <Center>
                <SwitchButtom onClick={props.handleForm}>Зарегистрироваться</SwitchButtom>
            </Center>
        </>
    )
}

export default SignInForm;