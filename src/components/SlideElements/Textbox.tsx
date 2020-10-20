import { ElementStyleType } from "../../Entity/types";
import React from 'react';
import './Element.css';

type PropsType = {
    data: any,
}

function Textbox(props: PropsType) {
    const data = {...props.data}
    const inputStyle = {
        fontSize: data.font.fontSize,
        fontStyle: data.font.italic ? 'italic' : 'normal',
        fontFamily: data.font.fontStyle,
    }
    return(
        <div
            style={inputStyle}
        >
            {data.text}
        </div>
    )
}

export {
    Textbox,
}