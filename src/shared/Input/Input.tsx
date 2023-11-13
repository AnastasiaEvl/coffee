import {InputHTMLAttributes} from "react";
import inputStyle from './input.module.css'


export const Input = (props:InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            <label htmlFor={props.id}></label>
            <input id = {props.id} {...props} className={inputStyle.input}/>
        </>
    )
}
