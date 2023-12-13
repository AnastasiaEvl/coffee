import React, {useState} from "react";
import {UseGetLocalStorageItem, UseSetLocalStorageItem} from "../hooks/useLocalStorage";

export const HandlerPlusMinusQtyCalc = () => {

    const [change, setChange] = useState<number | undefined>()
    const [priceChange, setPriceChange] = useState<number>()



    const increment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        let basketStorage = UseGetLocalStorageItem('basket')
        const goodId = event.currentTarget.id
        const qtyPlus = basketStorage.map((currentQty: any) => {
            if (currentQty[0]._id === goodId) {
                currentQty[1]++
                setChange(currentQty[1])
                setPriceChange(currentQty[1]*currentQty[0].price)
            }
            return currentQty
        });
        UseSetLocalStorageItem('basket', qtyPlus)
    }

    const decrement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        let basketStorage = UseGetLocalStorageItem('basket')
        const goodId = e.currentTarget.id
        const qtyMinus = basketStorage.map((cur: any) => {
            if (cur[0]._id === goodId) {
                if (cur[1] !== 1) {
                    cur[1]--
                    setChange(cur[1])
                    setPriceChange(cur[1]*cur[0].price)
                }
            }
            return cur
        })
        UseSetLocalStorageItem('basket', qtyMinus)
    }

    return {
        increment, decrement, setChange, change, priceChange
    }
}
