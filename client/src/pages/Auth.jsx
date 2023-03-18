import React, {useRef, useState} from 'react';
import Modal from "../components/UI/Modal/Modal.jsx";
import AuthService from '../services/AuthService.js'
import {validateEmail, validatePassword} from '../utils/validations.js'

const Auth = () => {
    const [emailErrors, setEmailErrors] = useState([])
    const [usernameErrors, setUsernameErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    const [passwordVerifyErrors, setPasswordVerifyErrors] = useState([])

    const emailRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordVerifyRef = useRef(null)
    const buttonRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const verifyPasswords = () => {
        if (passwordRef.current.value !== passwordVerifyRef.current.value) {
            return setPasswordVerifyErrors(["Пароли неравны"])
        }
        setPasswordVerifyErrors([])
    }

    const checkEmail = async (email) => {
        const errors = validateEmail(email)
        if (errors.length)
            return setEmailErrors(errors)
        try {
            await AuthService.checkEmail(email)
            return setEmailErrors([])
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                return setEmailErrors(['Сервер временно недоступен'])
            }
            return setEmailErrors(["Пользователь с такой почтой уже существует"])
        }
    }

    const checkUsername = async (username) => {
        if (!username) {
            return setUsernameErrors(["Введите имя пользователя"])
        }
        try {
            await AuthService.checkUsername(username)
            return setUsernameErrors([])
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                return setEmailErrors(['Сервер временно недоступен'])
            }
            return setUsernameErrors(["Пользователь с таким именем уже существует"])
        }
    }

    const checkPassword = (password) => {
        const errors = validatePassword(password)
        if (errors.length)
            return setPasswordErrors(errors)
        return setPasswordErrors([])
    }

    const validateAll = async () => {
        await checkUsername(usernameRef.current.target)
        await checkEmail(emailRef.current.target)
        checkPassword(passwordRef.current.target)
        verifyPasswords()
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit} action="" className={'flex-col flex items-center gap-2'}>
                <p className={"text-lg"}>Авторизация</p>
                <input
                    ref={emailRef}
                    onBlur={() => checkEmail(emailRef.current.value)}
                    className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                    type="text" placeholder={"Введите email"}/>
                {emailErrors
                    ? emailErrors.map(error => {
                        return <p className={"text-xs w-full text-red-400 pl-2"}>
                            {error}
                        </p>
                    })
                    : null
                }
                <input
                    ref={usernameRef}
                    onBlur={() => checkUsername(usernameRef.current.value)}
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
                    onBlur={() => checkPassword(passwordRef.current.value)}
                    className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                    type="text" placeholder={"Введите пароль"}/>
                {passwordErrors
                    ? passwordErrors.map(error => {
                        return <p className={"text-xs w-full text-red-400 pl-2"}>
                            {error}
                        </p>
                    })
                    : null
                }
                <input
                    ref={passwordVerifyRef}
                    onBlur={() => verifyPasswords()}
                    className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"}
                    type="text" placeholder={"Повторите ввод пароля"}/>
                {passwordVerifyErrors
                    ? passwordVerifyErrors.map(error => {
                        return <p className={"text-xs w-full text-red-400 pl-2"}>
                            {error}
                        </p>
                    })
                    : null
                }
                <button
                    disabled={false}
                    ref={buttonRef}
                    onClick={() => validateAll()}
                    className={"focus:drop-shadow-md focus:outline-none self-end p-2 h-10 bg-green-400 rounded-lg"}
                    type={"submit"}>Зарегистрироваться
                </button>
            </form>
        </Modal>
    );
};

export default Auth;
