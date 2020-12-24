import React, {useContext} from 'react';
import './ToolPanel.css';
import {isTextBox} from "../../Entity/TextBox";
import {CommonToolBlock} from "./CommonToolBlock";
import { ColorEditColor } from './ColorEditColor';
import {FontEditBlock} from "./FontEditBlock";
import { AddElementsBlock } from './AddElementsBlock';
import {Button} from "../common/Button";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";
import {ElementsMapType} from "../../Entity/types";


function canEditFont(slideElements: ElementsMapType, selectedElements: Array<number>) {
    return selectedElements.every(elementId => isTextBox(slideElements[elementId].dataElement))
}

function ToolPanel() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()

    const slides = presentationInfo.presentation.slides
    const currentSlide = presentationInfo.currentSlide
        ? slides[(presentationInfo.currentSlide)]
        : null
    const selectedSlideElements = presentationInfo.selectedSlideElements

    function openEditSlideBackgroundPopup() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(true))
    }

    return(
        <div className='toolpanel'>
            <CommonToolBlock/>
            {currentSlide && <AddElementsBlock />}
            {currentSlide && !!selectedSlideElements.length
            && <ColorEditColor
                currentSlide={currentSlide}
            />}
            {currentSlide && !!selectedSlideElements.length && canEditFont(currentSlide.elements, selectedSlideElements)
            && <FontEditBlock
                currentSlide={currentSlide}
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