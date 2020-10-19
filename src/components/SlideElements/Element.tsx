import React from 'react';
import { SlideElementType } from '../../Entity/types';
import { ImageBlock } from './Image';
import { Shape } from './Shape';
import { Textbox } from './Textbox';

type ElementPropsType = {
    element: SlideElementType,
    index: number,
}
function SlideElement(props: ElementPropsType) {
    const element = {...props.element}
    const style = {
        top: element.yPos,
        left: element.xPos,
        height: element.height,
        width: element.width,
    }
    switch (element.type) {
        case 'shape':
            return <Shape
                data={element.dataElement}
                style={style}    
            />
        case 'image':
            return <ImageBlock
                data={element.dataElement}
                style={style}
            />
        case 'textBox':
            return <Textbox
                data={element.dataElement}
                style={style}
            />
        default:
            return null
    }
}

export {
    SlideElement,
}