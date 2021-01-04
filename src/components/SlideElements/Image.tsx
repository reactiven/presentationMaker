import React from 'react';
import { ImageType } from '../../Entity/types';
import styles from './Image.module.css';

type PropsType = {
    data: ImageType,
    borderWidth: string|null,
    borderColor: string|null,
}

function ImageBlock({
    data,
    borderColor,
    borderWidth,
}: PropsType) {
    //TODO: Сделать валидацию ссылки
    const style = {
        background: `url('${data.src}') no-repeat center/100% 100%`,
        border: `${borderWidth} solid ${borderColor}`,
    }

    return(
        <div className={styles.slideElementImage} style={style}></div>
    )
}

export {
    ImageBlock,
}