import {Bonuses} from "./Bonuses";
import {Location} from "./Location";
import {SimpleSlider} from "./Slider";
import {Content} from "./Content";
import {Header} from "./Header";
import ModalAlert from "./Modal/ModalAlert";
import React from "react";
import {useSelector} from "react-redux";
import main from './main.module.css'
import {Video} from "./Video/Video";
import {Footer} from "./Footer/Footer";


export const MainPage = () => {

    // @ts-ignore
    const { isOpen } = useSelector((store) => store.modal);

    return (<>
            {isOpen && <ModalAlert />}
            <Header/>
            <Video/>
            <Bonuses/>
            <Location/>
            <SimpleSlider/>
            <Content/>
            <Footer/>
        </>
    )
}
