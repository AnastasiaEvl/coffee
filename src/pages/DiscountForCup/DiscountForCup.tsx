import cups from '../../assets/images/slider2.jpg'
import cup from '../../assets/icons/cup.png'
import winterStyle from "../WinterMenu/winter.module.css";
export const DiscountForCup=()=>{
    return (
        <div className={winterStyle.container}>
            <img src = {cups} alt='silicone-cups-image' className = {winterStyle.image}/>
            <h2 className={winterStyle.title} >Discount is 10% for coffee in your cup!
            <img src={cup} className = {winterStyle.imgLi} alt='cup-image' /></h2>
            <p>Environmental friendliness - actual trend nowadays</p>
            <p>So we propose discount 10% for coffee in your cup</p>
            <p>Moreover you could buy cups Stojo and Ecoffee Cup in our cafes</p>
        </div>
    )
}
