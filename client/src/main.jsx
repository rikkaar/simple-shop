import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import UserStore from "./store/UserStore";
import ItemStore from "./store/ItemStore";

import {Context} from "./store/Context.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(), item: new ItemStore(),
    }}>
        <App/>
    </Context.Provider>
);

