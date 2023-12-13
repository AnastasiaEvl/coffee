import React from "react";
import {Outlet} from "react-router-dom";
import ModalAlert from "../../components/UI/Modal/ModalAlert";
import {useSelector} from "react-redux";

export const MainLayout=()=>{
    const {isOpen} = useSelector((store: any) => store.modal);
    return(
        <>
            {isOpen && <ModalAlert/>}
            <Outlet/>
        </>
    )
}
