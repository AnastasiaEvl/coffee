import {useEffect, useState} from "react";
import content from '../Content/content.module.css'
import bonuses from "../Bonuses/bonuses.module.css";
import axios from "axios";

interface IData {
    title: string,
    image: any
}

export const Content = () => {
    const [data, setData] = useState<IData[]>([]);
    const [ice, setIce] = useState<IData[]>([])
    const [cakes,setCakes] =useState<IData[]>([])

    const getData = async () => {
        const resp = await fetch('https://api.sampleapis.com/coffee/hot');
        const response = await fetch('https://api.sampleapis.com/coffee/iced')
        const json = await resp.json();
        const iced = await response.json()
        setData(json);
        setIce(iced)
    }


    // const options = {
    //     method: 'GET',
    //     url: 'https://the-birthday-cake-db.p.rapidapi.com/',
    //     headers: {
    //         'X-RapidAPI-Key': '5989376f6dmsha95e34f742862bap12e447jsnf07706021cfd',
    //         'X-RapidAPI-Host': 'the-birthday-cake-db.p.rapidapi.com'
    //     }
    // };

    // const getCakes = async()=> {
    //     try {
    //         const response = await axios.request(options);
    //         setCakes(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }



    useEffect(() => {
        getData();
        // getCakes()
    }, []);

    return (
        <>
            <div className={content.title}>
                <button className={bonuses.button}>Hot Coffee</button>
                <button className={bonuses.button}>Cold Drinks</button>
                <button className={bonuses.button}>Cakes</button>
            </div>

                <h2>HOT COFFEE</h2>
            <div className={content.container}>
                {data.map((e, index) => (<div key={index}>
                    <h2>{e.title}</h2>
                    <img className={content.card} src={e.image}/>
                </div>))}
            </div>
                <h2>COLD DRINKS</h2>
            <div className={content.container}>
                {ice.map((e, index) => (<div key={index}>
                    <h2>{e.title}</h2>
                    <img className={content.card} src={e.image}/>
                </div>))}
            </div>
            {/*<h2>CAKES</h2>*/}
            {/*<div className={content.container}>*/}
            {/*    {cakes.map((e, index) => (<div key={index}>*/}
            {/*        <h2>{e.title}</h2>*/}
            {/*        <img className={content.card} src={e.image}/>*/}
            {/*    </div>))}*/}
            {/*</div>*/}
        </>
    )
}
