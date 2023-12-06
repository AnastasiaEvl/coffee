import heart from '../../assets/icons/heart.png'
import slider1 from '../../assets/images/slider1.jpg'
import winterStyle from "../WinterMenu/winter.module.css";
export const LoyaltySystem=()=>{
    return(
        <div className={winterStyle.container}>
            <img src ={slider1} alt='cafe-image' className = {winterStyle.image}/>
            <h2>Loyalty System</h2>
            <p>We are glad to see you at our app!There are our loyalty system:
            </p>
            <ul>
                <li className={winterStyle.item}>
                    3% cashback from every purchase
                </li>
                <li className={winterStyle.item}>
                    5% cashback in case of 400rub bonuses
                </li>
                <li className={winterStyle.item}>
                    7% cashback in case of 500rub bonuses
                </li>

            </ul>

            <p>Bonuses will not be lost and will be with you forever as The Coffee
            <img src ={heart} alt='heart-icon' className = {winterStyle.imgLi}/></p>
        </div>
    )
}
