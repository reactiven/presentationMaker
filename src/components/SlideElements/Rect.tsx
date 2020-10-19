import React from 'react';
import { ElementStyleType, ShapeType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ShapeType,
    style: ElementStyleType,
}

function Rect(props: PropsType) {
    const style = {...props.style}
    const data = {...props.data}
    const viewBox = [0, 0, style.width, style.height]
    return (
        <svg 
          style={style}
          viewBox={String(viewBox)}
          className="element"
        >
          <rect 
            x="0"
            y="0"
            width={style.width}
            height={style.height}
            fill={data.fillColor}
            stroke={data.strokeColor}
            strokeWidth="5"
          />
        </svg>
      )
}

export {
    Rect,
}