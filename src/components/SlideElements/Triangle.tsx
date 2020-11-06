import React from 'react';
import { ShapeType } from '../../Entity/types';
import './Element.css';
import {ColorStyleType} from "./Shape";

type PropsType = {
    style: ColorStyleType,
    width: number,
    height: number,
}

function Triangle(props: PropsType) {
    const {
        width,
        height,
      } = props
    const style = {...props.style}
    const viewBox = [0, 0, width, height]
    const points = `5,${height - 5} ${width/2},5 ${width-5},${height-5}`
    return(
        <svg
            viewBox={String(viewBox)}
        >
            <polygon 
                points={points}
                fill={String(style.fill)}
                stroke={String(style.strokeColor)}
                strokeWidth={String(style.strokeWidth)}
            />
        </svg>
    )
}

export {
    Triangle,
}