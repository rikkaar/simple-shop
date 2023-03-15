import React from 'react';
import classes from "./modal.module.css";



const Modal = ({children, visible, setVisible, context}) => {

    const rootClasses = [classes.modal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    console.log(visible)
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
