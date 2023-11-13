import sadSmile from '../../../assets/icons/sadSmile.png'
import header from "../../../components/Header/header.module.css";

export const Orders = ()=>{
    return(
        <div>
            <h2>Список заказов пуст</h2>
            <img src={sadSmile} alt='sad-smile' className={header.icon}/>
        </div>
    )
}
