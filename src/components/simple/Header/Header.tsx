import labelCoffee from '../../../assets/icons/logo.png'
import header from './header.module.css'
import inf from '../../../assets/icons/inf.png'
import logout from '../../../assets/icons/exit.png'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../core/hooks/useRedux";
import basketIcon from '../../../assets/icons/basket.png'
import {UseGetLocalStorageItem} from "../../../core/hooks/useLocalStorage";
import {NAVIGATION_PATH} from '../../../core/constants/Navigation'
import {AVATARS} from "../../../core/constants/Avatars";
import {openModal} from "../../../redux/modal/modalSlice";


export const Header = () => {
    const {authorization} = useAppSelector((state) => state?.auth)
    const dispatch = useAppDispatch()
    const [avatar, setAvatar] = useState<string>(AVATARS.alien)
    const userImage = UseGetLocalStorageItem('avatar')
    const userName = UseGetLocalStorageItem('name')
    const navigate = useNavigate()


    useEffect(():void => {
        if (userImage === null) {
            setAvatar(AVATARS.alien)
        } else {
            for (let key in AVATARS) {
                if (key === userImage) {
                    setAvatar(AVATARS[key])
                }
            }
        }
    }, [avatar]);


    const personalCabinet = ():void => {
        authorization ? navigate(NAVIGATION_PATH.profile) : navigate('/personal')
    }
    const basket = ():void => {
        navigate('/basket')
    }

    const workTime = ():void => {
        navigate('/workTime')
    }

    const exit = ():void=>{
        localStorage.clear()
        setTimeout(() => {
            window.location.reload();
        }, 1200);
        dispatch(openModal('You logout!'))
    }


    return (
        <header className={header.headerStyle}>
            <img
                src={labelCoffee}
                alt=""
                className={header.logo}
            />
            <nav className={header.navigation}>
                <ul className={header.sectionsStyle}>
                    {authorization ? (<li onClick={exit}>
                        <a className={header.link}><img
                            src={logout}
                            alt=""
                            className={header.icon}
                        />
                            <span>Exit</span></a>
                    </li> ) : null}
                    <li onClick={workTime}>
                        <a className={header.link}><img
                            src={inf}
                            alt=""
                            className={header.icon}
                        />
                            <span>Schedule</span></a>
                    </li>
                    <li onClick={basket}>
                        <a className={header.link}>
                            <img src={basketIcon} alt="" className={header.icon}/>
                            Cart
                        </a>
                    </li>

                    <li onClick={personalCabinet}>
                        <a className={header.link}>
                            <img
                                src={avatar}
                                alt=""
                                className={header.icon}
                            />

                            {authorization ? <span>{userName}</span> :
                                <span>Enter</span>}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
