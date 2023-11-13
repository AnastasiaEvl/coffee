import React, {ButtonHTMLAttributes} from "react";


export const Button = (props:ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button onClick={props.onClick} className={props.className} type={props.type}>
            {props.children}
        </button>
    )
}
