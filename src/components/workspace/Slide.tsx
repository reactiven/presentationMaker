import React, {useRef} from 'react';
import {ElementsMapType, SlideType} from "../../Entity/types";
import './Slide.css';
import { SlideElement } from '../SlideElements/Element';

type PropsType = {
    slideInfo: SlideType,
    selectedElements: Array<number>,
}

function Slide(props: PropsType) {
    const slideInfo = {...props.slideInfo}
    const selectedElements = [...props.selectedElements]
    const imageRegexp = /\.*http\.*/
    const dataRegexp = /\.*data:\.*/
    const slideRef = useRef<HTMLDivElement|null>(null)
    const style = {
        background: String(slideInfo.background).match(imageRegexp) || String(slideInfo.background).match(dataRegexp)
            ? `url("${props.slideInfo.background}") no-repeat center/100% 100%`
            : props.slideInfo.background
    }

    return(
        <div className="slide" id='slide' style={style} ref={slideRef}>
            {renderElements(slideInfo.elements, slideInfo.elementsOrder, selectedElements)}
        </div>
    )
}

function renderElements(elements: ElementsMapType, elementsOrder: Array<number>, selectedElements: Array<number>) {
    const elementsList = elementsOrder.map((elementId, index) => {
        const element = elements[elementId]
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