import React from 'react';
import { ImageType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ImageType,
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