import React from 'react';
import { ElementStyleType, ShapeType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ShapeType,
    style: ElementStyleType,
}

function Circle(props: PropsType) {
    const style = {...props.style}
    const data = {...props.data}
    const viewBox = [0, 0, style.width, style.height]
    return(
        <svg 
            style={style}
            viewBox={String(viewBox)}
            className="element"
        >
            <circle 
                r={style.width/2 - 5} 
                cx={style.width/2} 
                cy={style.height/2}
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