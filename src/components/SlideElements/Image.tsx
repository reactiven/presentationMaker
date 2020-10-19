import React from 'react';
import { ElementStyleType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: any,
    style: ElementStyleType,
}

function ImageBlock(props: PropsType) {
    const style = {...props.style}
    const data = {...props.data}
    return (
        <img 
            src={data.src} 
            style={style}
            className='element'
            alt='element'
        />
    )
}

export {
    ImageBlock,
}