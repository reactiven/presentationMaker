import {Button_WithColorPicker} from "../common/Button_WithColorPicker";
import fill from "../../images/fill.png";
import stroke from "../../images/stroke.png";
import {isTextBox} from "../../Entity/TextBox";
import word from "../../images/word.png";
import React, {useContext} from "react";
import './ColorEditColor.css';
import { ToolSeparator } from "./ToolPanel";
import border from "../../images/border.png";
import { Button_WithPopover } from "../common/Button_WithPopover";
import { SelectList } from "../common/SelectList";
import { isImage } from "../../Entity/Image";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";


function ColorEditColor() {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()

    const element = presentationInfo.presentation.slides[Number(presentationInfo.currentSlide)].elements[presentationInfo.selectedSlideElements[0]]

    function changeBgColor(value: string) {
        store.dispatch(presentationInfoActions.setBackgroundColor(value))
    }

    function changeStrokeColor(value: string) {
        store.dispatch(presentationInfoActions.setStrokeColor(value))
    }

    function changeFontColor(value: string) {
        store.dispatch(presentationInfoActions.changeFontColor(value))
    }


    function changeBorderWidth(id: string) {
        store.dispatch(presentationInfoActions.setStrokeWidth(`${id}px`))
    }

    return(
        <div className='color-edit-block'>
            {!isImage(element.dataElement) && <Button_WithColorPicker
                img={fill}
                onChange={changeBgColor}
                value={String(element.background)}
            />}
            <Button_WithColorPicker
                img={stroke}
                onChange={changeStrokeColor}
                value={String(element.borderColor)}
            />
            {isTextBox(element.dataElement) && <Button_WithColorPicker
                img={word}
                onChange={changeFontColor}
                value={element.dataElement.font.fontColor}
            />}
            <Button_WithPopover
                img={border}
                popover={<SelectList
                    onChange={changeBorderWidth}
                    selected={getSelectedBorderWidth(element.borderWidth)}
                    items={getBorderWidthItems()}
                />}
            />
            <ToolSeparator />
        </div>
    )
}

function getBorderWidthItems() {
    return [
        {
            id: '1',
            text: '1px'
        },
        {
            id: '2',
            text: '2px'
        },
        {
            id: '3',
            text: '3px'
        },
        {
            id: '4',
            text: '4px'
        },
        {
            id: '5',
            text: '5px'
        },
        {
            id: '6',
            text: '6px'
        },
        {
            id: '7',
            text: '7px'
        },
        {
            id: '8',
            text: '8px'
        },
    ]
}

function getSelectedBorderWidth(text: string|null) {
    if (!!text)
    {
        return String(parseInt(text.replace(/[^\d]/g, '')))
    }
    return null
}

export {
    ColorEditColor,
}