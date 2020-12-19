import React from 'react';
import { ImageType } from '../../Entity/types';
import './Image.css';

type PropsType = {
    data: ImageType,
    borderWidth: string|null,
    borderColor: string|null,
}

function ImageBlock(props: PropsType) {
    //TODO: Сделать валидацию ссылки 
    const data = {...props.data}
    const style = {
        background: `url('${data.src}') no-repeat center/100% 100%`,
        border: `${props.borderWidth} solid ${props.borderColor}`,
    }

    return(
        <div className={'slide-element-image'} style={style}></div>
    )
}

export {
    ImageBlock,
}