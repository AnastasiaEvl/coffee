import personal from './personal.module.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import bonuses from '../../simple/Bonuses/bonuses.module.css'
import {Input} from "../../UI/Input";
import alien from "../../../assets/icons/alien.png";
import header from "../../simple/Header/header.module.css";
import {Button} from "../../UI/Button/Button";
import {loginThunk} from "../../../redux/auth/thunk";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../core/hooks/useRedux";
import useInput from '../../../core/hooks/UseValidation';
import {UseGetLocalStorageItem, UseSetLocalStorageItem} from "../../../core/hooks/useLocalStorage";
import {BackButton} from "../../UI/BackButton";
import {AVATARS} from "../../../core/constants/Avatars";
import {ListAvatars} from "../../../core/constants/ListAvatars";
import {IAuthForm} from "../../../core/types/IAuthForm";

export const PersonalCabinet = () => {

    const {authorization} = useAppSelector((state) => state?.auth)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect((): void => {
        if (authorization) {
            navigate('/', {replace: true})
        }
    }, [authorization, navigate])

    const choseIt = (event: any): void => {
        const buttons = document.querySelectorAll('.border')
        buttons.forEach(i => i.classList.remove(`${personal.active}`));
        event.target.parentElement.classList.add(`${personal.active}`)
        const chosenImagePath = (event.target.src).toString()
        const arrImagePath = chosenImagePath.split('/')
        const nameImg = arrImagePath[3]
        const stringImgName = nameImg.split('.')
        const nameChosenImage = stringImgName[0]
        localStorage.setItem('avatar', JSON.stringify(nameChosenImage))
        setAva(nameChosenImage)
    }

    const [inputValue, setInputValue] = useState<IAuthForm>({
        name: '',
        password: ''
    })

    const [ava, setAva] = useState<string>(alien)
    const userAvatar = UseGetLocalStorageItem('avatar')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(({
            ...inputValue,
            [event.target.name]: event.target.value
        }))
    }

    const password = useInput(inputValue.password, {isEmpty: true, passwordCheck: 'password'});
    const name = useInput(inputValue.name, {isEmpty: true, nameCheck: 'login'});

    useEffect((): void => {
        if (userAvatar === '') {
            setAva(AVATARS.alien)
        } else {
            for (let key in AVATARS) {
                if (key === userAvatar) {
                    setAva(AVATARS[key])
                }
            }
        }
    }, [ava]);


    const enter = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const login = formData.get('name')?.toString()
        UseSetLocalStorageItem('name', login)
        const password = formData.get('password')?.toString()
        if (login && password) {
            dispatch(loginThunk({login, password}))
            UseSetLocalStorageItem('bonuses', 5)
        }
    }

    return (
        <div className={personal.mainContainer}>
            <BackButton/>
            <form className={personal.container} onClick={enter}>
                <fieldset className={personal.formContainer}>
                    <img
                        src={ava}
                        alt="alien-icon"
                        className={header.icon}
                    />
                    <Input value={inputValue.name} onChange={handleChange} placeholder='Name' name='name'
                           onBlur={e => name.onBlur(e)}></Input>
                    {name.isDirty && name.isEmpty && (
                        <p>Empty field!</p>
                    ) ||
                        (name.isDirty && name.nameCheck) && (
                            <p>Incorrect login</p>
                        )}
                    <Input value={inputValue.password} onChange={handleChange} placeholder='Password' name='password'
                           onBlur={e => password.onBlur(e)}></Input>
                    {(password.isDirty && password.isEmpty) && (
                            <p>Empty field!</p>
                        ) ||
                        (password.isDirty && password.passwordCheck) && (
                            <p>Incorrect password</p>
                        )}

                    <Button type="submit" className={Boolean((inputValue.name && inputValue.password) === '') ?
                        `${bonuses.buttonDisable}` : `${bonuses.button}`}
                            disabled={Boolean((inputValue.name && inputValue.password) === '')}>Login</Button>
                </fieldset>
            </form>
            <div className={personal.imgContent}>
                {ListAvatars.map((i, index) => (
                    <div className={personal.avatarsContainer} key={index}>
                        <div className='border'>
                            <img src={i.img} className={personal.avatar} onClick={choseIt} alt='icon'/>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
