import React from 'react';
import './Element.css';
import {ColorStyleType} from "./Shape";

type PropsType = {
    style: ColorStyleType,
    width: number,
    height: number,
}

function Rect(props: PropsType) {
    const style = {...props.style}
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
    Rect,
}