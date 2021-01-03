import React from 'react';
import './Element.module.css';
import {ColorStyleType} from "./Shape";

type PropsType = {
    style: ColorStyleType,
    width: number,
    height: number,
}

function Circle(props: PropsType) {
    const {
        width,
        height,
    } = props
    const style = {...props.style}
    const viewBox = [0, 0, width, height]
    return(
        <svg 
            viewBox={String(viewBox)}
        >
            <ellipse
                rx={width / 2 - 5}
                ry={height /2 - 5}
                cx={width/2}
                cy={height/2}
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
    Circle,
}