import React, {useEffect, useRef, useState} from "react";

import styles from './Button_WithColorPicker.module.css';
import {Button} from "./Button";
import {cleanExternalLayer} from "../../common/externalLayers";

type ButtonWithColorPickerProps = {
    img?: any,
    onChange: (value: string) => any,
    value: string,
    tooltipText?: string,
}

function Button_WithColorPicker({
    value,
    onChange,
    img,
    tooltipText,
}: ButtonWithColorPickerProps): JSX.Element {
    const [color, setColor] = useState(value)
    const inputRef = useRef<HTMLInputElement>(null)

    function onInput(event: any) {
        if (inputRef.current)
        {
            setColor(event.currentTarget.value)
            onChange(event.currentTarget.value)
            inputRef.current.blur()
        }
    }
    
    function onClick() {
        if (inputRef.current) {
            cleanExternalLayer('tooltip')
            inputRef.current.click()
        }
    }

    useEffect(() => {
        setColor(value)
        if (inputRef.current) {
            inputRef.current.value = value
        }

    }, [value])

    return(
        <div className={styles.colorPickerContainer}>
            <Button
                type={"border-none"}
                onClick={onClick}
                img={img}
                className={styles.colorPickerButton}
                tooltipText={tooltipText}
            />
            <input
                type='color'
                ref={inputRef}
                onInput={onInput}
                defaultValue={color}
                className={styles.colorPicker}
            />
        </div>
    )
}

export {
    Button_WithColorPicker,
}