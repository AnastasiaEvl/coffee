import content from "../../smart/Content/content.module.css";
import {Button} from "../Button/Button";
import React, {useEffect, useState} from "react";
import {HandlerPlusMinusQtyCalc} from "../../../core/utils/HandlerPlusMinusQtyCalc";
import {HandlerBasket} from "../../../core/utils/HanlerBasket";


export const PlusMinusContainer = ({initialQty, identification, initialPrice, sum, setSum}:
                                       { initialQty: number, identification: string, initialPrice: number, sum:any,setSum:any }) => {

    const {
        decrement, increment, change,
        setChange, priceChange
    }
        = HandlerPlusMinusQtyCalc()

    const [quantity, setQuantity] = useState<number>(initialQty)
    const [price, setPrice] = useState<number>(initialPrice)

    const {
        handlerCalculateSum
    } = HandlerBasket()

    useEffect((): void => {
        setSum(handlerCalculateSum())
        if (!change) {
            setQuantity(initialQty)

        } else {
            setQuantity(change)
        }
        if (!priceChange) {
            setPrice(initialPrice)

        } else {
            setPrice(priceChange)

        }
    }, [change]);


    return (
        <>
            <p className={content.price}>{price} USD</p>
            <div className={content.quantity}>
                <Button onClick={(e) => decrement(e)} className={content.buttonQty}
                        id={identification}>-</Button>
                {quantity}
                <Button onClick={(e) => increment(e)}
                        className={content.buttonQty}
                        id={identification}>+</Button>
            </div>
        </>
    )
}
