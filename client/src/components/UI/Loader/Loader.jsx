import React from 'react';
import classes from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={classes.loader}>
            <div className={classes.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            Loading...
        </div>

    );
};

export default Loader;
