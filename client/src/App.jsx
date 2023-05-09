import React, {useContext, useEffect} from "react";
import AppRouter from "./components/AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import {Context} from "./store/Context.jsx";
import {observer} from "mobx-react-lite";

function App() {
    const {user} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            user.checkAuth()
        }
    }, [])

    return (
        <BrowserRouter>
            {/*<h1>{user.isAuth ? `Пользователь авторизован ${user.user.email}` : "Пользователь не авторизован"}</h1>*/}
            <NavBar/>
            <div className="pt-10 text">
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
