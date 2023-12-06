import React from "react";
import  './modal.css'


export const Modal = ({ active, setActive, children }: {active:boolean, setActive: (active: boolean) => void; children: any}) => {

    const rootElement = document.querySelector('#root') as HTMLElement
    if(active){
        rootElement.classList.add('fixed')
    }else{
        rootElement.classList.remove('fixed')
    }

    const closeModal=(e:any)=> {
        if(e.currentTarget === e.target){
            setActive(false)
        }
    }


    return (
        <div
            className={active ? "modalCount active" : "modalCount"}
            onClick={closeModal}
        >
            <div
                className={active ? "modalCount__content" : "modalCount"}
            >
                {children}
            </div>

        </div>
    );
};
