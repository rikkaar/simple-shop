import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "../router/index.jsx";
import {Context} from "../store/Context.jsx";



const UnAuthRedirection = () => {
    return (
        <div>
            YOU WERE REDIRECTED! hahah
        </div>
    )
}

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            {routes.map(route => {
                if (route.private && !user.isAuth) {
                    return (<Route path={route.path} element={route.redirect ? route.redirect() : UnAuthRedirection()}/>)
                }
                else return (<Route path={route.path} element={route.element()}/>)
            })}
        </Routes>
    );
};

export default AppRouter;
