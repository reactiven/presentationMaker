import React from 'react';
import { SlideElementType, SlideType } from "../../Entity/types";
import './Slide.css';
import { SlideElement } from '../SlideElements/Element';

type PropsType = {
    slideInfo: SlideType,
    selectedElements: Array<number>,
}

function Slide(props: PropsType) {
    const slideInfo = {...props.slideInfo}
    const selectedElements = [...props.selectedElements]
    const style = {
        background: props.slideInfo.background,
    }

    return(
        <div className="slide" style={style}>
            {renderElements(slideInfo.elements, slideInfo.elementsOrder, selectedElements)}
        </div>
    )
}

function renderElements(elements: Array<SlideElementType>, elementsOrder: Array<number>, selectedElements: Array<number>) {
    const elementsList = elementsOrder.map((elementId, index) => {
        const element = elements.find(element => element.elementId === elementId)
        if (!!element)
        {
            const isSelected = selectedElements.findIndex(slideId => slideId === element.elementId) !== -1

            return <SlideElement
                key={elementId}
                element={element}
                isSelected={isSelected}
                index={index}
            />
        }
        return null
    })
    return elementsList
}

export {
    Slide,
}