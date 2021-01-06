import React from 'react';
import {ShapeTypeType} from '../../../../Entity/types';
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

function Shape({
    height,
    width,
    colorStyle,
    type,
}: PropsType) {

    switch (type) {
        case 'rect':
            return <Rect style={colorStyle} width={width} height={height} />
        case 'circle':
            return <Circle style={colorStyle} width={width} height={height} />
        case 'triangle':
            return <Triangle style={colorStyle} width={width} height={height} />
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