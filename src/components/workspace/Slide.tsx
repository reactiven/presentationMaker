import React, { useRef } from 'react';
import { SlideElementType, SlideType } from "../../Entity/types";
import './Slide.css';
import { SlideElement } from '../SlideElements/Element';
import { dispatch } from '../../state/state-manager';
import { AddImage } from '../../Entity/Slide';

type PropsType = {
    slideInfo: SlideType,
    selectedElements: Array<number>,
}

function Slide(props: PropsType) {
    const slideInfo = {...props.slideInfo}
    const selectedElements = [...props.selectedElements]
    const imageRegexp = /\.*http\.*/
    const style = {
        background: slideInfo.background.match(imageRegexp)
            ? `url("${props.slideInfo.background}") no-repeat center/100%`
            : props.slideInfo.background
    }
    const ref = useRef<HTMLDivElement|null>(null)

    function cancelInputClick(event: any) {
        ref.current && ref.current.click()
        event.preventDefault()
    }

    return(
        <div className="slide" style={style} ref={ref}>
            <input type="file" className="slide-input-image" onClick={cancelInputClick} onInput={onInputChange}></input>
            {renderElements(slideInfo.elements, slideInfo.elementsOrder, selectedElements)}
        </div>
    )
}

function onInputChange(event: any) {
    console.log(2)
    if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0]
        dispatch(AddImage, {filepath: URL.createObjectURL(img)})
    }
    event.currentTarget = ""
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