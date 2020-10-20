import React from 'react';
import { ElementStyleType, ShapeType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ShapeType,
    width: number,
    height: number,
}

function Triangle(props: PropsType) {
    const {
        width,
        height,
      } = props
    const data = {...props.data}
    const viewBox = [0, 0, width, height]
    const points = `5,${height - 5} ${width/2},5 ${width-5},${height-5}`
    return(
        <svg
            viewBox={String(viewBox)}
        >
            <polygon 
                points={points}
                fill={data.fillColor} 
                stroke={data.strokeColor} 
                strokeWidth="5"
            />
        </svg>
    )
}

export {
    Triangle,
}