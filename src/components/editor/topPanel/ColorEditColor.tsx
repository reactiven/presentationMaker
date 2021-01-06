import {Button_WithColorPicker} from "../../common/Button_WithColorPicker";
import fill from "../../../images/fill.png";
import stroke from "../../../images/stroke.png";
import {isTextBox} from "../../../Entity/TextBox";
import word from "../../../images/word.png";
import React, {useContext} from "react";
import styles from './ColorEditColor.module.css';
import { ToolSeparator } from "./ToolPanel";
import border from "../../../images/border.png";
import { Button_WithPopover } from "../../common/Button_WithPopover";
import { SelectList } from "../../common/SelectList";
import {StoreType} from "../../../state/store";
import {StoreContext} from "../../../state/storeContext";
import {presentationInfoActions} from "../../../state/presentationInfoReducer";
import {ElementsMapType, SlideType} from "../../../Entity/types";
import {dispatchDecorator} from "../../../state/dispatchDecarator";


function getColorInfo(elements: ElementsMapType, selectedElements: Array<number>) {
    let background: string|null = ''
    let borderColor: string|null = ''
    let fontColor: string|null = ''
    let borderWidth: string|null = ''
    const firstElement = elements[selectedElements[0]]
    const firstElementData = firstElement.dataElement
    selectedElements.forEach(elementId => {
        const currentElement = elements[elementId]
        const currentElementData = currentElement.dataElement

        if (isTextBox(currentElementData) && isTextBox(firstElementData))
        {
            fontColor = firstElementData.font.fontColor === currentElementData.font.fontColor && fontColor !== null
                ? currentElementData.font.fontColor
                : null
        }
        else
        {
            fontColor = null
        }
        background = firstElement.background === currentElement.background && background !== null
            ? currentElement.background
            : null
        borderColor = firstElement.borderColor === currentElement.borderColor && borderColor !== null
            ? currentElement.borderColor
            : null
        borderWidth = firstElement.borderWidth === currentElement.borderWidth && borderWidth !== null
            ? currentElement.borderWidth
            : null

    })
    return {
        fontColor,
        background,
        borderColor,
        borderWidth,
    }
}

type PropsType = {
    currentSlide: SlideType,
    selectedSlideElements: Array<number>,
}

function ColorEditColor({
    currentSlide,
    selectedSlideElements,
}: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);

    const {
        borderColor,
        background,
        borderWidth,
        fontColor
    } = getColorInfo(currentSlide.elements, selectedSlideElements)

    function changeBgColor(value: string) {
        dispatchDecorator(store, () => presentationInfoActions.setBackgroundColor(value))
    }

    function changeStrokeColor(value: string) {
        dispatchDecorator(store, () => presentationInfoActions.setStrokeColor(value))
    }

    function changeFontColor(value: string) {
        dispatchDecorator(store, () => presentationInfoActions.changeFontColor(value))
    }

    function changeBorderWidth(id: string) {
        dispatchDecorator(store, () => presentationInfoActions.setStrokeWidth(`${id}px`))
    }

    return(
        <div className={styles.colorEditBlock}>
            <Button_WithColorPicker
                img={fill}
                onChange={changeBgColor}
                value={background ? background : 'transparent'}
            />
            <Button_WithColorPicker
                img={stroke}
                onChange={changeStrokeColor}
                value={borderColor ? borderColor : 'transparent'}
            />
            {fontColor && <Button_WithColorPicker
                img={word}
                onChange={changeFontColor}
                value={fontColor ? fontColor : 'transparent'}
            />}
            <Button_WithPopover
                img={border}
                popoverContent={<SelectList
                    onChange={changeBorderWidth}
                    selected={getSelectedBorderWidth(borderWidth)}
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
          id: '0',
          text: '0px'
        },
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