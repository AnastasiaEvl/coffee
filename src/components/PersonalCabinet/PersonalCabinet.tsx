import personal from './personal.module.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import bonuses from '../Bonuses/bonuses.module.css'
import cat from '../../assets/icons/cat.png'
import dinosaur from '../../assets/icons/dinosaur.png'
import knight from '../../assets/icons/knight.png'
import lion from '../../assets/icons/lion.png'
import man from '../../assets/icons/man.png'
import mummy from '../../assets/icons/mummy.png'
import scull from '../../assets/icons/scull.png'
import woman from '../../assets/icons/woman.png'
import {Input} from "../../shared/Input";
import alien from "../../assets/icons/alien.png";
import header from "../Header/header.module.css";
import {Button} from "../../shared/Button/Button";
import {loginThunk} from "../../redux/auth/thunk";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
// @ts-ignore
export const PersonalCabinet = () => {


    const {authorization} = useAppSelector((state) => state?.auth)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (authorization) {
            navigate('/', {replace: true})
        }
    }, [authorization, navigate])

    const choseIt = (e: any) => {
        const buttons = document.querySelectorAll('.border')
        buttons.forEach(i => i.classList.remove(`${personal.active}`));
        e.target.parentElement.classList.add(`${personal.active}`)
        const y = e.target.src
        const w = y.split('/')
        const q = w[5]
        const i = q.split('.')
        const nameAv = i[0]
        localStorage.setItem('avatar', JSON.stringify(nameAv))
        setAva(nameAv)
    }
    const avatars: { img: string }[] = [
        {img: cat},
        {img: alien},
        {img: dinosaur},
        {img: knight},
        {img: lion},
        {img: man},
        {img: mummy},
        {img: scull},
        {img: woman}
    ]


    const [inputValue, setInputValue] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        birthday: '',
        gender: '',
        city: '',
        password:''
    })

    const [ava, setAva]=useState(alien)

    const x = localStorage.getItem('avatar')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(({
            ...inputValue,
            [event.target.name]: event.target.value
        }))
    }
    const avat = {
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
    useEffect(() => {
        if(x === ''){
            setAva(avat.alien)
        }else{
            for (let key in avat) {
                // @ts-ignore
                if(key === JSON.parse(x)){
                    // @ts-ignore
                    setAva(avat[key])
                }
            }
        }
    }, [ava]);

    const enter = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('ok')
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const login = formData.get('name')?.toString()
        localStorage.setItem('name', JSON.stringify(login))
        const password = formData.get('password')?.toString()
        if (login && password) {
            dispatch(loginThunk({login, password}))
        }
    }

    return (
        <>
            <form className={personal.container} onClick={enter}>
                <fieldset className={personal.formContainer}>
                    <img
                        src={ava}
                        alt="alien-icon"
                        className={header.icon}
                    />
                    <Input value={inputValue.name} onChange={handleChange} placeholder='Name' name='name'></Input>
                    <Input value={inputValue.password} onChange={handleChange} placeholder='Password' name='password'></Input>
                    <Input value={inputValue.surname} onChange={handleChange} placeholder='Surname' name='surname'></Input>
                    <Input value={inputValue.phone} onChange={handleChange} placeholder='Phone' name='phone'></Input>
                    <Input value={inputValue.email} onChange={handleChange} placeholder='Email' name='email'></Input>
                    <Input value={inputValue.birthday} onChange={handleChange} placeholder='Date of Birth' name='birthday'></Input>
                    <Input value={inputValue.gender} onChange={handleChange} placeholder='Gender' name='gender'></Input>
                    <Input value={inputValue.city} onChange={handleChange} placeholder='City' name='city'></Input>
                    <Button type="submit" className={bonuses.button}>Login</Button>
                </fieldset>
            </form>
            <div className={personal.imgContent}>
            {avatars.map((i) => (
                <div className={personal.avatarsContainer} >
                    <div className='border'>
                        <img src={i.img} className={personal.avatar} onClick={choseIt} alt='icon'/>
                    </div>
                </div>
            ))}
                </div>




        </>
    )
}
