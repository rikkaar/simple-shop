import React, {useContext} from 'react';
import {Context} from "../main.jsx";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <div className={"flex items-center justify-between w-full h-10 px-3 bg-cyan-200"}>
            <Link to={"/home"} className={"text-2xl"}>
                ЧайКофе
            </Link>
            {user.isAuth
                ? <ul className="list-none flex gap-1">
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

// if (user.role === 'ADMIN') {
//     return (
//         <nav className={"nav"}>
//             <div className={"toHome"}>
//             </div>
//             <li className="nav__items">
//                 <Link to={"#"} className={"nav__item"}>Товары</Link>
//                 <Link to={"#"} className={"nav__item"}>Админ панель</Link>
//                 <img src="#" alt="" className="user-icon"/>
//             </li>
//         </nav>
//     );
// } else if (user.isAuth) {
//     return (
//         <nav className={"nav"}>
//             <div className={"toHome"}>
//
//             </div>
//             <li className="nav__items">
//                 <ol className={"nav__item"}>Товары</ol>
//                 <ol className={"nav__item"}>Корзина</ol>
//                 <img src="#" alt="" className="user-icon"/>
//             </li>
//         </nav>
//     );
// } else return (
//     <nav className={"nav"}>
//         <Link to={"/home"} className={"toHome"}>
//             ЧайКофе
//         </Link>
//         <li className="nav__items">
//             <Link to={"/"} className={"nav__item"}>Товары</Link>
//             <Link to={"/registration"} className={"nav__item"}>Авторизация</Link>
//         </li>
//     </nav>
// );
//
//
// }
// ;

export default NavBar;
