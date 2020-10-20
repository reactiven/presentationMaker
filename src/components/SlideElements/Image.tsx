import React from 'react';
import { ElementStyleType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: any,
}

function ImageBlock(props: PropsType) {
    const data = {...props.data}
    return (
        <img 
            src={data.src}
            alt='element'
        />
    )
}

export {
    ImageBlock,
}