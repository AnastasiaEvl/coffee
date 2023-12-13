import bonuses from './bonuses.module.css'
import bonus from '../Location/location.module.css'
import star from '../../../assets/icons/star.png'
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../core/hooks/useRedux";
import {UseGetLocalStorageItem} from "../../../core/hooks/useLocalStorage";
import {useEffect, useState} from "react";

export const Bonuses = () => {

    const userBonus = UseGetLocalStorageItem('bonuses')
    const navigate = useNavigate()
    const authorization = useAppSelector((state) => state.auth.authorization)
    const [bonusPersonal, setBonusPersonal]=useState()

    const goToPersonalPage = ():void => {
        navigate('/personal')
    }


    useEffect(() => {
        if(userBonus !==null){
            setBonusPersonal(userBonus)
        }
    }, [bonusPersonal]);



    return (
        <div className={bonus.wrapper}>
            <img src={star} alt='star-icon' className={bonus.icon}/>
            {(authorization) ? (<h2 className={bonus.title}>You have {bonusPersonal} bonuses</h2>) : (
                <h2 className={bonus.title}>Your bonuses will be here</h2>)}
            {!authorization &&
                (<button className={bonuses.buttonLeft} onClick={goToPersonalPage}>Enter</button>)}
        </div>
    )
}
