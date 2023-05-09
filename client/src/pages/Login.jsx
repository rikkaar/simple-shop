import React, {useContext, useRef, useState} from 'react';
import Modal from "../components/UI/Modal/Modal.jsx";
import AuthService from '../services/AuthService.js'
import {validateEmail, validatePassword} from '../utils/validations.js'
import {Context} from "../store/Context.jsx";
import {observer} from "mobx-react-lite";


const Login = () => {
    const [emailErrors, setEmailErrors] = useState([])
    const [usernameErrors, setUsernameErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])


    const emailRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const buttonRef = useRef(null)

    const {user, auth} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await validateAll().then(async () => {
            if (!emailErrors.length &&
                !usernameErrors.length &&
                !passwordErrors.length) {
                console.log('FINE')
                await user.login(passwordRef.current.value, emailRef.current.value, usernameRef.current.value)
            } else console.log("WRONG")
        })

    }


    const checkEmail = async (email) => {
        const errors = validateEmail(email)
        if (errors.length)
            return setEmailErrors(errors)
        return setEmailErrors([])
    }

    const checkUsername = async (username) => {
        if (!username) {
            return setUsernameErrors(["Введите имя пользователя"])
        }
        return setUsernameErrors([])
    }

    const checkPassword = (password) => {
        const errors = validatePassword(password)
        if (errors.length)
            return setPasswordErrors(errors)
        return setPasswordErrors([])
    }

    const validateAll = async () => {
        await checkUsername(usernameRef.current.value)
        await checkEmail(emailRef.current.value)
        checkPassword(passwordRef.current.value)
    }

    return (
        <div className={'fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center'}>
            <div className={'flex justify-center items-center min-w-[25%] w-1/3'}>
                <form onSubmit={handleSubmit} action="" className={'flex-col flex items-center gap-2 w-full'}>
                    <p className={"text-lg"}>Авторизация</p>
                    <input
                        ref={emailRef}
                        onBlur={async () => await checkEmail(emailRef.current.value)}
                        className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                        type="text" placeholder={"Введите email"}/>
                    {emailErrors
                        ? emailErrors.map((error, index) => {
                            return <p key={index} className={"text-xs w-full text-red-400 pl-2"}>
                                {error}
                            </p>
                        })
                        : null
                    }
                    <input
                        ref={usernameRef}
                        onBlur={async () => await checkUsername(usernameRef.current.value)}
                        className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                        type="text" placeholder={"Введите имя пользователя"}/>
                    {usernameErrors
                        ? usernameErrors.map((error, index) => {
                            return <p key={index} className={"text-xs w-full text-red-400 pl-2"}>
                                {error}
                            </p>
                        })
                        : null
                    }
                    <input
                        ref={passwordRef}
                        onBlur={() => checkPassword(passwordRef.current.value)}
                        className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                        type="text" placeholder={"Введите пароль"}/>
                    {passwordErrors
                        ? passwordErrors.map((error, index) => {
                            return <p key={index} className={"text-xs w-full text-red-400 pl-2"}>
                                {error}
                            </p>
                        })
                        : null
                    }
                    <button
                        ref={buttonRef}
                        className={"focus:drop-shadow-md focus:outline-none self-end p-2 h-10 bg-green-400 rounded-lg"}
                        type={"submit"}>Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
