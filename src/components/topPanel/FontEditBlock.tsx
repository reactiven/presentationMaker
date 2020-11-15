import {SlideElementType, TextBoxType} from "../../Entity/types";
import {changeFont} from "../../Entity/TextBox";
import {Button_TwoState} from "../common/Button_TwoState";
import bold from "../../images/bold.png";
import italic from "../../images/italic.png";
import underline from "../../images/underline.png";
import {FontSizeSwitcher} from "../common/FontSizeSwitcher";
import React from "react";
import {dispatch} from "../../state/state-manager";
import './FontEditBlock.css';
import {ToolSeparator} from "./ToolPanel";
import { SelectList } from "../common/SelectList";
import { Button_WithPopover } from "../common/Button_WithPopover";

type PropsType = {
    element: SlideElementType,
    dataElement: TextBoxType,
}

function FontEditBlock(props: PropsType) {
    function changeFontBold(value: boolean) {
        {
            dispatch(changeFont, {
                newFont: {
                    ...props.dataElement.font,
                    bold: value,
                }
            })
        }
    }

    function changeFontItalic(value: boolean) {
        dispatch(changeFont, {
            newFont: {
                ...props.dataElement.font,
                italic: value,
            }
        })
    }

    function changeFontUnderline(value: boolean) {
        dispatch(changeFont, {
            newFont: {
                ...props.dataElement.font,
                underline: value,
            }
        })
    }

    function changeFontFamily(value: string) {
        dispatch(changeFont, {
            newFont: {
                ...props.dataElement.font,
                fontStyle: value,
            }
        })
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
            <FontSizeSwitcher
                textBox={props.element}
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