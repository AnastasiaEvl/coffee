import logo from '../../assets/icons/logo.png'
import enter from './enter.module.css'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
export const Enter=()=>{

    const navigate = useNavigate()

    function nav(){
        navigate('/main')
    }
    // @ts-ignore
    setTimeout(nav, 2500);

    return (
        <div className={enter.container}>
            <h1 className={enter.title}>Welcome to The Coffee!</h1>
            <img src={logo} alt='logo' className={enter.logotype}/>

        </div>
    )
}
