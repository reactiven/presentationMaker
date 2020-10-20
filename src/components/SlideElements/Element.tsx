import React, { useRef } from 'react';
import { ElementStyleType, SlideElementType } from '../../Entity/types';
import { ImageBlock } from './Image';
import { Shape } from './Shape';
import { Textbox } from './Textbox';
import './Element.css';

type ElementPropsType = {
    element: SlideElementType,
    isSelected: boolean,
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

    const className = props.isSelected ? 'element_selected' : 'element'
    return(
        <div style={style} className={className}>
            {renderElement(element, style)}
        </div>
    )
}

function renderElement(element: SlideElementType, style: ElementStyleType) {
    switch (element.type) {
        case 'shape':
            return <Shape
                data={element.dataElement}
                width={style.width}
                height={style.height}    
            />
        case 'image':
            return <ImageBlock
                data={element.dataElement}
            />
        case 'textBox':
            return <Textbox
                data={element.dataElement}
            />
        default:
            return null
    }
}

export {
    SlideElement,
}