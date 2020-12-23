import {ElementsMapType, SlideType} from "../../Entity/types";
import {isTextBox} from "../../Entity/TextBox";
import {Button_TwoState} from "../common/Button_TwoState";
import {FontSizeSwitcher} from "../common/FontSizeSwitcher";
import React, {useContext} from "react";
import './FontEditBlock.css';
import boldIcon from "../../images/bold.png";
import italicIcon from "../../images/italic.png";
import underlineIcon from "../../images/underline.png";
import {ToolSeparator} from "./ToolPanel";
import { SelectList } from "../common/SelectList";
import { Button_WithPopover } from "../common/Button_WithPopover";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";


function getFontInfo(elements: ElementsMapType, selectedElements: Array<number>) {
    let fontSize: number|null = 0
    let fontFamily: string|null = ''
    let bold: boolean|null = false
    let italic: boolean|null = false
    let underline: boolean|null = false
    const firstElementData = elements[selectedElements[0]].dataElement
    selectedElements.forEach(elementId => {
        const currentElementData = elements[elementId].dataElement
        if (isTextBox(firstElementData) && isTextBox(currentElementData))
        {
            fontSize = firstElementData.font.fontSize === currentElementData.font.fontSize && fontSize !== null
                ? currentElementData.font.fontSize
                : null
            fontFamily = firstElementData.font.fontStyle === currentElementData.font.fontStyle && fontFamily !== null
                ? currentElementData.font.fontStyle
                : null
            bold = firstElementData.font.bold === currentElementData.font.bold && bold !== null
                ? currentElementData.font.bold
                : null
            italic = firstElementData.font.italic === currentElementData.font.italic && italic !== null
                ? currentElementData.font.italic
                : null
            underline = firstElementData.font.underline === currentElementData.font.underline && underline !== null
                ? currentElementData.font.underline
                : null
        }
    })
    return {
        fontSize,
        fontFamily,
        underline,
        italic,
        bold,
    }
}

type PropsType = {
    currentSlide: SlideType,
}

function FontEditBlock(props: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
    } = store.getState()

    const {
        bold,
        italic,
        underline,
        fontFamily,
        fontSize,
    } = getFontInfo(props.currentSlide.elements, presentationInfo.selectedSlideElements)

    function changeFontBold(value: boolean) {
        store.dispatch(presentationInfoActions.changeFontBold(value))
    }

    function changeFontItalic(value: boolean) {
        store.dispatch(presentationInfoActions.changeFontItalic(value))
    }

    function changeFontUnderline(value: boolean) {
        store.dispatch(presentationInfoActions.changeFontUnderline(value))
    }

    function changeFontFamily(value: string) {
        store.dispatch(presentationInfoActions.changeFontStyle(value))
    }

    return(
        <div className='font-edit-block'>
            <Button_TwoState
                img={boldIcon}
                onClick={changeFontBold}
                checked={Boolean(bold)}
            />
            <Button_TwoState
                img={italicIcon}
                onClick={changeFontItalic}
                checked={Boolean(italic)}
            />
            <Button_TwoState
                img={underlineIcon}
                onClick={changeFontUnderline}
                checked={Boolean(underline)}
            />
            <Button_WithPopover
                text={fontFamily ? String(fontFamily) : 'Выберите стиль'}
                popover={<SelectList
                    onChange={changeFontFamily}
                    selected={String(fontFamily)}
                    items={getFontStyleItems()}
                />}
            />
            <FontSizeSwitcher
                fontSize={fontSize}
            />
            <ToolSeparator />
        </div>
    )
}

function getFontStyleItems() {
    return [
        {
            id: 'Calibri',
            text: 'Calibri',
        },
        {
            id: 'Arial',
            text: 'Arial',
        },
        {
            id: 'Times New Roman',
            text: 'Times New Roman',
        },
        {
            id: 'Georgia',
            text: 'Georgia',
        },
        {
            id: 'Lato',
            text: 'Lato',
        },
    ]
}

export {
    FontEditBlock,
}