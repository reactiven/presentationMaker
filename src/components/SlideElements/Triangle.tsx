import React from 'react';
import { ElementStyleType, ShapeType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ShapeType,
    style: ElementStyleType,
}

function Triangle(props: PropsType) {
    const style = {...props.style}
    const data = {...props.data}
    const viewBox = [0, 0, style.width, style.height]
    const points = `5,${style.height - 5} ${style.width/2},5 ${style.width-5},${style.height-5}`
    return(
        <svg
            style={style}
            viewBox={String(viewBox)}
            className="element"
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