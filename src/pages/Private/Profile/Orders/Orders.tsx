import sadSmile from '../../../../assets/icons/sadSmile.png'
import header from "../../../../components/Header/header.module.css";
import order from './orders.module.css'

interface IBasket {
    title?: string
    0?: any
    1?: any
    image: string
}


export const Orders = () => {


    // @ts-ignore
    const basket: IBasket[] = JSON.parse(localStorage.getItem('basket'))
    return (
        <div className={order.container}>
            {(basket === null) ? (<><h2>It's empty</h2><img src={sadSmile} alt='sad-smile'
                                                            className={header.icon}/></>) : (
                basket.map((i, index) => (
                        <div key={index}>
                            <div><img src={i[0].image} alt='coffee-photo'/></div>
                            <div> {i[0].title}</div>
                            <div>{i[1]} USD</div>
                        </div>
                    )
                ))}
        </div>
    )
}
