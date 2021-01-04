import React from 'react';
import './Element.module.css';
import {ColorStyleType} from "./Shape";

type PropsType = {
    style: ColorStyleType,
    width: number,
    height: number,
}

function Triangle({
    width,
    height,
    style,
}: PropsType) {
    const viewBox = [0, 0, width, height]
    const points = `5,${height - 5} ${width/2},5 ${width-5},${height-5}`
    return(
        <svg
            viewBox={String(viewBox)}
        >
            <polygon 
                points={points}
                fill={style.fill
                    ? style.fill
                    : 'transparent'}
                stroke={style.strokeColor
                    ? style.strokeColor
                    : '#000000'}
                strokeWidth={style.strokeWidth
                    ? style.strokeWidth
                    : '1'}
            />
        </svg>
    )
}

export {
    Triangle,
}