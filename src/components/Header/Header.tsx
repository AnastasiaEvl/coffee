import labelCoffee from '../../assets/icons/logo.png'
import header from './header.module.css'
import alien from '../../assets/icons/alien.png'
import inf from '../../assets/icons/inf.png'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import cat from '../../assets/icons/cat.png'
import dinosaur from '../../assets/icons/dinosaur.png'
import knight from '../../assets/icons/knight.png'
import lion from '../../assets/icons/lion.png'
import man from '../../assets/icons/man.png'
import mummy from '../../assets/icons/mummy.png'
import scull from '../../assets/icons/scull.png'
import woman from '../../assets/icons/woman.png'
import bonus from "../Location/location.module.css";
import {useAppSelector} from "../../hooks/useRedux";
import basketIcon from '../../assets/icons/basket.png'


// @ts-ignore
export const Header = ()=> {
    const {authorization} = useAppSelector((state) => state?.auth)
    const avatars = {
        cat: cat,
        alien: alien,
        dinosaur:dinosaur,
        knight:knight,
        lion:lion,
        man:man,
        mummy:mummy,
        scull:scull,
        woman:woman
    }

    const [avatar, setAvatar]=useState(alien)

    const x = localStorage.getItem('avatar')

    const basketGoods = localStorage.getItem('basket')



    useEffect(() => {
        if(x === ''){
            console.log('ok')
            setAvatar(avatars.alien)
        }else{
            for (let key in avatars) {
                // @ts-ignore
                if(key === JSON.parse(x)){
                    // @ts-ignore
                    setAvatar(avatars[key])
                }
            }
        }
    }, [avatar]);






    const navigate = useNavigate()

    const personalCabinet=()=>{
        authorization ? navigate('/profile') : navigate('/personal')
    }
    const basket=()=>{
        navigate('/basket')
    }

    return (
        <header className={header.headerStyle}>
            <img
                src={labelCoffee}
                alt="label"
                className={header.logo}
            />
            <nav className={header.navigation}>
                <ul className={header.sectionsStyle}>
                       <li>
                            <a className={header.link}><img
                                src={inf}
                                alt="inf-icon"
                                className={header.icon}
                            />
                                <span>График работы</span> <span>и контакты</span></a>
                        </li>
                        {basketGoods ? (
                                <li onClick={basket}>
                                    <a className={header.link}>
                                    <img src={basketIcon} alt='basket-icon' className={header.icon}/>
                                    Корзина
                                    </a>
                                </li>
                        ):null}

                    <li onClick={personalCabinet}>
                        <a className={header.link}>
                            <img
                            src={avatar}
                            alt="alien-icon"
                            className={header.icon}
                        />
                            {authorization ? null :
                            <span>Вход</span>}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
