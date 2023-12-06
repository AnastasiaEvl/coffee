import winterCup from '../../assets/images/winter_cup.jpg'
import tree from '../../assets/icons/tree.png'
import winterStyle from './winter.module.css'

export const WinterMenu = ()=>{
    return(
        <div className={winterStyle.container}>
            <img src ={winterCup} alt='winter-cap-image' className = {winterStyle.image}/>
            <h2 className={winterStyle.title}>Winter Menu</h2>

            <p className = {winterStyle.text}>It's time to get warm!Winter season is coming with hot drinks
                and talking with your friends in our cosy cafes! </p>
            <p className = {winterStyle.text}>Try to taste our favourite winter drinks:</p>
            <ul className={winterStyle.list}>
                <li className={winterStyle.item}>
                    <img src={tree} alt='icon-new-year-tree' className = {winterStyle.imgLi}/>
                    pomegranate-coffee mulled wine
                </li>
                <li className={winterStyle.item}>
                    <img src={tree} alt='icon-new-year-tree' className = {winterStyle.imgLi}/>
                    white cocoa coconut-lime
                </li>
                <li className={winterStyle.item}>
                    <img src={tree} alt='icon-new-year-tree' className = {winterStyle.imgLi}/>
                    spicy tangerine macachino
                </li>
            </ul>

            <p className = {winterStyle.smallText}>*from 1 december to 29 february</p>

        </div>
    )
}
