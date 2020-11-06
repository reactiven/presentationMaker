import React from "react";
import './Button_TwoState.css'

type PropsType = {
    img: any,
    onClick: (value: boolean) => any,
    checked: boolean,
}

function Button_TwoState(props: PropsType) {

    function onClick() {
        props.onClick(!props.checked)
    }

    const className = `button ${props.checked ? 'button_checked': ''}`

    return (
        <button className={className} onClick={onClick}>
            {props.img && <img src={props.img} alt='button-logo' className='button-image'/>}
        </button>
    )
}

export {
    Button_TwoState,
}