import React, {useContext, useRef} from 'react';
import { TextBoxType } from '../../../../Entity/types';
import styles from './Textbox.module.css';
import {StoreType} from "../../../../state/store";
import {StoreContext} from "../../../../state/storeContext";
import {presentationInfoActions} from "../../../../state/presentationInfoReducer";
import {dispatchDecorator} from "../../../../state/dispatchDecarator";
import {useEventHandler} from "../../../../common/hooks/useEventHandler";

type PropsType = {
    textboxId: number,
    data: TextBoxType,
    background: string|null,
    borderWidth: string|null,
    borderColor: string|null,
}

function Textbox({
    borderWidth,
    borderColor,
    data,
    textboxId,
    background,
}: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const fontWeight: 'bold'|'normal' = data.font.bold ? 'bold' : 'normal'
    const fontDecoration: 'underline'|'none' = data.font.underline ? 'underline' : 'none'
    const inputStyle = {
        fontSize: `${data.font.fontSize}px`,
        fontStyle: data.font.italic ? 'italic' : 'normal',
        fontFamily: data.font.fontStyle,
        color: data.font.fontColor,
        background: background
            ? background
            : 'transparent',
        border: `${borderWidth} solid ${borderColor}`,
        fontWeight,
        textDecoration: fontDecoration,
    }

    function onChange() {
        if(inputRef.current)
        {
            const value = inputRef.current.value
            dispatchDecorator(store, () => presentationInfoActions.updateTextBox(
                textboxId,
                value,
            ))
        }
    }

    useEventHandler('blur', inputRef, onChange)

    return(
        <textarea
            ref={inputRef}
            className={`${styles.textBoxBlock} ${styles.richtext}`}
            style={inputStyle}
            defaultValue={data.text || ''}
        >
        </textarea>
    )
}

export {
    Textbox,
}