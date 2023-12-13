import {Button} from "../Button/Button";
import bonuses from "../../simple/Bonuses/bonuses.module.css";
import back from "../../../assets/icons/toLeft.png";
import React from "react";
import {useNavigate} from "react-router-dom";

export const BackButton =()=>{

    const navigate = useNavigate()
    const handlerBack = ():void => {
        navigate(-1)
    }
    return (
        <Button onClick={handlerBack} className={bonuses.backBtn}>
            <img src={back} alt='' className={bonuses.imgLeftBtn}/>
        </Button>
    );
}
