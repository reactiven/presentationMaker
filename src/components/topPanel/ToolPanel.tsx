import React from 'react';
import './ToolPanel.css';
import {State} from "../../Entity/types";
import {isTextBox} from "../../Entity/TextBox";
import {CommonToolBlock} from "./CommonToolBlock";
import { ColorEditColor } from './ColorEditColor';
import {FontEditBlock} from "./FontEditBlock";
import { AddElementsBlock } from './AddElementsBlock';
import {Button} from "../common/Button";
import {dispatch} from "../../state/state-manager";
import {setEditSlideBackgroundPopupOpened} from "../../Entity/Presentation";

type PropsType = {
    state: State,
}

function ToolPanel(props: PropsType) {
    const selectedElements = props.state.selectedSlideElements
    const slides = props.state.presentationInfo.slides
    const currentSlide = slides[slides.findIndex(slide => slide.slideId === props.state.currentSlide)]

    const selectedElement = selectedElements.length > 0
        ? currentSlide.elements[currentSlide.elements.findIndex(element => element.elementId === selectedElements[0])]
        : null

    function openEditSlideBackgroundPopup() {
        dispatch(setEditSlideBackgroundPopupOpened, {
            opened: true,
        })
    }

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
            <Button
                type={'border-none'}
                onClick={openEditSlideBackgroundPopup}
                label={'Фон'}
            />
            <ToolSeparator/>
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