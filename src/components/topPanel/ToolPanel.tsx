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

function ToolPanel() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        selection,
    } = store.getState()

    const selectedElements = selection.selectedSlideElements
    const slides = presentationInfo.slides
    const currentSlide = slides[Number(selection.currentSlide)]

    const selectedElement = selectedElements.length > 0
        ? currentSlide.elements[selectedElements[0]]
        : null

    function openEditSlideBackgroundPopup() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(true))
    }

    return(
        <div className='toolpanel'>
            <CommonToolBlock/>
            {currentSlide && <AddElementsBlock />}
            {selectedElement && selectedElements.length === 1 && <ColorEditColor />}
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