import React, {ButtonHTMLAttributes} from "react";


export const Button = (props:ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button onClick={props.onClick} className={props.className} type={props.type} disabled={props.disabled} id={props.id}>
            {props.children}
        </button>
    )
}
