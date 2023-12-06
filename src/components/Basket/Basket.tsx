import basket from './basket.module.css'
import {useNavigate} from "react-router-dom";
import {Button} from "../../shared/Button/Button";
import bonuses from "../Bonuses/bonuses.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {closeModal, openModal} from "../../redux/modal/modalSlice";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import StaticTimePickerLandscape from "./Time";
import FirstComponent from "./Time";
import content from "../Content/content.module.css";

interface IBasket {
    title?: string
    0?: any
    1?: any
    image: string
}

export const Basket = () => {
    const navigate = useNavigate()

    const location = localStorage.getItem('cafe-location')


    // @ts-ignore
    const x: IBasket[] = JSON.parse(localStorage.getItem('basket'))

    function choseLocation() {
        navigate('/map')
    }

    function bank() {
        navigate('/bank')
    }

    // @ts-ignore


    const res = ()=>{
        if(x !==null){
        return x.reduce((acc, curr)=> {
            return acc + curr[1]
        },0)
    }else{
            return 0
        }
    }
    // },0)

    // @ts-ignore
    const { isOpen } = useSelector((store) => store.modal);

    function clear() {
        // @ts-ignore
        dispatch(openModal('The basket is cleaned'));
        localStorage.removeItem('basket')
        navigate('/')
    }

    const dispatch = useAppDispatch()
    function purchase(){
        // @ts-ignore
        dispatch(openModal('The order received'));
        localStorage.removeItem('basket')
            navigate('/main')
    }



    const increment=(e:any)=> {
        console.log(e.target.id)
        // setCounter(counter + 1)
        const goodId = e.target.id
                x.reduce((acc, curr)=> {
                    if(+curr[0].id === +goodId){
                        console.log(curr[1])
                    }else{console.log('ok')}
                    return acc + curr[1]
                },0)


        // setToLocalStorage('basket', newQuantity)
    }

    const decrement=(e:any)=> {
        console.log(e.target.id)
        // if(counter === 1){
        //     setCounter(1)
        // }else{
        //     setCounter(counter - 1)}
    }


    return (
        <div className={basket.content}>
            <h2>Basket</h2>
            <Button onClick={()=>{clear()}} disabled ={x===null}
                    className={x===null ? `${bonuses.buttonNonActive}` : `${bonuses.buttonRight}`}>Clear basket</Button>
            {(x === null) ? null :
                (x.map((i, index) => (
                <div key={index} className={basket.container}>
                    <div><img src={i[0].image} alt='coffee-photo' className={basket.img}/></div>
                    <div><p>{i[0].title}</p>
                        <p>{i[0].price} USD</p>
                        <p><div className={content.quantity}>
                            <Button onClick={decrement} className={content.buttonQty} id={i[0]._id}>-</Button>
                            {i[1]}
                            <Button onClick={(e)=>increment(e)} className={content.buttonQty} id={i[0]._id}>+</Button>
                        </div></p>
                    </div>

                </div>
            )))}
            <h2 className={basket.title}>Take away from</h2>
            {!(localStorage.getItem('cafe-location')) ? (
                <Button onClick={choseLocation} disabled ={x===null} className={x===null ? `${bonuses.buttonNonActive}` : `${bonuses.button}`}>Chose location</Button>
            ) : (<div className={basket.location}>
                    <div className={basket.textLocation} >
                        <p >{localStorage.getItem('cafe-location')}</p>
                    </div>
                    <div onClick={choseLocation}>
                        <Button disabled ={x===null} className={x===null ? `${bonuses.buttonNonActive}` : `${bonuses.button}`}>Change Location</Button></div>
                    <div>
                        <FirstComponent/>
                    </div>
                </div>
            )}

            <h2 className={basket.title}>Payment</h2>
            <div className={basket.payment}>
            <p className={basket.subtitle}>Upon receipt</p>
            <Button onClick={bank} disabled ={x===null} className={x===null ? `${bonuses.buttonNonActive}` : `${bonuses.button}`}>By card</Button>
            </div>

            <h2 className={basket.title}>Sum for payment</h2>
            <p className={basket.subtitle}> {res()} USD</p>

            <Button type='button' disabled ={x===null || location === null}
                    onClick={() => purchase()} className={(x===null || location === null) ? `${bonuses.buttonNonActive}` : `${bonuses.button}`}>Purchase {res()} USD</Button>
        </div>
    )
}
