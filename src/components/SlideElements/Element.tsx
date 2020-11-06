import React, {useEffect, useRef, useState} from 'react';
import { ElementStyleType, SlideElementType } from '../../Entity/types';
import { ImageBlock } from './Image';
import {ColorStyleType, Shape} from './Shape';
import { Textbox } from './Textbox';
import './Element.css';
import { isImage } from '../../Entity/Image';
import { isShape } from '../../Entity/Shape';
import { isTextBox } from '../../Entity/TextBox';
import {useElementsDragNDrop} from "../../viewModel/useDragNDrop";

type ElementPropsType = {
    element: SlideElementType,
    isSelected: boolean,
    index: number,
}

function SlideElement(props: ElementPropsType) {
    const element = {...props.element}

    const elementRef = useRef<HTMLDivElement>(null)

    const [left, top] = useElementsDragNDrop(element, elementRef)

    function getElementBackground() {
        let background = 'none'
        if (isTextBox(element.dataElement)) {
            background = element.background
                ? element.background
                : 'none'
        }
        return background
    }

    function getElementBorder() {
        let border
        if (isTextBox(element.dataElement) || isImage(element.dataElement)) {
            debugger
            const borderWidth = element.borderWidth
            const borderColor = element.borderColor
            border = `${borderWidth} solid ${borderColor}`
        }
        return border
    }

    const style = {
        top: top !== null
            ? top
            : 215 - element.height / 2,
        left: left !== null
            ? left
            : 380 - element.width / 2,
        height: element.height,
        width: element.width,
        background: getElementBackground(),
        border: getElementBorder(),
    }
    const className = `element ${props.isSelected ? 'element_selected' : ''}`

    function onClick(event: any) {
        event.preventDefault()
    }

    return(
        <div style={style} className={className} onClick={onClick} ref={elementRef}>
            {props.isSelected && ResizeHandlers(element.elementId)}
            {renderElement(element, style)}
        </div>
    )
}

function ResizeHandlers(elementId: number) {
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
    const colorStyle: ColorStyleType = {
        fill: element.background,
        strokeWidth: element.borderWidth,
        strokeColor: element.borderColor,
    }
    switch (element.type) {
        case 'shape':
            if (isShape(element.dataElement))
            {
                return <Shape
                    type={element.dataElement.shapeType}
                    colorStyle={colorStyle}
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
                    background={element.background}
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