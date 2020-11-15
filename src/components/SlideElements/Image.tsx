import React from 'react';
import { ImageType } from '../../Entity/types';
import './Image.css';

type PropsType = {
    data: ImageType,
}

function ImageBlock(props: PropsType) {
    const data = {...props.data}
    const style = {
        background: `url('${data.src}') no-repeat center/100%`
    }

    return(
        <div className={'slide-element-image'} style={style}></div>
    )
}

export {
    ImageBlock,
}