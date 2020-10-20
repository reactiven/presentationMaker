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
            {props.isSelected &&  <div className='resize-handle resize-handle-tl'></div>}
            {props.isSelected &&  <div className='resize-handle resize-handle-tr'></div>}
            {props.isSelected &&  <div className='resize-handle resize-handle-bl'></div>}
            {props.isSelected &&  <div className='resize-handle resize-handle-br'></div>}  
            {props.isSelected &&  <div className='resize-handle resize-handle-ts'></div>}
            {props.isSelected &&  <div className='resize-handle resize-handle-rs'></div>}
            {props.isSelected &&  <div className='resize-handle resize-handle-bs'></div>}
            {props.isSelected &&  <div className='resize-handle resize-handle-ls'></div>} 
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