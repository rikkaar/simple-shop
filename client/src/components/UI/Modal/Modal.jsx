import React, {useContext} from 'react';
import classes from "./modal.module.css";
import {observer} from "mobx-react-lite";
import {Context} from "../../../store/Context.jsx";



const Modal = observer(({children, context}) => {
    const {auth} = useContext(Context)
    const rootClasses = [classes.modal]

    if (auth.isVisible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => auth.setIsVisible(false)}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
});

export default Modal;
