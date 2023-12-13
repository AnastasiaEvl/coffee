import logo from '../../assets/icons/logo.png'
import enter from './enter.module.css'
import {useNavigate} from "react-router-dom";

export const Enter = () => {

    const navigate = useNavigate()

    function navigateToMainPage():void {
        navigate('/main')
    }

    setTimeout(navigateToMainPage, 2500);

    return (
        <div className={enter.container}>
            <h1 className={enter.title}>Welcome to The Coffee!</h1>
            <img src={logo} alt='logo' className={enter.logotype}/>

        </div>
    )
}
