import React from "react";
import styles from './Button_TwoState.module.css'
import {Button} from "./Button";

type PropsType = {
    img: any,
    onClick: (value: boolean) => any,
    checked: boolean,
}

function Button_TwoState(props: PropsType) {

    function onClick() {
        props.onClick(!props.checked)
    }

    const className = `${styles.button} ${props.checked ? styles.buttonChecked : ''}`

    return (
        <Button
            type={"border-none"}
            onClick={onClick}
            img={props.img}
            className={className}
        />
    )
}

export {
    Button_TwoState,
}