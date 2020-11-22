import React, {useRef} from 'react';
import { TextBoxType } from '../../Entity/types';
import './Textbox.css';
import {dispatch} from "../../state/state-manager";
import {updateTextBox} from "../../Entity/TextBox";

type PropsType = {
    data: TextBoxType,
    background: string|null,
    borderWidth: string|null,
    borderColor: string|null,
}

function Textbox(props: PropsType) {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const data = {...props.data}
    const fontWeight: 'bold'|'normal' = data.font.bold ? 'bold' : 'normal'
    const fontDecoration: 'underline'|'none' = data.font.underline ? 'underline' : 'none'
    const inputStyle = {
        fontSize: `${data.font.fontSize}px`,
        fontStyle: data.font.italic ? 'italic' : 'normal',
        fontFamily: data.font.fontStyle,
        color: data.font.fontColor,
        background: props.background
            ? props.background
            : 'transparent',
        border: `${props.borderWidth} solid ${props.borderColor}`,
        fontWeight,
        textDecoration: fontDecoration,
    }

    function onChange(event: any) {
        if(inputRef.current)
        {
            dispatch(updateTextBox, {
                text: inputRef.current.value
            })
        }
    }

    return(
        <textarea ref={inputRef}
                  className='textBox-block richtext'
                  style={inputStyle}
                  onBlur={onChange}
                  defaultValue={props.data.text || ''}
        >
        </textarea>
    )
}

export {
    Textbox,
}