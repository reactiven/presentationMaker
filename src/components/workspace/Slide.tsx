import React, {useContext, useEffect, useRef} from 'react';
import {ElementsMapType, SlideType} from "../../Entity/types";
import './Slide.css';
import { SlideElement } from '../SlideElements/Element';
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import * as htmlToImage from "html-to-image";
import {presentationInfoActions} from "../../state/presentationInfoReducer";


function Slide() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        selection,
    } = store.getState()

    const slideInfo = presentationInfo.slides[Number(selection.currentSlide)]
    const imageRegexp = /\.*http\.*/
    const dataRegexp = /\.*data:\.*/
    const slideRef = useRef<HTMLDivElement|null>(null)
    const style = {
        background: String(slideInfo.background).match(imageRegexp) || String(slideInfo.background).match(dataRegexp)
            ? `url("${slideInfo.background}") no-repeat center/100% 100%`
            : slideInfo.background
    }

    return(
        <div className="slide" id='slide' style={style} ref={slideRef}>
            {renderElements(slideInfo.elements, slideInfo.elementsOrder, selection.selectedSlideElements)}
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
            />
        }
        return null
    })
    return elementsList
}

export {
    Slide,
}