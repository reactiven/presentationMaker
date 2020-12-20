import {TextBoxType} from "../../Entity/types";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import {Button_TwoState} from "../common/Button_TwoState";
import bold from "../../images/bold.png";
import italic from "../../images/italic.png";
import underline from "../../images/underline.png";
import {FontSizeSwitcher} from "../common/FontSizeSwitcher";
import React, {useContext} from "react";
import {dispatch} from "../../state/state-manager";
import './FontEditBlock.css';
import {ToolSeparator} from "./ToolPanel";
import { SelectList } from "../common/SelectList";
import { Button_WithPopover } from "../common/Button_WithPopover";
import {StoreType} from "../../state/store";
import {StoreContext} from "../../state/storeContext";
import {presentationInfoActions} from "../../state/presentationInfoReducer";

type PropsType = {
    dataElement: TextBoxType,
}
function FontEditBlock(props: PropsType) {
    const store: Readonly<StoreType> = useContext(StoreContext);
    const {
        presentationInfo,
        selection,
    } = store.getState()

    const element = presentationInfo.slides[Number(selection.currentSlide)].elements[selection.selectedSlideElements[0]]

    function changeFontBold(value: boolean) {
        if (selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    bold: value,
                },
            ))
        }
    }

    function changeFontItalic(value: boolean) {
        if (selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    italic: value,
                },
            ))
        }
    }

    function changeFontUnderline(value: boolean) {
        if (selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    underline: value,
                },
            ))
        }
    }

    function changeFontFamily(value: string) {
        if (selection.currentSlide && isTextBox(element.dataElement))
        {
            store.dispatch(presentationInfoActions.changeFont(
                selection.currentSlide,
                element.elementId,
                {
                    ...element.dataElement.font,
                    fontStyle: value,
                },
            ))
        }
    }

    return(
        <div className='font-edit-block'>
            <Button_TwoState
                img={bold}
                onClick={changeFontBold}
                checked={props.dataElement.font.bold}
            />
            <Button_TwoState
                img={italic}
                onClick={changeFontItalic}
                checked={props.dataElement.font.italic}
            />
            <Button_TwoState
                img={underline}
                onClick={changeFontUnderline}
                checked={props.dataElement.font.underline}
            />
            <Button_WithPopover
                text={props.dataElement.font.fontStyle}
                popover={<SelectList
                    onChange={changeFontFamily}
                    selected={props.dataElement.font.fontStyle}
                    items={getFontStyleItems()}
                />}
            />
            <FontSizeSwitcher />
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