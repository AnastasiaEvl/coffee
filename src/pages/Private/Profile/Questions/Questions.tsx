import {Button} from "../../../../shared/Button/Button";
import ModalAlert from "../../../../components/Modal/ModalAlert";
import React from "react";
import {openModal} from "../../../../redux/modal/modalSlice";
import {useAppDispatch} from "../../../../hooks/useRedux";
import {useSelector} from "react-redux";
import {paymentInfText} from "../../../../assets/modalText/paymentInfText";
import {contractInfText} from "../../../../assets/modalText/contractInfText";
import question from './questions.module.css'
import bonuses from "../../../../components/Bonuses/bonuses.module.css";

export const Questions = () => {


    // @ts-ignore
    const { isOpen } = useSelector((store) => store.modal);

    const dispatch = useAppDispatch()

    const paymentInf=()=>{
        // @ts-ignore
        dispatch(openModal(`${paymentInfText}`));
    }

    const contractInf =()=> {
        // @ts-ignore
        dispatch(openModal(`${contractInfText}`))
    }
    return (
        <div className={question.container}>
            {isOpen && <ModalAlert />}
            <Button onClick={paymentInf} className={bonuses.button}>
                Payment for the order
            </Button>
            <Button onClick={contractInf} className={bonuses.button}>
                Public offer agreement
            </Button>
        </div>
    )
}
