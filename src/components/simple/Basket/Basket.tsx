import basket from './basket.module.css'
import {useNavigate} from "react-router-dom";
import {Button} from "../../UI/Button/Button";
import bonuses from "../Bonuses/bonuses.module.css";
import {FirstComponent} from "./FirstComponent";
import content from "../../smart/Content/content.module.css";
import React, {useEffect, useState} from "react";
import {UseGetLocalStorageItem} from "../../../core/hooks/useLocalStorage";
import {BackButton} from "../../UI/BackButton";
import {HandlerBasket} from "../../../core/utils/HanlerBasket";
import {PlusMinusContainer} from "../../UI/PlusMinusContainer/PlusMinusContainer";


export const Basket = () => {
    const navigate = useNavigate()
    const location = UseGetLocalStorageItem('cafe-location')
    const basketStorage = UseGetLocalStorageItem('basket')

    const [time, setTime] = useState<string>("07:30")
    const [sum, setSum]=useState()


    const {
        handlerBuy, handleClearBasket, handleDelete,
        drinks, setDrinks
    } = HandlerBasket()

    function goToLocationPage(): void {
        navigate('/map')
    }

    function goToBankPage(): void {
        navigate('/bank')
    }

    useEffect(() => {
        const basketStorage = UseGetLocalStorageItem('basket')
        setDrinks(basketStorage)
    }, []);


    return (
        <div className={basket.content}>
            <BackButton/>
            {(basketStorage === null || basketStorage.length === 0) ? (
                <h2 className={basket.emptyTitle}>Cart is empty!</h2>
            ) : (
                <>
                    <h2>Your Cart</h2>
                    <Button id='clear' onClick={handleClearBasket
                    }
                            className={bonuses.buttonRight}>Clear cart</Button>
                    {(drinks === null) ? null :
                        (drinks.map((i: any, index: number) => (
                            <div key={index} className={basket.container}>
                                <div><img src={i[0].image} alt='coffee-photo' className={basket.img}/></div>
                                <div><p>{i[0].title}</p>
                                    <PlusMinusContainer initialQty={i[1]} identification={i[0]._id}
                                                        initialPrice={i[0].price * i[1]} sum={sum} setSum={setSum}/>
                                </div>
                                <Button onClick={(e) => handleDelete(e, sum, setSum)} id={i[0]._id}
                                        className={content.closeBtn}>X</Button>
                            </div>
                        )))}
                    <h2 className={basket.title}>Take away from</h2>
                    {!location ? (
                        <Button onClick={goToLocationPage}
                                className={bonuses.button}>Chose
                            location</Button>
                    ) : (<div className={basket.location}>
                            <div className={basket.textLocation}>
                                <p>{location}</p>
                            </div>
                            <div>
                                <Button
                                    className={bonuses.button} onClick={goToLocationPage}>Change
                                    Location</Button></div>
                            <div>
                                <FirstComponent chosenTime={time} setTime={setTime}/>
                            </div>
                        </div>
                    )}
                    <h2 className={basket.title}>Payment</h2>
                    <div className={basket.payment}>
                        <p className={basket.subtitle}>Upon receipt</p>
                        <Button onClick={goToBankPage}
                                className={bonuses.button}>By
                            card</Button>
                    </div>
                    <h2 className={basket.title}>Sum for payment</h2>
                    <p className={basket.subtitle}> {sum}USD</p>
                    <Button type='button' id='buy' disabled={basketStorage === null || location === null}
                            onClick={handlerBuy}
                            className={(basketStorage === null || location === null) ?
                                `${bonuses.buttonNonActive}` : `${bonuses.button}`}>
                        Purchase {sum} USD</Button>
                </>)}

        </div>
    )

}
