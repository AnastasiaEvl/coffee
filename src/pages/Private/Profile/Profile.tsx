import {NavLink} from "react-router-dom";
import header from "../../../components/Header/header.module.css";
import React, {useEffect, useState} from "react";
import cat from "../../../assets/icons/cat.png";
import alien from "../../../assets/icons/alien.png";
import dinosaur from "../../../assets/icons/dinosaur.png";
import knight from "../../../assets/icons/knight.png";
import lion from "../../../assets/icons/lion.png";
import man from "../../../assets/icons/man.png";
import mummy from "../../../assets/icons/mummy.png";
import scull from "../../../assets/icons/scull.png";
import woman from "../../../assets/icons/woman.png";

export const Profile = () => {


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



    useEffect(() => {
            for (let key in avatars) {
                // @ts-ignore
                if(key === JSON.parse(x)){
                    // @ts-ignore
                    setAvatar(avatars[key])
                }
            }
    }, [avatar]);


    // @ts-ignore
    const y = JSON.parse(localStorage.getItem('name'))

    return (
        <>
            {/*<NavLink to={`/`}>*/}
                <img
                    src={avatar}
                    alt="alien-icon"
                    className={header.icon}
                />
                <h2>{y}</h2>
            {/*</NavLink>*/}
            <NavLink to={`/orders`}>
                <h2>Заказы</h2>
            </NavLink>

            <NavLink to={'/questions'}>
                <h2>Частые вопросы</h2>
            </NavLink>
        </>
    )
}
