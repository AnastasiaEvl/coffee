import location from '../../../assets/icons/location.png'
import locationStyle from './location.module.css'
import toRight from '../../../assets/icons/toRight.png'
import {useNavigate} from "react-router-dom";
export const Location = ()=>{
    const navigate = useNavigate()

    const goToMap=():void=>{
        navigate('/map')

    }
    return(
        <div className={locationStyle.wrapper} onClick={goToMap}>
            <img src={location} alt='location-icon' className={locationStyle.icon}/>
                <h2 className={locationStyle.title}>See THE COFFEE locations</h2>
                <img src={toRight} alt='to-right-icon' className={locationStyle.toRightIcon}/>
        </div>
    )
}
