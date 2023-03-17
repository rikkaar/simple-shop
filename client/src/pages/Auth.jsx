import React, {startTransition, useContext, useRef, useState} from 'react';
import Modal from "../components/UI/Modal/Modal.jsx";
import {Context} from "../store/Context.jsx";
import {observer} from "mobx-react-lite";
import AuthService from '../services/AuthService.js'
import {unmountComponentAtNode} from "react-dom";

const Auth = () => {
    const [emailErrors, setEmailErrors] = useState([])
    const [usernameErrors, setUsernameErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])

    const emailRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const validateEmail = async (email) => {
        try {
            if (email)
                await AuthService.checkEmail(email)
                    .then(() => setEmailErrors([]))
            else setEmailErrors(["введите почту"])
        } catch (e) {
            const res = e.response.data
            console.log(res)
            if (res) {
                if (res.name === "UserAlreadyExist") {
                    setEmailErrors(["Пользователь уже зарегистрирован"])
                } else if (res.name === "ValidationError") {
                    if (res.errors) {
                        const errors = []
                        res.errors.map(error => {
                            errors.push(error.msg)
                        })
                        setEmailErrors(errors)
                    }
                }
            }
        }
    }

    const validateUsername = async (username) => {
        try {
            if (username)
                await AuthService.checkUsername(username)
                    .then(() => setUsernameErrors([]))
            else setUsernameErrors(["Введите имя пользователя"])
        } catch (e) {
            const res = e.response.data
            if (res) {
                if (res.name === "UsernameTaken") {
                    setUsernameErrors(["Это имя занято"])
                }
            }
        }
    }

    const validatePassword = async (password) => {
        try {
            if (password)
                await AuthService.checkPassword(password)
                    .then(() => setPasswordErrors([]))
            else setPasswordErrors(["Введите пароль"])
        } catch (e) {
            const res = e.response.data
            if (res) {
                if (res.name === "UserAlreadyExist") {
                    setPasswordErrors(["Пользователь уже зарегистрирован"])
                } else if (res.name === "ValidationError") {
                    if (res.errors) {
                        const errors = []
                        res.errors.map(error => {
                            errors.push(error.msg)
                        })
                        setPasswordErrors(errors)
                    }
                }
            }
        }
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit} action="" className={'flex-col flex items-center gap-2'}>
                <p className={"text-lg"}>Авторизация</p>
                <input
                    ref={emailRef}
                    onBlur={() => validateEmail(emailRef.current.value)}
                    className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                    type="text" placeholder={"Введите email"}/>
                {emailErrors
                    ? emailErrors.map(error => {
                        console.log("new error")
                        return <p className={"text-xs w-full text-red-400 pl-2"}>
                            {error}
                        </p>
                    })
                    : null
                }
                <input
                    ref={usernameRef}
                    onBlur={() => validateUsername(usernameRef.current.value)}
                    className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                    type="text" placeholder={"Введите имя пользователя"}/>
                {usernameErrors
                    ? usernameErrors.map(error => {
                        return <p className={"text-xs w-full text-red-400 pl-2"}>
                            {error}
                        </p>
                    })
                    : null
                }
                <input
                    ref={passwordRef}
                    onBlur={() => validatePassword(passwordRef.current.value)}
                    className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                    type="text" placeholder={"Введите пароль"}/>
                {passwordErrors
                    ? passwordErrors.map(error => {
                        console.log("new error")
                        return <p className={"text-xs w-full text-red-400 pl-2"}>
                            {error}
                        </p>
                    })
                    : null
                }
                <button
                    className={"focus:drop-shadow-md focus:outline-none self-end w-1/6 h-10 bg-green-400 rounded-lg"}
                    type={"submit"}>Войти
                </button>
            </form>
        </Modal>
    );
};

export default Auth;
