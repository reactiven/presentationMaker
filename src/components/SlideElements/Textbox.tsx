import React from 'react';
import { TextBoxType } from '../../Entity/types';
import './Textbox.css';

type PropsType = {
    data: TextBoxType,
}

function Textbox(props: PropsType) {
    const data = {...props.data}
    const inputStyle = {
        fontSize: data.font.fontSize,
        fontStyle: data.font.italic ? 'italic' : 'normal',
        fontFamily: data.font.fontStyle,
    }
    return(
        <div className='textBox-block richtext' style={inputStyle} contentEditable='true' suppressContentEditableWarning={true}>
            {data.text}
        </div>
    )
}

export {
    Textbox,
}