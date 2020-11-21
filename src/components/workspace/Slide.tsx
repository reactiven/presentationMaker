import React, {Ref, useEffect, useRef} from 'react';
import { SlideElementType, SlideType } from "../../Entity/types";
import './Slide.css';
import { SlideElement } from '../SlideElements/Element';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import {dispatch} from "../../state/state-manager";
import {setPreviewImage} from "../../Entity/Slide";

type PropsType = {
    slideInfo: SlideType,
    selectedElements: Array<number>,
}

function Slide(props: PropsType) {
    const slideInfo = {...props.slideInfo}
    const selectedElements = [...props.selectedElements]
    const imageRegexp = /\.*http\.*/
    const slideRef = useRef<HTMLDivElement|null>(null)
    const style = {
        background: slideInfo.background.match(imageRegexp)
            ? `url("${props.slideInfo.background}") no-repeat center/100% 100%`
            : props.slideInfo.background
    }

    // useEffect(() => {
    //     if (slideRef.current) {
    //         htmlToImage.toJpeg(slideRef.current, {
    //             quality: 0.5,
    //         })
    //             .then(function (dataUrl) {
    //                 dispatch(setPreviewImage, {
    //                     slideId: slideInfo.slideId,
    //                     image: dataUrl,
    //                 })
    //             });
    //     }
    // }, [slideInfo, slideRef])

    return(
        <div className="slide" id='slide' style={style} ref={slideRef}>
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