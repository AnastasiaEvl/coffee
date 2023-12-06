import coffeWithPhone from '../../assets/images/coffee-phone.jpg'
import winterStyle from "../WinterMenu/winter.module.css";
export const PointsForRegistration =()=>{
    return(<div className={winterStyle.container}>
        <img src={coffeWithPhone} alt='coffee-with-phone-image' className = {winterStyle.image}/>
        <h2> Points for registration!</h2>
        <p>For every new user we present 5 points to your account. 1 point = 1 rub</p>
        <p>Just show your qr-code in app after purchasing</p>
    </div>)
}
