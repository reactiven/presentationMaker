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
    const currentSlide = slides[Number(props.state.currentSlide)]

    const selectedElement = selectedElements.length > 0
        ? currentSlide.elements[selectedElements[0]]
        : null

    function openEditSlideBackgroundPopup() {
        dispatch(setEditSlideBackgroundPopupOpened, {
            opened: true,
        })
    }

    return(
        <div className='toolpanel'>
            <CommonToolBlock/>
            {currentSlide && <AddElementsBlock />}
            {selectedElement && selectedElements.length === 1 && <ColorEditColor element={selectedElement}/>}
            {selectedElement && selectedElements.length === 1 &&  isTextBox(selectedElement.dataElement)
            && <FontEditBlock
                dataElement={selectedElement.dataElement}
            />}
            {currentSlide && <Button
                type={'border-none'}
                onClick={openEditSlideBackgroundPopup}
                label={'Фон'}
            />}
            {currentSlide && <ToolSeparator/>}
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