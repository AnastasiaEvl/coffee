import {openModal} from "../../redux/modal/modalSlice";
import {BasketCleanedText} from "../modalText/basketCleanedText";
import {UseGetLocalStorageItem, UseRemoveLocalStorageItem, UseSetLocalStorageItem} from "../hooks/useLocalStorage";
import {BasketPurchasedText} from "../modalText/BasketPurchasedText";
import {useAppDispatch} from "../hooks/useRedux";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {IBasket} from "../types/IBasket";

export const HandlerBasket = () => {
    const basketStorage = UseGetLocalStorageItem('basket')
    const [drinks, setDrinks] = useState<IBasket[]>(basketStorage)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleClearBasket = () => {
        dispatch(openModal(BasketCleanedText));
        UseRemoveLocalStorageItem('basket')
        navigate('/')
    }

    const handlerBuy = (): void => {
        dispatch(openModal(BasketPurchasedText));
        UseRemoveLocalStorageItem('basket')
        navigate('/main')
    }

    const handlerCalculateSum = (): number => {
        let basketStorage = UseGetLocalStorageItem('basket')
        if (basketStorage !== null) {
            return basketStorage.reduce((acc: number, curr: any) => {
                return acc + (curr[1] * curr[0].price)
            }, 0)
        } else {
            return 0
        }
    }

    const handleDelete = (event: React.MouseEvent<HTMLElement>, sum: any, setSum: any):any => {
        const chosenGood = event.currentTarget.id
        const chosenToDelete = basketStorage.filter((current: any) => current[0]._id !== chosenGood);
        UseSetLocalStorageItem('basket', chosenToDelete)
        setDrinks(chosenToDelete)
        dispatch(openModal('Drink is deleted'))
        setSum(handlerCalculateSum())
    }

    return {
        handleClearBasket,
        handlerBuy,
        handlerCalculateSum,
        handleDelete,
        drinks,
        setDrinks,
    }
}



