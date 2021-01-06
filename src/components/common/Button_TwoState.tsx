import React from "react";
import styles from './Button_TwoState.module.css'
import {Button} from "./Button";

type PropsType = {
    img: any,
    onClick: (value: boolean) => any,
    checked: boolean,
    tooltipText?: string,
}

function Button_TwoState({
    img,
    checked,
    onClick,
    tooltipText,
}: PropsType) {
    const className = `${styles.button} ${checked ? styles.buttonChecked : ''}`

    return (
        <Button
            type={"border-none"}
            onClick={() => onClick(!checked)}
            img={img}
            className={className}
            tooltipText={tooltipText}
        />
    )
}

export {
    Button_TwoState,
}