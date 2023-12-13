import sadSmile from '../../../../assets/icons/sadSmile.png'
import header from "../../../../components/simple/Header/header.module.css";
import order from './orders.module.css'
import {UseGetLocalStorageItem} from "../../../../core/hooks/useLocalStorage";
import {BackButton} from "../../../../components/UI/BackButton";


export const Orders = () => {
    const basket = UseGetLocalStorageItem('basket')

    return (
        <>
            <BackButton/>
            <div className={order.container}>
                {(basket === null || basket.length === 0) ? (
                    <>
                        <h2>It's empty</h2><img src={sadSmile} alt='sad-smile'
                                                className={header.icon}/>
                    </>
                ) : (
                    <>
                        <h2>Your order</h2>
                        {basket.map((i:any, index:any) => (
                            <div key={index}>
                                <div><img src={i[0].image} alt='coffee-photo' className={order.img}/></div>
                                <div> {i[0].title}</div>
                                <div>{i[1]} USD</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}
