import React, {useEffect, useState} from "react";
import content from './content.module.css'
import bonuses from "../../simple/Bonuses/bonuses.module.css";
import {fetchColdDrinks, fetchHotDrinks, fetchTeaDrinks} from "../../../redux/products";
import {useAppDispatch, useAppSelector} from "../../../core/hooks/useRedux";
import {IProduct} from "../../../core/types/IProduct";
import {Button} from "../../UI/Button/Button";
import CircularIndeterminate from "../../UI/CircularIndeterminate/CircularIndeterminate";
import {UseGetLocalStorageItem, UseSetLocalStorageItem} from "../../../core/hooks/useLocalStorage";
import {openModal} from "../../../redux/modal/modalSlice";
import { Modal } from "./Modal";
import {handlreTextAddToBasket} from "../../../core/modalText/handlreTextAddToBasket";
import {handlerTextGoodHasBeenAdded} from "../../../core/modalText/handlerTextGoodHasBeenAdded";
import {handlerTextNeedToRegister} from "../../../core/modalText/handlerTextNeedToRegister";
import {IBasket} from "../../../core/types/IBasket";

export const Content = () => {

    const [active, setActive] = useState<boolean>(false);
    const [modalText, setModalText] = useState<IProduct[]>([])
    const [coffee, setCoffee] = useState<boolean>(true)
    const [cold, setCold] = useState<boolean>(false)
    const [tea, setTea] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(1)


    const userBasket = UseGetLocalStorageItem('basket')

    const dispatch = useAppDispatch()

    const authorization = useAppSelector((state) => state.auth.authorization)

    useEffect(():void => {
        dispatch(fetchHotDrinks())
    }, [dispatch])

    function increment():void {
        setCounter(counter + 1)
    }

    function decrement():void {
        if (counter > 1)
            setCounter(counter - 1)
    }


    function addToBasket(name: IBasket[], price: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (authorization) {
            if (!(userBasket)) {
                UseSetLocalStorageItem('basket', '[]')
                name.push(price)
                const storageElements = UseGetLocalStorageItem('basket')
                storageElements.push(({...name}))
                UseSetLocalStorageItem('basket', storageElements)
                dispatch(openModal(handlreTextAddToBasket))
            } else {
                name.push(price)
                const storageElements = UseGetLocalStorageItem('basket')
                if (storageElements.find((i: { _id: any; }[]) => i[0]._id === e.currentTarget.id)) {
                    setActive(false)
                    return dispatch(openModal(handlerTextGoodHasBeenAdded))

                } else {
                    storageElements.push({...name})
                    UseSetLocalStorageItem('basket', storageElements)
                    dispatch(openModal(handlreTextAddToBasket))
                }
            }
        } else {
            dispatch(openModal(handlerTextNeedToRegister));
        }
        setCounter(1)
        setActive(false)
    }

    function showDetailedInf(titles: string):void {
        setActive(true)
        const hotProducts: IProduct[] = productHot.filter((i) => i.title === titles)
        const coldProduct: IProduct[] = productCold.filter((i) => i.title === titles)
        if ((hotProducts.length > 0)) {
            setModalText(hotProducts)
        } else if ((coldProduct.length > 0)) {
            setModalText(coldProduct)
        }
    }

    const {isLoading, productHot} = useAppSelector((state) =>
        state.coffeeHot)
    const {productCold} = useAppSelector((state) =>
        (state.coffeeCold))
    const {productTea} = useAppSelector((state) =>
        state.teaDrinks)

    const setSelectedDrinks = (drink: string):void => {
        switch (drink) {
            case 'hot':
                setCoffee(true)
                setTea(false)
                setCold(false)
                break
            case'cold':
                dispatch(fetchColdDrinks())
                setCoffee(false)
                setTea(false)
                setCold(true)
                break
            case 'tea':
                dispatch(fetchTeaDrinks());
                setCoffee(false);
                setCold(false);
                setTea(true);
                break;
            default:
                setCoffee(false);
                setTea(false);
                setCold(false);
                break;
        }
    }


    return (
        <>
            {isLoading ? (<div className={content.spinner}><CircularIndeterminate/></div>) : (
                <div className={content.mainContainer}>

                    <div className={content.title}>
                        <Button className={bonuses.button}
                                onClick={() => setSelectedDrinks('hot')}><span>Hot Coffee</span></Button>
                        <Button className={bonuses.button}
                                onClick={() => setSelectedDrinks('cold')}><span>Cold Drinks</span></Button>
                        <Button className={bonuses.button}
                                onClick={() => setSelectedDrinks('tea')}><span>Tea</span></Button>
                    </div>
                    {coffee && (
                        <>
                            <h2 className={content.name}>HOT COFFEE</h2>
                            <div className={content.container}>
                                {productHot.map((e, index) => (<div key={index} className={content.smallContainer}>
                                    <h2 className={content.drinkTitle}>{e.title}</h2>
                                    <img className={content.card} src={e.image}
                                         onClick={() => showDetailedInf(e.title)} alt='coffee-image'/>
                                </div>))}
                            </div>
                        </>)}

                    {cold && (
                        <>
                            <h2 className={content.name}>COLD DRINKS</h2>
                            <div className={content.container}>
                                {productCold.map((e, index) => (<div key={index} className={content.smallContainer}>
                                    <h2 className={content.drinkTitle}>{e.title}</h2>
                                    <img className={content.card} src={e.image}
                                         onClick={() => showDetailedInf(e.title)} alt='cold-coffee-image'/>
                                </div>))}
                            </div>
                        </>)}

                    {tea && (
                        <>
                            <h2 className={content.name}>Tea</h2>
                            <div className={content.container}>
                                {productTea.map((e, index) => (<div key={index} className={content.smallContainer}>
                                    <h2 className={content.drinkTitle}>{e.title}</h2>
                                    <img className={content.card} src={e.image}
                                         onClick={() => showDetailedInf(e.title)} alt='tea-image'/>
                                </div>))}
                            </div>
                        </>)}

                    <Modal active={active} setActive={setActive}>
                        {modalText.map((e, index) => (
                            <div key={index} className={content.modal}>
                                <h2>
                                    {e.title}
                                </h2>
                                <img className={content.card} src={e.image} alt='img-good'/>
                                <div className={content.text}>
                                    <p> {e.description}</p>
                                    <div className={content.quantity}>
                                        <Button onClick={decrement} className={content.buttonQty}>-</Button>
                                        {counter}
                                        <Button onClick={increment} className={content.buttonQty}>+</Button>
                                    </div>
                                    {(e.ingredients) ? (
                                        <div className={content.ingredients}>
                                            <p>Ingredients:</p> {e.ingredients.map((i, index) => (
                                            <p key={index}>{i}</p>))}</div>) : null}
                                    <p className={content.price}>Price: {e.price * counter} USD</p>
                                </div>

                                <Button type="submit" className={bonuses.button} id={e._id}
                                        onClick={(e) => {
                                            addToBasket(modalText, counter, e)
                                        }}>Add to basket</Button>
                            </div>
                        ))}
                    </Modal>

                </div>
            )
            }
        </>
    )
}
