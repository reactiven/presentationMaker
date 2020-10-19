import React from 'react';
import { SlideElementType, SlideType } from "../Entity/types";
import './Slide.css';
import { SlideElement } from './SlideElements/Element';

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
    const elementsList = elementsOrder.map((elementId, index) => {
        const element = elements.find(element => element.elementId === elementId)
        if (!!element)
        {
            return <SlideElement 
                key={elementId}
                element={element}
                index={index}
            />
        }
    });
    return elementsList
}

export {
    Slide,
}