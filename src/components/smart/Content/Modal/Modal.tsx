import React from "react";
import  './modal.css'
import {Button} from "../../../UI/Button/Button";


export const Modal = ({ active, setActive, children }: {active:boolean, setActive: (active: boolean) => void; children: any}) => {

    const rootElement = document.querySelector('#root') as HTMLElement
    if(active){
        rootElement.classList.add('fixed')
    }else{
        rootElement.classList.remove('fixed')
    }

    const closeModal=(e: React.MouseEvent)=> {
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
                <Button onClick={closeModal} className='closeBtn'>X</Button>
                {children}
            </div>

        </div>
    );
};
