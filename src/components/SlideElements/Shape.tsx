import React from 'react';
import { ElementStyleType } from '../../Entity/types';
import { Circle } from './Circle';
import { Rect } from './Rect';
import { Triangle } from './Triangle';

type PropsType = {
    data: any,
    width: number,
    height: number,
}

function Shape(props: PropsType) {

    switch (props.data.shapeType) {
        case 'rect':
            return <Rect data={props.data} width={props.width} height={props.height} />
        case 'circle':
            return <Circle data={props.data} width={props.width} height={props.height} />
        case 'triangle':
            return <Triangle data={props.data} width={props.width} height={props.height} />
        default:
            return null
    }
}

export {
    Shape,
}