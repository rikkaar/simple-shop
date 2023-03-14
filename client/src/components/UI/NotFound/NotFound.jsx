import React from 'react';
import classes from "./NotFound.module.css";
import {useNavigate} from 'react-router-dom'

const NotFound = () => {
    let navigate = useNavigate()

    return (
        <div className={classes.error404}>
            <div className={classes.error404Content}>
                <h1 className={classes.big}>404</h1>
                <h1>Такой страницы не существует!</h1>
                <button className={classes.homeBtn} onClick={() => navigate('/')}>На главную</button>
            </div>
        </div>
    );
};

export default NotFound;
