import React from 'react';
import { ElementStyleType, SlideElementType } from '../../Entity/types';
import { ImageBlock } from './Image';
import { Shape } from './Shape';
import { Textbox } from './Textbox';
import './Element.css';
import { isImage } from '../../Entity/Image';
import { isShape } from '../../Entity/Shape';
import { isTextBox } from '../../Entity/TextBox';
import { dispatch } from '../../state/state-manager';
import { addElementToSelected, selectElement } from '../../Entity/SlideElement';

type ElementPropsType = {
    element: SlideElementType,
    isSelected: boolean,
    index: number,
}
function SlideElement(props: ElementPropsType) {
    const element = {...props.element}
    const style = {
        top: element.yPos ? element.yPos : 215 - element.height / 2,
        left: element.xPos ? element.xPos : 380 - element.width / 2,
        height: element.height,
        width: element.width,
    }
    const className = `element ${props.isSelected ? 'element_selected' : ''}`

    function onClick(event: any) {
        event.preventDefault()
        if (event.ctrlKey)
        {
            dispatch(addElementToSelected, {
                elementId: element.elementId
            })
        }
        else
        {
            dispatch(selectElement, {
                elementId: element.elementId
            })
        }
    }

    return(
        <div style={style} className={className} onClick={onClick}>
            {props.isSelected && resizeHandlers()} 
            {renderElement(element, style)}
        </div>
    )
}

function resizeHandlers() {
    return(
        <div>
            <div className='resize-handle resize-handle-tl'></div>
            <div className='resize-handle resize-handle-tr'></div>
            <div className='resize-handle resize-handle-bl'></div>
            <div className='resize-handle resize-handle-br'></div>  
            <div className='resize-handle resize-handle-ts'></div>
            <div className='resize-handle resize-handle-rs'></div>
            <div className='resize-handle resize-handle-bs'></div>
            <div className='resize-handle resize-handle-ls'></div> 
        </div>
    )
}

function renderElement(element: SlideElementType, style: ElementStyleType) {
    switch (element.type) {
        case 'shape':
            if (isShape(element.dataElement))
            {
                return <Shape
                    data={element.dataElement}
                    width={style.width}
                    height={style.height}    
                />
            }
            return null
        case 'image':
            if (isImage(element.dataElement))
            {
                return <ImageBlock
                    data={element.dataElement}
                />
            }
            return null
        case 'textBox':
            if (isTextBox(element.dataElement))
            {
                return <Textbox
                    data={element.dataElement}
                />
            }
            return null
        default:
            return null
    }
}

export {
    SlideElement,
}