import React from 'react';
import { ShapeType } from '../../Entity/types';
import './Element.css';
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
            <circle 
                r={width/2 - 5} 
                cx={width/2} 
                cy={height/2}
                fill={String(style.fill)}
                stroke={String(style.strokeColor)}
                strokeWidth={String(style.strokeWidth)}
            />
        </svg>
    )
}

export {
    Circle,
}