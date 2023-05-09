import React, {useContext} from 'react';
import {Context} from "../store/Context.jsx";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const avatar = 'https://css.cua.edu/wp-content/uploads/2018/06/avatar-1577909_960_720.jpg'
    const {user, auth} = useContext(Context)

    return (
        <div className={"flex items-center justify-between w-full h-10 px-4 bg-slate-500 fixed z-50"}>
            <Link to={"/home"} className={"text-2xl"}>
                ЧайКофе
            </Link>
            {user.isAuth
                ? <ul className="flex items-center">
                    <Link to={"#"} className={"nav__item"}>Товары</Link>
                    <Link to={"#"} className={"nav__item"}>Админ панель</Link>
                    <Link to={'#'} className={'nav__item'}>
                        <img src={avatar} alt="" className={'w-6 h-6 rounded-full'}/>
                    </Link>
                </ul>
                : <ul className="list-none">
                    <Link to={"/"} className={"nav__item"}>Товары</Link>
                    <Link to={"/login"} className={"nav__item"}
                          onClick={() => auth.setIsVisible(!auth.isVisible)}>Войти</Link>
                    <Link to={"/registration"} className={"nav__item"}
                          onClick={() => auth.setIsVisible(!auth.isVisible)}>Регистрация</Link>
                </ul>
            }
        </div>);
})


export default NavBar;
