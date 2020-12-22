import React, {useContext, useEffect, useRef} from 'react';
import {ElementsMapType} from "../../Entity/types";
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
    } = store.getState()


    const slideInfo = presentationInfo.presentation.slides[Number(presentationInfo.currentSlide)]
    const imageRegexp = /\.*http\.*/
    const dataRegexp = /\.*data:\.*/
    const slideRef = useRef<HTMLDivElement|null>(null)
    const style = {
        background: String(slideInfo.background).match(imageRegexp) || String(slideInfo.background).match(dataRegexp)
            ? `url("${slideInfo.background}") no-repeat center/100% 100%`
            : slideInfo.background
    }

    // useEffect(() => {
    //     const slide = slideRef.current
    //     if (slide && presentationInfo.currentSlide) {
    //         htmlToImage.toJpeg(slide, {
    //             quality: 0.5,
    //         })
    //             .then(function (dataUrl) {
    //                 store.dispatch(presentationInfoActions.setPreviewImage(dataUrl))
    //             });
    //     }
    // }, [presentationInfo])

    return(
        <div className="slide" id='slide' style={style} ref={slideRef}>
            {renderElements(slideInfo.elements, slideInfo.elementsOrder, presentationInfo.selectedSlideElements)}
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