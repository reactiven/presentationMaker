import React from 'react';
import { Button } from '../common/Button';
import './ToolPanel.css';
import plusIcon from '../../images/add_new.png';
import arrowLeft from '../../images/undo.png';
import arrowRight from '../../images/redo.png';
import fill from '../../images/fill.png';
import stroke from '../../images/stroke.png';
import word from '../../images/word.png';
import bold from '../../images/bold.png';
import italic from '../../images/italic.png';
import underline from '../../images/underline.png';
import { dispatch } from '../../state/state-manager';
import { addSlide } from '../../Entity/Presentation';
import { redo, undo } from '../../Entity/State';
import { Button_WithColorPicker } from '../common/Button_WithColorPicker';
import {State} from "../../Entity/types";
import {setBackgroundColor, setStrokeColor} from "../../Entity/SlideElement";
import {changeFont, isTextBox} from "../../Entity/TextBox";
import { Button_TwoState } from '../common/Button_TwoState';

type PropsType = {
    state: State,
}

function ToolPanel(props: PropsType) {

    const selectedElements = props.state.selectedSlideElements
    const slides = props.state.presentationInfo.slides
    const currentSlide = slides[slides.findIndex(slide => slide.slideId == props.state.currentSlide)]

    const selectedElement = selectedElements.length > 0
        ? currentSlide.elements[currentSlide.elements.findIndex(element => element.elementId == selectedElements[0])]
        : null

    const fillColorPicker = selectedElement
        ? String(selectedElement.background)
        : ''

    const strokeColorPicker = selectedElement
        ? String(selectedElement.borderColor)
        : ''

    const fontColorPicker = selectedElement && isTextBox(selectedElement.dataElement)
        ? String(selectedElement.dataElement.font.fontColor)
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
        if (selectedElement && isTextBox(selectedElement.dataElement))
        {
            debugger
            dispatch(changeFont, {
                newFont: {
                    ...selectedElement.dataElement.font,
                    fontColor: value,
                }
            })
        }
    }

    function changeFontBold(value: boolean) {
        if (selectedElement && isTextBox(selectedElement.dataElement))
        {
            debugger
            dispatch(changeFont, {
                newFont: {
                    ...selectedElement.dataElement.font,
                    bold: value,
                }
            })
        }
    }

    function changeFontItalic(value: boolean) {
        if (selectedElement && isTextBox(selectedElement.dataElement))
        {
            debugger
            dispatch(changeFont, {
                newFont: {
                    ...selectedElement.dataElement.font,
                    italic: value,
                }
            })
        }
    }

    function changeFontUnderline(value: boolean) {
        if (selectedElement && isTextBox(selectedElement.dataElement))
        {
            debugger
            dispatch(changeFont, {
                newFont: {
                    ...selectedElement.dataElement.font,
                    underline: value,
                }
            })
        }
    }

    return(
        <div className='toolpanel'>
            <Button 
                type={'border-none'}
                img={plusIcon}
                onClick={() => dispatch(addSlide)}
            />
            <Button 
                type={'border-none'}
                img={arrowLeft}
                onClick={() => dispatch(undo)}
            />
            <Button 
                type={'border-none'}
                img={arrowRight}
                onClick={() => dispatch(redo)}
            />
            {selectedElement !== null && <Button_WithColorPicker
                img={fill}
                onChange={changeBgColor}
                value={fillColorPicker}
            />}
            {selectedElement !== null && <Button_WithColorPicker
                img={stroke}
                onChange={changeStrokeColor}
                value={strokeColorPicker}
            />}
            {selectedElement !== null && isTextBox(selectedElement.dataElement)
                && <Button_WithColorPicker
                    img={word}
                    onChange={changeFontColor}
                    value={fontColorPicker}
                />
            }
            {selectedElement !== null && isTextBox(selectedElement.dataElement)
                && <Button_TwoState
                    img={bold}
                    onClick={changeFontBold}
                    checked={selectedElement.dataElement.font.bold}
                />
            }
            {selectedElement !== null && isTextBox(selectedElement.dataElement)
                && <Button_TwoState
                    img={italic}
                    onClick={changeFontItalic}
                    checked={selectedElement.dataElement.font.italic}
                />
            }
            {selectedElement !== null && isTextBox(selectedElement.dataElement)
            && <Button_TwoState
                img={underline}
                onClick={changeFontUnderline}
                checked={selectedElement.dataElement.font.underline}
            />
            }

        </div>
    )
}

export {
    ToolPanel,
}