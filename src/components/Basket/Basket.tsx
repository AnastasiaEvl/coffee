import basket from './basket.module.css'
import {useNavigate} from "react-router-dom";
import {Button} from "../../shared/Button/Button";
import bonuses from "../Bonuses/bonuses.module.css";

interface IBasket {
    title?: string
    0?: any
    1?: any
    image: string
}

export const Basket = () => {
    const navigate = useNavigate()

    // @ts-ignore
    const x: IBasket[] = JSON.parse(localStorage.getItem('basket'))

    function choseLocation() {
        navigate('/map')
    }

    function bank() {
        navigate('/bank')
    }

    // @ts-ignore
    const res = x.reduce((acc, curr)=> {
       return acc + curr[1]
    },0)

    const clear=()=>{
        localStorage.removeItem('basket')
        navigate('/')
    }


    return (
        <div className={basket.content}>
            <Button onClick={clear}>Clear basket</Button>
            <h2>Basket</h2>
            {x.map((i, index) => (
                <div key={index} className={basket.container}>
                    <div><img src={i[0].image} alt='coffee-photo' className={basket.img}/></div>
                    <div> {i[0].title}</div>
                    <div>{i[1]} USD</div>
                </div>
            ))}
            <h2>Take away</h2>
            {!(localStorage.getItem('cafe-location')) ? (
                <div onClick={choseLocation}>Chose location</div>
            ) : (<div style={{display: 'flex', gap: '1rem'}}>
                    <div>
                        <p>{localStorage.getItem('cafe-location')}</p>
                    </div>
                    <div onClick={choseLocation}>
                        <Button>Change Location</Button></div>
                </div>
            )}

            <Button>Chose time</Button>

            <h2>Payment</h2>
            <p>upon receipt</p>
            <Button onClick={bank}>by card</Button>
            <Button>Promocode</Button>

            <h2>Sum for payment</h2>
            <p> {res} USD</p>


            <Button>Purchase {res} USD</Button>

        </div>
    )
}
