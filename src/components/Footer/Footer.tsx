import footer from './footer.module.css'
import phone from '../../assets/icons/phone.png'
import mail from '../../assets/icons/mail.png'
import header from "../Header/header.module.css";

export const Footer = () => {
    return (
        <div className={footer.container}>
            <h4 className={footer.title}>
                The Coffee
            </h4>
            <address className={footer.address}>
                <div><img src={phone} alt='phone-icon' className={header.logo}/> <a
                    href="tel:+74952680449" className={footer.icon}>+74952680449</a></div>
                <div><img src={mail} alt='mail-icon' className={header.logo} /> <a
                    href="mailto: coffee@mail.com " className={footer.icon}>coffee@mail.com</a></div>
            </address>
        </div>
    )
}
