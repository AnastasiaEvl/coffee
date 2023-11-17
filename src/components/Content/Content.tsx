import {useEffect, useState} from "react";
import content from '../Content/content.module.css'
import bonuses from "../Bonuses/bonuses.module.css";
import {fetchColdDrinks, fetchHotDrinks, fetchTeaDrinks} from "../../redux/products";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {Modal} from "./Modal";


interface IDeatiled {
    title?: string
    description?: string
    image?: string
    ingredients?: string
}

export const Content = () => {

    const [active, setActive] = useState(false);
    const [modalText, setModalText] = useState<IDeatiled[]>([])
    const [coffee, setCoffee] = useState(true)
    const [cold, setCold] = useState(false)
    const [tea, setTea] = useState(false)


    const dispatch = useAppDispatch()

    // @ts-ignore
    useEffect(() => {
        dispatch(fetchHotDrinks())
        // dispatch(fetchColdDrinks())
        // dispatch(fetchTeaDrinks())
    }, [dispatch])


    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addToBasket(name: any, price: any) {
        if (!(localStorage.getItem('basket'))) {
            localStorage.setItem('basket', JSON.stringify([]))
            name.push(price)

            // @ts-ignore
            const storageElements: any | null = JSON.parse(localStorage.getItem('basket'))
            storageElements.push(({...name}))
            localStorage.setItem('basket', JSON.stringify(storageElements))
        } else {
            name.push(price)
            console.log(name)
            // @ts-ignore
            const storageElements: any | null = JSON.parse(localStorage.getItem('basket'))
            console.log(storageElements)
            storageElements.push({...name})
            localStorage.setItem('basket', JSON.stringify(storageElements))
        }
    }

    function showDetailedInf(titles: any) {
        console.log(titles)
        setActive(true)
        const x = productHot.filter((i) => i.title === titles)
        const y = productCold.filter((i) => i.title === titles)
        if ((x.length > 0)) {
            // @ts-ignore
            setModalText(x)
        } else if ((y.length > 0)) {
            // @ts-ignore
            setModalText(y)
        }
    }

    const {isLoading, productHot} = useAppSelector((state) =>
        state.coffeeHot)
    const {productCold} = useAppSelector((state) =>
        (state.coffeeCold))
    // @ts-ignore

    console.log(productCold)


    const {productTea} = useAppSelector((state) =>
        state.teaDrinks)
    // @ts-ignore


    console.log(productTea)

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
    return (
        <>
            {isLoading ? (<div><p>LOADING....</p></div>) : (
                <>
                    <div className={content.title}>
                        <button className={bonuses.button} onClick={showHotDrinks}>Hot Coffee</button>
                        <button className={bonuses.button} onClick={showColdDrinks}>Cold Drinks</button>
                        <button className={bonuses.button} onClick={showTea}>Tea</button>
                    </div>
                    {coffee && (
                        <>
                            <h2>HOT COFFEE</h2>
                            <div className={content.container}>
                                {productHot.map((e, index) => (<div key={index}>
                                    <h2>{e.title}</h2>
                                    <img className={content.card} src={e.image}
                                         onClick={() => showDetailedInf(e.title)}/>
                                </div>))}
                            </div>
                        </>)}

                    {cold && (
                        <>
                            <h2>COLD DRINKS</h2>
                            <div className={content.container}>
                                {productCold.map((e, index) => (<div key={index}>
                                    <h2>{e.title}</h2>
                                    <img className={content.card} src={e.image}
                                         onClick={() => showDetailedInf(e.title)}/>
                                </div>))}
                            </div>
                        </>)}

                    {tea && (
                        <>
                            <h2>Tea</h2>
                            <div className={content.container}>
                                {productTea.map((e, index) => (<div key={index}>
                                    <h2>{e.title}</h2>
                                    <img className={content.card} src={e.image}
                                         onClick={() => showDetailedInf(e.title)}/>
                                </div>))}
                            </div>
                        </>)}

                    <Modal active={active} setActive={setActive}>
                        {modalText.map((e, index) => (
                            <div key={index}>
                                <h2>
                                    {e.title}
                                </h2>
                                <img className={content.card} src={e.image}/>
                                <p> {e.description}</p>
                                <p>Ingredients: {e.ingredients}</p>
                                <p>{getRandomInt(3, 10)} USD</p>
                                <div onClick={() => addToBasket(modalText, getRandomInt(3, 10))}><p>Добавить в
                                    корзину</p></div>
                            </div>
                        ))}
                    </Modal>

                </>
            )
            }
        </>
    )
}
