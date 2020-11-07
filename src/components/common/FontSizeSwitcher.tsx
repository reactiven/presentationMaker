import React, {useRef, useState} from "react";
import {Button} from "./Button";
import minus from '../../images/minus.png';
import plus from '../../images/add_new.png';
import './FontSizeSwitcher.css'
import {dispatch} from "../../state/state-manager";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import {SlideElementType} from "../../Entity/types";

type SizeSwitcherProps = {
    textBox: SlideElementType | null,
}

function FontSizeSwitcher(props: SizeSwitcherProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [size, setSize] = useState<number|null>(null)

    function sizeInc() {
        if (props.textBox && isTextBox(props.textBox.dataElement))
        {
            const size = parseInt(props.textBox.dataElement.font.fontSize.replace(/[^\d]/g, ''))
            dispatch(changeFont, {
                newFont: {
                    ...props.textBox.dataElement.font,
                    fontSize: `${size + 1}px`,
                }
            })
            setSize(size)
        }
    }

    function sizeDec() {
        if (props.textBox && isTextBox(props.textBox.dataElement))
        {
            const size = parseInt(props.textBox.dataElement.font.fontSize.replace(/[^\d]/g, ''))
            dispatch(changeFont, {
                newFont: {
                    ...props.textBox.dataElement.font,
                    fontSize: `${size - 1}px`,
                }
            })
            setSize(size)
        }
    }

    function onChange() {
        if (inputRef.current && props.textBox && isTextBox(props.textBox.dataElement)) {
            dispatch(changeFont, {
                newFont: {
                    ...props.textBox.dataElement.font,
                    fontSize: `${inputRef.current.value}px`,
                }
            })
        }
    }

    // setSize(props.textBox && isTextBox(props.textBox.dataElement)
    //     ? parseInt(props.textBox.dataElement.font.fontSize.replace(/[^\d]/g, ''))
    //     : null)

    function getSize() {
        return size !== null
            ? size
            : props.textBox && isTextBox(props.textBox.dataElement)
                ? parseInt(props.textBox.dataElement.font.fontSize.replace(/[^\d]/g, ''))
                : null
    }

    return(
        <div className='switcher-container'>
            <button className='switch-button' onClick={sizeDec}>
                <img src={minus} alt='logo' className='switch-image-button'/>
            </button>
            <input defaultValue={getSize() || ''} className='input-size' ref={inputRef} onInput={onChange}/>
            <button className='switch-button' onClick={sizeInc}>
                <img src={plus} alt='logo' className='switch-image-button'/>
            </button>
        </div>
    )
}

export {
    FontSizeSwitcher,
}