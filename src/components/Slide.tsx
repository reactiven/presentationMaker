import React from 'react';
import { SlideElementType, SlideType } from "../Entity/types";
import './Slide.css';

type PropsType = {
    slideInfo: SlideType,
}

function Slide(props: PropsType) {
    const slideInfo = {...props.slideInfo}
    const style = {
        background: props.slideInfo.background,
    }

    return(
        <div className="slide" style={style}>
            {renderElements(slideInfo.elements, slideInfo.elementsOrder)}
        </div>
    )
}

function renderElements(elements: Array<SlideElementType>, elementsOrder: Array<number>) {
    console.log(elementsOrder)
    const elementsList = elementsOrder.map((elementId, index) => {
        const element = elements.find(element => element.elementId === elementId)
        if (!!element)
        {
            return <Element 
                key={elementId}
                element={element}
                index={index}
            />
        }
    });
    console.log(elementsList)
    return elementsList
}

type ElementPropsType = {
    element: SlideElementType,
    index: number,
}
function Element(props: ElementPropsType) {
    const element = {...props.element}
    const style = {
        top: element.yPos,
        left: element.xPos,
        height: element.height,
        width: element.width,
        background: '#456',
    } 
    return(
        <div style={style} className='element'></div>
    )
}

export {
    Slide,
}