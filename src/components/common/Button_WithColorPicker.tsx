import React, {useEffect, useRef, useState} from "react";

import './Button_WithColorPicker.css';

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
    
    function onClick(event: any) {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return(
        <div className='color-picker-container' onClick={onClick}>
            {<img src={props.img} alt='button-logo' className='color-picker-image'/>}
            <input type='color' ref={inputRef} onInput={onInput} value={value} className='color-picker'/>
        </div>
    )
}

export {
    Button_WithColorPicker,
}