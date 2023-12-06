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
import useInput from '../../hooks/UseValidation';
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
        email: '',
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

    const email = useInput(inputValue.email, {isEmpty: true, isEmail: true});
    const password = useInput(inputValue.password,{isEmpty: true, minLength: 8});
    const name = useInput( inputValue.name,{isEmpty: true});

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
        <div className={personal.mainContainer}>
            <form className={personal.container} onClick={enter}>
                <fieldset className={personal.formContainer}>
                    <img
                        src={ava}
                        alt="alien-icon"
                        className={header.icon}
                    />
                    <Input value={inputValue.name} onChange={handleChange} placeholder='Name' name='name'  onBlur={e => name.onBlur(e)}></Input>
                    {name.isDirty && name.isEmpty && (
                        <p>Поле не может быть пустым</p>
                    )}
                    <Input value={inputValue.password} onChange={handleChange} placeholder='Password' name='password'  onBlur={e => password.onBlur(e)}></Input>
                    {(password.isDirty && password.isEmpty) && (
                        <p>Поле не может быть пустым</p>
                    ) ||
                        (password.isDirty && password.minLengthError) && (
                        <p>Слишком короткий пароль</p>
                    )}
                    <Input value={inputValue.email} onChange={handleChange} placeholder='Email' name='email' onBlur={e => email.onBlur(e)}></Input>
                    {(email.isDirty && email.isEmpty) && (
                        <p>Поле не может быть пустым</p>
                    ) ||
                        (email.isDirty && email.emailError) && (
                        <p>Некорректный email</p>
                    )}
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

        </div>
    )
}
