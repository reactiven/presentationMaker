import React, {useContext, useRef} from 'react';
import { TextBoxType } from '../../Entity/types';
import './Textbox.css';
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../state/dispatchDecarator";

type PropsType = {
    textboxId: number,
    data: TextBoxType,
    background: string|null,
    borderWidth: string|null,
    borderColor: string|null,
}

function Textbox(props: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
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
            const value = inputRef.current.value
            dispatchDecorator(store, () => presentationInfoActions.updateTextBox(
                props.textboxId,
                value,
            ))
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