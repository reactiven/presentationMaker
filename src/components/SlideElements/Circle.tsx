import React from 'react';
import { ElementStyleType, ShapeType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ShapeType,
    width: number,
    height: number,
}

function Circle(props: PropsType) {
    const {
        width,
        height,
    } = props
    const data = {...props.data}
    const viewBox = [0, 0, width, height]
    return(
        <svg 
            viewBox={String(viewBox)}
        >
            <circle 
                r={width/2 - 5} 
                cx={width/2} 
                cy={height/2}
                fill={data.fillColor} 
                stroke={data.strokeColor}
                stroke-width="5"
            />
        </svg>
    )
}

export {
    Circle,
}