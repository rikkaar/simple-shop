import React, {useRef, useState} from 'react';
import Modal from "../components/UI/Modal/Modal.jsx";

const Auth = () => {
    const [visible, setVisible] = useState(true)
    const emailRef = useRef()
    const passwordRef = useRef()
    const buttonRef = useRef()


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form onSubmit={handleSubmit} action="" className={'flex-col flex items-center gap-2'}>
                <p className={"text-lg"}>Авторизация</p>
                <input ref={emailRef} className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"} type="text" placeholder={"введите email/login"}/>
                <input ref={passwordRef} className={"focus:drop-shadow-md focus:outline-none border-2 rounded-bl px-3 w-full h-10"} type="text" placeholder={"введите пароль"}/>
                <button className={"focus:drop-shadow-md focus:outline-none self-end w-1/6 h-10 bg-green-400 rounded-lg"} type={"submit"}>Войти</button>
            </form>
        </Modal>

    );
};

export default Auth;
