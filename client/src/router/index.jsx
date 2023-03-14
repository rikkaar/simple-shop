import NotFound from "../components/UI/NotFound/NotFound.jsx";
import React from "react";
import {ADMIN_ROUTE, BASKET_ROUTE, ITEM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts.js";
import Shop from "../pages/Shop.jsx";
import Admin from "../pages/Admin.jsx";
import Auth from "../pages/Auth.jsx";
import Basket from "../pages/Basket.jsx";
import Item from "../pages/Item.jsx";

const HomePage = () => {
    return (
        <div><h1>Hello!</h1></div>
    );
}


export const routes = [
    {path: SHOP_ROUTE, element: Shop},
    {path: ADMIN_ROUTE, element: Admin, private: true},
    {path: LOGIN_ROUTE, element: Auth},
    {path: REGISTRATION_ROUTE, element: Auth},
    {path: BASKET_ROUTE, element: Basket},
    {path: ITEM_ROUTE + "/itemId", element: Item},
    {path: "/home", element: HomePage},
    {path: "/*", element: NotFound}
]