import {Button_WithColorPicker} from "../common/Button_WithColorPicker";
import fill from "../../images/fill.png";
import stroke from "../../images/stroke.png";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import word from "../../images/word.png";
import React from "react";
import {dispatch} from "../../state/state-manager";
import {setBackgroundColor, setStrokeColor, setStrokeWidth} from "../../Entity/SlideElement";
import {SlideElementType} from "../../Entity/types";
import './ColorEditColor.css';
import { ToolSeparator } from "./ToolPanel";
import border from "../../images/border.png";
import { Button_WithPopover } from "../common/Button_WithPopover";
import { SelectList } from "../common/SelectList";


type PropsType = {
    element: SlideElementType,
}

function ColorEditColor(props: PropsType) {

    const fillColorPicker = props.element
        ? String(props.element.background)
        : ''

    const strokeColorPicker = props.element
        ? String(props.element.borderColor)
        : ''

    const fontColorPicker = props.element && isTextBox(props.element.dataElement)
        ? String(props.element.dataElement.font.fontColor)
        : ''

    function changeBgColor(value: string) {
        debugger
        dispatch(setBackgroundColor, {
            newColor: value,
        })
    }

    function changeStrokeColor(value: string) {
        dispatch(setStrokeColor, {
            newColor: value,
        })
    }

    function changeFontColor(value: string) {
        if (isTextBox(props.element.dataElement))
        {
            debugger
            dispatch(changeFont, {
                newFont: {
                    ...props.element.dataElement.font,
                    fontColor: value,
                }
            })
        }
    }

    function changeBorderWidth(id: string) {
        dispatch(setStrokeWidth, {
            newWidth: `${id}px`,
        })
    }

    return(
        <div className='color-edit-block'>
            <Button_WithColorPicker
                img={fill}
                onChange={changeBgColor}
                value={fillColorPicker}
            />
            <Button_WithColorPicker
                img={stroke}
                onChange={changeStrokeColor}
                value={strokeColorPicker}
            />
            {isTextBox(props.element.dataElement) && <Button_WithColorPicker
                img={word}
                onChange={changeFontColor}
                value={fontColorPicker}
            />}
            <Button_WithPopover
                img={border}
                popover={<SelectList
                    onChange={changeBorderWidth}
                    selected={getSelectedBorderWidth(props.element.borderWidth)}
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