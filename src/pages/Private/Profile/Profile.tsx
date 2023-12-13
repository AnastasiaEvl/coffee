import {NavLink, useNavigate} from "react-router-dom";
import header from "../../../components/simple/Header/header.module.css";
import React, {useEffect, useState} from "react";
import profile from './profile.module.css'
import {AVATARS} from "../../../core/constants/Avatars";
import {UseGetLocalStorageItem} from "../../../core/hooks/useLocalStorage";
import {BackButton} from "../../../components/UI/BackButton";

export const Profile = () => {

    const [avatar, setAvatar] = useState<string>(AVATARS.alien)
    const userAvatar = UseGetLocalStorageItem('avatar')
    const userName = UseGetLocalStorageItem('name')


    useEffect(():void => {
            for (let key in AVATARS) {
                if(key === userAvatar){
                    setAvatar(AVATARS[key])
                }
            }
    }, [avatar]);



    return (<>
        <BackButton/>
        <div className={profile.container}>
                <img
                    src={avatar}
                    alt="alien-icon"
                    className={header.icon}
                />
                <h2>{userName}</h2>
            <NavLink to={`/orders`}
                     style={{ textDecoration: 'none' }}>
                <h2 className={profile.title}  style={{ textDecoration: 'none' }}>Current order</h2>
            </NavLink>
            <NavLink to={'/questions'} style={{ textDecoration: 'none' }}>
                <h2 className={profile.title} style={{ textDecoration: 'none' }}>Common questions</h2>
            </NavLink>
        </div>
        </>
    )
}
