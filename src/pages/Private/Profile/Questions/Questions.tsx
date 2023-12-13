import {Button} from "../../../../components/UI/Button/Button";
import React from "react";
import {openModal} from "../../../../redux/modal/modalSlice";
import {useAppDispatch} from "../../../../core/hooks/useRedux";
import {paymentInfText} from "../../../../core/modalText/paymentInfText";
import {contractInfText} from "../../../../core/modalText/contractInfText";
import question from './questions.module.css'
import bonuses from "../../../../components/simple/Bonuses/bonuses.module.css";
import {BackButton} from "../../../../components/UI/BackButton";

export const Questions = () => {

    const dispatch = useAppDispatch()

    const paymentInf = ():void => {
        dispatch(openModal(`${paymentInfText}`));
    }

    const contractInf = ():void => {
        dispatch(openModal(`${contractInfText}`))
    }

    return (
        <>
            <BackButton/>
            <div className={question.container}>
                <Button onClick={paymentInf} className={bonuses.button}>
                    Payment for the order
                </Button>
                <Button onClick={contractInf} className={bonuses.button}>
                    Public offer agreement
                </Button>
            </div>
        </>
    )
}
