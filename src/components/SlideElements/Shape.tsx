import React from 'react';
import { ElementStyleType } from '../../Entity/types';
import { Circle } from './Circle';
import { Rect } from './Rect';
import { Triangle } from './Triangle';

type PropsType = {
    data: any,
    style: ElementStyleType,
}

function Shape(props: PropsType) {

    switch (props.data.shapeType) {
        case 'rect':
            return <Rect data={props.data} style={props.style}/>
        case 'circle':
            return <Circle data={props.data} style={props.style} />
        case 'triangle':
            return <Triangle data={props.data} style={props.style}/>
        default:
            return null
    }
}

export {
    Shape,
}