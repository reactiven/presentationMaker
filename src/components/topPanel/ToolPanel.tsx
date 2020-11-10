import React from 'react';
import './ToolPanel.css';
import {State} from "../../Entity/types";
import {isTextBox} from "../../Entity/TextBox";
import {CommonToolBlock} from "./CommonToolBlock";
import { ColorEditColor } from './ColorEditColor';
import {FontEditBlock} from "./FontEditBlock";
import { AddElementsBlock } from './AddElementsBlock';

type PropsType = {
    state: State,
}

function ToolPanel(props: PropsType) {
    const selectedElements = props.state.selectedSlideElements
    const slides = props.state.presentationInfo.slides
    const currentSlide = slides[slides.findIndex(slide => slide.slideId == props.state.currentSlide)]

    const selectedElement = selectedElements.length > 0
        ? currentSlide.elements[currentSlide.elements.findIndex(element => element.elementId == selectedElements[0])]
        : null

    return(
        <div className='toolpanel'>
            <CommonToolBlock/>
            <ToolSeparator/>
            <AddElementsBlock />
            <ToolSeparator/>
            {selectedElement && <ColorEditColor element={selectedElement}/>}
            {selectedElement && isTextBox(selectedElement.dataElement)
            && <FontEditBlock
                dataElement={selectedElement.dataElement}
                element={selectedElement}
            />}
        </div>
    )
}

function ToolSeparator() {
    return(
        <div className='separator'></div>
    )
}

export {
    ToolPanel,
    ToolSeparator,
}