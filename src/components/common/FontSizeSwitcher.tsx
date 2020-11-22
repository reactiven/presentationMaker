import React, {useEffect, useRef, useState} from "react";
import minus from '../../images/minus.png';
import plus from '../../images/add_new.png';
import './FontSizeSwitcher.css'
import {dispatch} from "../../state/state-manager";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import {SlideElementType, TextBoxType} from "../../Entity/types";

type SizeSwitcherProps = {
    textBox: TextBoxType,
}

function FontSizeSwitcher(props: SizeSwitcherProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    function sizeInc() {
        if (props.textBox)
        {
            dispatch(changeFont, {
                newFont: {
                    ...props.textBox.font,
                    fontSize: Number(props.textBox.font.fontSize) + 1,
                }
            })
        }
    }

    function sizeDec() {
        if (props.textBox)
        {
            dispatch(changeFont, {
                newFont: {
                    ...props.textBox.font,
                    fontSize: props.textBox.font.fontSize - 1,
                }
            })
        }
    }

    function onInput() {
        if (inputRef.current && props.textBox) {
            dispatch(changeFont, {
                newFont: {
                    ...props.textBox.font,
                    fontSize: inputRef.current.value,
                }
            })
        }
    }

    useEffect(() => {
        if (props.textBox && inputRef.current) {
            inputRef.current.value = String(props.textBox.font.fontSize)
        }
    }, [inputRef, props.textBox])

    return(
        <div className='switcher-container'>
            <button className='switch-button' onClick={sizeDec}>
                <img src={minus} alt='logo' className='switch-image-button'/>
            </button>
            <input
                defaultValue={String(props.textBox.font.fontSize)}
                className='input-size'
                ref={inputRef}
                onInput={onInput}
            />
            <button className='switch-button' onClick={sizeInc}>
                <img src={plus} alt='logo' className='switch-image-button'/>
            </button>
        </div>
    )
}

export {
    FontSizeSwitcher,
}