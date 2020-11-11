import {Button_WithColorPicker} from "../common/Button_WithColorPicker";
import fill from "../../images/fill.png";
import stroke from "../../images/stroke.png";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import word from "../../images/word.png";
import React, {useEffect, useState} from "react";
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
    // console.log(props.element.background)
    const [fillColorPicker, setFillColorPicker] = useState<string|null>(null)
    const [strokeColorPicker, setStrokeColorPicker] = useState<string|null>(null)
    const [fontColorPicker, setFontColorPicker] = useState<string|null>(null)

    useEffect(() => {
        console.log(props.element.background)
        setFillColorPicker(props.element.background)
        setStrokeColorPicker(props.element.borderColor)
    }, [fillColorPicker, strokeColorPicker])

    function changeBgColor(value: string) {
        setFillColorPicker(value)
        dispatch(setBackgroundColor, {
            newColor: value,
        })
    }

    function changeStrokeColor(value: string) {
        setStrokeColorPicker(value)
        dispatch(setStrokeColor, {
            newColor: value,
        })
    }

    function changeFontColor(value: string) {
        setFontColorPicker(value)
        if (isTextBox(props.element.dataElement))
        {
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
                value={fillColorPicker
                    ? fillColorPicker
                    : String(props.element.background)}
            />
            <Button_WithColorPicker
                img={stroke}
                onChange={changeStrokeColor}
                value={strokeColorPicker
                    ? strokeColorPicker
                    : String(props.element.borderColor)}
            />
            {isTextBox(props.element.dataElement) && <Button_WithColorPicker
                img={word}
                onChange={changeFontColor}
                value={props.element.dataElement.font.fontColor}
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