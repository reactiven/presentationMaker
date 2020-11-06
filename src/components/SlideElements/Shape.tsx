import React from 'react';
import {ShapeType, ShapeTypeType} from '../../Entity/types';
import { Circle } from './Circle';
import { Rect } from './Rect';
import { Triangle } from './Triangle';

type ColorStyleType = {
    fill: string|null,
    strokeColor: string|null,
    strokeWidth: string|null,
}

type PropsType = {
    type: ShapeTypeType,
    colorStyle: ColorStyleType,
    width: number,
    height: number,
}

function Shape(props: PropsType) {

    switch (props.type) {
        case 'rect':
            return <Rect style={props.colorStyle} width={props.width} height={props.height} />
        case 'circle':
            return <Circle style={props.colorStyle} width={props.width} height={props.height} />
        case 'triangle':
            return <Triangle style={props.colorStyle} width={props.width} height={props.height} />
        default:
            return null
    }
}

export {
    Shape,
}

export type {
    ColorStyleType,
}