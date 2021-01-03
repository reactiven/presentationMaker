import React, {useContext} from 'react';
import styles from './ToolPanel.module.css';
import {isTextBox} from "../../Entity/TextBox";
import {CommonToolBlock} from "./CommonToolBlock";
import { ColorEditColor } from './ColorEditColor';
import {FontEditBlock} from "./FontEditBlock";
import { AddElementsBlock } from './AddElementsBlock';
import {Button} from "../common/Button";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {popupOpenedReducerActions} from "../../state/popupsOpenedReducers";
import {ElementsMapType, SlideType} from "../../Entity/types";


function canEditFont(slideElements: ElementsMapType, selectedElements: Array<number>) {
    return selectedElements.every(elementId => isTextBox(slideElements[elementId].dataElement))
}

type PropsType = {
    currentSlide: SlideType|null,
    selectedSlideElements: Array<number>,
}

function ToolPanel({
   currentSlide,
   selectedSlideElements,
}: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    function openEditSlideBackgroundPopup() {
        store.dispatch(popupOpenedReducerActions.setEditSlideBackgroundPopupOpened(true))
    }

    return(
        <div className={styles.toolpanel}>
            <CommonToolBlock/>
            {currentSlide && <AddElementsBlock />}
            {currentSlide && !!selectedSlideElements.length
            && <ColorEditColor
                currentSlide={currentSlide}
                selectedSlideElements={selectedSlideElements}
            />}
            {currentSlide && !!selectedSlideElements.length && canEditFont(currentSlide.elements, selectedSlideElements)
            && <FontEditBlock
                currentSlide={currentSlide}
                selectedSlideElements={selectedSlideElements}
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
        <div className={styles.separator}></div>
    )
}

export {
    ToolPanel,
    ToolSeparator,
}