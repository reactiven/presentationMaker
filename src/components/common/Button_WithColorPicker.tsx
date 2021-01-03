import React, {useEffect, useRef, useState} from "react";

import styles from './Button_WithColorPicker.module.css';
import {Button} from "./Button";

type ButtonWithColorPickerProps = {
    img?: any,
    onChange: (value: string) => any,
    value: string,
}

function Button_WithColorPicker(props: ButtonWithColorPickerProps): JSX.Element {
    const [value, setValue] = useState(props.value)
    const inputRef = useRef<HTMLInputElement>(null)

    function onInput(event: any) {
        if (inputRef.current)
        {
            setValue(event.currentTarget.value)
            props.onChange(event.currentTarget.value)
            inputRef.current.blur()
        }
    }
    
    function onClick() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    useEffect(() => {
        setValue(props.value)
        if (inputRef.current) {
            inputRef.current.value = props.value
        }

    }, [props.value])

    return(
        <div className={styles.colorPickerContainer}>
            <Button
                type={"border-none"}
                onClick={onClick}
                img={props.img}
                className={styles.colorPickerButton}
            />
            <input type='color' ref={inputRef} onInput={onInput} defaultValue={value} className={styles.colorPicker}/>
        </div>
    )
}

export {
    Button_WithColorPicker,
}