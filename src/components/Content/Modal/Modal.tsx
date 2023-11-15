import React from "react";
import  './modal.css'

// @ts-ignore
export const Modal = ({ active, setActive, children }) => {

    const r = document.querySelector('#root')
    if(active){
        // @ts-ignore
        r.classList.add('fixed')
    }else{
        // @ts-ignore
        r.classList.remove('fixed')
    }


    return (
        <div
            className={active ? "modalCount active" : "modalCount"}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? "modalCount__content" : "modalCount"}
                onClick={(e) => e.stopPropagation}
            >
                {children}
            </div>

        </div>
    );
};
