import {useEffect, useState} from "react";
import content from '../Content/content.module.css'
import bonuses from "../Bonuses/bonuses.module.css";
import {fetchColdDrinks, fetchHotDrinks, fetchTeaDrinks} from "../../redux/products";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {Modal} from "./Modal";
import {IProduct} from "../../shared/Types/InterfaceProduct";
import {Button} from "../../shared/Button/Button";
import {openModal} from "../../redux/modal/modalSlice";

// @ts-ignore
export const Content = () => {

    const [active, setActive] = useState(false);
    const [modalText, setModalText] = useState<IProduct[]>([])
    const [coffee, setCoffee] = useState<boolean>(true)
    const [cold, setCold] = useState<boolean>(false)
    const [tea, setTea] = useState<boolean>(false)
    const [counter, setCounter] = useState(1)


    const dispatch = useAppDispatch()

    const authorization = useAppSelector((state) => state.auth.authorization)

    useEffect(() => {
        dispatch(fetchHotDrinks())
    }, [dispatch])

    function increment() {
            setCounter(counter + 1)
    }

    function decrement() {
        if(counter === 1){
            setCounter(1)
        }else{
        setCounter(counter - 1)}
    }

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addToBasket(name: any, price: any) {
        if (authorization) {
            // @ts-ignore
            if (!(localStorage.getItem('basket'))) {
                localStorage.setItem('basket', JSON.stringify([]))
                name.push(price)
                // name.push(counter)
                // @ts-ignore
                const storageElements: any | null = JSON.parse(localStorage.getItem('basket'))
                storageElements.push(({...name}))
                localStorage.setItem('basket', JSON.stringify(storageElements))
                // @ts-ignore
                dispatch(openModal('Added to the basket'))
            } else {
                name.push(price)
                // name.push(counter)
                // @ts-ignore
                const storageElements: any | null = JSON.parse(localStorage.getItem('basket'))
                storageElements.push({...name})
                localStorage.setItem('basket', JSON.stringify(storageElements))
                // @ts-ignore
                dispatch(openModal('Added to the basket'))
            }
        } else {
            // @ts-ignore
            dispatch(openModal('You need to register for purchasing'));
        }
        setCounter(1)
        setActive(false)
    }

    function showDetailedInf(titles: any) {
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

    const showHotDrinks = () => {
        setCold(false)
        setTea(false)
        setCoffee(true)
    }

    const showColdDrinks = () => {
        dispatch(fetchColdDrinks())
        setCoffee(false)
        setTea(false)
        setCold(true)
    }

    const showTea = () => {
        dispatch(fetchTeaDrinks())
        setCoffee(false)
        setCold(false)
        setTea(true)

    }


    // @ts-ignore
    // @ts-ignore
    return (
        <>
            {isLoading ? (<div><p>LOADING....</p></div>) : (
                <div className={content.mainContainer}>
                    <div className={content.title}>
                        <Button className={bonuses.button} onClick={showHotDrinks}><span>Hot Coffee</span></Button>
                        <Button className={bonuses.button} onClick={showColdDrinks}><span>Cold Drinks</span></Button>
                        <Button className={bonuses.button} onClick={showTea}><span>Tea</span></Button>
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
                                    <p className={content.price}>Price: {e.price}USD</p>
                                </div>

                                <Button type="submit" className={bonuses.button}
                                        onClick={() => {
                                            addToBasket(modalText,counter)
                                            // @ts-ignore
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
