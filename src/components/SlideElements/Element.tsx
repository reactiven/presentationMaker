import React, {useEffect, useRef, useState} from 'react';
import { ElementStyleType, SlideElementType } from '../../Entity/types';
import { ImageBlock } from './Image';
import { Shape } from './Shape';
import { Textbox } from './Textbox';
import './Element.css';
import { isImage } from '../../Entity/Image';
import { isShape } from '../../Entity/Shape';
import { isTextBox } from '../../Entity/TextBox';
import { dispatch } from '../../state/state-manager';
import {addElementToSelected, moveElement, selectElement} from '../../Entity/SlideElement';
import {getParentRelativePointerСoordinates } from '../../viewModel/getRelativePointerCoordinates';

type ElementPropsType = {
    element: SlideElementType,
    isSelected: boolean,
    index: number,
}

function SlideElement(props: ElementPropsType) {
    const element = {...props.element}
    const [left, setLeft] = useState(element.xPos)
    const [top, setTop] = useState(element.yPos)
    // const [topOffset, setTopOffset] = useState(0)

    const elementRef = useRef<HTMLDivElement>(null)

    function mouseUp(event: MouseEvent) {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        const slide = elementRef && elementRef.current && elementRef.current.parentElement
        const [cursorX, cursorY] = getParentRelativePointerСoordinates(event, slide);
        dispatch(moveElement, {
            elementId: element.elementId,
            newX: cursorX - element.width / 2,
            newY: cursorY - element.height / 2,
        })
        setLeft(null)
        setTop(null)
    }

    function mouseMove(event: MouseEvent) {
        const slide = elementRef && elementRef.current && elementRef.current.parentElement
        const [cursorX, cursorY] = getParentRelativePointerСoordinates(event, slide);
        setLeft(cursorX - element.width / 2)
        setTop(cursorY - element.height / 2)
    }

    function mouseDown(event: MouseEvent) {
        event.preventDefault();
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
            debugger
            const [cursorX, cursorY] = getParentRelativePointerСoordinates(event, elementRef.current);
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        }

    }

    useEffect(() => {
        const element = elementRef.current
        element && element.addEventListener('mousedown', mouseDown)
        return () => {
            element && element.removeEventListener('mousedown', mouseDown)
        }
    }, [elementRef])

    const style = {
        top: top
            ? top
            : element.yPos
                ? element.yPos
                : 0,
        left: left
            ? left
            : element.xPos
                ? element.xPos
                : 0,
        height: element.height,
        width: element.width,
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
    // const tsRef = useRef<HTMLDivElement>(null)
    //
    // function mouseUpTs(event: any) {
    //
    // }
    //
    //
    // function mouseDownTs(event: any) {
    //     const ts = tsRef.current
    //     if (ts)
    //     {
    //         ts.addEventListener('mousedown', mouseDownTs)
    //     }
    // }

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