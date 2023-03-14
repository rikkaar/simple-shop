import React, {useContext} from 'react';
import {Context} from "../store/Context.jsx";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <div className={"flex items-center justify-between w-full h-10 px-3 bg-slate-200"}>
            <Link to={"/home"} className={"text-2xl"}>
                ЧайКофе
            </Link>
            {user.isAuth
                ? <ul className="">
                    <Link to={"#"} className={""}>Товары</Link>
                    <Link to={"#"} className={""}>Админ панель</Link>
                    <Link to={'#'} className={''}>

                    </Link>
                </ul>
                : <ul className="list-none">
                    <Link to={"/"} className={""}>Товары</Link>
                    <Link to={"/registration"} className={""}
                          onClick={() => user.setIsAuth(true)}>Авторизация</Link>
                </ul>
            }
        </div>);
})


export default NavBar;
