import React from 'react';
import { ImageType } from '../../Entity/types';
import styles from './Image.module.css';

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
        <div className={styles.slideElementImage} style={style}></div>
    )
}

export {
    ImageBlock,
}