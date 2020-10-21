import React from 'react';
import { ShapeType } from '../../Entity/types';
import './Element.css';

type PropsType = {
    data: ShapeType,
    width: number,
    height: number,
}

function Rect(props: PropsType) {
    const data = {...props.data}
    const {
      width,
      height,
    } = props
    const viewBox = [0, 0, width, height]
    return (
        <svg 
          viewBox={String(viewBox)}
        >
          <rect 
            x="0"
            y="0"
            width={width}
            height={height}
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