import { ElementStyleType } from "../../Entity/types";
import React from 'react';
import './Element.css';

type PropsType = {
    data: any,
    style: ElementStyleType,
}

function Textbox(props: PropsType) {
    const style = {...props.style}
    const data = {...props.data}
    const inputStyle = {
        ...style,
        fontSize: data.font.fontSize,
        fontStyle: data.font.italic ? 'italic' : 'normal',
        fontFamily: data.font.fontStyle,
    }
    return(
        <div
            className='element'
            style={inputStyle}
        >
            {data.text}
        </div>
    )
}

export {
    Textbox,
}