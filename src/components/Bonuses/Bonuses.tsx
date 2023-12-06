import bonuses from '../Bonuses/bonuses.module.css'
import bonus from '../Location/location.module.css'
import star from '../../assets/icons/star.png'
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useRedux";

export const Bonuses = ()=>{

    const navigate = useNavigate()
    const authorization = useAppSelector((state)=>state.auth.authorization)

    const personalCabinet=()=>{
        navigate('/personal')

    }
    return (
        <div className={bonus.wrapper}>
            <img src={star} alt='star-icon' className={bonus.icon}/>
            {authorization ? <h2 className={bonus.title}>You have 0 bonuses</h2> :
            <h2 className={bonus.title}>Your bonuses will be here</h2>}
            {authorization ? null :
            <button className={bonuses.buttonLeft} onClick={personalCabinet}>Enter</button>}
        </div>
    )
}
